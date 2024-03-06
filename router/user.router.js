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



userRouter.put('/update-soldier-messages', userController.updateSoldierMessages);
 userRouter.put('/:id', userController.updateUser);

// //delete user
 userRouter.delete('/:id', userController.deleteUser);

 userRouter.post('/login', userController.loginUser);

 

//  userRouter.put('/update-soldier-messages', async (req, res) => {
//     try {
//       // Assuming you're calling this route to update messages for soldiers
//       await mongoStorage.updateMessage();
//       res.status(200).json({ message: 'Soldier messages updated successfully' });
//     } catch (error) {
//       console.error('Error updating soldier messages:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


module.exports = { userRouter };
