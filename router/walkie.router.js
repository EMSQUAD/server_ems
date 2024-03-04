const { Router } = require('express');
const { walkieController } = require('../controller/walkie.controller');

const walkieRouter = Router();
// get all subscribers 
// walkieRouter.get('/', walkieController.getAllWalkies);
// create subscriber
walkieRouter.post('/', walkieController.createWalkie);
// send message
walkieRouter.post('/', walkieController.sendMessage);
// remove subscriber
walkieRouter.delete('/:id', walkieController.deleteWalkie);
