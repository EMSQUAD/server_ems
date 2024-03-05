
const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    id_use: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    type_user: { type: String, required: true },
    password: { type: String, required: true },
    status_ability: { type: String, required: true },
    certifications: { type: String },
    image: { type: String },
    expoPushToken: { type: String },

  },{
  
   collection: "coll-ems-user",versionKey: false  },); 
  
module.exports = model("User", userSchema);
