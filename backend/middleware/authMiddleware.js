// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next)=>{

    const token = req.headers.authorization;

    if(!token){

        return res.status(401).json({
            message:"Access Denied"
        });

    }

    try{

        const verified = jwt.verify(
            token,
            "secretkey"
        );

        req.user = verified;

        next();

    }catch(err){

        res.status(400).json({
            message:"Invalid Token"
        });

    }

}

exports.checkRole = (...roles)=>{

    return(req,res,next)=>{

        if(!roles.includes(req.user.role)){

            return res.status(403).json({
                message:"Access Forbidden"
            });

        }

        next();

    }

}