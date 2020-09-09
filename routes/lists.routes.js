let express = require('express');
let app = express();
let listSchema = require('../schemas/list.schemas.js')
let productSchema = require('../schemas/product.schema.js')
let idProductSchema = require('../schemas/list.schemas.js').idProduct
let checkToken = require('../middlewares/checkToken.mw')


app.get('/', checkToken.checkToken, (req, res) => {
    let user = req.user.user._id;
    let userList = [];

    if (!req) {
        res.status(400).json({
            ok: false,
            message: 'no data has been received to consult the list'
        })
    }

    listSchema.find((err, lists) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        lists.forEach((list)=>{
            console.log(list.user == user)
            if(list.user == user){
                userList.push(list)
            } 
        })
         
        return res.status(200).json({
            ok: true,
            userList,
        

        })
    })




})

app.post('/', checkToken.checkToken, (req, res) => {
console.log(req.body)
    let body = req.body;
    let queryProducts = body.products.ids
    let newList = new listSchema({
        name: body.name,
        user: body.user,
        products: queryProducts,
        shoppingCart: body.shoppinCart
    })
    if (queryProducts.length > 0) {

        queryProducts.forEach((queryIdProduct) => {
            productSchema.find({ _id: queryIdProduct }, (err, dbProduct) => {
                if (err) {                    
                    return  res.status(500).json({
                        ok: false,
                        
                        message: 'error al buscar producto '+ queryIdProduct
                    })
                }
               
            })
        });
    }

    newList.save( (err, list) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'ya existe esta lista'
            })

        }
        return res.status(201).json({
            ok: true,
            list
        })
    })




})

app.delete('/', (req, res) => {
    let body = req.body

    listSchema.deleteOne({ _id: body.list }, (err, list) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
            if (err.name === 'CastError') {
                err.message = 'there are list that do not exist'
            }
        }
        res.status(200).json({
            ok: true,
            message: `${list.name} is deleted`
        })
    })


})


module.exports = app
/* name:{type:String,required:[true,'name of list id required'],uniqued},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:[true,'no have a user']},
    products:{type:[mongoose.Types.ObjectId],ref:'product',required:false,default:[]},
    shoppingCart:{type:[],required:false,default:[]} */