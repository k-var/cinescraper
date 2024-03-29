const cheerio = require("cheerio");
const request = require("request");

const tamilmv = siteHost => {
  return new Promise((resolve, reject) => {
    var url = siteHost;
    url = encodeURI(url);

    var options = {
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
        var links = {};

        $("div.ipsfocusBox")
          .find("div.ipsType_break.ipsContained")
          .each((j, element) => {
            if (
              $(element)
                .find(">a")
                .text()
                .includes("ESub") &&
              ($(element)
                .find(">a")
                .text()
                .includes("720p") ||
                $(element)
                  .find(">a")
                  .text()
                  .includes("1080p"))
            ) {
              links[
                $(element)
                  .find(">a")
                  .text()
                  .replace(/[\n\t]/g, "")
              ] = $(element)
                .find(">a")
                .attr("href");
            }
          });

        resolve(links);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = tamilmv;
