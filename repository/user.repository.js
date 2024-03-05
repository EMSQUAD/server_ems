const MongoStorage = require('../db/mongostorage');
const mongoose = require('mongoose');
// const User = require('../models/user.model');
const { BadRequestError, ServerError } = require('../errors/error');


module.exports = class UserRepository{
  constructor() {
    
    if(
    process.env.DB_HOST &&
    process.env.DB_USERNAME &&
    process.env.DB_PASSWORD
    ){
        this.storage = new MongoStorage('user');
    }
  }

async find() {
  return this.storage.find();
}

// async retrieve(id) {
  // return this.storage.retrieve(id);
// return this.storage.findById(id);

// }



// async retrieve(id) {
//   try {
//     console.log('Repository retrieve - ID:', id);
//     const numericId = parseInt(id); // Convert the string to a number
//     return this.storage.findById(numericId);
//   } catch (error) {
//     console.error(`Error in retrieve method: ${error.message}`);
//     throw error;
//   }
// }

async retrieve(id) {
  try {
    console.log('Repository retrieve - ID:', id);
    return this.storage.findById(id);
  } catch (error) {
    console.error(`Error in retrieve method: ${error.message}`);
    throw error;
  }
}




async create(user) {
  return this.storage.create(user);
}

// async update(id, user) {
//   return this.storage.update(id, user);
// }

async update(id, user) {
  try {
    const updatedUser = await this.storage.update(id, user);

    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw new BadRequestError(error.message);
    }

    console.error(`Error in update method: ${error.message}`);
    throw error;
  }
}




async delete(id) {
  return this.storage.delete(id);
}

async findByCredentials(id_use, password) {
  try {
    const user = await this.storage.findOne({ id_use, password });
    return user;
  } catch (error) {
    console.error(`Error in findByCredentials: ${error.message}`);
    throw new ServerError('Internal Server Error');
  }
}


};