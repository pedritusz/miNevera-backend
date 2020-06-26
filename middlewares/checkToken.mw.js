let jwt = require('jsonwebtoken');
let SEED = require('../config/constatants').SEED;
let userSchema = require('../schemas/list.schemas.js')

exports.checkToken =  function(req,res,next){

    var token = req.query.token;

    jwt.verify(token,SEED,(err, decoded)=>{

        if(err){
            return res.status(404).json({
                ok:false,
                message: 'token denied',
                error:err
            })
        }

        
        Console.log('verificar contenido de decoded en el middleware',decoded);
        userSchema.findById(decoded._id,(err,user)=>{
            if(err){
                console.log('error desde midelware')
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            if(user === []){
                console.log('error desde middleware usuario vacio')
                return res.status(400).json({
                    ok:false,
                    message: 'this user not exist'
                })
            }
        })
        req.user = decoded;
        
        next()
    })


}