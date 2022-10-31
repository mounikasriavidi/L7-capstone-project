const express = require("express");

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");
const request = require('request');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


const app = express();


app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});



app.get("/action_page", function (req, res){
  

var email = req.query.email;
var psw = req.query.psw;
    
//Adding new data to collection
db.collection('students').add({
    email:email,
    psw:psw
})
res.sendFile(__dirname + "/login.html");
});
app.get("/login_page", function (req, res) {
  res.sendFile(__dirname + "/hotel.html");
});
app.get("/hotel_page", function(req,res){
  const cityname = req.query.cityname;
  const countryname = req.query.countryname;
  

  

    const options = {
      method: 'GET',
      url: 'https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation',
      qs: {cityName: cityname, countryName: countryname},
      headers: {
        'X-RapidAPI-Key': '6715e1c82fmsh632e472cd16c62bp1f2cd2jsn500d6dd0b4ca',
        'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com',
        useQueryString: true
      }
    };
    
    request(options, function (error, response, body) {
      console.log(JSON.parse(body));
      if (JSON.parse(body).Response != null) {
        const hname = JSON.parse(body).name;
        const rating = JSON.parse(body).rating;
        const link = JSON.parse(body).link;
        res.render("booking", {
          name:hname,
          rating:rating,
          link:link,
        });
        res.write("<h1>working</h1>");
        // res.send("<h1>" + JSON.parse(body).Director + "</h1>");
      } else {
        res.send("SOmethig webt wtonf");
      }
    
    
      console.log(body);
    });

  });

    /*
    function (error, response, body) {
      console.log(JSON.parse(body));
      if (JSON.parse(body).Response != null) {
        const hname = JSON.parse(body).name;
        const rating = JSON.parse(body).rating;
        const link = JSON.parse(body).link;
        res.render("booking", {
          name:hname,
          rating:rating,
          link:link,
        });

        // res.send("<h1>" + JSON.parse(body).Director + "</h1>");
      } else {
        res.send("SOmethig webt wtonf");
      }
    }
  
});

})
*/





app.listen("3000", function () {
  console.log("Hey i started in the port 3000");
});