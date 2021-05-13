const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllActivityEntries,
    addActivityEntry
  } = require("../db/services/activity");
const router = express.Router();


 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllActivityEntries();
        res.status(200).json(entries);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

router.post("/", 
[
    //body("data").exists(),
    isValidated,
  ],
async (req, res, next) => {
    try {

      const addedEntries = [];

      for(const activity of req.body.data){

        const info = {
            sessionId: req.session.id,
            category: activity.category, 
            event: activity.event,
            details: activity.details
          };

        const addedEntry = await addActivityEntry(info);
        addedEntries.push(addedEntry);
      }

      return res.status(200).json(addedEntries);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server err");
    }
});

module.exports = router;