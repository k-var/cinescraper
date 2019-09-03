const cheerio = require("cheerio");
const request = require("request");

const getTamilmvImg = siteHost => {
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

        var imgLink = $("div.cPost_contentWrap.ipsPad")
          .find("img.ipsImage")
          .attr("src");

        resolve(imgLink);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = getTamilmvImg;
