const request = require("request");

//The MovieDB API Key
const API_KEY = require("../../config/keys").tmdbAPIKEY;

var url;
var options = {};
var linksObject = {};

const getImg = () => {
  return new Promise((resolve, reject) => {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=arrow&page=1&include_adult=false`;
    url = encodeURI(url);

    options = {
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
      }
    };

    try {
      request(options, function(err, response, body) {
        if (err) reject(err);

        resolve(arr);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = getImg;
