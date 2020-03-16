// ckecks wheather a given string consists of valid input 
  // it is a function that takes in an input and retruns a boolean determining 
  // if it is a string 
  
const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
  // boolean determining if input is a non-empty string
  // (.trim takes all spaces off of the end of a string)
};

module.exports = validText; 