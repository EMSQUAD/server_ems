const { Router } = require('express');
const { eventController } = require('../controller/event.controller');
const eventRouter = Router();

//get all event 
eventRouter.get('/', eventController.getAllevent);
//get event by id
eventRouter.get('/:id', eventController.getEventById);
// //create event
eventRouter.post('/', eventController.createEvent);
// //update event
eventRouter.put('/:id', eventController.updateEvent);
// //delete event
eventRouter.delete('/:id', eventController.deleteEvent);

module.exports = { eventRouter };