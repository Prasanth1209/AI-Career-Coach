# AI Career Coach - Full-Stack Campus Placement Portal

An intelligent full-stack web application designed for student career guidance, automated resume ATS analysis, skill gap tracking, mock interview practice, and Google OAuth 2.0 authentication.

---

## 📁 Project Structure

```
ai student project/
│
├── frontend/                  # Client-side Web Application
│   ├── index.html             # HTML5 UI & Google Auth Integration
│   ├── app.js                 # Frontend Controller & Logic
│   ├── data.js                # Career & Placement Datasets
│   └── styles.css             # Glassmorphism Design System & Styling
│
├── backend/                   # Node.js + Express Backend Server
│   ├── .env                   # Environment Variables & OAuth Credentials
│   ├── server.js              # Express Application Server
│   ├── package.json           # Dependencies & Scripts
│   ├── config/
│   │   └── mail.js            # Gmail SMTP Transport Config
│   ├── controllers/
│   │   └── authController.js  # Auth (Register, Login, Google OAuth, Reset Password)
│   ├── data/
│   │   └── users.json         # JSON Storage Database
│   ├── middleware/
│   │   └── verifyToken.js     # JWT Verification Middleware
│   ├── models/
│   │   └── User.js            # User Model & Data Operations
│   ├── routes/
│   │   └── auth.js            # Auth API Routes
│   └── utils/
│       └── sendPasswordResetEmail.js # Password Reset Email Helper
│
└── README.md                  # Project Documentation
```

---

## 🚀 How to Run the Project

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) installed on your system.

### 2. Installation
Navigate to the `backend/` directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Start the Server
Run the development server using `nodemon`:

```bash
npm run dev
```

Or start standard Node server:

```bash
npm start
```

### 4. Access the Web Application
Open your browser and navigate to:

👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
* `POST /api/auth/register` - Register a new user account
* `POST /api/auth/login` - Local email/password login
* `POST /api/auth/google` - Google OAuth 2.0 login & auto-registration
* `POST /api/auth/forgot-password` - Send password reset link to user email
* `POST /api/auth/reset-password` - Reset password using reset token
* `GET /api/auth/me` - Fetch currently authenticated user details (JWT required)

.