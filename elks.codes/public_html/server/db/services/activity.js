const { Activity } = require("../models/activity");
 
 async function getAllActivityEntries() {
    try {
      return Activity.find({}).sort({createdAt: 'desc'}).exec();
    } catch (err) {
      return false;
    }
  }

  async function retrievePagesByActivityCount() {
    try {
        return Activity.aggregate([
          {"$group" : {_id:"$page", count:{$sum:1}}}
      ]);
    } catch (err) {
      return false;
    }
  }

 async function addActivityEntry(info){
     try{
         return Activity.create(info);
     } catch(err){
         return false;
     }
 }
 
 module.exports = {
   getAllActivityEntries,
   addActivityEntry,
   retrievePagesByActivityCount
 };
 