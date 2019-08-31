const cheerio = require("cheerio");
const request = require("request");

var url;
var options = {};

const tamilmv = () => {
  return new Promise((resolve, reject) => {
    url = `https://www.tamilmv.bid/index.php`;
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

        const $ = cheerio.load(body);

        resolve({});
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = tamilmv;
