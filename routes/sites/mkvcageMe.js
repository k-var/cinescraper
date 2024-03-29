const cheerio = require("cheerio");
var requester = require("request");
const cloudscraper = require("cloudscraper").defaults({ requester: requester });

var url;
var options = {};
var linksObject = {};
var imgObject = {};

const mkvcageMe = () => {
  return new Promise((resolve, reject) => {
    url = `https://www.mkvcage.me`;
    url = encodeURI(url);

    var options = {
      uri: url,
      jar: requester.jar(), // Custom cookie jar
      headers: {
        // User agent, Cache Control and Accept headers are required
        // User agent is populated by a random UA.
        "User-Agent":
          "Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36",
        "Cache-Control": "private",
        Accept:
          "application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5"
      },
      // Cloudscraper automatically parses out timeout required by Cloudflare.
      // Override cloudflareTimeout to adjust it.
      cloudflareTimeout: 5000,
      // Reduce Cloudflare's timeout to cloudflareMaxTimeout if it is excessive
      cloudflareMaxTimeout: 30000,
      // followAllRedirects - follow non-GET HTTP 3xx responses as redirects
      followAllRedirects: true,
      // Support only this max challenges in row. If CF returns more, throw an error
      challengesToSolve: 3,
      // Remove Cloudflare's email protection, replace encoded email with decoded versions
      decodeEmails: false,
      // Support gzip encoded responses (Should be enabled unless using custom headers)
      gzip: true
      // Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
    };

    try {
      cloudscraper.get(options, function(error, response, body) {
        if (error) reject(error);
        try {
          if (!body) reject("MkvCage.me Body is undefined");
          const $ = cheerio.load(body);

          $("#main")
            .find("h2.entry-title")
            .each((j, element) => {
              linksObject[$(element).text()] = $(element)
                .find(">a")
                .attr("href");
            });

          $("#main")
            .find("article.clearfix")
            .each((j, element) => {
              var name = $(element)
                .find("h2.entry-title")
                .text();
              var img = $(element)
                .find("img.aligncenter")
                .attr("src");
              imgObject[name] = img;
            });

          var updateObject = {
            hrefLinks: linksObject,
            imgLinks: imgObject
          };
          var arr = updateObject;

          resolve(arr);
        } catch (error) {
          console.log(error);
          if (error) reject(error);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = mkvcageMe;
