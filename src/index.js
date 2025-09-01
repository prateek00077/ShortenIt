const express = require('express');
const urlRouter = require('./routes/url');
const connectDB = require('./config/db');
const { URL } = require('./models/url')

const PORT = 5000;
const app = express();
app.use(express.json());
app.use('/url', urlRouter);
connectDB();

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;

    if(!shortId) {
        return res.status(400).json({
            message : "shortId not found"
        })
    }

    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push : {
                visitHistory : {
                    timestamp : Date.now()
                }
            }
        }
    );

    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})