const mongoose = require('mongoose')

// define schema 
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }

},{timestamps:true})
const UserModel = mongoose.model('user',UserSchema)
module.exports= UserModel