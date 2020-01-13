var Promise = require("bluebird");
const mongoose = require("mongoose");

let events_Schema = mongoose.Schema({
  // _id: {
  // 	type: mongoose.Schema.ObjectId,
  // 	required: true
  // },
  eventName: String,
  description: String,
  date: String,
  imgUrl: [Object],
  videos: [String],
  category: String,
  cost: String,
  planId: String,
  organizerId: String,
  planId: String,
  comments: [Object],
  rating: [String]
});

let Events = mongoose.model("events", events_Schema);

let save = (event, callback) => {
  Events.create(event, callback);
};

let findAll = callback => {
  Events.find({}, callback);
};

let findOne = (event, callback) => {
  Events.find(event, callback);
};
module.exports.events = Events;
module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
