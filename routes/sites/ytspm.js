const cheerio = require("cheerio");
const request = require("request");

var url;
var yts;
var options = {};
var linksObject = {};

const ytspm = () => {
  return new Promise((resolve, reject) => {
    url = `https://yts.pm/browse-movies`;
    yts = "https://yts.pm";
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
        var title = {};
        $("div.container")
          .find("div.browse-movie-bottom")
          .each((j, element) => {
            var href = $(element)
              .find(">a")
              .attr("href");
            if (href) {
              title[
                $(element)
                  .find(">a")
                  .text()
                  .trim() +
                  " (" +
                  $(element)
                    .find(">div.browse-movie-year")
                    .text()
                    .trim() +
                  ")"
              ] = yts + href;
            }
          });

        resolve(title);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = ytspm;
