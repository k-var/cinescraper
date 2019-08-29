const cheerio = require("cheerio");
const request = require("request");

var url;
var options = {};
var linksObject = {};

const paheIn = () => {
  return new Promise((resolve, reject) => {
    url = `https://pahe.in`;
    url = encodeURI(url);

    options = {
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
      }
    };

    request(options, function(err, response, body) {
      if (err) reject(err);

      const $ = cheerio.load(body);

      $(".cat-box-content")
        .find("> .item-list > .post-box-title")
        .each((j, element) => {
          linksObject[$(element).text()] = $(element)
            .find(">a")
            .attr("href");
        });
      var arr = linksObject;

      resolve(arr);
    });
  });
};

module.exports = paheIn;
