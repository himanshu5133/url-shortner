const express = require('express');
const router = express.Router();

const {
    getUrl,
    encodeUrl,
    getAnalytics
} = require('../controllers/urlController');


router.route("/:shortid").get(getUrl);
router.route("/url").post(encodeUrl);
router.route("/analytics/:shortid").get(getAnalytics);

module.exports = router;