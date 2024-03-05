const { EventEmitter } = require("events");
const mongoose = require("mongoose");
const path = require("path");
const { BadRequestError, NotFoundError } = require("../errors/error");

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

  // connect() {
  //   const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  //   mongoose.connect(connectionUrl, { useNewUrlParser: true })
  //     .then(() => console.log(`Connected to ${this.entityName} collection`))
  //     .catch(err => {
  //       console.error(`Connection error to ${this.entityName} collection: ${err}`);
  //       process.exit(1); // Exit process on connection error
  //     });
  // }

  connect() {
    const connectionUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose
      .connect(connectionUrl)
      .then(() => console.log(`Connected to ${this.entityName} collection`))
      .catch((err) => {
        console.error(
          `Connection error to ${this.entityName} collection: ${err}`
        );
        process.exit(1); // Exit process on connection error
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
      if (isNaN(id)) {
        console.log("Non-numeric ID provided. Returning null.");
        return null; // or handle it differently based on your requirements
      }

      const user = await this.model.findOne({ id_use: id });
      return user;
    } catch (error) {
      console.error(`Error in findById method: ${error.message}`);
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

  async update(id, data) {
    try {
      if (id !== null && id !== undefined && !isNaN(id)) {
        const numericId = parseInt(id); // Convert the string to a number

        if (isNaN(numericId)) {
          throw new BadRequestError("Invalid user ID");
        }

        const updatedUser = await this.model.findOneAndUpdate(
          { id_use: numericId },
          data,
          { new: true }
        );

        if (!updatedUser) {
          throw new NotFoundError("User not found");
        }

        return updatedUser;
      } else {
        // New logic for updating messages for all soldiers when no ID is provided
        if (!data || !data.message) {
          throw new BadRequestError(
            "Message is required for updating messages for soldiers"
          );
        }
        console.log("Updating soldiers with message:", data.message);
        // const result = await this.model.updateMany({ type_user: 'Soldier' }, { $set: { message: data.message } });
        const soldiersBefore = await this.model.find({ type_user: "Soldier" });
        console.log("Soldiers before update:", soldiersBefore.length);

        console.log("Updating soldiers with message:", data.message);
        console.log("Query:", { type_user: "Soldier" });
        const result = await this.model.updateMany(
          { type_user: "Soldier" },
          { $set: { message: data.message } }
        );
        const soldiersAfter = await this.model.find({ type_user: "Soldier" });
        console.log("Soldiers after update:", soldiersAfter.length);

        if (!result) {
          console.log("No matching documents found for update.");
        } else {
          console.log("Update result:", result);
          console.log(
            `${result.n} documents matched, ${result.nModified} documents modified`
          );
        }

        return {
          message: `Messages updated for soldiers with "${data.message}"`,
        };
      }
    } catch (error) {
      console.error("Error in update method:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error in delete method:", error);
      throw error;
    }
  }
}

module.exports = MongoStorage;
