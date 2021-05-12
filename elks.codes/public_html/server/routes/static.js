const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllStaticEntries,
    addStaticEntry
  } = require("../db/services/static");
const router = express.Router();


 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllStaticEntries();
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
    body("acceptsCookies").notEmpty(),
    body("allowsJavascript").notEmpty(),
    body("allowsImages").notEmpty(),
    body("screenWidth").notEmpty(),
    body("screenHeight").notEmpty(),
    body("windowWidth").notEmpty(),
    body("windowHeight").notEmpty(),
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

      const addedEntry = await addStaticEntry(info);
      return res.status(200).json(addedEntry);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server err");
    }
});

module.exports = router;