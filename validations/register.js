// make sure the user is passing up enough information for successful register

const Validator = require("validator");
// library of functions that validate various string inputs
const validText = require("./valid-text");
// imported function that makes sure the input is a non-empty string 

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.handle = validText(data.handle) ? data.handle : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";
  // makes sure all aspects of the data exist. if they are not, then the 
  // missing value becomes an empty string 

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters";
    // validates that the handle is between 2 and 30 characters long
    // errors.handle === errors[handle] 
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
    // validates if the handle is empty
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    // validates if the email is empty 
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
    // validates if the email is in proper email format
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
    // validates if the password is empty 
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
    // validates if password is between 6 and 30 characters
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
    // validates if password2 is empty 
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
    // validates if the two password and password2 are equal to each other
  }

  return {
    // object to find out to outcome of the above function
    errors,
    isValid: Object.keys(errors).length === 0
    // isValid is checking if there is anything in the errors object. if the
    // length of te errors object is 0 then the outcome is valid
  };
};