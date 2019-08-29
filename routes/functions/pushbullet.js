//load request
const request = require("request");

//pushbullet
const API_KEY = require("../../config/keys").pushbulletAPIKey;

const sendPushMsg = (name, link) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: "https://api.pushbullet.com/v2/pushes",
      method: "POST",
      headers: {
        "Access-Token": API_KEY,
        "Content-Type": "application/json"
      },
      json: { url: link, title: name, type: "link" }
    };
    request(options, function(err, response, body) {
      if (err) reject(err);
      resolve(body.title);
    });
  });
};

module.exports = sendPushMsg;
