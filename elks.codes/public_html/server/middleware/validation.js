/**
 * This file is middleware for express-validator to throw errors.
 *
 * @summary   Validation middleware for express-validator.
 * @author    TSE
 */
 const { validationResult } = require("express-validator");

 const isValidated = (req, res, next) => {
   const result = validationResult(req);
   if (result.isEmpty()) {
     return next();
   }
   return res.status(400).json({ message: "User input is malformed" });
 };
 
 module.exports = {
   isValidated,
 };
 