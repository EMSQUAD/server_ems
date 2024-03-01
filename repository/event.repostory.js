const MongoStorage = require('../db/mongostorage');


module.exports = class EventRepository{
  constructor() {
    if(
    process.env.DB_HOST &&
    process.env.DB_USERNAME &&
    process.env.DB_PASSWORD
    ){
        this.storage = new MongoStorage('event');
    }
  }

async find() {
  return this.storage.find();
}

async retrieve(id) {
  return this.storage.retrieve(id);
}

async create(event) {
  return this.storage.create(event);
}

async update(id, event) {
  return this.storage.update(id, event);
}

async delete(id) {
  return this.storage.delete(id);
}

};










  
