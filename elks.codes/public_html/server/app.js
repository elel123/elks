#!/usr/bin/env nodejs

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const mongoose = require("mongoose");
const session = require('express-session')
const config = require("./config");

// MongoDB Connection via Mongoose
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(config.db.uri);
mongoose.connection.once("open", async () => {
  console.log("Established connection to MongoDB.");
});

port = config.app.port;

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({methods:["GET", "POST", "PUT", "DELETE", "OPTIONS"]}));
app.use(session({ secret: config.session.secret}))

// Routes
app.use("/api/static", require("./routes/static"));
app.use("/api/performance", require("./routes/performance"));
app.use("/api/activity", require("./routes/activity"));
app.use("/user", require("./routes/user"));
app.use("/jwt", require("./routes/jwt"));

// retrieve the unique session id for this user (auto set as a cookie)
app.get('/session', function(req, res) {

  return res.status(200).json(req.session.id || 'none');
});

app.get('/', function(req, res) {
  res.status(200).json({ message: "Welcome to the Node.js Express root"});
});

//Create the server with the express app
app.set('port', port);
const server = http.createServer(app);

server.listen(port, function() {
  console.log(`Listening to requests on port ${port}`);
});
