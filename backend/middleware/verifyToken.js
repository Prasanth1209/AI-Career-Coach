const jwt = require("jsonwebtoken");
const UserStore = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No authentication token provided."
            });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "ai_career_coach_jwt_secret_key_2026_x89f";

        const decoded = jwt.verify(token, secret);
        const user = await UserStore.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. User record not found."
            });
        }

        req.user = UserStore.sanitize(user);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Authentication token has expired. Please log in again."
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token."
        });
    }
};

module.exports = verifyToken;
