const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
   getUniqueSessions
  } = require("../db/services/static");
const { verifyJWT } = require("./services/jwt");
const router = express.Router();


 router.get("/dailyUsers", async (req, res, next) => {
    try {

        let jwt = req.query.jwt; 

        // verify JWT 
        const jwtPayload = await verifyJWT(jwt);
        if(!jwtPayload) return res.status(403).send("Cannot Authenticate user");

        const uniqueSessions = await getUniqueSessions();
        if(!uniqueSessions) return res.status(500).send(uniqueSessions);

        return res.status(200).send(uniqueSessions);

    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
});

module.exports = router;