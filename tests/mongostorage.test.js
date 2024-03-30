
const mongoose = require('mongoose');
const MongoStorage = require('../db/mongostorage'); 

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn().mockReturnThis(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  save: jest.fn(),
  Schema: class {},
}));

describe('MongoStorage', () => {
  let storage;
  const mockEntity = 'TestEntity';

  beforeEach(() => {
    mongoose.model.mockClear();
    mongoose.connect.mockClear();
    mongoose.find.mockClear();
    mongoose.findOne.mockClear();
    mongoose.findOneAndUpdate.mockClear();
    mongoose.findOneAndDelete.mockClear();
    mongoose.save.mockClear();

    mongoose.model.mockImplementation(() => ({
      find: mongoose.find,
      findOne: mongoose.findOne,
      findOneAndUpdate: mongoose.findOneAndUpdate,
      findOneAndDelete: mongoose.findOneAndDelete,
      save: async function() { return this; },
    }));

    storage = new MongoStorage(mockEntity);
  });

  describe('find method', () => {
    it('should return all entities', async () => {
      const mockData = [{ name: 'Entity1' }, { name: 'Entity2' }];
      mongoose.find.mockResolvedValue(mockData);
  
      const result = await storage.find();
      expect(result).toEqual(mockData);
      expect(mongoose.find).toHaveBeenCalled();
    });
  
    it('should throw an error if the operation fails', async () => {
      mongoose.find.mockRejectedValue(new Error('Find operation failed'));
  
      await expect(storage.find()).rejects.toThrow('Find operation failed');
    });
  });
  describe('findOne method', () => {
    it('should return a single entity', async () => {
      const mockData = { name: 'Entity1' };
      mongoose.findOne.mockResolvedValue(mockData);
  
      const result = await storage.findOne();
      expect(result).toEqual(mockData);
      expect(mongoose.findOne).toHaveBeenCalled();
    });
  
    it('should throw an error if the operation fails', async () => {
      mongoose.findOne.mockRejectedValue(new Error('FindOne operation failed'));
  
      await expect(storage.findOne()).rejects.toThrow('FindOne operation failed');
    });
  });
  describe('create method', () => {
    it('should create and return a new entity', async () => {
      const mockData = { name: 'NewEntity' };
      mongoose.save.mockResolvedValue(mockData);
  
      const result = await storage.create(mockData);
      expect(result).toEqual(mockData);
      expect(mongoose.save).toHaveBeenCalledTimes(1);
    });
  
    it('should throw an error if the operation fails', async () => {
      mongoose.save.mockRejectedValue(new Error('Create operation failed'));
  
      await expect(storage.create({ name: 'FailEntity' })).rejects.toThrow('Create operation failed');
    });
  });
  
});
