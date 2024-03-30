const { eventController } = require('../controller/event.controller'); 
const EventRepository = require('../repository/event.repostory'); 
jest.mock('../repository/event.repostory'); 

const { ServerError, NotFoundError } = require('../errors/error');

describe('Event Controller', () => {
  let mockRequest, mockResponse, mockNext;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();

    EventRepository.mockClear();
  });

  describe('getAllevent', () => {
    it('should return 200 and all events if events exist', async () => {
      EventRepository.mockImplementation(() => ({
        find: () => Promise.resolve([{ id: 1, name: 'Test Event' }])
      }));

      await eventController.getAllevent(mockRequest, mockResponse, mockNext);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 200,
        message: 'events retrieved successfully',
      }));
    });

    it('should return 404 when no events are found', async () => {
      EventRepository.mockImplementation(() => ({
        find: () => Promise.resolve([])
      }));

      await expect(eventController.getAllevent(mockRequest, mockResponse, mockNext))
        .rejects.toThrow(NotFoundError);
    });

  });

  describe('getEventById', () => {
    it('should return 200 and the event if found', async () => {
      const eventId = 1;
      mockRequest.params = { id: eventId };
      EventRepository.mockImplementation(() => ({
        retrieve: () => Promise.resolve({ id: eventId, name: 'Test Event' })
      }));

      await eventController.getEventById(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.anything()); // Adjust according to actual response
    });

    it('should return 404 when event is not found', async () => {
      mockRequest.params = { id: 999 }; 
      EventRepository.mockImplementation(() => ({
        retrieve: () => Promise.resolve(null)
      }));

      await expect(eventController.getEventById(mockRequest, mockResponse, mockNext))
        .rejects.toThrow(NotFoundError);
    });


  });
});

