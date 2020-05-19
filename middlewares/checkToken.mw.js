let jwt = require('jsonwebtoken');
let SEED = require('../config/constatants').SEED;


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
        
        req.user = decoded;
        next()
    })


}