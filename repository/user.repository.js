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
  return this.storage.retrieve(id);
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

// async updateExpoPushToken(id_use, expoPushToken) {
//   try {
//     const existingUser = await this.storage.findOne({ "id_use": id_use });

//     if (existingUser) {
//       // Update the existing user's expoPushToken
//       await this.storage.updateOne({ "id_use": id_use }, { $set: { "expoPushToken": expoPushToken } });
//     } else {
//       // Insert a new document with the expoPushToken
//       await this.storage.insertOne({ "id_use": id_use, "expoPushToken": expoPushToken });
//     }
//   } catch (error) {
//     console.error(`Error in updateExpoPushToken: ${error.message}`);
//     throw new ServerError('Internal Server Error');
//   }
// }


// test noy working
async updateMessageForAllUsers(message) {
  try {
    // Find all users
    const allUsers = await this.storage.find();

    // Update or insert message for each user
    for (const user of allUsers) {
      const existingUser = await this.storage.findOne({ "id_use": user.id_use });

      if (existingUser) {
        // Update the existing user's messages
        await this.storage.updateOne(
          { "id_use": user.id_use },
          { $set: { "messages": message } }
        );
      } else {
        // Insert a new document with the message
        await this.storage.insertOne({ "id_use": user.id_use, "messages": [message] });
      }
    }
  } catch (error) {
    console.error(`Error in updateMessageForAllUsers: ${error.message}`);
    throw new ServerError("Internal Server Error");
  }
}



};










  
