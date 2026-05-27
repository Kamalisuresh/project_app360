// backend/controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{

    try{

        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){

            return res.status(400).json({
                message:"User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({

            name,
            email,
            password:hashedPassword,
            role

        });

        await user.save();

        res.json({
            message:"User Registered Successfully"
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

exports.login = async(req,res)=>{

    try{

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){

            return res.status(400).json({
                message:"User not found"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){

            return res.status(400).json({
                message:"Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id:user._id,
                role:user.role
            },

            "secretkey"

        );

        res.json({

            token,
            role:user.role

        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}