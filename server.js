const mongoose = require("mongoose");
const moment = require("moment");

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
const psaripsFunction = require("./routes/functions/psaripsFunction");
const ytspmFunction = require("./routes/functions/ytspmFunction");
const ytsltFunction = require("./routes/functions/ytsltFunction");

var time = moment().format("h:mm:ss a");
var nexttime = moment().add(15, "minutes");

console.log("Server started at: " + time);
console.log(
  "CineBot will be activated at: " + moment(nexttime).format("h:mm:ss a")
);

// call site scrape functions
setInterval(() => {
  time = moment().format("h:mm:ss a");
  console.log("CineBot was activated at: " + time);
  console.log(
    "CineBot will be activated again at: " +
      moment(nexttime).format("h:mm:ss a")
  );
  paheInFunction();
  mkvcageFunction();
  mkvcageMeFunction();
  threeHundredFunction();
  psaripsFunction();
  ytspmFunction();
  ytsltFunction();
}, 9000000);
