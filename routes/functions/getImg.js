const axios = require("axios");

//The MovieDB API Key
const API_KEY = require("../../config/keys").tmdbAPIKEY;

const getImg = name => {
  return new Promise((resolve, reject) => {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    url = encodeURI(url);
    axios
      .get(url)
      .then(response => {
        if (
          response.data.results[0].poster_path &&
          response.data.results[0].poster_path !== null
        ) {
          resolve(response.data.results[0].poster_path);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = getImg;
