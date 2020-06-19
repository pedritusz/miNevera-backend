let mongoose = require('mongoose');
let schema = mongoose.Schema;
let typeRoleEnum = require('../config/enums').roleTypes;
let uniqueValidator = require('mongoose-unique-validator')

let userSchema = new schema({

    name: {type:String,required:[true,'the user name is required']},
    role:{type:String,enums:typeRoleEnum},
    email:{type:String,required:[true,'email is required']},
    password : {type:String, required:[true,'password is required']},
    createData : {type:Date,required:false, default: new Date()}
});

userSchema.plugin(uniqueValidator,{message:'{PATH} already exist', ok:false})
module.exports = mongoose.model('user',userSchema);