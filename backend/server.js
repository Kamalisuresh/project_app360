// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const alarmRoutes = require("./routes/alarmRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/app360")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{

    res.send("Backend Running");

});

app.use("/api/users", userRoutes);

app.use("/api/alarms", alarmRoutes);

app.listen(5000,()=>{

    console.log("Server running on port 5000");

});