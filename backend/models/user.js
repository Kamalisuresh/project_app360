const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name:{
        type:String
    },

    email:{
        type:String,
        unique:true
    },

    password:{
        type:String
    },

    role:{
        type:String,
        enum:["Admin","Engineer","Viewer"]
    }

});

module.exports = mongoose.model("User", UserSchema);