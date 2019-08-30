// Load User model
const Endpoint = require("../../models/Endpoint");

const updateTime = (nowTime, nextTime) => {
  const filter = { name: "cinebot_last_ran_at" };
  const update = { url: nowTime.toString() };
  Endpoint.findOneAndUpdate(filter, update, {
    new: true
  })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });

  const filterTwo = { name: "cinebot_next_run_at" };
  const updateTwo = { url: nextTime.toString() };
  Endpoint.findOneAndUpdate(filterTwo, updateTwo, {
    new: true
  })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = updateTime;
