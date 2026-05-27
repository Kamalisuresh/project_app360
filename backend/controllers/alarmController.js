// backend/controllers/alarmController.js

const Alarm = require("../models/Alarm");

exports.createAlarm = async(req,res)=>{

    try{

        const alarm = new Alarm(req.body);

        await alarm.save();

        res.json({
            message:"Alarm Created"
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.getAlarms = async(req,res)=>{

    try{

        const alarms = await Alarm.find();

        res.json(alarms);

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.updateAlarm = async(req,res)=>{

    try{

        await Alarm.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({
            message:"Alarm Updated"
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.deleteAlarm = async(req,res)=>{

    try{

        await Alarm.findByIdAndDelete(req.params.id);

        res.json({
            message:"Alarm Deleted"
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.getDashboardCounts = async(req,res)=>{

    try{

        const total = await Alarm.countDocuments();

        const active = await Alarm.countDocuments({
            status:"Active"
        });

        const resolved = await Alarm.countDocuments({
            status:"Resolved"
        });

        res.json({

            total,
            active,
            resolved

        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.getCriticalAlarms = async(req,res)=>{

    try{

        const alarms = await Alarm.find({
            severity:"Critical"
        });

        res.json(alarms);

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}