// make sure that when new users register for application that they reqister
// with valid information
// this file hold routes and controllers 

const express = require("express");
const router = express.Router();
const validateRegisterInput = require("../../validations/register");
// makes sure the user passes up enough information for a successful register
const validateLoginInput = require("../../validations/login");
// makes sure user passes up enough information for successful login 
const bcrypt = require("bcryptjs");
// import BCrypt 
const User = require("../../models/User");
// import User model
const keys = require ("../../config/keys"); 
// secret key coming from config 
const jwt = require("jsonwebtoken");
// importing jwt module from jsonwebtoken dependency 


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
    // this function is like our users controller 
    // .findOne finds the user based on email that is passed in 
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
      // if we find the user in the db, then use the validations to 
      // send a 400 level error to let the client know that a user is already 
      // registered with thst email
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        // create the user 
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUsers.password = hash
          // set newUser.password to te newly hashed password 
          newUser.save()
          // save user to db and return a promise (user)
          .then((user) => res.json(user))
          // send user to the frontend 
          .catch(err => console.log(err)) 
          // send errors to the frontend  
        })
      });
      // (.genSalt) first argument is number of rounds to generate the salt 
      // (.genSalt) second argument is callback function that gets invoked when 
      // we finsh making the salt and are ready to continue 
      // (.hash) first argument is the thing we want to hash 
      // (.hash) second argument is the salt we get back from .genSalt
      // (.hash) third argument is invoked after the password has been hashed
      // (.hash: last argument) first argument are the errors if there are any 
      // (.hash: last argument) second argument is te newly hashed password 
      

      newUser.save()
      // save the user
      .then(user => res.send(user)
      .catch(err => res.send(err)))
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
  // grab the email and password from the request body 

  User.findOne({ email }).then(user => {
    // looks up the user by email 
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
      // if there is not a user then use the validations to send the error
      // to the frontend 
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      // pass the raw password into bcrypt and compare it against the 
      // hashed password in the db and returns a boolean value 
      if (isMatch) {
        const payLoad = {
          // create the payload we are going to send back from the db
          id: user.id,
          handle: user.handle,
          email: user.email
        }
        jwt.sign(
          // creating the jsonwebtoken 
          payLoad,
          keys.secretOrKey,
          { expiresIn: 3600 },
          //we want the jwt to expire 
          (err, token) => {
          // response sent to the frontend once we have created the jwt 
            res.json({
              success: true,
              token = "Bearer" + token 
            })
          }
        )
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
}); 





module.exports = router;