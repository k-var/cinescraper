// Load Item model
const Item = require("../../models/Item");
const mkvcage = require("../sites/mkvcage");

const sendPushMsg = require("./pushbullet");

const mkvcageFunction = () => {
  console.log("Now running mkvcageFunction");
  mkvcage()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
        Item.findOne({ name: name }).then(item => {
          if (item) {
            //throw an error
            console.log("MkvCage error: Link name exists!");
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
};

module.exports = mkvcageFunction;
