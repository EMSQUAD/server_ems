const { Router } = require('express');

 const { userController } = require('../controller/user.controller');
 const User = require('../models/user.model');


const userRouter = Router();

//get all users 
userRouter.get('/', userController.getAllUsers);
//get user by id
 userRouter.get('/:id', userController.getUserById);
// //create user
 userRouter.post('/', userController.createUser);

//  userRouter.post('/updateAllLiveEvents', async (req, res) => {
//     try {
//       await User.updateMany({}, { liveEvent: "Yes" }); // עדכון כל הרשומות
//       res.status(200).send('All user live events updated successfully');
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

userRouter.post('/toggleLiveEvent', async (req, res) => {
  try {
    const result = await User.updateMany({ 
      // שולח פקודה אגרגטיבית שמשנה את הערך מ-"Yes" ל-"No" ולהפך
      }, 
      [ 
        { 
          $set: { 
            liveEvent: { 
              $cond: { if: { $eq: ["$liveEvent", "Yes"] }, then: "No", else: "Yes" } 
            } 
          } 
        } 
      ]);

    res.status(200).send(`Live events toggled successfully for ${result.nModified} users.`);
  } catch (error) {
    res.status(500).send(`Error toggling liveEvent fields: ${error}`);
  }
});
  


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
