const mongoose = require("mongoose");

 const staticSchema = new mongoose.Schema(
   {
       sessionId: {
           type: String
       },
       agent: {
           type: String,
           default: ''
       }, 
       language: {
           type: String, 
           default: ''
       },
       acceptsCookies: {
           type: Boolean,
           default: false
       },
       allowsJavascript: {
           type: Boolean,
           default: false
       },
       allowsImages: {
           type: Boolean, 
           default: false
       },
       allowsCSS: {
            type: Boolean, 
            default: false
        },
       screenDimensions: {
           width: {
               type: Number, 
               default: 0
           },
           height: {
               type: Number,
               default: 0
           }
       },
       windowDimensions: {
           width: {
               type: Number,
               default: 0
           },
           height: {
               type: Number,
               default: 0
           }
       },
       networkType: {
           type: String, 
           default: ''
       }
   },
   { timestamps: true }
 );
 
 const Static = mongoose.model("Static", staticSchema);
 module.exports = { Static };
 