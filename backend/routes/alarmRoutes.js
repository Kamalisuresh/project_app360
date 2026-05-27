// backend/routes/alarmRoutes.js

const express = require("express");

const router = express.Router();

const {
    createAlarm,
    getAlarms,
    updateAlarm,
    deleteAlarm,
    getDashboardCounts,
    getCriticalAlarms
} = require("../controllers/alarmController");

router.post("/create", createAlarm);

router.get("/", getAlarms);

router.put("/update/:id", updateAlarm);

router.delete("/delete/:id", deleteAlarm);

router.get("/dashboard/counts", getDashboardCounts);

router.get("/critical", getCriticalAlarms);

module.exports = router;