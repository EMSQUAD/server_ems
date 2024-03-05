const { Router } = require('express');

 const { userController } = require('../controller/user.controller');
//  const User = require('../models/user.model');


const userRouter = Router();

//get all users 
userRouter.get('/', userController.getAllUsers);
//get user by id
 userRouter.get('/:id', userController.getUserById);
// //create user
 userRouter.post('/', userController.createUser);
// //update user
 userRouter.put('/:id', userController.updateUser);
// //delete user
 userRouter.delete('/:id', userController.deleteUser);

 userRouter.post('/login', userController.loginUser);


//  userRouter.post('/updateExpoPushToken', userController.updateExpoPushToken);




// userRouter.post('/updateMessage', userController.updateExpoPushToken);

//test noy working
userRouter.put('/sendmessage', userController.sendMessageToAllUsers);

module.exports = { userRouter };
