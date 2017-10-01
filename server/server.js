var config = require('../webpack.config')
var express = require('express');
var path = require('path');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var request = require('request');
var keys = require('../config.json');

var app = express();
var port = 3000;
//Python server port = 5000

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.get("/", function(req, res) {
  res.sendFile(path.resolve('../client/index.html'));
});

app.get("/getPrompts", function(req, res) {
  res.json({"subreddit": {
    "Prompt1":"Scary",
    "Prompt2":"Funny",
    "Prompt3":"SciFi"
  }});
});

app.get("/songChosen", function(req, res) {
  request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  res.send('hello world');
});

app.post("/sendSong", function(req, res) {
  console.log(JSON.stringify(req.body));
  request.post('http://localhost:5000/SingSong',
  req.body,
  function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.log("Express server listening on port", port);
  }
});
