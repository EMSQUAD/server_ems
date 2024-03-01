//Description: Custom error classes for the application
class ServerError extends Error {
    constructor(action) {
      super(`Internal Server Error  ${action}`);
      this.name = "ServerError";
      this.status = 500;
    }
  }
  
  class BadRequestError extends Error {
    constructor(action) {
      super(`Bad Request ${action}`);
      this.name = "BadRequestError";
      this.status = 400;
    }
  }
  
  class NotFoundError extends Error {
    constructor(action) {
      super(`Not Found ${action}`);
      this.name = "NotFoundError";
      this.status = 404;
    }
  }
  
  module.exports = {
    ServerError,
    BadRequestError,
    NotFoundError,
  };
  