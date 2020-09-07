let express = require('express');
let app = express();
let listSchema = require('../schemas/list.schemas.js')
let productSchema = require('../schemas/product.schema.js')
let idProductSchema = require('../schemas/list.schemas.js').idProduct


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
    let newList = new listSchema( {
        name: body.name,
        user: body.user,
        products:[],
        shoppingCart: body.shoppinCart
    })
    queryProducts.forEach(id =>{
        newList.products.push(id)
    })
    console.log('productos =>',body.products);
    
    if (queryProducts !== []) {

        queryProducts.forEach((queryIdProduct) => {
            productSchema.find({ _id: queryIdProduct.id }, (err, dbProduct) => {
                if (err) {

                    if (err.name === 'CastError') {
                        err.message = 'there are products that do not exist in your fridge'
                    }
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

            })
        });

    }
    //console.log('products...................................................')
    listSchema.findOne({name: body.name},(err, listNameExist)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(listNameExist !== []){
            return res.status(500).json({
                ok:false,
                message:'ya existe esta lista'
            })
        }
    })
    newList.save(newList, (err, list) => {
        if (err) {
            console.log(err)
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

app.delete('/',(req,res)=>{
    let body = req.body
    
    listSchema.deleteOne({_id:body.list},(err,list)=>{
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
            if (err.name === 'CastError') {
                err.message = 'there are list that do not exist'
            }
        }
        res.status(200).json({
            ok:true,
            message:`${list.name} is deleted`
        })
    })


})


module.exports = app
/* name:{type:String,required:[true,'name of list id required'],uniqued},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:[true,'no have a user']},
    products:{type:[mongoose.Types.ObjectId],ref:'product',required:false,default:[]},
    shoppingCart:{type:[],required:false,default:[]} */