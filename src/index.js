const express = require('express');
const connectDB = require('./config/db');
const { URL } = require('./models/url');
const cookieparser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middleware/isAuth');
const path = require('path');
const dotenv = require('dotenv');

const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticRouter');

dotenv.config();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieparser());
app.use(checkForAuthentication);

app.use('/',staticRouter);
app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use('/user', userRouter);
connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get('/url/:shortId', async(req, res) => {
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