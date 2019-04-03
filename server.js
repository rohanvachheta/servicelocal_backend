require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { serviceprovider } = require("./models/ServiceProvider");
var { report } = require("./models/report_of_service");
var { payment } = require("./models/Payment");
var { live } = require("./models/LiveStatus");
var { review } = require("./models/ReviewSchema");
var { request } = require("./models/RequestSchema");
var { news } = require("./models/News");
var { towing } = require("./models/towing_report");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

// POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password", "type"]);
  var user = new User(body);

  user
    .save()
    .then(async doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users", async (req, res) => {
  let a = await User.find();
  res.send(a);
});

app.post("/usersget", async (req, res) => {
  var body = _.pick(req.body, ["email"]);
  var user = await User.find({ email: body.email });
  var sennd = { send: user };
  // console.log(sennd);

  res.send(sennd);
});

app.post("/service", (req, res) => {
  var body = _.pick(req.body, [
    "Userid",
    "address",
    "loc",
    "location",
    "services",
    "name"
  ]);
  body.Userid = ObjectID(req.body.Userid);
  var service = new serviceprovider(body);
  service.save().then(() => {
    res.send(service);
  });
});

app.get("/service", async (req, res) => {
  var a = await serviceprovider.find({});
  res.send(a);
});
app.get("/service_provider_get", async (req, res) => {
  // var id =req.id;

  serviceprovider
    .find({
      //  "Userid":{
      //   "_id": "5c41baac7310b8139494f2fd"
      //  }
    })
    .populate("Userid")
    .exec(function(err, doc) {
      res.send(doc);
    });
});

app.post("/payment", async (req, res) => {
  var body = _.pick(req.body, [
    "location",
    "User_id",
    "service_provider",
    "status",
    "paymentmoney"
  ]);
  body.Userid = ObjectID(req.body.Userid);
  body.service_provider = ObjectID(req.body.service_provider);
  var pay = new payment(body);
  var s = pay.save();
  res.send(pay);
});

app.post("/ass", async (req, res) => {
  var updateObj = { show: true };
  var requestid = req.body.requestid;
  request.findByIdAndUpdate(requestid, updateObj, (err, model) => {
    res.send(model);
  });
});

app.get("/report", async (req, res) => {
  report
    .find({})
    .populate("User_id service_provider payment")
    .exec(function(err, doc) {
      res.send(doc);
    });
});

app.post("/review", async (req, res) => {
  var body = _.pick(req.body, [
    "towing",
    "User_id",
    "service_provider",
    "payment",
    "review"
  ]);

  body.Userid = ObjectID(req.body.Userid);
  body.service_provider = ObjectID(req.body.service_provider);
  body.towing = ObjectID(req.body.towing);
  body.payment = ObjectID(req.body.payment);
  var pay = new review(body);
  var s = pay.save();
  res.send(pay);
});

app.get("/review", async (req, res) => {
  var doc = await review.find({});
  res.send(doc);
});

app.post("/request", async (req, res) => {
  var body = _.pick(req.body, [
    "User_id",
    "service_provider",
    "name",
    "address",
    "email",
    "Mobile",
    "vehicleNumber",
    "vehiclesesrvicename",
    "serviceExpectedDate",
    "serviceExpectedTime"
  ]);

  body.Userid = ObjectID(req.body.Userid);
  body.service_provider = ObjectID(req.body.service_provider);
  var pay = new request(body);
  var s = await pay.save();
  body.requestid = pay._id;
  var pay = new report(body);
  var s = await pay.save();
  res.send(pay);
});

app.post("/report", async (req, res) => {
  var body = _.pick(req.body, ["User_id"]);

  body.requestid = ObjectID(req.body.requestid);
  body.Userid = ObjectID(req.body.Userid);
  body.service_provider = ObjectID(req.body.service_provider);
  body.towing = ObjectID(req.body.towing);
  body.payment = ObjectID(req.body.payment);
  var pay = new report(body);
  var s = await pay.save();
  console.log(body);
  res.send(body);
});

app.get("/request", async (req, res) => {
  var doc = await request.find({});
  var a = { android: doc };
  res.send(a);
});

app.post("/live", async (req, res) => {
  var body = _.pick(req.body, [
    "location",
    "service_provider",
    "User_id",
    "status",
    "requestschema"
  ]);

  body.requestschema = ObjectID(req.body.requestschema);
  body.Userid = ObjectID(req.body.Userid);
  body.service_provider = ObjectID(req.body.service_provider);
  var pay = new live(body);
  var s = pay.save();
  res.send(pay);
});

app.get("/live", async (req, res) => {
  var doc = await live.find({});
  res.send(doc);
});

app.post("/newsupload", async (req, res) => {
  var body = _.pick(req.body, [
    "location",
    "service_provider",
    "show",
    "creator",
    "content_title",
    "content",
    "photolink"
  ]);
  body.service_provider = ObjectID(req.body.service_provider);
  var newsd = new news(body);
  var uplod = await newsd.save();
  res.send(uplod);
});

app.post("/newsuploadcategory", async (req, res) => {
  var body = _.pick(req.body, ["location"]);
  body.location = body.location.toLowerCase();
  var uploda = await news.find({
    location: body.location
  });
  res.send(uploda);
});

app.post("/servicesnearBy", async (req, res) => {
  var location = req.body.location;
  location = location.toLowerCase();
  var includers = await serviceprovider.find({
    location: location
  });

  res.send(includers);
});

app.get("/news", async (req, res) => {
  var doc = await news.find({});
  res.send(doc);
});

app.post("/showyourlive", async (req, res) => {
  var userid = req.body.userid;

  var r = await request
    .find({
      User_id: userid,
      show: true
    })
    .sort({ created_at: -1 })
    .populate("User_id service_provider")
    .exec(function(err, doc) {
      res.send(doc);
    });
});
app.post("/showyourall", async (req, res) => {
  var userid = req.body.userid;

  var r = await request
    .find({
      User_id: userid
    })
    .sort({ created_at: -1 })
    .populate("User_id service_provider")
    .exec(function(err, doc) {
      res.send(doc);
    });
});

app.post("/yourequestservice", async (req, res) => {
  var service_provider = req.body.service_provider;

  var r = await request
    .find({
      service_provider: service_provider,
      show: false
    })
    .populate("User_id service_provider")
    .exec(function(err, doc) {
      res.send(doc);
    });
});

app.post("/acp", async (req, res) => {
  var requestid = req.body.requestid;
  requestid = ObjectID(req.body.requestid);
  // var pay= new live(body);
  // var LiveStatus=await pay.save();
  request.findOneAndUpdate(
    { _id: requestid },
    { $set: { show: true } },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);

      res.send(doc);
    }
  );
});

app.post("/idfrommail", async (req, res) => {
  var email = req.body.email;
  var gett = await User.findOne({ email: email });
  res.send(gett);
});

app.post("/idfrommailsec", async (req, res) => {
  var userid = req.body.userid;
  var gett = await serviceprovider.find({ Userid: userid });
  var sennd = { send: gett };
  res.send(sennd);
});

app.post("/idfrommailsec2", async (req, res) => {
  var userid = req.body.userid;
  var gett = await User.find({ _id: userid });
  var sennd = { send: gett };
  res.send(sennd);
});

// app.post("/usersget", async (req, res) => {
//   var body = _.pick(req.body, ["email"]);
//   var user = await User.find({ email: body.email });
//   var sennd = { send: user };
//   // console.log(sennd);

//   res.send(sennd);
// });

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
