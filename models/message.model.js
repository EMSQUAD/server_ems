const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    id_use: { type: Number, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    image: { type: String }, // Added field for image
    // You can add more fields as needed
  },
  {
    collection: "coll-ems-messages",
    versionKey: false
  }
);

module.exports = model("Message", messageSchema);
