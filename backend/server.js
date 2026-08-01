const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");

// Validate Required Environment Variables
const requiredEnvVars = [
    "JWT_SECRET",
    "CLIENT_URL",
    "GOOGLE_CLIENT_ID"
];

const missingEnv = requiredEnvVars.filter(varName => {
    const val = process.env[varName];
    return !val || !val.trim() || val.includes("your_google_client_id");
});

if (missingEnv.length > 0) {
    console.error("==================================================");
    console.error("❌ [STARTUP WARNING / ERROR] Missing or Placeholder Environment Variables:");
    missingEnv.forEach(varName => console.error(`   - ${varName}`));
    console.error("Please configure these variables in backend/.env for full functionality.");
    if (missingEnv.includes("SMTP_USER") || missingEnv.includes("SMTP_PASS")) {
        console.error("👉 Gmail verification emails require SMTP_USER (your Gmail) and SMTP_PASS (Google App Password).");
    }
    if (missingEnv.includes("GOOGLE_CLIENT_ID")) {
        console.error("👉 Google OAuth 2.0 requires GOOGLE_CLIENT_ID in backend/.env.");
    }
    console.error("==================================================");
}

const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing & Body Parsing
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// API Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// API Jobs Endpoint
app.get("/api/jobs", (req, res) => {
    const jobs = [
        {
            id: "job_google_swe1",
            roleKey: "softwareengineer",
            company: "Google",
            logo: "fa-brands fa-google",
            officialUrl: "https://careers.google.com",
            title: "Software Engineer I (Early Career)",
            category: "SWE",
            experience: "0-2 yrs",
            skills: ["C++", "Java", "Python", "Data Structures", "Algorithms", "System Design"],
            preferredSkills: ["Go", "Distributed Systems", "GCP"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹18 - ₹32 LPA",
            location: "Mountain View, CA / Bangalore, IN",
            postedDate: "2 days ago",
            deadline: "2026-08-30",
            openingsCount: 12,
            status: "Actively Hiring",
            description: "Google is looking for passionate Early Career Software Engineers to join core infrastructure and web application teams.",
            responsibilities: ["Write scalable, testable code in C++, Java, or Python.", "Design RESTful services.", "Participate in CI/CD pipelines."],
            minQualification: "B.Tech / B.E. / M.Tech in CS or related fields.",
            benefits: ["Medical Insurance", "EPF / 401(k)", "Onsite Dining"],
            hiringProcess: ["Online Coding Challenge", "Technical Screening Call", "4 Onsite Rounds"],
            glassdoorRating: "4.5 ★",
            companyOverview: "Google is a global tech leader organizing world information.",
            companyCulture: "Emphasis on user impact and engineering autonomy.",
            techStack: ["C++", "Java", "Python", "Go", "GCP"]
        },
        {
            id: "job_google_da1",
            roleKey: "dataanalyst",
            company: "Google",
            logo: "fa-brands fa-google",
            officialUrl: "https://careers.google.com",
            title: "Data Analyst - Product Insights",
            category: "DATA",
            experience: "0-2 yrs",
            skills: ["SQL", "Python", "Tableau", "Pandas", "Statistics", "A/B Testing", "Excel"],
            preferredSkills: ["BigQuery", "Looker"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹16 - ₹32 LPA",
            location: "Bangalore, IN",
            postedDate: "1 day ago",
            deadline: "2026-09-01",
            openingsCount: 6,
            status: "Actively Hiring",
            description: "Analyze daily user interaction metrics and optimize product performance.",
            responsibilities: ["Write complex BigQuery SQL.", "Design A/B test experiments.", "Create executive dashboards."],
            minQualification: "Degree in Statistics, CS, or Economics.",
            benefits: ["Medical Coverage", "Wellness Stipend"],
            hiringProcess: ["SQL Screen", "Business Case Study", "Stats Round"],
            glassdoorRating: "4.6 ★",
            companyOverview: "Google analytics teams drive product strategy.",
            companyCulture: "Data-driven decisions and open curiosity.",
            techStack: ["SQL", "BigQuery", "Python", "Tableau"]
        },
        {
            id: "job_deloitte_da1",
            roleKey: "dataanalyst",
            company: "Deloitte",
            logo: "fa-solid fa-chart-pie",
            officialUrl: "https://www2.deloitte.com/careers",
            title: "Data Analytics & BI Consultant",
            category: "DATA",
            experience: "0-1 yrs",
            skills: ["SQL", "Power BI", "Excel", "Python", "Tableau", "Data Modeling"],
            preferredSkills: ["Alteryx", "Snowflake"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹8 - ₹16 LPA",
            location: "Hyderabad, IN",
            postedDate: "3 days ago",
            deadline: "2026-08-25",
            openingsCount: 15,
            status: "Actively Hiring",
            description: "Deliver enterprise data warehouse analytics and BI dashboards for Fortune 500 clients.",
            responsibilities: ["Build Power BI dashboards with DAX.", "SQL data wrangling.", "Client presentations."],
            minQualification: "B.Tech / B.E / BCA / MBA.",
            benefits: ["Health Insurance", "Certification Support"],
            hiringProcess: ["Aptitude & SQL Test", "Power BI Technical Round", "Partner Round"],
            glassdoorRating: "4.2 ★",
            companyOverview: "Deloitte is a global leader in consulting and analytics.",
            companyCulture: "Client excellence and career growth.",
            techStack: ["SQL", "Power BI", "DAX", "Python"]
        },
        {
            id: "job_openai_mle1",
            roleKey: "machinelearningengineer",
            company: "OpenAI",
            logo: "fa-solid fa-brain",
            officialUrl: "https://openai.com/careers",
            title: "Machine Learning Engineer - Foundation Models",
            category: "AI",
            experience: "1-3 yrs",
            skills: ["Python", "PyTorch", "LLMs", "Distributed Systems", "CUDA", "Transformers"],
            preferredSkills: ["vLLM", "FlashAttention"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹35 - ₹70 LPA",
            location: "San Francisco, CA / Remote",
            postedDate: "1 day ago",
            deadline: "2026-09-30",
            openingsCount: 4,
            status: "Actively Hiring",
            description: "Train and scale next-generation foundation models and fast LLM inference engines.",
            responsibilities: ["Implement multi-GPU PyTorch training loops.", "Optimize KV-cache memory.", "Conduct RLHF."],
            minQualification: "Degree in CS or AI with strong PyTorch experience.",
            benefits: ["Top Medical Insurance", "Equity Options"],
            hiringProcess: ["Practical Coding Test", "Distributed Systems Deep Dive"],
            glassdoorRating: "4.8 ★",
            companyOverview: "OpenAI builds safe, beneficial AGI.",
            companyCulture: "Scientific excellence and high talent density.",
            techStack: ["Python", "PyTorch", "CUDA", "Triton"]
        },
        {
            id: "job_paloalto_sec1",
            roleKey: "cybersecurityanalyst",
            company: "Palo Alto Networks",
            logo: "fa-solid fa-shield-cat",
            officialUrl: "https://www.paloaltonetworks.com/careers",
            title: "Cyber Security Threat Analyst",
            category: "CYBER",
            experience: "0-2 yrs",
            skills: ["Network Security", "Wireshark", "Linux", "Python", "SIEM", "Firewalls"],
            preferredSkills: ["Splunk", "CEH"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹18 - ₹35 LPA",
            location: "Bangalore, IN",
            postedDate: "3 days ago",
            deadline: "2026-09-05",
            openingsCount: 6,
            status: "Actively Hiring",
            description: "Analyze PCAPs, configure firewalls, and respond to zero-day security threats.",
            responsibilities: ["Monitor SIEM logs.", "Write Python detection scripts.", "Vulnerability reviews."],
            minQualification: "B.Tech in CS/ECE/IT.",
            benefits: ["Health Insurance", "Certifications Reimbursement"],
            hiringProcess: ["Networking Test", "Wireshark Live Lab", "Manager Round"],
            glassdoorRating: "4.5 ★",
            companyOverview: "Global leader in cybersecurity and cloud security.",
            companyCulture: "Integrity and employee empowerment.",
            techStack: ["Wireshark", "Linux", "Python", "Splunk"]
        },
        {
            id: "job_razorpay_fs1",
            roleKey: "fullstackdeveloper",
            company: "Razorpay",
            logo: "fa-solid fa-credit-card",
            officialUrl: "https://razorpay.com/jobs",
            title: "Full Stack Engineer (MERN)",
            category: "FULLSTACK",
            experience: "0-2 yrs",
            skills: ["React", "Node.js", "Express.js", "TypeScript", "MongoDB", "PostgreSQL", "REST APIs"],
            preferredSkills: ["Redis", "Docker"],
            jobType: "Full-Time",
            workMode: "Hybrid",
            salary: "₹18 - ₹34 LPA",
            location: "Bangalore, IN",
            postedDate: "1 day ago",
            deadline: "2026-08-28",
            openingsCount: 10,
            status: "Actively Hiring",
            description: "Build checkout UIs and payment microservices.",
            responsibilities: ["React components.", "Node.js REST APIs.", "Automated unit tests."],
            minQualification: "B.Tech / MCA / B.E.",
            benefits: ["Medical", "Wellness Allowance", "MacBook Pro"],
            hiringProcess: ["Machine Coding (2.5 hrs)", "Architecture Round"],
            glassdoorRating: "4.3 ★",
            companyOverview: "India's leading payments infrastructure provider.",
            companyCulture: "Engineering ownership and transparency.",
            techStack: ["React", "Node.js", "TypeScript", "PostgreSQL"]
        }
    ];

    res.json({ success: true, count: jobs.length, jobs });
});

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath, { etag: false, maxAge: 0 }));

// Fallback to index.html for non-API frontend routes
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(frontendPath, "index.html"));
    } else {
        res.status(404).json({ success: false, message: "API route not found" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 AI Career Coach Server listening on port ${PORT}`);
    console.log(`🌐 Application URL: http://localhost:${PORT}`);
    console.log(`==================================================`);
});
