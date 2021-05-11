#!/usr/bin/env nodejs


const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');


const app = express();

const port = 9000;


app.use(logger('dev'));
app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({methods:["GET", "POST", "PUT", "DELETE"]}));


app.get('/', function(req, res) {
  res.status(200).json({ message: "Welcome to the Node.js Express root"});
});

app.get('/static', function(req, res) {
  res.status(200).json({ description: "Retreive every entry logged in the static table"});
});


//Create the server with the express app
app.set('port', port);
const server = http.createServer(app);

server.listen(port, function() {
  console.log(`Listening to requests on port ${port}`);
});




/*
const http = require('http');
http.createServer(function(req, res) {

  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World!\n');

}).listen(9000);

console.log('server running on port 9000');

*/
