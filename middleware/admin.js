const jwt = require('jsonwebtoken');


const adminMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Or however you're sending the token

    if (!token) {
        return res.status(403).json({
            message: "No token provided",
        });
    }

    jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Failed to authenticate token",
            });
        }

        // If verification is successful, save the user id for further use
        req.userId = decoded.id;
        next();
    });

}

module.exports = {
    adminMiddleware
}