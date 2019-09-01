// Load Item model
const Item = require("../../models/Item");
const tamilWeb = require("../sites/tamilmv/tamilWeb");
const sendPushMsg = require("./pushbullet");

const tamilmvFunction = () => {
  console.log("Now running tamilmvFunction");
  //tamil web
  tamilWeb()
    .then(links => {
      console.log(links);
      // var namesArray = Object.keys(links);
      // namesArray.forEach((name, index) => {
      //   const newItem = { name: name, link: links[name] };
      //   Item.findOne({ name: name }).then(item => {
      //     if (item) {
      //       //throw an error
      //       console.log("PSARips error: Link name exists!");
      //     } else {
      //       //create new item
      //       new Item(newItem)
      //         .save()
      //         .then(item => {
      //           console.log(item);
      //           sendPushMsg(item.name, item.link)
      //             .then(res => {
      //               console.log(res);
      //             })
      //             .catch(err => {
      //               console.log(err);
      //             });
      //         })
      //         .catch(err => console.log(err));
      //     }
      //   });
      // });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = tamilmvFunction;
