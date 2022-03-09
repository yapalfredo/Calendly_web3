const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const { Client } = require("twilio/lib/twiml/VoiceResponse");
const dotenv = require("dotenv").config();

const app = express();
const PORT = 3100;

//This application will receive JSON data
app.use(bodyParser.json());

//start the server on port 3100
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// set up twilio client
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

//process a GET request to http://localhost:3100/hello
app.get("/hello", (request, response) => {
  console.log(request.body);
  response.send("HI!");
});

app.post("/webhook", (request, response) => {
  console.log(request.body);
  const activity = request.body.activity;
  const message = `💰💰💰 ${activity[0].fromAddress} paid you ${activity[0].value} ETH. https://goerli.etherscan.io/tx/${activity[0].hash} 💰💰💰`;

  client.messages
    .create({
      body: message,
      from: process.env.FROM_PHONE,
      to: process.env.TO_PHONE,
    })
    .then((message) => console.log(message.sid));

  response.status(200).end;
});
