const express = require("express");
//const { body } = require("express-validator");

/**
 * Gets the primary email in the DB.
 *
 * @returns {status/object}} - 200 with the primary email in the DB / 500 err
 */
 router.get("/", async (req, res, next) => {
    try {
      // returns email or error if there is an error
      res.status(200).json("Static is working!!!!!");
      
    //   const email = await findPrimaryEmail();
    //   res.status(200).json({
    //     email,
    //   });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err");
    }
});