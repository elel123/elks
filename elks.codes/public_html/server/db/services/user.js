const { User } = require("../models/user");
 
 /**
  * Finds user in the DB.
  *
  * @param {string} incomingEmail - User email to be found
  * @returns {object/boolean} - Order object / null
  */
 async function findOneUser(incomingEmail) {
   return await User.findOne({ email: incomingEmail }).exec();
 }
 
 module.exports = {
   findOneUser
 };
 