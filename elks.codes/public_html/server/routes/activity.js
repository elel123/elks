const express = require("express");
const { body } = require("express-validator");
const { isValidated } = require("../middleware/validation");
const {
    getAllActivityEntries,
    addActivityEntry,
    retrievePagesByActivityCount,
    retrieveActivityBreakdownByPage,
    retrieveActivityInfoByPage,
    retrieveActivityInfoByPagePaginate,
    retrieveActivityCountOfPage
  } = require("../db/services/activity");
  const { verifyJWT } = require("./services/jwt");
const router = express.Router();


 router.get("/", async (req, res, next) => {
    try {
        const entries = await getAllActivityEntries();
        res.status(200).json(entries);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});

router.get("/pages", async (req, res, next) => {
  try {

     let jwt = req.query.jwt;

     // verify valid jwt 
    //  const jwtPayload = await verifyJWT(jwt);
    //  if(!jwtPayload) return res.status(403).send("Cannot Authenticate user");

      const pageActivities = await retrievePagesByActivityCount();
      if (!pageActivities) return res.status(500).json("Cannot retrieve entries");
      res.status(200).json(pageActivities);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server err");
  }
});

router.get("/pagesbreakdown", async (req, res, next) => {
  try {
      let jwt = req.query.jwt;

      // verify valid jwt 
      const jwtPayload = await verifyJWT(jwt);
      if(!jwtPayload) return res.status(403).send("Cannot Authenticate user");

      const pageActivities = await retrievePagesByActivityCount();
      if (!pageActivities) return res.status(500).json("Cannot retrieve entries");
      
      let pagesByBreakdown = [];
      for(const entry of pageActivities){
        pagesByBreakdown.push({
          "page": entry._id,
          "breakdown": await retrieveActivityBreakdownByPage(entry._id)
        });
      }
      
      res.status(200).json(pagesByBreakdown);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server err");
  }
});

// Remote endpoint for zinggrid chart to source data form 
router.get("/pageactivityinfo.json", async (req, res, next) => {
  try {

      let jwt = req.query.jwt;
      
      let pagePath = req.query.pagePath ? req.query.pagePath : '/'; 
      let page = req.query.page ? parseInt(req.query.page) : 1;  // page number
      let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 30; 

      // verify valid jwt 
      const jwtPayload = await verifyJWT(jwt);
      if(!jwtPayload) return res.status(403).send("Cannot Authenticate user");

      let activityCount = await retrieveActivityCountOfPage(pagePath); 

      let returnPageActivityInfo = {
        "page": pagePath,
        "info": await retrieveActivityInfoByPagePaginate(pagePath, page, pageSize),
        "currentPage" :page, 
        "count": activityCount,
      };

      res.status(200).json(returnPageActivityInfo);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server err");
  }
});

router.post("/", 
[
    // body("data").custom((value) => {
    //   return Array.isArray(value);
    // }),
    isValidated,
  ],
async (req, res, next) => {
    try {

      const addedEntries = [];

      for(const activity of req.body.data){

        const info = {
          sessionId: req.session.id,
          category: activity.category, 
          event: activity.event,
          details: activity.details,
          page: activity.page
        };

        const addedEntry = await addActivityEntry(info);
        addedEntries.push(addedEntry);
      }

      return res.status(200).json(addedEntries);

    } catch (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
});

module.exports = router;