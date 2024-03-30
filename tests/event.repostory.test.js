jest.mock('../db/mongostorage'); 

const EventRepository = require('../repository/event.repostory'); 
const MongoStorage = require('../db/mongostorage');

const mockEvent = {
  id: "123",
  name: "Test Event",
  date: "2021-01-01"
};

describe("EventRepository", () => {
  let eventRepository;

  beforeEach(() => {
    MongoStorage.mockClear();
    eventRepository = new EventRepository();
  });

  it("should create an instance of MongoStorage with 'event' as the entity", () => {
    expect(MongoStorage).toHaveBeenCalledWith('event');
  });

  it("find method should call storage.find", async () => {
    const mongoStorageInstance = MongoStorage.mock.instances[0];
    const mockFind = jest.fn().mockResolvedValue([mockEvent]);
    mongoStorageInstance.find = mockFind;

    const events = await eventRepository.find();
    expect(mockFind).toHaveBeenCalled();
    expect(events).toEqual([mockEvent]);
  });

  it("create method should call storage.create with the event object", async () => {
    const mongoStorageInstance = MongoStorage.mock.instances[0];
    const mockCreate = jest.fn().mockResolvedValue(mockEvent);
    mongoStorageInstance.create = mockCreate;
  
    const event = await eventRepository.create(mockEvent);
    expect(mockCreate).toHaveBeenCalledWith(mockEvent);
    expect(event).toEqual(mockEvent);
  });
  
});
