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

        var title = [];
        var link_ = [];
        var urlObject = {};

        $("div.ipsWidget_inner")
          .find("strong")
          .each((j, element) => {
            var _link = $(element)
              .find(">u>a")
              .attr("href");
            if (_link) {
              link_.push(_link);
            }
          });

        const uniqueArray = _.uniq(link_);
        const matchedSites = uniqueArray.filter(link => link.includes("esub"));

        $("div.ipsWidget_inner")
          .find("span>span")
          .each((j, element) => {
            var _link = $(element)
              .find(">strong")
              .text();
            if (_link) {
              title.push(_link);
            }
          });

        const matchedTitles = title.filter(
          link => link.includes("ESub") && /\d/.test(link)
        );

        ("^https://www.tamilmv.bid/index.php?/forums/topic/+[0-9]*-");
        matchedSites.forEach(s => {
          console.log(
            s
              .replace("https://www.tamilmv.bid/index.php?/forums/topic/", "")
              .replace(/^.[0-9]*-/, "")
              .replace(/([-a-z]*[0-9]{4}\w)([a-z0-9-]*\/)/, "")
              .replace(/([-a-z#]*[0-9]{4}\w)([a-z0-9-]*)/, "")
          );
        });

        resolve({});
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = tamilmv;
