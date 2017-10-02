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

var prompts = [];

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.get("/", function(req, res) {
  res.sendFile(path.resolve('../client/index.html'));
});






// TODO /getStory endpoint
app.post("/getStory", function(req, res) {
  console.log("in getStory");
  // console.log(res)
  // console.log(req.body);
  // console.log(req.query)

  var id = '73jwis';
  var story = "";
  var connotation = "";
  var reply = [];

  console.log("Id: "+ id);

  request.get("http://reddit.com/comments/"+id+".json",
  function(error, response, body){
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', JSON.parse(body));
    story = JSON.parse(body)[1].data.children[1].data.body;
    console.log("******************************")
    console.log(typeof story);
    request.post(
      'http://localhost:5000/postStory',{
         json: story
     },
    function(error2, response2, body2){
     console.log('error:', error2);
     console.log('statusCode:', response2 && response2.statusCode);
     console.log('body:', body2);
     connotation = body2;
     reply.push({
      "conn" : connotation,
      "story" : story
     });
     res.send(reply);
    })

  });

});

app.get("/getPrompts", function(req, res) {
  request.get("http://reddit.com/r/writingprompts.json",
    function(error, response, body) {
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', JSON.parse(body));
      var i = 0
      var j = 0;
      var list = JSON.parse(body).data.children;
      // console.log("List: " + list);
      // console.log(list[0].data.stickied)
      while(j < 10){
        // console.log(list[0])
        // console.log(i)
        // console.log("HEREL"+list[i])
        if(!list[i].data.stickied){
          prompts.push({
            id : list[i].data.id,
            prompt : list[i].data.title
          });
          j++;
        }
        i++;
      }
      res.send(prompts);
    }
  );
});



//not needed with song -> story
app.get("/songChosen", function(req, res) {
  // get started example
  // request('http://www.google.com', function (error, response, body) {


    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  // });
  //res.send('hello world');
});

app.post("/sendSong", function(req, res) {
  console.log(req.query);

  request.post('http://localhost:6000/SingSong',
     req.query.body,
     function(error, response, body) {
       console.log('error:', error);
       console.log('statusCode:', response && response.statusCode);
       console.log('body:', body);
       return response
  });
});


// app.post("/sendTitles", function(req,res){
//   console.log(req);
//   // for(var i = 0; i < req.options.length && i < 10; i++){
//   //   prompts.push({      // made up json attributes,
//   //     id : req.body.id, // just relay what information is important
//   //     Prompt : req.body.prompt,
//   //     Passage : req.body.comments.second
//   //   })
//   // }
//   res.statusCode;
// });

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.log("Express server listening on port", port);
  }
});
