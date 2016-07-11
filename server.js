var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(morgan('dev'));

var openWeather = require('./controllers/open_weather_controller.js');

app.use('/',openWeather);

app.listen(port,()=>{
  console.log(port);
})