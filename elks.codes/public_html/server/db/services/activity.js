const { Activity } = require("../models/activity");
 
 async function getAllActivityEntries() {
    try {
      return await Activity.find({}).exec();
    } catch (err) {
      return false;
    }
  }

 async function addActivityEntry(info){
     try{
         return await Activity.create(info);
     } catch(err){
         return false;
     }
 }
 
 module.exports = {
   getAllActivityEntries,
   addActivityEntry
 };
 