const UserRepository = require("../repository/user.repository");
// const User = require('../models/user.model');



const userRepository = new UserRepository();
const {
  ServerError,
  BadRequestError,
  NotFoundError,
} = require("../errors/error");

exports.userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userRepository.find();
      if (!users || users.length === 0) {
        throw new NotFoundError("Users not found");
      }
      res.status(200).json({
        status: 200,
        message: "Users retrieved successfully",
        data: users,
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

  async getUserById(req, res) {
    try {
      const user = await userRepository.retrieve(req.params.id);
      console.log(user);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

  async createUser(req, res) {
    try {
      const user = await userRepository.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

  async updateUser(req, res) {
    try {
      const user = await userRepository.update(req.params.id, req.body);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }

  },


  async updateSoldierMessages(req, res) {
    try {
      const updatedMessage = req.body.message || "You are a solider";
      await userRepository.updateSoldierMessages(updatedMessage);
      res.status(200).json({ message: 'Soldier messages updated successfully' });
    } catch (error) {
      console.error('Error updating soldier messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  


  async deleteUser(req, res) {
    try {
      const user = await userRepository.delete(req.params.id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(new ServerError(error));
    }
  },

  async loginUser(req, res) {
    const { id_use, password } = req.body;

    try {
      // Check user credentials (replace this with your actual logic)
      const user = await userRepository.findByCredentials(id_use, password);

      if (user) {
        res.status(200).json({
          status: 200,
          message: "Login successful",
          // data: user,
          data: {
            id_use: user.id_use,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            type_user: user.type_user,
            status_ability: user.status_ability,
            image: user.image,
            email: user.email,
            expoPushToken: user.expoPushToken,
          },
        });
      } else {
        throw new NotFoundError("Invalid credentials");
      }
    } catch (error) {
      console.error(`Error during login: ${error.message}`);
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



};
