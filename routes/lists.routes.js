let express = require('express');
let app = express();
let listSchema = require('../schemas/list.schemas.js');
let productSchema = require('../schemas/product.schema.js');


app.get('/', (req, res) => {

    user = req.query.user || req.user._id;



    if (!req) {
        res.status(400).json({
            ok: false,
            message: 'no data has been received to consult the list'
        })
    }

    listSchema.find({ user: user }, (err, lists) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            lists

        })
    })




})

app.post('/', (req, res) => {
    let body = req.body;
    let queryProducts = body.products
    //console.log(body)
    let newList = {
        name: body.name,
        user: body.user,
        Products: body.products,
        shoppingCart: body.shoppinCart
    }

    if (queryProducts !== []) {
       
       queryProducts.forEach((queryIdProduct) => {
           productSchema.find({_id:queryIdProduct},(err,dbProduct)=>{
            if (err) {

                if(err.name === 'CastError'){
                    err.message = 'there are products that do not exist in your fridge'
                }
                res.status(500).json({
                    ok: false,
                    err
                })
            }
            if(dbProduct === []){
                res.status(400).json({
                    ok:false,
                    massage:'there are products that do not exist in your fridge'
                })
            }
           })
       });
        
    }
//console.log('products...................................................')
    
   // console.log(newList)
    listSchema.create(newList, (err, list) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            list
        })
    })



})

module.exports = app
/* name:{type:String,required:[true,'name of list id required'],uniqued},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:[true,'no have a user']},
    products:{type:[mongoose.Types.ObjectId],ref:'product',required:false,default:[]},
    shoppingCart:{type:[],required:false,default:[]} */