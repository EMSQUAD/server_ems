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

 userRouter.delete('/:id', userController.deleteUser);

 userRouter.post('/login', userController.loginUser);

 userRouter.put('/update-message-for-soldiers', async (req, res) => {
    try {
      // Extract the message from the request body
      const { message } = req.body;
  
      // Update the message for all soldiers
      await mongoStorage.update(null, { message });
  
      res.status(200).json({ message: 'Messages updated for soldiers' });
    } catch (error) {
      console.error('Error in update message for soldiers route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

module.exports = { userRouter };
