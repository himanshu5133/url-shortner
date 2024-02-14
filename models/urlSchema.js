const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    encodedURL: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory : [{timestamp: {type:Number}}],
},
{timestamps:true}
);

module.exports = mongoose.model("URL", urlSchema);