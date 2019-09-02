// Load Item model
const Item = require("../../models/Item");
const psarips = require("../sites/psarips");
const sendPushMsg = require("./pushbullet");

const psaripsFunction = () => {
  console.log("Now running psaripsFunction");
  psarips()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name], img: "null" };
        Item.findOne({ name: name }).then(item => {
          if (item) {
            //throw an error
            console.log("PSARips error: Link name exists!");
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

module.exports = psaripsFunction;
