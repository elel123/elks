const express = require("express");
const { isValidated } = require("../middleware/validation");
const { verifyJWT } = require("./services/jwt");

const router = express.Router();
 
 /**
  * Given a JWT in the request body, verifies if the given JWT has been authorized by the site.
  *
  * @body {string} jwtToken - JWT to be verified for authorization
  * @returns {Response} - 200 status code if authorized
  *                       401 status code if unauthorized/missing info
  *                       500 status code if system error
  */
 router.post(
   "/verify",
   [
    // body("jwtToken").notEmpty().isString(), 
   isValidated],
   async (req, res, next) => {
     const { jwtToken } = req.body;
     try {
       
       const payload = await verifyJWT(jwtToken)
       if (!payload) return res.sendStatus(403);

       return res.sendStatus(200);

     } catch (err) {
       console.error(err.message);
       res.sendStatus(500);
     }
   }
 );
 
 module.exports = router;
 