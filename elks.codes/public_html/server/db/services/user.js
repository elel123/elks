const { User } = require("../models/user");
const mongodb = require("mongodb");

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
 * @returns {object/boolean} - Order object / null
 */
async function findAllUsers() {
  return User.find({}, null, { sort: { createdAt: -1 } }, (err, users) => {
    if (err) {
      return [];
    }
    return users;
  });
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

 async function editUser(updated_user) {
  return updated_user.save();
}

async function deleteUser(id) {
  return await User.deleteOne({ _id: new mongodb.ObjectID(id) }).exec();
}
 
 module.exports = {
   findOneUser,
   addNewUser,
   findAllUsers,
   editUser,
   deleteUser
 };
 