const cheerio = require("cheerio");
const request = require("request");

var url;
var options = {};

const psarips = () => {
  return new Promise((resolve, reject) => {
    url = `https://psarips.eu`;
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

      var title = {};
      var update = {};
      $("section.content")
        .find(" h2.post-title > a")
        .each((j, element) => {
          title[$(element).text()] = $(element).attr("href");
        });

      $("section.content")
        .find(" p.caption")
        .each((k, element) => {
          update[Object.keys(title)[k] + " => " + $(element).text()] =
            title[Object.keys(title)[k]];
        });

      resolve(update);
    });
  });
};

module.exports = psarips;
