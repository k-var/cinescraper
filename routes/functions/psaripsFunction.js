// Load Item model
const Item = require("../../models/Item");
const psarips = require("../sites/psarips");
const sendPushMsg = require("./pushbullet");
const getImg = require("./getImg");

var metaName;

const psaripsFunction = () => {
  console.log("Now running psaripsFunction");
  psarips()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        Item.findOne({ name: name }).then(item => {
          if (item) {
            //throw an error
            console.log("PSARips error: Link name exists!");
          } else {
            if (name.includes("(")) {
              metaName = name.split("(")[0];
            } else if (!name.includes("(")) {
              metaName = name.split("=>")[0];
            }
            getImg(metaName)
              .then(res => {
                var imgSrc;
                if (res !== null) {
                  imgSrc = "https://image.tmdb.org/t/p/original" + res;
                } else {
                  imgSrc = "null";
                }
                const newItem = { name: name, link: links[name], img: imgSrc };
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
              })
              .catch(err => console.log(err));
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = psaripsFunction;
