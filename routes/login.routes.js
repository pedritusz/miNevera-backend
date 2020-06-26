let express = require('express');
let app = express();
let bcrypt = require('bcryptjs'); // encripta y compara contraseña
let jwt = require('jsonwebtoken'); // crea token y lo descifra
let user = require('../schemas/user.schema');
let SEED = require('../config/constatants').SEED;// palabra secreta para generar token
let TIMETOKEN =     require('../config/constatants').TIMETOKEN // tiempo que tarda en expirar el token


app.post('/',(req,res)=>{
    let body = req.body 
    console.log(body)
    if(!req){
        
        return res.status(404).json({
            ok:false,
            message: 'require body',
        });

    };
    user.find({email:body.email},(err,userdb)=>{
        userdb = userdb[0];
        if(err){

            return res.status(500).json({
                
                ok:false,
                message: 'could not get the data from the data base',
                error:err,

            })

        };
        if(!userdb || userdb === []){

            return res.status(404).json({
         
                ok:false,
                message: 'incorrect email or password',

            })

        }
        
        
        let okPass = bcrypt.compareSync(body.password,userdb.password);
        
        if(okPass){
            
            let userToken = jwt.sign({user:userdb},SEED,{expiresIn:TIMETOKEN})

            res.status(200).json({
                
                ok:true,
                token:userToken

            })

        }else{

            return res.status(404).json({

               ok:false,
               message: 'incorrect email or password',

            })

        }


    })


})

module.exports = app;