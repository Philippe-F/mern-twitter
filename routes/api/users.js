// make sure that when new users register for application that they reqister
// with valid information
// this file hold routes and controllers 

const express = require("express");
const router = express.Router();
const validateRegisterInput = require("../../validations/register");
// makes sure the user passes up enough information for a successful register
const validateLoginInput = require("../../validations/login");
// makes sure user passes up enough information for successful login 


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post("/register", (req, res) => {
  // POST route to submit the register form to the backend 
  const { errors, isValid } = validateRegisterInput(req.body);
  // object destructuring grabs the errors and isValid functions from the req 
  // call validateRegisterInput on the request body

  if (!isValid) {
    return res.status(400).json(errors);
    // return response status of 400 if validateRegisterInput is not valid 
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Use the validations to send the error
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
    }
  });
});

router.post("/login", (req, res) => {
  // POST route to submit the login form to the backend 
  const { errors, isValid } = validateLoginInput(req.body);
  // object destructuring grabs the errors and isValid functions from the req 
  // call validateLoginInput on the request body
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      // Use the validations to send the error
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        // And here:
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
}); 

module.exports = router;