jest.mock('../db/mongostorage', () => {
    return jest.fn().mockImplementation(() => ({
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      updateMany: jest.fn()
    }));
  });
  
  const MongoStorage = require('../db/mongostorage');
  const UserRepository = require('../repository/user.repository'); 
  
  const mockUser = {
    id: "123",
    id_use: "user123",
    password: "password123",
    name: "John Doe"
  };
  
  describe('UserRepository', () => {
    let userRepository;
    let mongoStorageInstance;
  
    beforeEach(() => {
      userRepository = new UserRepository();
      mongoStorageInstance = MongoStorage.mock.instances[0]; 
      Object.values(mongoStorageInstance).forEach(mockFn => mockFn.mockReset());
    });
  
    describe('Initialization', () => {
      it('should create a MongoStorage instance for "user"', () => {
        expect(MongoStorage).toHaveBeenCalledWith('user');
      });
    });
  
    describe('find()', () => {
      it('calls find on storage and returns users', async () => {
        mongoStorageInstance.find.mockResolvedValue([mockUser]);
        const users = await userRepository.find();
        expect(mongoStorageInstance.find).toHaveBeenCalled();
        expect(users).toEqual([mockUser]);
      });
    });
  
    describe('retrieve(id)', () => {
      it('calls findById on storage and returns a user', async () => {
        mongoStorageInstance.findById.mockResolvedValue(mockUser);
        const user = await userRepository.retrieve(mockUser.id);
        expect(mongoStorageInstance.findById).toHaveBeenCalledWith(mockUser.id);
        expect(user).toEqual(mockUser);
      });
    });
  
    describe('create(user)', () => {
      it('calls create on storage and returns the created user', async () => {
        mongoStorageInstance.create.mockResolvedValue(mockUser);
        const user = await userRepository.create(mockUser);
        expect(mongoStorageInstance.create).toHaveBeenCalledWith(mockUser);
        expect(user).toEqual(mockUser);
      });
    });
  
    describe('update(id, user)', () => {
      it('calls update on storage and returns the updated user', async () => {
        mongoStorageInstance.update.mockResolvedValue(mockUser);
        const user = await userRepository.update(mockUser.id, mockUser);
        expect(mongoStorageInstance.update).toHaveBeenCalledWith(mockUser.id, mockUser);
        expect(user).toEqual(mockUser);
      });
    });
  
    describe('delete(id)', () => {
      it('calls delete on storage and returns the deleted user', async () => {
        mongoStorageInstance.delete.mockResolvedValue(mockUser);
        const result = await userRepository.delete(mockUser.id);
        expect(mongoStorageInstance.delete).toHaveBeenCalledWith(mockUser.id);
        expect(result).toEqual(mockUser);
      });
    });
  
    describe('findByCredentials(id_use, password)', () => {
      it('calls findOne on storage and returns a user', async () => {
        mongoStorageInstance.findOne.mockResolvedValue(mockUser);
        const user = await userRepository.findByCredentials(mockUser.id_use, mockUser.password);
        expect(mongoStorageInstance.findOne).toHaveBeenCalledWith({ id_use: mockUser.id_use, password: mockUser.password });
        expect(user).toEqual(mockUser);
      });
    });
  
    describe('updateSoldierMessages(updatedMessage)', () => {
      it('calls updateMany on storage and returns the result', async () => {
        const updateResult = { nModified: 1 };
        mongoStorageInstance.updateMany.mockResolvedValue(updateResult);
        const result = await userRepository.updateSoldierMessages("You are a soldier now");
        expect(mongoStorageInstance.updateMany).toHaveBeenCalledWith({ type_user: "Solider" }, { message: "You are a soldier now" });
        expect(result).toEqual(updateResult);
      });
    });
  });
  