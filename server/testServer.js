var config = require('../webpack.config')
var express = require('express');
var path = require('path');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var request = require('request');

var app = express();
var port = 5000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.get("/", function(req, res) {
  res.sendFile(path.resolve('../client/index.html'));
});

app.post("/SingSong", function(req, res) {
  console.log("success?");
  console.log(JSON.stringify(req.body));
  res.send("I recieved: " + req.body);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.log("Express server listening on port", port);
  }
});
