const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllActivityEntries,
    addActivityEntry,
    retrievePagesByActivityCount
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

router.get("/pages", async (req, res, next) => {
  try {
      const pageActivities = await retrievePagesByActivityCount();
      if (!pageActivities) return res.status(500).json("Cannot retrieve entries");
      res.status(200).json(pageActivities);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server err");
  }
});

router.post("/", 
[
    // body("data").custom((value) => {
    //   return Array.isArray(value);
    // }),
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
          details: activity.details,
          page: activity.page
        };

        const addedEntry = await addActivityEntry(info);
        addedEntries.push(addedEntry);
      }

      return res.status(200).json(addedEntries);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
});

module.exports = router;