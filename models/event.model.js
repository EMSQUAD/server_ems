const { Schema, model } = require("mongoose");
const eventSchema = new Schema(
  {
    id_event: { type: Number, required: true },
    name_event: { type: String, required: true },
    description: { type: String, required: true },
    sevetity: { type: String, required: true },
  },{ collection: "coll-ems-event",versionKey: false},); 


module.exports = model("event", eventSchema);

