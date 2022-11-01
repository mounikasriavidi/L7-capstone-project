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

app.use(express.static(__dirname ));

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
  res.sendFile(__dirname + "/todo.html");
});

app.get("/login_page", (req, res) => {
  const uname = req.query.uname;
  const pwd = req.query.pwd;

  db.collection("students")
      .where("uname", "==", uname)
      .where("pwd", "==", pwd)
      .get()
      .then((docs) => {
          if (docs.size > 0) {
              res.sendFile(__dirname+"/todo.html");
              
          }else {
              res.sendFile(__dirname+"/signup.html");
          }
      });
});







app.listen("3000", function () {
  console.log("Hey i started in the port 3000");
});