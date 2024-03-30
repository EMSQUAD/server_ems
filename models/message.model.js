const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    id_use: { type: Number, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String }, 
    createdAt: { type: Date, default: Date.now },
// Added field for image
    // You can add more fields as needed
  },
  {
    collection: "coll-ems-messages",
    versionKey: false
  }
);

module.exports = model("Message", messageSchema);
