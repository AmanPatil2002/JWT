require('dotenv').config()
const jwt = require('jsonwebtoken');

SECRET_KEY=process.env.SECRET_KEY;

function authenticateToken(req, res, next){
    const authHeader = req.Header.authHeader
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
        return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;