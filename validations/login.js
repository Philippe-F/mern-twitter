// make sure the user is passing up enough information for successful login

const Validator = require("validator");
// library of functions that validate various string inputs
const validText = require("./valid-text");
// imported function that makes sure the input is a non-empty string 

module.exports = function validateLoginInput(data) {
  // function that takes in the data object (object that takes in the email 
  // and password given to us when the user is trying to login) 
  let errors = {};

  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  // make sure the keys for email and password exist

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
    // check if email is the format of an email 
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    // check if email field is empty
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
    // check if password field is empty
  }

  return {
    // object to find out to outcome of the above function
    errors,
    isValid: Object.keys(errors).length === 0
    // isValid is checking if there is anything in the errors object. if the 
    // length of te errors object is 0 then the outcome is valid
  };
};