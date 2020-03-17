const Validator = require("validator");
// library of functions that validate various string inputs
const validText = require("./valid-text"); 
// imported function that makes sure the input is a non-empty string 

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data : ""
  // check to see if text exists 

  if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
  // checking if the tweet is NOT the correct amount of characters 
  // first argument: is te data we want to validate
  // second argument: an options hash with min / max number of characters
  errors.text = "Tweet must be between 5 - 140 characters";
  }

  if (!Validator.isEmpty(data.text)) {
    errors.text = "Text fiend is required";
  }

  return {
    errors, 
    isValid: Object.keys(errors).length === 0 
  }
}
