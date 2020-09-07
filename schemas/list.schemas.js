let mongoose = require('mongoose');
let schema = mongoose.Schema;


let listSchema = new schema({
    name:{type:String,required:[true,'name of list id required']},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:[true,'no have a user']},
    products:[{
        id:{type:mongoose.SchemaTypes.ObjectId,ref:'products'}
    }],
    shoppingCart:{type:[],required:false,default:[]}
})


module.exports = mongoose.model('list',listSchema);