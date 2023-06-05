// const { log } = require('console');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

    res.sendFile(__dirname + "/index.html");

            // JSON.stringify() convert object into "{"name":"Abhinav" , "fav_food":"Puri" }"
            // const object = {
            //     name : "Abhinav",
            //     fav_food : "Puri"
            // }
            // console.log(JSON.stringify(object));  
    
    // There can be only 1 res.send() method
    // But we can use res.write() method multiple time.
    // res.send("Server is running");
});

app.post('/',function(req,res){
    
    const query = req.body.cityName;
    const apikey = "caaadebf9a633df01b6ff3c69696db7d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+"&appid="+ apikey +"&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on('data',function(data){
            const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp
        const weatherDescription = weatherdata.weather[0].description

        const icon = weatherdata.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather currently " + weatherDescription + "</p>")
        res.write("<h1>The temperature at "+ query + " is " + temp + " degree Celcius.</h1>");          
        res.write("<img src=" + imageURL + ">")
        res.send()

    })
});

})

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});
