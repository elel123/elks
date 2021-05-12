const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllEntries,
    addEntry
  } = require("../db/services/static");
const router = express.Router();


 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllEntries();
        res.status(200).json(entries);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

router.post("/", 
[
    body("agent").isString(),
    body("language").isString(),
    // typeof body("acceptsCookies") === 'boolean',
    // typeof body("allowsJavascript") === 'boolean',
    // typeof body("allowsImages") === 'boolean',
    // typeof body("screenWidth") === 'number',
    // typeof body("screenHeight") === 'number',
    // typeof body("windowWidth")  === 'number',
    // typeof body("windowHeight")  === 'number',
    body("networkType").isString(),
    isValidated,
  ],
async (req, res, next) => {
    try {

        const rBody = req.body;

      const info = {
        agent: rBody.agent, 
        language: rBody.language,
        acceptsCookies: rBody.acceptsCookies,
        allowsJavascript: rBody.allowsJavascript,
        allowsImages: rBody.allowsImages,
        screenDimensions: {
            width: rBody.screenWidth,
            height: rBody.screenHeight
        },
        windowDimensions: {
            width: rBody.windowWidth,
            height: rBody.windowHeight
        },
        networkType: rBody.networkType
      };

      const addedEntry = await addEntry(info);
      return res.status(200).json(addedEntry);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server err");
    }
});

module.exports = router;