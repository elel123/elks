const { Static } = require("../models/static");
 
 async function getAllEntries() {
    try {
      return await Static.find({}).exec();
    } catch (err) {
      return false;
    }
  }
 
 module.exports = {
   getAllEntries
 };
 