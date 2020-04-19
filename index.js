let express = require('express');
let mongoose = require('mongoose');
let routes = require('./routes/index.routes')
let bodyParse = require('body-parser')

let app = express();

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