const cheerio = require("cheerio");
const request = require("request");
const _ = require("lodash");

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

        var title = {};
        var update = [];
        const regex = new RegExp("/esub/", "g");

        $("div.ipsWidget_inner")
          .find("strong")
          .each((j, element) => {
            var _link = $(element)
              .find(">u>a")
              .attr("href");
            if (_link) {
              update.push(_link);
            }
          });

        const uniqueArray = _.uniq(update);
        const matchedSites = uniqueArray.filter(link => !link.match(regex));
        resolve(matchedSites);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = tamilmv;
