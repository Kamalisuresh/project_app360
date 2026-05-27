// backend/models/Alarm.js

const mongoose = require("mongoose");

const AlarmSchema = new mongoose.Schema({

    title:{
        type:String
    },

    description:{
        type:String
    },

    severity:{
        type:String
    },

    status:{
        type:String,
        default:"Active"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Alarm", AlarmSchema);