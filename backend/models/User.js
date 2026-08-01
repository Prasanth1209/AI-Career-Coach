const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const usersFilePath = path.join(dataDir, "users.json");

// Ensure data directory and users.json exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2), "utf8");
}

class UserStore {
    static _readUsers() {
        try {
            const data = fs.readFileSync(usersFilePath, "utf8");
            return JSON.parse(data || "[]");
        } catch (error) {
            console.error("Error reading users file:", error);
            return [];
        }
    }

    static _writeUsers(users) {
        try {
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
        } catch (error) {
            console.error("Error writing users file:", error);
        }
    }

    static async findByEmail(email) {
        if (!email) return null;
        const users = this._readUsers();
        return users.find(u => u.email.toLowerCase() === String(email).trim().toLowerCase()) || null;
    }

    static async findById(id) {
        if (!id) return null;
        const users = this._readUsers();
        return users.find(u => u.id === id) || null;
    }

    static async findByGoogleId(googleId) {
        if (!googleId) return null;
        const users = this._readUsers();
        return users.find(u => u.googleId === googleId) || null;
    }

    static async create(userData) {
        const users = this._readUsers();
        const displayName = userData.fullName || userData.name || "";
        const displayPicture = userData.profilePicture || userData.picture || "";

        const newUser = {
            id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            fullName: displayName.trim(),
            name: displayName.trim(), // for backwards compatibility
            email: userData.email ? userData.email.trim().toLowerCase() : "",
            password: userData.password || null, // hashed password or null for Google OAuth
            googleId: userData.googleId || null,
            profilePicture: displayPicture,
            picture: displayPicture, // for backwards compatibility
            mobile: userData.mobile ? userData.mobile.trim() : "",
            college: userData.college ? userData.college.trim() : "",
            branch: userData.branch ? userData.branch.trim() : "",
            graduation_year: userData.graduation_year || 2026,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        users.push(newUser);
        this._writeUsers(users);
        return newUser;
    }

    static async update(id, updates) {
        const users = this._readUsers();
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;

        users[index] = {
            ...users[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this._writeUsers(users);
        return users[index];
    }

    static sanitize(user) {
        if (!user) return null;
        const { password, ...safeUser } = user;
        return safeUser;
    }
}

module.exports = UserStore;
