var express = require('express');
var app = express();
var port = process.env.port || 3000;

var bodyParser = require('body-parser');
var cors = require('cors');

var clientController = require('./server/controller/ClientController')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

app.use("/api/clients", clientController);

app.listen(port, function() {
  var datetime = new Date();
  var message = "API running at localhost:" + port + "\nStarted at: " + datetime;
  console.log(message);
});