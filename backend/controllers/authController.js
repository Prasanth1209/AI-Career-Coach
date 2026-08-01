const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const UserStore = require("../models/User");
const { sendPasswordResetEmail } = require("../utils/sendPasswordResetEmail");

const JWT_SECRET = process.env.JWT_SECRET || "ai_career_coach_jwt_secret_key_2026_x89f";
const VERIFY_EXPIRES = process.env.EMAIL_VERIFY_EXPIRES_IN || "15m";
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

/**
 * REGISTER NEW USER (Simple direct registration)
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
    try {
        const { fullName, name, email, password, confirmPassword, mobile, college, branch, graduation_year } = req.body;
        const displayName = (fullName || name || "").trim();
        const normalizedEmail = (email || "").trim().toLowerCase();

        console.log(`[Auth] Registration request for: ${normalizedEmail}`);

        if (!displayName) {
            return res.status(400).json({ success: false, message: "Full Name is required." });
        }
        if (!normalizedEmail || !normalizedEmail.includes("@")) {
            return res.status(400).json({ success: false, message: "Valid Email address is required." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
        }
        if (confirmPassword !== undefined && password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match." });
        }

        // Check if user already exists
        const existingUser = await UserStore.findByEmail(normalizedEmail);
        if (existingUser) {
            console.warn(`⚠️ [Auth] Registration rejected: ${normalizedEmail} already exists.`);
            return res.status(400).json({
                success: false,
                message: "An account with this email address already exists."
            });
        }

        // Hash password securely with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user record
        const user = await UserStore.create({
            fullName: displayName,
            name: displayName,
            email: normalizedEmail,
            password: hashedPassword,
            mobile: mobile ? String(mobile).trim() : "",
            college: college ? String(college).trim() : "",
            branch: branch ? String(branch).trim() : "",
            graduation_year: graduation_year || 2026
        });

        console.log(`✓ [Auth] Registration successful for: ${normalizedEmail}`);
        return res.status(201).json({
            success: true,
            message: "Registration successful! Please log in with your credentials.",
            user: UserStore.sanitize(user)
        });
    } catch (error) {
        console.error("❌ [Register Error]:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to register user account."
        });
    }
};

/**
 * LOGIN USER (Simple direct authentication)
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        console.log(`[Auth] Login attempt for: ${normalizedEmail}`);

        const user = await UserStore.findByEmail(normalizedEmail);

        if (!user || !user.password) {
            console.warn(`⚠️ [Auth] Login failed: User ${normalizedEmail} not found or no password set.`);
            return res.status(401).json({
                success: false,
                message: "Invalid email address or password."
            });
        }

        // Verify password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`⚠️ [Auth] Login failed: Invalid password for ${normalizedEmail}.`);
            return res.status(401).json({
                success: false,
                message: "Invalid email address or password."
            });
        }

        // Sign JWT Access Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES }
        );

        console.log(`✓ [Auth] Login successful for: ${normalizedEmail}`);
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: UserStore.sanitize(user)
        });
    } catch (error) {
        console.error("❌ [Login Error]:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to log in."
        });
    }
};

/**
 * GOOGLE OAUTH 2.0 LOGIN & AUTO-REGISTRATION
 * POST /api/auth/google
 */
exports.googleLogin = async (req, res) => {
    try {
        const token = req.body.token || req.body.credential || req.body.idToken;
        const accessToken = req.body.accessToken || req.body.access_token;

        if (!token && !accessToken) {
            console.warn("⚠️ [GoogleAuth] Login attempt failed: Google token is missing.");
            return res.status(400).json({
                success: false,
                message: "Google authentication token is required."
            });
        }

        console.log("[GoogleAuth] Verifying Google authentication token...");
        let payload;

        if (token) {
            try {
                const clientAudience = process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes("your_google_client_id")
                    ? process.env.GOOGLE_CLIENT_ID
                    : undefined;

                const ticket = await googleClient.verifyIdToken({
                    idToken: token,
                    audience: clientAudience
                });
                payload = ticket.getPayload();
            } catch (verifyError) {
                console.warn("⚠️ [GoogleAuth] verifyIdToken failed, attempting tokeninfo API fallback:", verifyError.message);
                try {
                    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
                    if (response.ok) {
                        payload = await response.json();
                    }
                } catch (fallbackErr) {
                    console.warn("⚠️ [GoogleAuth] Tokeninfo API failed:", fallbackErr.message);
                }
            }
        }

        // Access token userinfo API fallback
        if ((!payload || !payload.email) && (accessToken || token)) {
            const tokenToUse = accessToken || token;
            try {
                console.log("[GoogleAuth] Fetching Google userinfo via access token...");
                const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokenToUse}` }
                });
                if (userInfoRes.ok) {
                    payload = await userInfoRes.json();
                }
            } catch (uErr) {
                console.warn("⚠️ [GoogleAuth] Userinfo API fetch failed:", uErr.message);
            }
        }

        if (!payload || !payload.email) {
            return res.status(401).json({
                success: false,
                message: "Unable to retrieve valid profile or email from Google authentication token."
            });
        }

        const googleId = payload.sub || payload.id;
        const email = payload.email.trim().toLowerCase();
        const displayName = payload.name || email.split("@")[0];
        const picture = payload.picture || "";

        console.log(`[GoogleAuth] Google user authenticated: ${email} (Google ID: ${googleId})`);

        // Find user by Google ID or Email
        let user = await UserStore.findByGoogleId(googleId);

        if (!user) {
            user = await UserStore.findByEmail(email);
            if (user) {
                // Link Google ID to existing user account
                console.log(`[GoogleAuth] Linking Google ID to existing user account for ${email}`);
                user = await UserStore.update(user.id, {
                    googleId: googleId,
                    profilePicture: user.profilePicture || picture,
                    picture: user.picture || picture
                });
            } else {
                // Auto-create new user account
                console.log(`[GoogleAuth] Automatically creating new user account for ${email}`);
                user = await UserStore.create({
                    fullName: displayName,
                    name: displayName,
                    email: email,
                    googleId: googleId,
                    profilePicture: picture,
                    picture: picture,
                    password: null
                });
            }
        }

        // Generate application JWT access token
        const appToken = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES }
        );

        console.log(`✓ [GoogleAuth] Successful Google login for: ${email}`);
        return res.status(200).json({
            success: true,
            message: "Google login successful!",
            token: appToken,
            user: UserStore.sanitize(user)
        });
    } catch (error) {
        console.error("❌ [GoogleAuth Exception]:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to authenticate with Google."
        });
    }
};

/**
 * FORGOT PASSWORD
 * POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: "Email address is required." });
        }

        const user = await UserStore.findByEmail(email.trim().toLowerCase());
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If an account with that email exists, a password reset link has been sent."
            });
        }

        const resetToken = jwt.sign(
            { id: user.id, email: user.email, type: "password_reset" },
            JWT_SECRET,
            { expiresIn: VERIFY_EXPIRES }
        );

        await sendPasswordResetEmail(user.email, resetToken, user.fullName || user.name);

        return res.status(200).json({
            success: true,
            message: "A password reset link has been sent to your email address."
        });
    } catch (error) {
        console.error("[Forgot Password Error]:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to process forgot password request."
        });
    }
};

/**
 * RESET PASSWORD
 * POST /api/auth/reset-password
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both reset token and new password are required."
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            const errorMsg = err.name === "TokenExpiredError"
                ? "Password reset link has expired (15 mins window). Please request a new one."
                : "Invalid or expired password reset link.";
            return res.status(400).json({ success: false, message: errorMsg });
        }

        if (decoded.type !== "password_reset") {
            return res.status(400).json({ success: false, message: "Invalid reset token type." });
        }

        const user = await UserStore.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User account not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserStore.update(user.id, { password: hashedPassword });

        return res.status(200).json({
            success: true,
            message: "Your password has been successfully reset! You can now log in."
        });
    } catch (error) {
        console.error("[Reset Password Error]:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to reset password."
        });
    }
};

/**
 * GET CURRENT AUTH USER
 * GET /api/auth/me
 */
exports.getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
};
