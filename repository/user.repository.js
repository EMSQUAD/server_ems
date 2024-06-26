const MongoStorage = require('../db/mongostorage');
// const User = require('../models/user.model');

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

async retrieve(id) {
  return this.storage.findById(id);
}

async create(user) {
  return this.storage.create(user);
}

async update(id, user) {
  return this.storage.update(id, user);
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

async updateSoldierMessages(updatedMessage = "You are a solider") {
  try {
    const filter = { type_user: "Solider" };
    const update = { message: updatedMessage };
    const result = await this.storage.updateMany(filter, update);
    console.log(result);
  } catch (error) {
    console.error(`Error in updateSoldierMessages method: ${error.message}`);
    throw error;
  }
}





};