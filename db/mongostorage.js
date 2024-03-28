const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const path = require("path");

class MongoStorage extends EventEmitter {
  constructor(entity) {
    super();
    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);
    this.model = require(path.join(
      __dirname,
      `../models/${this.entityName}.model`
    ));
    this.connect();
  }

  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose
      .connect(connectionUrl)
      .then(() => console.log(`Connected to ${this.entityName} collection`))
      .catch((err) => {
        console.error(
          `Connection error to ${this.entityName} collection: ${err}`
        );
        process.exit(1);
      });
  }

  async find(query = {}) {
    try {
      return await this.model.find(query);
    } catch (error) {
      console.error("Error in find method:", error);
      throw error;
    }
  }

  async findOne(query = {}) {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      console.error("Error in findOne method:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const user = await this.model.findOne({ id_use: id });
      return user;
    } catch (error) {
      console.error(`Error in findById method: ${error.message}`);
      throw error;
    }
  }


  async findByIdMessage(id) {
    try {
      const numericId = parseInt(id);
      const message = await this.model.findOne({ id_use: numericId });
  
      return message;
    } catch (error) {
      console.error(`Error in findByIdMessage method: ${error.message}`);
      throw error;
    }
  }
  
  

  async create(data) {
    try {
      const newUser = new this.model(data);
      return await newUser.save();
    } catch (error) {
      console.error("Error in create method:", error);
      throw error;
    }
  }

  async update(id, updatedUser) {
    try {
      const numericId = parseInt(id);
      const user = await this.model.findOneAndUpdate(
        { id_use: numericId },
        updatedUser,
        {
          new: true,
        }
      );

      return user;
    } catch (error) {
      console.error(`Error in update method&&&&: ${error.message}`);
      throw error;
    }
  }

  // async updateMessage(updatedMessage) {
  //   try {
  //     const filter = { type_user: "Solider" };
  //     const update = { message: updatedMessage };
  //     const result = await this.model.updateMany(filter, update);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(`Error in updateMessage method: ${error.message}`);
  //     throw error;
  //   }
  // }
  async updateMany(filter, update) {
    try {
      return await this.model.updateMany(filter, update);
    } catch (error) {
      console.error(`Error in updateMany method: ${error.message}`);
      throw error;
    }
  }
  
  async delete(id) {
    try {
        const numericId = parseInt(id);
        return await this.model.findOneAndDelete({ id_use: numericId });
    } catch (error) {
        console.error("Error in delete method:", error);
        throw error;
    }
}

///message
async findAllByIdUse(idUse) {
  return this.storage.find({ id_use: idUse }); 
}

}

module.exports = MongoStorage;
