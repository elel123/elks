const jwt = require("jsonwebtoken");
const config = require("../../config");
 
 //  denotes length of time a JWT will be considered valid after creation
 const JWT_EXPIRY = "2h";
 
 /**
  * Given a payload, synchronously creates a JWT with a specific signature and expiry date.
  *
  * @param {string} payload - Data stored within the JWT
  * @returns {string} - JWT
  */
 function createJWT(payload) {
   return jwt.sign(payload, config.auth.jwt_secret, {
     expiresIn: JWT_EXPIRY,
   });
 }
 
 /**
  * Given a JWT, verifies if the JWT was indeed authorized by this site.
  *
  * @param {string} token - JWT to verify
  * @returns {Promise} - Resolved promise if authorized, rejected promise otherwise
  */
 async function verifyJWT(token) {
   return await jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
     // invalid token
     if (err) {
       return null;
     }
     // valid token, return with payload 
     return decoded;
   });
 }
 
 module.exports = {
  verifyJWT,
   createJWT,
 };
 