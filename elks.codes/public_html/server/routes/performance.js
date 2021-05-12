const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllPerformanceEntries,
    addPerformanceEntry
  } = require("../db/services/performance");
const router = express.Router();


 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllPerformanceEntries();
        res.status(200).json(entries);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

router.post("/", 
[
    body("timingObject").notEmpty(),
    body("startTime").notEmpty(),
    body("endTime").notEmpty(),
    body("totalTime").notEmpty(),
    isValidated,
  ],
async (req, res, next) => {
    try {

        const rBody = req.body;

      const info = {
        timingObject: rBody.timingObject, 
        loadTime: {
            start: rBody.startTime,
            end: rBody.endTime,
            total: rBody.totalTime
        }
      };

      const addedEntry = await addPerformanceEntry(info);
      return res.status(200).json(addedEntry);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server err");
    }
});

module.exports = router;