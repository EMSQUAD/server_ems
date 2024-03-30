const { ServerError, BadRequestError, NotFoundError } = require('../errors/error'); 

describe('Custom Error Classes', () => {
  describe('ServerError', () => {
    const action = 'testing server error';
    const error = new ServerError(action);

    it('should be an instance of Error', () => {
      expect(error).toBeInstanceOf(Error);
    });

    it('should have the correct message', () => {
      expect(error.message).toBe(`Internal Server Error ${action}`);
    });

    it('should have the correct name', () => {
      expect(error.name).toBe('ServerError');
    });

    it('should have the correct status', () => {
      expect(error.status).toBe(500);
    });
  });

  describe('BadRequestError', () => {
    const action = 'testing bad request error';
    const error = new BadRequestError(action);

    it('should be an instance of Error', () => {
      expect(error).toBeInstanceOf(Error);
    });

    it('should have the correct message', () => {
      expect(error.message).toBe(`Bad Request ${action}`);
    });

    it('should have the correct name', () => {
      expect(error.name).toBe('BadRequestError');
    });

    it('should have the correct status', () => {
      expect(error.status).toBe(400);
    });
  });

  describe('NotFoundError', () => {
    const action = 'testing not found error';
    const error = new NotFoundError(action);

    it('should be an instance of Error', () => {
      expect(error).toBeInstanceOf(Error);
    });

    it('should have the correct message', () => {
      expect(error.message).toBe(`Not Found ${action}`);
    });

    it('should have the correct name', () => {
      expect(error.name).toBe('NotFoundError');
    });

    it('should have the correct status', () => {
      expect(error.status).toBe(404);
    });
  });
});
