const EventRepository = require("../repository/event.repostory");

const eventRepository = new EventRepository();
const {
  ServerError,
  BadRequestError,
  NotFoundError,
} = require("../errors/error");

exports.eventController = {
  async getAllevent(req, res) {
    try {
      const events = await eventRepository.find();
      if (!events || events.length === 0) {
        throw new NotFoundError("events not found");
      }
      res.status(200).json({
        status: 200,
        message: "events retrieved successfully",
        data: events,
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
  
  async getEventById(req, res) {
      try {
        const event = await eventRepository.retrieve(req.params.id);
       console.log(event);
        if(!event){
          throw new NotFoundError("event not found");
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json(new ServerError(error));
      }
    },

  async createEvent(req, res) {
      try {
        const event = await eventRepository.create(req.body);
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json(new ServerError(error));
      }
    },

  async updateEvent(req, res) {
      try {
        const event = await eventRepository.update(req.params.id, req.body);
        if(!event){
          throw new NotFoundError("event not found");
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json(new ServerError(error));
      }
    },

  async deleteEvent(req, res) {
      try {
        const event = await eventRepository.delete(req.params.id);
        if(!event){
          throw new NotFoundError("event not found");
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json(new ServerError(error));
      }
    }
};
