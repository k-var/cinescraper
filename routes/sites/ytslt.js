const cheerio = require("cheerio");
var requester = require("request");
const cloudscraper = require("cloudscraper").defaults({ requester: requester });

var url;

const ytslt = () => {
  return new Promise((resolve, reject) => {
    url = `https://yts.lt/browse-movies`;
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

    cloudscraper.get(options, function(error, response, body) {
      if (error) reject(error);
      try {
        if (!body) reject("yts.lt Body is undefined");
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
              ] = href;
            }
          });

        resolve(title);
      } catch (error) {
        console.log(error);
        if (error) reject(error);
      }
    });
  });
};

module.exports = ytslt;
