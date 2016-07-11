var express = require('express');
var router = express.Router();
var request = require('request');
var openWeatherId = process.env.OPENWEATHER_API_KEY;

router.get('/',(req,res)=>{
  res.render('index')
})

router.get('/getweather/:zip', function(req, res){
    request("http://api.openweathermap.org/data/2.5/weather?zip=" + req.params.zip + ",us&APPID=" + openWeatherId, function (error, response, body) {
        var data = JSON.parse(body)
        res.json(data);
    })
})

module.exports = router;