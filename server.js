const mongoose = require("mongoose");

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch(err => console.log(err));

//The following sites functions are used to scrape the film sites and update the linkhub database links collection
//import sites scrape functions
const paheInFunction = require("./routes/functions/paheInFunction");
const mkvcageFunction = require("./routes/functions/mkvcageFunction");
const mkvcageMeFunction = require("./routes/functions/mkvcageMeFunction");
const threeHundredFunction = require("./routes/functions/threeHundredFunction");

// call site scrape functions
setInterval(() => {
  paheInFunction();
  mkvcageFunction();
  mkvcageMeFunction();
  threeHundredFunction();
}, 900000);
