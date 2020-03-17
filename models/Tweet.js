const mongoose = require("mongoose");
// require the mongoose library 
const Schema = mongoose.Schema; 
// grab the schema object from the mongoose library so we can define the schema

const TweetSchema = new Schema({
// create Tweet schema (what it means to be a tweet)
  user: {
    // association for the tweet to a user 
    type: Schema.Types.ObjectId,
    ref: users  
    // model that we want to associate with 
  },

  text: {
    // text column 
    type: String, required: true
  },

  date: {
  // date column 
  type: Date,
  default: Date.now 
  }
});

const Tweet = mongoose.model("tweet", TweetSchema); 
// compiles a copy of the schema to create a model 

module.exports = Tweet;