const { Performance } = require("../models/performance");
 
 async function getAllPerformanceEntries() {
    try {
      return await Performance.find({}).sort({createdAt: 'desc'}).exec();
    } catch (err) {
      return false;
    }
  }

 async function addPerformanceEntry(info){
     try{
         return await Performance.create(info);
     } catch(err){
         return false;
     }
 }

 async function getLoadTimes(){
  try{
      return Performance.aggregate([
        { "$project": {
            "_id": 0,
            "time": "$loadTime.total"
        }}
    ]);
  } catch(err){
      return false;
  }
}
 
 module.exports = {
   getAllPerformanceEntries,
   addPerformanceEntry, 
   getLoadTimes
 };
 