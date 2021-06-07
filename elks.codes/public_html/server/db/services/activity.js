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
          {$match:
            {'page': {
              $exists: true, $ne: ""
            } } },
          {"$group" : {_id:"$page", count:{$sum:1}}}, { $sort: { count: -1 }}
      ]);
    } catch (err) {
      return false;
    }
  }

  async function retrieveActivityBreakdownByPage(page) {
    try {
        return Activity.aggregate([
          {$match:
            {'page': page } },
          {"$group" : {_id:"$category", count:{$sum:1}}}, { $sort: { count: -1 }}
      ]);
    } catch (err) {
      return false;
    }
  }

  async function retrieveActivityCountOfPage(pagePath) {
    try {
      return Activity.countDocuments({'page': pagePath}).exec(); 
    } catch (err) {
        console.log(err);
        return false;
    }
  }

  async function retrieveActivityInfoByPagePaginate(pagePath, pageNumber, pageLimit) {
    try {
      return Activity.find({'page': pagePath}, {updatedAt: false, page: false, })
                      .sort({createdAt: 'desc'})
                      .skip(pageNumber > 0 ? ((pageNumber - 1) * pageLimit) : 0 )
                      .limit( pageLimit )
                      .exec();
    } catch (err) {
        console.log(err);
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
   retrievePagesByActivityCount,
   retrieveActivityBreakdownByPage,
   retrieveActivityInfoByPagePaginate,
   retrieveActivityCountOfPage
 };
 