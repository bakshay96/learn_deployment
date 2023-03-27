const mongoose =require("mongoose");

const UserSchema =mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    gender : {type:String, require:true},
    city : {type:String, require:true},
    age: {type:Number, require:true},
})

const User =mongoose.model("user", UserSchema);
module.exports ={User}