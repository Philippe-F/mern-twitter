const express = require("express");
const app = express(); // This creates a new Express server
const db = require("./config/keys").mongoURI;
console.log(db)
const mongoose = require("mongoose");

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