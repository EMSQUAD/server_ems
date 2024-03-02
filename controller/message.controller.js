const MessageRepository = require("../repository/message.repository");
const messageRepository = new MessageRepository();
const { ServerError, NotFoundError } = require("../errors/error");

exports.messageController = {
  async getAllMessages(req, res) {
    try {
      const messages = await messageRepository.find();
      if (!messages || messages.length === 0) {
        throw new NotFoundError("Messages not found");
      }
      res.status(200).json({
        status: 200,
        message: "Messages retrieved successfully",
        data: messages,
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      if (error instanceof ServerError) {
        res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      } else {
        res.status(error.status || 500).json({
          status: error.status || 500,
          message: error.message,
        });
      }
    }
  },

  async getMessageById(req, res) {
    try {
      const message = await messageRepository.retrieve(req.params.id);
      if (!message) {
        throw new NotFoundError("Message not found");
      }
      res.status(200).json(message);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json(new ServerError(error));
    }
  },

  async createMessage(req, res) {
    try {
      const message = await messageRepository.create(req.body);
      res.status(201).json(message);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json(new ServerError(error));
    }
  },

  async updateMessage(req, res) {
    try {
      const message = await messageRepository.update(req.params.id, req.body);
      if (!message) {
        throw new NotFoundError("Message not found");
      }
      res.status(200).json(message);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json(new ServerError(error));
    }
  },

  async deleteMessage(req, res) {
    try {
      const message = await messageRepository.delete(req.params.id);
      if (!message) {
        throw new NotFoundError("Message not found");
      }
      res.status(200).json(message);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json(new ServerError(error));
    }
  },
};
