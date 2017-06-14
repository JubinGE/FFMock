// Sample node.js web app for Pluralsight Docker CI course
// For demonstration purposes only
"use strict";

var express = require("express"), app = express();
const bodyParser = require("body-parser");
const CONSUMER_SECRET = 5787752049103436313;
var port = process.env.PORT || 8080;

app.set("views", "views");
app.set("view engine", "jade");

app.use(express.static(__dirname + "/Common"));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("home", {});
});

app.post("/sftest", function(req, res) {
  console.log("Post method");
  console.log(req);

  var bodyArray = req.body.signed_request.split(".");
  var consumerSecret = bodyArray[0];
  console.log("Consumer Secret is " + consumerSecret);
  var encoded_envelope = bodyArray[1];
  var check = crypto
    .createHmac("sha256", CONSUMER_SECRET)
    .update(encoded_envelope)
    .digest("base64");
  if (check === consumerSecret) {
    console.log("Success auth");
  }
  res.render("home", {});
});
app.get("/sftest", function(req, res) {
  console.log("Get method");
  console.log(req);

  var bodyArray = req.body.signed_request.split(".");
  var consumerSecret = bodyArray[0];
  console.log("Consumer Secret is " + consumerSecret);
  var encoded_envelope = bodyArray[1];
  var check = crypto
    .createHmac("sha256", CONSUMER_SECRET)
    .update(encoded_envelope)
    .digest("base64");
  if (check === consumerSecret) {
    console.log("Success auth");
  }
  res.render("home", {});
});

app.listen(port, function(err) {
  console.log("server started on port" + port);
});
module.exports.getApp = app;
