let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let typeProductEnum = require('../enums/type-of-product.enum').TypeProductsEnum
let unitMesurement = require('../enums/unit-of-mesurement.enum').unitMesurement;
let uniqueValidator =require('mongoose-unique-validator')

let productSchema = new Schema({
    name:{type:String,required:[true,'the name of product is required']},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    price:{type:Number,required:false},
    commerce:{type:String,required:false},
    type:{type:String,required:false,enum:typeProductEnum},
    usual:{type:Boolean,required:false,default:true},
    availableStock:{type:Number,required:false,default:0},
    desiredStock:{type:Number,required:false,default:1},
    unitOfMesurement:{type:String,required:[true,'it is mandatory to add a unit of measure'],enum:unitMesurement},
    createData : {type:Date,required:false, default: new Date()}

})

productSchema.plugin(uniqueValidator,{message:'{PATH} already exist',ok:false});
module.exports = mongoose.model('product',productSchema);