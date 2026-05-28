const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const alarmRoutes = require("./routes/alarmRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Test Route
app.get("/", (req,res)=>{

    res.send("Backend Running");

});

// Routes
app.use("/api/users", userRoutes);

app.use("/api/alarms", alarmRoutes);

// PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});