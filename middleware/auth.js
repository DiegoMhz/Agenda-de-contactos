const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    const token = request.cookies.acessToken;
    if (!token) {
        response.sendStatus(401);
        return next();
    }
    const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
}

module.exports = auth;

