const express = require("express");
const app = express(); // This creates a new Express server
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const bodyParser = require('body-parser'); //parses the JSON we send to the frontend 

app.get("/", (req, res) => res.send("Hello Young World"));
// setups a route so that we can render some information on our page

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


const port = process.env.PORT || 5000; // tells our app which port to run on
app.listen(port, () => console.log(`Server is running on port ${port}`));
// tells Express to start a socket and listen for connections on the path and
// will log a success message to the console when our server is running 
// successfully

app.use("/api/users", users);
app.use("/api/tweets", tweets);
// Tells Express to use the imported users and tweets route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware for the body parser 