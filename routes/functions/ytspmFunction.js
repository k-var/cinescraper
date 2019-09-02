// Load Item model
const Item = require("../../models/Item");
const ytspm = require("../sites/ytspm");

const sendPushMsg = require("./pushbullet");

const getImg = require("./getImg");

var metaName;

const ytspmFunction = () => {
  console.log("Now running ytspmFunction");
  ytspm()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        Item.findOne({ name: name }).then(item => {
          if (item) {
            //throw an error
            console.log("yts.pm error: Link name exists!");
          } else {
            metaName = name.split("[")[0];

            getImg(metaName)
              .then(res => {
                var imgSrc = "https://image.tmdb.org/t/p/original" + res;
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

module.exports = ytspmFunction;
