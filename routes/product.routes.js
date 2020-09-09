let express = require('express');
let app = express();
let productSchema = require('../schemas/product.schema');
let checkToken = require('../middlewares/checkToken.mw');
let userSchema = require('../schemas/user.schema')

app.get('/',(req, res) => {
    let userQuery = req.user;

//comprovar si existe el usuario que hace la peticion
    userSchema.find({_id : userQuery}, (err, user) => {
        
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })

        }
        if (user === []) {
            res.status(500).json({
                ok: false,
                message: 'this user not exist',
            })
        }
    })
// pedir todos los productos del usuario
    productSchema.find(/* { user : userQuery } */ (err, products) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            })

        }
        
        res.status(200).json({
            ok: true,
            products
        })
    })

})

app.post('/',(req,res)=>{

    let body = req.body;
    let newProduct = new productSchema({

        name : body.name,
        user: body.user,
        price : body.price,
        commerce : body.commerce,
        type: body.type,
        usual : body.casual,
        availableStock : body.availableStock,
        desiredStock : body.desiredStock,
        unitOfMesurement : body.unitOfMesurement
    
    })
//console.log(newProduct,'body=>',body.name)
    newProduct.save((err,createdProduct)=>{
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok:true,
            createdProduct
        })
    })
})
module.exports = app

/* productSchema.createCollection().then(function (collection) {
    console.log('Collection is created!');
}); */