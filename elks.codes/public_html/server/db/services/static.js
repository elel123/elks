const { Static } = require("../models/static");
 
 async function getAllStaticEntries() {
    try {
      return await Static.find({}).exec();
    } catch (err) {
      return false;
    }
  }

 async function addStaticEntry(info){
     try{
         return await Static.create(info);
     } catch(err){
         return false;
     }
 }
 
 module.exports = {
   getAllStaticEntries,
   addStaticEntry
 };
 