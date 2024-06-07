const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const PushNotifications = require("node-pushnotifications");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const publicVapidKey =
  "BE5rfDreS4EbBbkpJqF_QzKaeTeAX9WBB44VFL5v57vN_JdQbTKlGqyeT6dOVShNzu2bYW_TKD_jVuGKSJC4W-U"; // REPLACE_WITH_YOUR_KEY
const privateVapidKey = "8stCVUUsK5cGPJw1zPHFePFGjvslnuqqKnoWT_d15tQ"; //REPLACE_WITH_YOUR_KEY

app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  const settings = {
    web: {
      vapidDetails: {
        subject: "mailto: <serjikmousavi@gmail.com>", // REPLACE_WITH_YOUR_EMAIL
        publicKey: publicVapidKey,
        privateKey: privateVapidKey,
      },
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };

  // Send 201 - resource created
  const push = new PushNotifications(settings);

  // Create payload
  const payload = { title: "Notification from Knock" };
  push.send(subscription, payload, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  res.send("sajjad");
});
app.get("/main.js", (req, res) => {
  res.sendFile(__dirname + "/main.js");
});
app.get("/sw.js", (req, res) => {
  res.sendFile(__dirname + "/sw.js");
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
