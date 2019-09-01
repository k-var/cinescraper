const cheerio = require("cheerio");
const request = require("request");
const _ = require("lodash");

const tamilmv = () => {
  return new Promise((resolve, reject) => {
    //tamil web hd/bluray
    var tamilWebHD = `https://www.tamilmv.bid/index.php?/forums/forum/11-web-hd-itunes-hd-bluray/`;
    tamilWebHD = encodeURI(tamilWebHD);

    var tamilWebHDOptions = {
      method: "GET",
      url: tamilWebHD,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
      }
    };

    // //tamil hdrips/brrips
    // var tamilRips = `https://www.tamilmv.bid/index.php?/forums/forum/12-hd-rips-dvd-rips-br-rips`;
    // tamilRips = encodeURI(tamilRips);

    // var tamilRipsOptions = {
    //   method: "GET",
    //   url: tamilRips,
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
    //   }
    // };

    // //telugu web hd/bluray
    // var teluguWebHD = `https://www.tamilmv.bid/index.php?/forums/forum/24-web-hd-itunes-hd-bluray/`;
    // teluguWebHD = encodeURI(teluguWebHD);

    // var teluguWebHDOptions = {
    //   method: "GET",
    //   url: teluguWebHD,
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
    //   }
    // };

    // //telugu hdrips
    // var teluguRips = `https://www.tamilmv.bid/index.php?/forums/forum/25-hd-rips-dvd-rips-br-rips/`;
    // teluguRips = encodeURI(teluguRips);

    // var teluguRipsOptions = {
    //   method: "GET",
    //   url: teluguRips,
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
    //   }
    // };

    // //hindi web hd/bluray
    // var hindiWebHD = `https://www.tamilmv.bid/index.php?/forums/forum/24-web-hd-itunes-hd-bluray/`;
    // hindiWebHD = encodeURI(hindiWebHD);

    // var hindiWebHDOptions = {
    //   method: "GET",
    //   url: hindiWebHD,
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
    //   }
    // };

    // //hindi hdrips
    // var hindiRips = `https://www.tamilmv.bid/index.php?/forums/forum/25-hd-rips-dvd-rips-br-rips/`;
    // hindiRips = encodeURI(hindiRips);

    // var hindiRipsOptions = {
    //   method: "GET",
    //   url: hindiRips,
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
    //   }
    // };

    try {
      var tamilWebLinks = [];
      //tamil web
      request(tamilWebHDOptions, function(err, response, body) {
        if (err) reject(err);

        const $ = cheerio.load(body);

        tamilWebLinks = $("div.ipsfocusBox")
          .find("li.ipsDataItem ipsDataItem_responsivePhoto")
          .text();
      });

      resolve(tamilWebLinks);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = tamilmv;
