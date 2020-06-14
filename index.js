var express = require('express');
var app = express();
var path = require('path');
app.engine('html', require('ejs').renderFile);
var $http = require('http');
var request = require('request');


app.get('/beerdetails',(req,res)=>{

  request('http://starlord.hackerearth.com/beercraft', function (error, response, body) {
    if(response.statusCode == 200){
        res.send(response.body);
    }else{
      //error

      res.status(500).send();
    }
});

});

/*
app.use('/src',(req,res)=>{
  //
  res.sendFile(path.join(__dirname, 'public/home.js'));
});
*/
app.use('/src',express.static(path.join(__dirname, 'src')));

app.use('/manifest.json',(req,res)=>{
  res.sendFile(path.join(__dirname, '/manifest.json'));
});

app.use('/sw.js',(req,res)=>{
  res.sendFile(path.join(__dirname, '/sw.js'));
});

app.get('/index',(req,res)=>{
  res.render('index.html');
});
app.get('/fallback',(req,res)=>{
  res.render('fallback.html');
});

app.listen(8080,()=>{
  console.log("server started on port 9090");
});
