const { userController } = require('../controller/userController'); // Update the path
const UserRepository = require('../repository/user.repository'); // Update the path
jest.mock('../repository/user.repository'); // Mock UserRepository

const { ServerError, NotFoundError } = require('../errors/error'); // Update the path as necessary

describe('User Controller', () => {
  let mockRequest, mockResponse;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    UserRepository.mockClear();
  });

  describe('getAllUsers', () => {
    it('should return 200 and all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      UserRepository.mockImplementation(() => ({
        find: jest.fn().mockResolvedValue(users),
      }));

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: "Users retrieved successfully",
        data: users,
      });
    });

    it('should return 404 when no users are found', async () => {
      UserRepository.mockImplementation(() => ({
        find: jest.fn().mockResolvedValue([])
      }));

      await expect(userController.getAllUsers(mockRequest, mockResponse))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getUserById', () => {
    it('should return 200 and the user if found', async () => {
      const user = { id: 1, name: 'John Doe' };
      UserRepository.mockImplementation(() => ({
        retrieve: jest.fn().mockResolvedValue(user),
      }));
      mockRequest.params = { id: '1' };
  
      await userController.getUserById(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });
  
    it('should return 404 when the user is not found', async () => {
      UserRepository.mockImplementation(() => ({
        retrieve: jest.fn().mockResolvedValue(null)
      }));
      mockRequest.params = { id: '999' };
  
      await expect(userController.getUserById(mockRequest, mockResponse))
        .rejects.toThrow(NotFoundError);
    });
  });
  
  describe('createUser', () => {
    it('should return 201 and the created user', async () => {
      const newUser = { name: 'New User', email: 'newuser@example.com' };
      UserRepository.mockImplementation(() => ({
        create: jest.fn().mockResolvedValue(newUser),
      }));
      mockRequest.body = newUser;
  
      await userController.createUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(newUser);
    });
  
  });
  
  describe('updateUser', () => {
    it('should return 200 and the updated user', async () => {
      const updatedUser = { id: 1, name: 'Updated User' };
      UserRepository.mockImplementation(() => ({
        update: jest.fn().mockResolvedValue(updatedUser),
      }));
      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Updated User' };
  
      await userController.updateUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
    });
  
  });

  describe('updateSoldierMessages', () => {
    it('should successfully update soldier messages', async () => {
      mockRequest.body = { message: "You are a soldier" };
      UserRepository.mockImplementation(() => ({
        updateSoldierMessages: jest.fn().mockResolvedValue(true),
      }));

      await userController.updateSoldierMessages(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Soldier messages updated successfully'
      });
    });

  });

  describe('deleteUser', () => {
    it('should return 200 and confirm user deletion', async () => {
      UserRepository.mockImplementation(() => ({
        delete: jest.fn().mockResolvedValue(true),
      }));
      mockRequest.params = { id: '1' };
  
      await userController.deleteUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object)); // Adjust according to actual response structure
    });
  
  });
  
  describe('loginUser', () => {
    it('should return 200 and login information when credentials match', async () => {
      const userCredentials = { id_use: 'user123', password: 'password' };
      const userInfo = { ...userCredentials, name: 'John Doe' };
      UserRepository.mockImplementation(() => ({
        findByCredentials: jest.fn().mockResolvedValue(userInfo),
      }));
      mockRequest.body = userCredentials;
  
      await userController.loginUser(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: "Login successful",
        data: expect.objectContaining({
          id_use: userCredentials.id_use
        }),
      });
    });
  
    it('should return 404 when credentials do not match', async () => {
      UserRepository.mockImplementation(() => ({
        findByCredentials: jest.fn().mockResolvedValue(null),
      }));
      mockRequest.body = { id_use: 'userNotFound', password: 'wrongPassword' };
  
      await expect(userController.loginUser(mockRequest, mockResponse))
        .rejects.toThrow(NotFoundError);
    });
  
  });
});
