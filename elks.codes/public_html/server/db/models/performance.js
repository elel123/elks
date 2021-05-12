/**
 * File sets up the menuImage order schema.
 *
 * @summary   Creation of the Order DB.
 */
 const mongoose = require("mongoose");

 const performanceSchema = new mongoose.Schema(
   {
       timingObject: {
           type: Object
       }, 
       loadTime: {
           start: {
               type: Date
           },
           end: {
               type: Date
           },
           // milliseconds
           total: {
               type: Number
           }
       }
   },
   { timestamps: true }
 );
 
 const Performance = mongoose.model("Performance", performanceSchema);
 module.exports = { Performance };
 