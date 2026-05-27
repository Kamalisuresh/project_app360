// backend/routes/protectedRoutes.js

const express = require("express");

const router = express.Router();

const {
    verifyToken,
    checkRole
} = require("../middleware/authMiddleware");

router.get(

    "/admin",

    verifyToken,

    checkRole("Admin"),

    (req,res)=>{

        res.json({
            message:"Welcome Admin"
        });

    }

);

router.get(

    "/engineer",

    verifyToken,

    checkRole("Admin","Engineer"),

    (req,res)=>{

        res.json({
            message:"Welcome Engineer"
        });

    }

);

router.get(

    "/viewer",

    verifyToken,

    checkRole(
        "Admin",
        "Engineer",
        "Viewer"
    ),

    (req,res)=>{

        res.json({
            message:"Welcome Viewer"
        });

    }

);

module.exports = router;