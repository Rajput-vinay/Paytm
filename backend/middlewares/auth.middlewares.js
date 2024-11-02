
const jsonwebtoken = require("jsonwebtoken");
const { userRouter } = require("../Routes/user.routes");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
           console.log("decoded",decoded)
        req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};




module.exports = {
    authMiddleware
}