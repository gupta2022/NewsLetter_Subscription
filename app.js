const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendfile(__dirname + "/signup.html")
})
app.use(express.static("public"))
app.post("/", function(req, res){
    //console.log("ho")
    var data ={
      members :[
        {email_address : req.body.EMAIL,
        status :"subscribed"
      }
      ]
    }
    var jsonData= JSON.stringify(data);
    var options={
      url: "https://us4.api.mailchimp.com/3.0/lists/b37a7754dc",
      method: "POST",
      headers:{
        "Authorization" : "Gaurav 1d4677917098cf197ab4b9de0bf86ca8"
      },
      body: jsonData,
    };
    request(options, function (error, response, body) {
      console.log(error);
      console.log(response.statusCode==200);
      if(response.statusCode!=200)
      {
        res.sendfile(__dirname+"/failure.html");
      }
      else
      {
        res.sendfile(__dirname+"/success.html");
      }
    });
    console.log(req.body.Name);
    console.log(req.body.EMAIL);
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Listening");
})
//
//
//
//
