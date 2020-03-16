const mongoose = require("mongoose");
// require the mongoose library 
const Schema = mongoose.Schema;
// grab the schema object from the mongoose library so we can define the schema

const UserSchema = new Schema({
  // creates the new user schema
  handle: {
    type: String,
    required: true
    // define handle "column"
  },
  email: {
    type: String,
    required: true
    // define email "column"
  },
  password: {
    type: String,
    required: true
    // define password "column"
  },
  date: {
    type: Date,
    default: Date.now
    // define date "column"
  }
});

module.exports = User = mongoose.model("User", UserSchema);
// "User" is what we want our model to be called
// "UserSchema" is the schema we want to pass in to create the model 