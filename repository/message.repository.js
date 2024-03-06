const MongoStorage = require('../db/mongostorage');

module.exports = class MessageRepository {
    constructor() {
        if (
            process.env.DB_HOST &&
            process.env.DB_USERNAME &&
            process.env.DB_PASSWORD
        ) {
            this.storage = new MongoStorage('message');
        }
    }

    async find() {
        return this.storage.find();
    }

    async retrieve(id) {
        return this.storage.findByIdMessage(id);
    }

    async create(message) {
        return this.storage.create(message);
    }

    async update(id, message) {
        return this.storage.update(id, message);
    }

    async delete(id) {
        return this.storage.delete(id);
    }
};
