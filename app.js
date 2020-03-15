const express = require("express");
const app = express(); // this creates a new Express server / app object
const db = require("./config/keys").mongoURI; 
// gets URI (Uniform Resource Identifier) from keys.js 
const mongoose = require("mongoose"); // imports mongoose dependency 

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const bodyParser = require('body-parser'); // parses the JSON we send to the frontend 

app.get("/", (req, res) => res.send("Hello Young World"));
// Puts a new route onto the app object to listen for incoming (GET, PATCH, etc) requests
// "/" is the route (root). req is a request from the server (postId, etc)
// res is sent to the frontend

mongoose // connect mongoose to the db
  .connect(db, { useNewUrlParser: true })
  // first argument is te URI second argument is a configuration object 
  .then(() => console.log("Connected to MongoDB successfully"))
  // .connect returns a promise. dispatch a message if connected 
  .catch(err => console.log(err));
  // dispatch a message if error


const port = process.env.PORT || 5000; // tells our app which port to run on
app.listen(port, () => console.log(`Server is running on port ${port}`));
// heroku might want us to listen on a different port so (process.env.PORT) 
// grabs a port variable out of the environment variables on heroku

// (app.listen) first argument is the port were gonna listen on, the second
// arument is the a callback to be invoked once it has started listening. 

// tells Express to start a socket and listen for connections on the path and
// will log a success message to the console when our server is running 
// successfully

app.use("/api/users", users);
app.use("/api/tweets", tweets);
// Tells Express to use the imported users and tweets route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// middleware for the body parser 