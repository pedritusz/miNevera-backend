let express = require('express');
let mongoose = require('mongoose');
let routes = require('./routes/index.routes')
let bodyParse = require('body-parser')

let app = express();

//cors

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE")
    next();
  });
  

//body parse config

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
//mongose config
mongoose.connection.openUri('mongodb://localhost:27017/MiNeveraDB',(err,res)=>{
    if(err) console.log('error')
    if(res) console.log('connect')
})



app.use(routes)


app.listen(3002,()=>{
    console.log('escuchando puerto 3002')
})