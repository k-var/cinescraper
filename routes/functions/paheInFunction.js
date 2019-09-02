// Load Item model
const Item = require("../../models/Item");
const paheIn = require("../sites/paheIn");
const sendPushMsg = require("./pushbullet");
const getImg = require("./getImg");

const paheInFunction = () => {
  console.log("Now running paheInFunction");
  paheIn()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        if (name.includes("(")) {
          var metaName = name.split("(")[0];
          getImg(metaName)
            .then(res => {
              var imgSrc = "https://image.tmdb.org/t/p/original" + res;
              const newItem = { name: name, link: links[name], img: imgSrc };
              Item.findOne({ name: name }).then(item => {
                if (item) {
                  //throw an error
                  console.log("Pahe.in error: Link name exists!");
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
            })
            .catch(err => console.log(err));
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = paheInFunction;
