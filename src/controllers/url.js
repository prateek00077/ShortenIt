const { nanoid } = require('nanoid');
const { URL } = require('../models/url');

const generateNewShortURL = async(req, res) => {
    const shortId = nanoid(8);

    const { url } = req.body;

    if(!url) {
        return res.status(401).json({ message : "Please provide url link"});
    }

    const result = await URL.create({
        shortId,
        redirectURL : url,
        visitHistory : []
    });

    return res.status(201).json({
        result,
    })
}

const getAnalytics = async(req, res) => {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.status(200).json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}
module.exports = {
    generateNewShortURL,
    getAnalytics
}