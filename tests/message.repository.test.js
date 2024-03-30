
jest.mock('../db/mongostorage'); 
const MongoStorage = require('../db/mongostorage');
const MessageRepository = require('../repository/message.repository'); // Update the path to your MessageRepository

const mockMessage = {
  id: "1",
  content: "Test message",
  id_use: "user1"
};

describe("MessageRepository", () => {
  let messageRepository;

  beforeEach(() => {
    MongoStorage.mockClear();
    messageRepository = new MessageRepository();
  });

  it("should instantiate MongoStorage with 'message' as the entity", () => {
    expect(MongoStorage).toHaveBeenCalledWith('message');
  });

  it("find method should call storage.find and return messages", async () => {
    MongoStorage.prototype.find.mockResolvedValue([mockMessage]);

    const messages = await messageRepository.find();
    expect(MongoStorage.prototype.find).toHaveBeenCalled();
    expect(messages).toEqual([mockMessage]);
  });

  it("retrieve method should call storage.findByIdMessage with the correct ID", async () => {
    MongoStorage.prototype.findByIdMessage.mockResolvedValue(mockMessage);

    const message = await messageRepository.retrieve("1");
    expect(MongoStorage.prototype.findByIdMessage).toHaveBeenCalledWith("1");
    expect(message).toEqual(mockMessage);
  });

  it("create method should call storage.create with a message object", async () => {
    MongoStorage.prototype.create.mockResolvedValue(mockMessage);

    const message = await messageRepository.create(mockMessage);
    expect(MongoStorage.prototype.create).toHaveBeenCalledWith(mockMessage);
    expect(message).toEqual(mockMessage);
  });

  it("update method should call storage.update with the correct ID and message object", async () => {
    MongoStorage.prototype.update.mockResolvedValue(mockMessage);

    const updatedMessage = await messageRepository.update("1", mockMessage);
    expect(MongoStorage.prototype.update).toHaveBeenCalledWith("1", mockMessage);
    expect(updatedMessage).toEqual(mockMessage);
  });

  it("delete method should call storage.delete with the correct ID", async () => {
    MongoStorage.prototype.delete.mockResolvedValue(mockMessage);

    const deletedMessage = await messageRepository.delete("1");
    expect(MongoStorage.prototype.delete).toHaveBeenCalledWith("1");
    expect(deletedMessage).toEqual(mockMessage);
  });

  it("findAllByIdUse method should call storage.find with the correct query", async () => {
    MongoStorage.prototype.find.mockResolvedValue([mockMessage]);

    const messages = await messageRepository.findAllByIdUse("user1");
    expect(MongoStorage.prototype.find).toHaveBeenCalledWith({ id_use: "user1" });
    expect(messages).toEqual([mockMessage]);
  });

});
