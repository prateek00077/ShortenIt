const jwt = require('jsonwebtoken');

const setUser = (user) => {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role
    }, process.env.JWT_SECRET);
}

const getUser = (token) => {
    if(!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    setUser,
    getUser
}