const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const path = require("path");

class MongoStorage extends EventEmitter {
  constructor(entity) {
    super();
    this.entityName = entity.charAt(0).toLowerCase() + entity.slice(1);  
    this.model = require(path.join(__dirname, `../models/${this.entityName}.model`));
    this.connect();
  }

  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log(`Connected to ${this.entityName} collection`))
      .catch(err => {
        console.error(`Connection error: ${err}`);
        process.exit(1); // Exit process on connection error
      });
  }

  async find(query = {}) {
    try {
      return await this.model.find(query);
    } catch (error) {
      console.error('Error in find method:', error);
      throw error;
    }
  }

  async findOne(query = {}) {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      console.error('Error in findOne method:', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.error('Error in findById method:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const newUser = new this.model(data);
      return await newUser.save();
    } catch (error) {
      console.error('Error in create method:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error in update method:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error in delete method:', error);
      throw error;
    }
  }
}

module.exports = MongoStorage;
