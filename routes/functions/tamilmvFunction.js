// Load Item model
const Item = require("../../models/Item");
const tamilmv = require("../sites/tamilmv");
const sendPushMsg = require("./pushbullet");

//links
// const tamilWeb =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/11-web-hd-itunes-hd-bluray";
// const tamilRips =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/12-hd-rips-dvd-rips-br-rips";
// const teluguWeb =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/24-web-hd-itunes-hd-bluray/";
// const teluguRips =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/25-hd-rips-dvd-rips-br-rips/";
// const hindiWeb =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/58-web-hd-itunes-hd-bluray/";
// const hindiRips =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/59-hd-rips-dvd-rips-br-rips/";
// const malayalamWeb =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/36-web-hd-itunes-hd-bluray/";
// const malayalamRips =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/37-hd-rips-dvd-rips-br-rips/";
// const kannadaWeb =
//   // "https://www.tamilmv.bid/index.php?/forums/forum/69-web-hd-itunes-hd-bluray/";
// const kannadaRips =
//   "https://www.tamilmv.bid/index.php?/forums/forum/70-hd-rips-dvd-rips-br-rips/";

const tamilmvLinksArray = [
  "https://www.tamilmv.bid/index.php?/forums/forum/11-web-hd-itunes-hd-bluray",
  "https://www.tamilmv.bid/index.php?/forums/forum/12-hd-rips-dvd-rips-br-rips",
  "https://www.tamilmv.bid/index.php?/forums/forum/24-web-hd-itunes-hd-bluray/",
  "https://www.tamilmv.bid/index.php?/forums/forum/25-hd-rips-dvd-rips-br-rips/",
  "https://www.tamilmv.bid/index.php?/forums/forum/58-web-hd-itunes-hd-bluray/",
  "https://www.tamilmv.bid/index.php?/forums/forum/59-hd-rips-dvd-rips-br-rips/",
  "https://www.tamilmv.bid/index.php?/forums/forum/36-web-hd-itunes-hd-bluray/",
  "https://www.tamilmv.bid/index.php?/forums/forum/37-hd-rips-dvd-rips-br-rips/",
  "https://www.tamilmv.bid/index.php?/forums/forum/69-web-hd-itunes-hd-bluray/",
  "https://www.tamilmv.bid/index.php?/forums/forum/70-hd-rips-dvd-rips-br-rips/"
];

const tamilmvFunction = () => {
  console.log("Now running tamilmvFunction");

  tamilmvLinksArray.forEach(siteLink => {
    tamilmv(siteLink)
      .then(links => {
        var namesArray = Object.keys(links);
        namesArray.forEach((name, index) => {
          const newItem = { name: name, link: links[name], img: "delete" };
          Item.findOne({ name: name }).then(item => {
            if (item) {
              //throw an error
              console.log("Tamilmv error: Link name exists!");
            } else {
              //create new item
              new Item(newItem)
                .save()
                .then(item => {
                  console.log(item);
                  sendPushMsg(item.name, item.link)
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => console.log(err));
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = tamilmvFunction;
