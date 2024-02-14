const asyncHandler = require("express-async-handler") // we will not need to write different try cath block if we use it
const URL = require('../models/urlSchema');
const shortid = require("shortid");

//@desc Get original url from encoded url
//@route GET /:id
//@access public
const getUrl = asyncHandler(async (req, res) => {
    const shortid = req.params.shortid;
    const url = await URL.findOneAndUpdate(
        {encodedURL:shortid},
        {
            $push:{
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.status(301);
    res.redirect(url.redirectURL);
});

//@desc POST original url to encod url
//@route POST /url
//@access public
const encodeUrl = asyncHandler(async (req, res) => {
    // console.log("encode a url");
    const body = req.body;
    if(body.url == null){
        return res.status(400);
        throw new Error("Enter a Url!");
    }
    const shortUrl = shortid(8);
    const url = await URL.create({
        encodedURL: shortUrl,
        redirectURL: body.url,
        visitHistory:[]
    }) 
    res.status(200).json(url);
});


//@desc GET analytic of encod url
//@route GET /url/analytics/:id
//@access public
const getAnalytics = asyncHandler(async (req, res) => {
    const shortid = req.params.shortid;
    const url = await URL.findOne({encodedURL:shortid});
    res.status(200).json({
        totalClicks: url.visitHistory.length,
        analytics: url.visitHistory,
    });
});

module.exports = { getUrl, encodeUrl, getAnalytics };