const { messageController } = require('../controller/message.controller'); 
const MessageRepository = require('../repository/message.repository'); 
jest.mock('../repository/message.repository'); 

const { ServerError, NotFoundError } = require('../errors/error'); 

describe('Message Controller', () => {
  let mockRequest, mockResponse;
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    MessageRepository.mockClear();
  });

  describe('getAllMessages', () => {
    it('should return 200 and all messages', async () => {
      const messages = [{ id: 1, content: 'Test Message' }];
      MessageRepository.mockImplementation(() => ({
        find: jest.fn().mockResolvedValue(messages),
      }));

      await messageController.getAllMessages(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: "Messages retrieved successfully",
        data: messages,
      });
    });

    it('should return 404 when no messages are found', async () => {
      MessageRepository.mockImplementation(() => ({
        find: jest.fn().mockResolvedValue([])
      }));

      await expect(messageController.getAllMessages(mockRequest, mockResponse))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getMessageById', () => {
    // Implement similar tests for getMessageById
  });

  describe('createMessage', () => {
    // Implement tests for createMessage
  });

  describe('updateMessage', () => {
    // Implement tests for updateMessage
  });

  describe('deleteMessage', () => {
    // Implement tests for deleteMessage
  });

  describe('getMessagesByIdUse', () => {
    it('should return 200 and messages for the given user ID', async () => {
      const messages = [{ id: 1, content: 'Test Message', idUse: 1 }];
      mockRequest.params = { id: 1 };
      MessageRepository.mockImplementation(() => ({
        findAllByIdUse: jest.fn().mockResolvedValue(messages),
      }));

      await messageController.getMessagesByIdUse(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        message: "Messages retrieved successfully",
        data: messages,
      });
    });

    it('should return 404 when no messages are found for the given user ID', async () => {
      mockRequest.params = { id: 999 };
      MessageRepository.mockImplementation(() => ({
        findAllByIdUse: jest.fn().mockResolvedValue([])
      }));

      await expect(messageController.getMessagesByIdUse(mockRequest, mockResponse))
        .rejects.toThrow(NotFoundError);
    });
  });

  // More tests as necessary...
});

