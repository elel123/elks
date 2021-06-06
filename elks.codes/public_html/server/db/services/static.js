const { Static } = require("../models/static");
 
 async function getAllStaticEntries() {
    try {
      return await Static.find({}).sort({createdAt: 'desc'}).exec();
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

 async function getUniqueSessions(){
  return Static.aggregate([
    {"$group" : 
    {
      _id: {
      year : { $year : "$createdAt" },        
      month : { $month : "$createdAt" },        
      day : { $dayOfMonth : "$createdAt" },
    }, 
    count:{$sum:1}
  }}, { $sort: { _id: -1 }}, {$limit: 7}, { $sort: { _id: 1 }}
]);
 }
 
 module.exports = {
   getAllStaticEntries,
   addStaticEntry,
   getUniqueSessions
 };
 