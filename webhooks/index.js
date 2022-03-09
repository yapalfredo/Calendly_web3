const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3100;

//This application will receive JSON data
app.use(bodyParser.json());

//start the server on port 3100
app.listen(POST, () => console.log(`Running on port ${PORT}`));

//process a GET request to http://localhost:3100/hello
app.get("/hello",(request, response) =>{
    console.log(request.body);
    response.send("HI!");
});