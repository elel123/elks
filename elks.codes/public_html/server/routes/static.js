const express = require("express");
//const { body } = require("express-validator");
const {
    getAllEntries
  } = require("../db/services/static");
const router = express.Router();

/**
 * Gets the primary email in the DB.
 *
 * @returns {status/object}} - 200 with the primary email in the DB / 500 err
 */
 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllEntries();
        res.status(200).json(entries);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

router.get("/post", async (req, res, next) => {
    try {
      
      res.status(200).json("Static is working!!!!!");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

module.exports = router;