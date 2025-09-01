const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb://localhost:27017/ShortenIt')
    .then(()=>{
        console.log("mongoDB is connected successfully!");
    })
    .catch((err)=> {
        console.log(err);
    })
}

module.exports = connectDB;