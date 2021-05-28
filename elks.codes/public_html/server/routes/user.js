/**
 * This file creates the routes to allow for interaction with the user DB.
 * Contains routes to add, update or find a user.
 * Also contains configuration and jwt to allow for login functionality as well as
 * email functionality.
 *
 * @summary   Login, registration, reset password, and forgot password functionality for accounts.
 * @author    Amrit Kaur Singh, Thomas Garry
 */

 const express = require("express");
 const { isValidated } = require("../middleware/validation");
 const { findOneUser } = require("../db/services/user");
 const { createJWT } = require("./services/jwt");
 
 const router = express.Router();

 router.get(
  "/",
  [
   //  body("email").notEmpty().isEmail(),
   //  body("password").notEmpty().isString().isLength({ min: 6 }),
    isValidated,
  ],
  async (req, res, next) => {
    res.send(200).json("Users.js is online");
  }
);
 
 /**
  * Logins a user.
  *
  * @body email, password - Use middleware to validate
  * @returns {status/object} - 200 json with email and jwt / 500 with err
  */
 router.post(
   "/login",
   [
    //  body("email").notEmpty().isEmail(),
    //  body("password").notEmpty().isString().isLength({ min: 6 }),
     isValidated,
   ],
   async (req, res, next) => {
     const { email, password } = req.body;
     try {
       // check if user exists
       const user = await findOneUser(email);
       if (!user) {
         return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
       }
       // compare user password with passed in value
       user.comparePassword(password, (err, isMatch) => {
         if (err) throw err;
         if (!isMatch) {
           return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
         }
         // matched user, return email and token
         const payload = {
           email,
         };
         res.status(200).json({
           email,
           token: createJWT(payload),
         });
       });
     } catch (err) {
       console.error(err.message);
       res.status(500).send("Server error");
     }
   }
 );
 
 module.exports = router;
 