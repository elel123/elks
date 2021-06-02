/**
 * File sets up the menuImage order schema.
 *
 * @summary   Creation of the Order DB.
 */
 const mongoose = require("mongoose");

 const activitySchema = new mongoose.Schema(
   {
    sessionId: {
        type: String, 
        required: true
    },
    // general type of activity
    category: {
        type: String, 
        required: true
    }, 
    // specific event of category 
    event: {
        type: String,
        default: ''
    },
    page: {
        type: String,
        default: ''
    },
    // any additional details 
    details: {
        type: Object,
        default: null
    } 
   },
   { timestamps: true }
 );
 
 const Activity = mongoose.model("Activity", activitySchema);
 module.exports = { Activity };
 