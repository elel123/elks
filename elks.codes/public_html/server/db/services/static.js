const { Static } = require("../models/static");
 
 async function getAllEntries() {
    try {
      return await Static.find({}).exec();
    } catch (err) {
      return false;
    }
  }

 async function addEntry(info){
     try{
         return await Static.create(info);
     } catch(err){
         return false;
     }
 }
 
 module.exports = {
   getAllEntries,
   addEntry
 };
 