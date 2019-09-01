// Load Item model
const Item = require("../../models/Item");
const tamilWeb = require("../sites/tamilmv/tamilWeb");
const tamilRips = require("../sites/tamilmv/tamilRips");
const teluguWeb = require("../sites/tamilmv/teluguWeb");
const teluguRips = require("../sites/tamilmv/teluguRips");
const hindiWeb = require("../sites/tamilmv/hindiWeb");
const hindiRips = require("../sites/tamilmv/hindiRips");
const sendPushMsg = require("./pushbullet");

const tamilmvFunction = () => {
  console.log("Now running tamilmvFunction");
  //tamil web
  tamilWeb()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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

  //tamil rips
  tamilRips()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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

  //telugu web
  teluguWeb()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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

  //telugu rips
  teluguRips()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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

  //hindi web
  hindiWeb()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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

  //hindi rips
  hindiRips()
    .then(links => {
      var namesArray = Object.keys(links);
      namesArray.forEach((name, index) => {
        const newItem = { name: name, link: links[name] };
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
};

module.exports = tamilmvFunction;
