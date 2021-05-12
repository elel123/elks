/**
 * File sets up the menuImage order schema.
 *
 * @summary   Creation of the Order DB.
 */
 const mongoose = require("mongoose");

 const staticSchema = new mongoose.Schema(
   {
       Name: {
           type: String,
           default: ''
       }, 
       Age: {
           type: Number, 
           default: 0
       }
   },
   { timestamps: true }
 );
 
 const Static = mongoose.model("Static", staticSchema);
 module.exports = { Static };
 