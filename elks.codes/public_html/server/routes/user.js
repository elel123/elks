/**
 * This file creates the routes to allow for interaction with the user DB.
 * Contains routes to add, update or find a user.
 * Also contains configuration and jwt to allow for login functionality as well as
 * email functionality.
 *
 * @summary   Login, registration, reset password, and forgot password functionality for accounts.
 * @author    Amrit Kaur Singh
 */

 const express = require("express");
 const { isValidated } = require("../middleware/validation");
 const { findOneUser, addNewUser, findAllUsers, editUser, deleteUser } = require("../db/services/user");
 const { createJWT, verifyJWT } = require("./services/jwt");
 
 const router = express.Router();

 /**
  * Get all users, given you provide an admin JWT.
  */
router.get("/", [isValidated], async (req, res) => {
    try{

      let jwt = req.query.jwt; 

      // verify JWT is that of an admin 
      const jwtPayload = await verifyJWT(jwt);
      if(!jwtPayload || !jwtPayload.isAdmin) return res.status(403).send("Cannot Authenticate user");

      let users = await findAllUsers();
      return res.status(200).json(users);

    } catch(error){
      res.status(500).send("Server Error");
    }
});

/**
  * Edit a given user, given you have a correct admin JWT. 
  */
router.put(
  "/",
  [
    isValidated,
  ],
  async (req, res, next) => {

    try{

      const { jwt, email, password, isAdmin } = req.body;

      // verify JWT is that of an admin 
      const jwtPayload = await verifyJWT(jwt);
      if(!jwtPayload || !jwtPayload.isAdmin) return res.status(403).send("Cannot Authenticate user");

      // retrieve current user object 
      const user = await findOneUser(email);
       if (!user) {
         return res.status(403).json({ errors: [{ msg: "Invalid Credentials" }] });
       }

       // update the user object
      if(password !== null ) user.password = password;
      if(isAdmin != null)  user.isAdmin = isAdmin; 
        
      // attempt to save user object
      const updatedUser = await editUser(user);
      if(!updatedUser) return res.sendStatus(500);

      return res.sendStatus(200);

    } catch(error){
      res.status(500).send("Server Error");
    }
  }
);

/**
* Delete a user, given you have a valid admin JWT.
*/
router.get(
  "/:id",
  [
    isValidated,
  ],
  async (req, res, next) => {

    try{

      let id = req.params.id; 
      let jwt = req.query.jwt; 

      // verify JWT is that of an admin 
      const jwtPayload = await verifyJWT(jwt);
      if(!jwtPayload || !jwtPayload.isAdmin) return res.status(403).send("Cannot Authenticate user");

      // retrieve current user object 
      const isDeleted = await deleteUser(id);
      if(!isDeleted) return res.sendStatus(500);

      return res.sendStatus(200);

    } catch(error){
      res.status(500).send("Server Error");
    }
  }
);

/**
 * Registers a user into the DB.
 *
 * @body email, password, secret - Use middleware to validate
 * @returns {status/object} - 200 json with email and jwt / 500 with err
 */
 router.post(
  "/register",
  [
    // body("email").notEmpty().isString(),
    // body("password").notEmpty().isString(),
    // body("isAdmin").notEmpty().isString(),
    // body("jwt").notEmpty().isString(),
    isValidated,
  ],
  async (req, res, next) => {

    const { email, password, isAdmin, jwt } = req.body;
    try {
      
      // validate jwt
      const jwtPayload = await verifyJWT(jwt);
      // error if not a valid JWT, or user is not an admin 
      if(!jwtPayload || !jwtPayload.isAdmin) return res.status(403).send("Cannot Authenticate user");

      const user = {
        email,
        password,
        isAdmin,
      };
     
      // try to create user
      const addSuccesful = await addNewUser(user);
      if (!addSuccesful) {
        return res.status(409).json({ errors: [{ msg: "Duplicate User" }] });
      }
      // created user, return email and token
      const payload = {
        email,
        isAdmin
      };
      res.status(200).json({
        email,
        token: createJWT(payload),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
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
    //  body("email").notEmpty().isString(),
    //  body("password").notEmpty().isString(),
     isValidated,
   ],
   async (req, res, next) => {
     const { email, password } = req.body;
     try {
       // check if user exists
       const user = await findOneUser(email);
       if (!user) {
         return res.status(403).json({ errors: [{ msg: "Invalid Credentials" }] });
       }
       // compare user password with passed in value
       user.comparePassword(password, (err, isMatch) => {
         if (err) throw err;
         if (!isMatch) {
           return res.status(403).json({ errors: [{ msg: "Invalid Credentials" }] });
         }
         // matched user, return email and token
         const payload = {
           email: user.email,
           isAdmin: user.isAdmin 
         };
         res.status(200).json({
           email,
           isAdmin: user.isAdmin,
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
 