let mongoose = require('mongoose');
let schema = mongoose.Schema;
let uniqueValidator =require('mongoose-unique-validator')


let listSchema = new schema({
    name:{type:String,required:[true,'name of list id required'],unique:true},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:[true,'no have a user']},
    products:{type:[mongoose.Types.ObjectId],ref:'product',required:false,default:[]},
    shoppingCart:{type:[],required:false,default:[]}
})

listSchema.plugin(uniqueValidator,{message:'{PATH} already exist',ok:false});

module.exports = mongoose.model('list',listSchema);
