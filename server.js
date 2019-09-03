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
const mkvcageMeFunction = require("./routes/functions/mkvcageMeFunction");
const threeHundredFunction = require("./routes/functions/threeHundredFunction");
const psaripsFunction = require("./routes/functions/psaripsFunction");
const ytspmFunction = require("./routes/functions/ytspmFunction");
const ytsltFunction = require("./routes/functions/ytsltFunction");
const tamilmvFunction = require("./routes/functions/tamilmvFunction");

var time = moment().format("h:mm:ss a");
var nexttime = moment().add(15, "minutes");
var nowTime, nextTime;

console.log("Server started at: " + time);
console.log(
  "CineBot will be activated at: " + moment(nexttime).format("h:mm:ss a")
);

//time to restart
const runInterval = 900000;
const updateTime = require("./routes/functions/updateTime");

// call site scrape functions
// setInterval(() => {
//   nowTime = moment().format("h:mm:ss a");
//   next_time = moment().add(15, "minutes");
//   nextTime = moment(next_time).format("h:mm:ss a");
//   updateTime(nowTime, nextTime);
//   paheInFunction();
//   mkvcageMeFunction();
//   threeHundredFunction();
//   psaripsFunction();
//   ytspmFunction();
//   ytsltFunction();
//   tamilmvFunction();
// }, runInterval);
threeHundredFunction();
