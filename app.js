const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(express.urlencoded());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = " ";
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit ;


  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temprature = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<br><h1> The temprature in " + query + " is " + temprature + " degrees celsius</h1>");
      res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write("<img src=" + imgUrl + ">");
    });
  });
});



app.listen(3000, function() {
  console.log("server is hosted  at port 3000");
})
