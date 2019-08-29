// Load Item model
const Item = require("../../models/Item");
const threeHundred = require("../sites/threeHundred");

const sendPushMsg = require("./pushbullet");

const threeHundredFunction = () => {
  console.log("Now running threeHundredFunction");
  threeHundred()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
        Item.findOne({ name: name }).then(item => {
          if (item) {
            //throw an error
            console.log("300mbfilms.io error: Link name exists!");
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

module.exports = threeHundredFunction;
