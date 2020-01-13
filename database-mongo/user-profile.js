var Promise = require("bluebird");
const mongoose = require("mongoose");

let user_profileSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  _userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  birthDate: String,
  imgUrl: String,
  about: String,
  attendedEvents: [Object]
});

module.exports = mongoose.model("user_profile", user_profileSchema);
