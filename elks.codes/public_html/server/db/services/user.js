const { User } = require("../models/user");

/**
 * Saves user to the DB.
 *
 * @param {object} raw_user - User object to be added
 * @returns {object/boolean} - Order object / false on error
 */
 async function addNewUser(raw_user) {
    try {
      user = new User(raw_user);
      await user.save();
      return user;
    } catch (err) {
      return false;
    }
  }
 
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
   findOneUser,
   addNewUser
 };
 