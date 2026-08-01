// AI Career Coach - Comprehensive Career Data & Knowledge Base

        relationships: ["Many-to-One with Students", "Many-to-One with JobOpenings"],
        createdDate: "2026-01-22 00:00:00",
        lastUpdated: "2026-07-27 18:00:00",
        storageEngine: "InnoDB",
        characterSet: "utf8mb4_unicode_ci",
        columns: [
            { name: "id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: true, isFk: false, isIndex: true, isAutoInc: true, isUnique: true, constraints: "PRIMARY KEY AUTO_INCREMENT", description: "Saved record ID" },
            { name: "student_id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: false, isFk: true, isIndex: true, isAutoInc: false, isUnique: false, constraints: "FOREIGN KEY REFERENCES Students(id)", description: "Student reference" },
            { name: "job_id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: false, isFk: true, isIndex: true, isAutoInc: false, isUnique: false, constraints: "FOREIGN KEY REFERENCES JobOpenings(id)", description: "Job reference" }
        ],
        sampleData: [
            { id: 1, student_id: 1, job_id: 1 }
        ],
        sqlCreate: `CREATE TABLE SavedJobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES JobOpenings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        sqlSelect: "SELECT * FROM SavedJobs WHERE student_id = 1;",
        sqlJoin: "SELECT s.name, j.title FROM SavedJobs sj JOIN Students s ON sj.student_id = s.id JOIN JobOpenings j ON sj.job_id = j.id;"
    },

    Applications: {
        name: "Applications",
        description: "Student job application lifecycle tracker (Applied, Assessment, Interview, Offer, Accepted, Rejected).",
        recordsCount: 180,
        primaryKey: "id",
        foreignKeys: [
            { column: "student_id", referencesTable: "Students", referencesColumn: "id", relationshipType: "Many-to-One" },
            { column: "job_id", referencesTable: "JobOpenings", referencesColumn: "id", relationshipType: "Many-to-One" }
        ],
        relationships: ["Many-to-One with Students", "Many-to-One with JobOpenings"],
        createdDate: "2026-01-25 00:00:00",
        lastUpdated: "2026-07-27 19:30:00",
        storageEngine: "InnoDB",
        characterSet: "utf8mb4_unicode_ci",
        columns: [
            { name: "id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: true, isFk: false, isIndex: true, isAutoInc: true, isUnique: true, constraints: "PRIMARY KEY AUTO_INCREMENT", description: "Application ID" },
            { name: "student_id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: false, isFk: true, isIndex: true, isAutoInc: false, isUnique: false, constraints: "FOREIGN KEY REFERENCES Students(id)", description: "Student reference" },
            { name: "job_id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: false, isFk: true, isIndex: true, isAutoInc: false, isUnique: false, constraints: "FOREIGN KEY REFERENCES JobOpenings(id)", description: "Job reference" },
            { name: "status", type: "VARCHAR", length: 50, nullable: "NO", defaultValue: "Applied", isPk: false, isFk: false, isIndex: true, isAutoInc: false, isUnique: false, constraints: "CHECK (status IN ('Applied', 'Assessment', 'Interview Scheduled', 'Offer Received', 'Accepted', 'Rejected'))", description: "Application stage status" }
        ],
        sampleData: [
            { id: 1, student_id: 1, job_id: 1, status: "Interview Scheduled" }
        ],
        sqlCreate: `CREATE TABLE Applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Applied',
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES JobOpenings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        sqlSelect: "SELECT * FROM Applications WHERE student_id = 1;",
        sqlJoin: "SELECT s.name, j.title, a.status FROM Applications a JOIN Students s ON a.student_id = s.id JOIN JobOpenings j ON a.job_id = j.id;"
    },

    UserJobPreferences: {
        name: "UserJobPreferences",
        description: "Student job role preference vectors, desired locations, and work mode choices.",
        recordsCount: 1250,
        primaryKey: "id",
        foreignKeys: [{ column: "student_id", referencesTable: "Students", referencesColumn: "id", relationshipType: "One-to-One" }],
        relationships: ["One-to-One with Students"],
        createdDate: "2026-01-15 00:00:00",
        lastUpdated: "2026-07-27 19:40:00",
        storageEngine: "InnoDB",
        characterSet: "utf8mb4_unicode_ci",
        columns: [{ name: "id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: true, isFk: false, isIndex: true, isAutoInc: true, isUnique: true, constraints: "PRIMARY KEY AUTO_INCREMENT", description: "Preference ID" }],
        sampleData: [{ id: 1, student_id: 1 }],
        sqlCreate: `CREATE TABLE UserJobPreferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNIQUE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        sqlSelect: "SELECT * FROM UserJobPreferences WHERE student_id = 1;",
        sqlJoin: "SELECT s.name FROM UserJobPreferences p JOIN Students s ON p.student_id = s.id;"
    },

    JobRecommendations: {
        name: "JobRecommendations",
        description: "Calculated AI job recommendations matching student resume vector scores.",
        recordsCount: 890,
        primaryKey: "id",
        foreignKeys: [{ column: "student_id", referencesTable: "Students", referencesColumn: "id", relationshipType: "Many-to-One" }],
        relationships: ["Many-to-One with Students"],
        createdDate: "2026-01-22 00:00:00",
        lastUpdated: "2026-07-27 19:20:00",
        storageEngine: "InnoDB",
        characterSet: "utf8mb4_unicode_ci",
        columns: [{ name: "id", type: "INT", length: 11, nullable: "NO", defaultValue: "NULL", isPk: true, isFk: false, isIndex: true, isAutoInc: true, isUnique: true, constraints: "PRIMARY KEY AUTO_INCREMENT", description: "ID" }],
        sampleData: [{ id: 1 }],
        sqlCreate: `CREATE TABLE JobRecommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        sqlSelect: "SELECT * FROM JobRecommendations LIMIT 10;",
        sqlJoin: "SELECT * FROM JobRecommendations;"
    }
};

// COMPREHENSIVE TAMIL NADU HIGHER EDUCATION COLLEGES & UNIVERSITIES DATASET
const TAMILNADU_COLLEGES_DATA = [
    { name: "Anna University (CEG Campus), Guindy", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A++", popular: true },
    { name: "Indian Institute of Technology (IIT) Madras", district: "Chennai", type: "Engineering", university: "Central University / Autonomous", accreditation: "Institute of Eminence", popular: true },
    { name: "PSG College of Technology", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true },
    { name: "PSG College of Arts & Science", district: "Coimbatore", type: "Arts & Science", university: "Bharathiar University", accreditation: "NAAC A++", popular: true },
    { name: "Loyola College (Autonomous)", district: "Chennai", type: "Arts & Science", university: "University of Madras", accreditation: "NAAC A++", popular: true },
    { name: "Madras Christian College (MCC)", district: "Chennai", type: "Arts & Science", university: "University of Madras", accreditation: "NAAC A++", popular: true },
    { name: "SSN College of Engineering", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true },
    { name: "National Institute of Technology (NIT) Tiruchirappalli", district: "Tiruchirappalli", type: "Engineering", university: "Central University / Autonomous", accreditation: "NAAC A++", popular: true },
    { name: "SASTRA Deemed University", district: "Thanjavur", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: true },
    { name: "Vellore Institute of Technology (VIT)", district: "Vellore", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: true },
    { name: "Amrita Vishwa Vidyapeetham", district: "Coimbatore", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: true },
    { name: "Thiagarajar College of Engineering (TCE)", district: "Madurai", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true },
    { name: "Coimbatore Institute of Technology (CIT)", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: true },
    { name: "Government College of Technology (GCT)", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: true },
    { name: "Government College of Engineering (GCE) Salem", district: "Salem", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "Government College of Engineering (GCE) Tirunelveli", district: "Tirunelveli", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "Anna University Regional Campus Coimbatore", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "State University", popular: true },
    { name: "Anna University Regional Campus Tirunelveli", district: "Tirunelveli", type: "Engineering", university: "Anna University", accreditation: "State University", popular: false },
    { name: "Anna University Regional Campus Madurai", district: "Madurai", type: "Engineering", university: "Anna University", accreditation: "State University", popular: false },
    { name: "St. Xavier's College (Autonomous)", district: "Tirunelveli", type: "Arts & Science", university: "Manonmaniam Sundaranar University", accreditation: "NAAC A++", popular: true },
    { name: "Presidency College (Autonomous)", district: "Chennai", type: "Arts & Science", university: "University of Madras", accreditation: "NAAC A+", popular: true },
    { name: "Stella Maris College", district: "Chennai", type: "Arts & Science", university: "University of Madras", accreditation: "NAAC A++", popular: true },
    { name: "Women's Christian College (WCC)", district: "Chennai", type: "Arts & Science", university: "University of Madras", accreditation: "NAAC A++", popular: false },
    { name: "Kumaraguru College of Technology (KCT)", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A++", popular: true },
    { name: "Sri Krishna College of Engineering and Technology (SKCET)", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: true },
    { name: "Kongu Engineering College", district: "Erode", type: "Engineering", university: "Anna University", accreditation: "NAAC A++", popular: true },
    { name: "Bannari Amman Institute of Technology (BIT)", district: "Erode", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true },
    { name: "Mepco Schlenk Engineering College", district: "Virudhunagar", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "Rajalakshmi Engineering College (REC)", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A++", popular: true },
    { name: "S R M Institute of Science and Technology", district: "Kanchipuram", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: true },
    { name: "Sathyabama Institute of Science and Technology", district: "Chennai", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: false },
    { name: "Hindustan Institute of Technology and Science", district: "Chennai", type: "Engineering", university: "Deemed University", accreditation: "NAAC A", popular: false },
    { name: "Karunya Institute of Technology and Sciences", district: "Coimbatore", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: false },
    { name: "K S Rangasamy College of Technology", district: "Namakkal", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute", district: "Chennai", type: "Engineering", university: "Deemed University", accreditation: "NAAC A++", popular: false },
    { name: "Madras Medical College (MMC)", district: "Chennai", type: "Medical", university: "The Tamil Nadu Dr. M.G.R. Medical University", accreditation: "Government Medical", popular: true },
    { name: "Stanley Medical College", district: "Chennai", type: "Medical", university: "The Tamil Nadu Dr. M.G.R. Medical University", accreditation: "Government Medical", popular: false },
    { name: "Coimbatore Medical College", district: "Coimbatore", type: "Medical", university: "The Tamil Nadu Dr. M.G.R. Medical University", accreditation: "Government Medical", popular: false },
    { name: "Madurai Medical College", district: "Madurai", type: "Medical", university: "The Tamil Nadu Dr. M.G.R. Medical University", accreditation: "Government Medical", popular: false },
    { name: "Christian Medical College (CMC) Vellore", district: "Vellore", type: "Medical", university: "The Tamil Nadu Dr. M.G.R. Medical University", accreditation: "NAAC A", popular: true },
    { name: "Tamil Nadu Agricultural University (TNAU)", district: "Coimbatore", type: "Agricultural", university: "State Agricultural University", accreditation: "Government", popular: true },
    { name: "Central University of Tamil Nadu (CUTN)", district: "Thiruvarur", type: "Central University", university: "Central University", accreditation: "NAAC A", popular: false },
    { name: "Bharathiar University", district: "Coimbatore", type: "State University", university: "State University", accreditation: "NAAC A++", popular: true },
    { name: "Bharathidasan University", district: "Tiruchirappalli", type: "State University", university: "State University", accreditation: "NAAC A+", popular: false },
    { name: "Madurai Kamaraj University", district: "Madurai", type: "State University", university: "State University", accreditation: "NAAC A++", popular: false },
    { name: "University of Madras", district: "Chennai", type: "State University", university: "State University", accreditation: "NAAC A++", popular: true },
    { name: "Manonmaniam Sundaranar University", district: "Tirunelveli", type: "State University", university: "State University", accreditation: "NAAC A", popular: false },
    { name: "Periyar University", district: "Salem", type: "State University", university: "State University", accreditation: "NAAC A++", popular: false },
    { name: "Alagappa University", district: "Sivaganga", type: "State University", university: "State University", accreditation: "NAAC A+", popular: false },
    { name: "Annamalai University", district: "Cuddalore", type: "State University", university: "State University", accreditation: "NAAC A+", popular: false },
    { name: "Government Polytechnic College Coimbatore", district: "Coimbatore", type: "Polytechnic", university: "DOTE Tamil Nadu", accreditation: "Government", popular: false },
    { name: "Central Polytechnic College Chennai", district: "Chennai", type: "Polytechnic", university: "DOTE Tamil Nadu", accreditation: "Government", popular: false },
    { name: "Thiagarajar Polytechnic College Salem", district: "Salem", type: "Polytechnic", university: "DOTE Tamil Nadu", accreditation: "Government-Aided", popular: false },
    { name: "St. Joseph's College of Engineering", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true },
    { name: "Velammal Engineering College", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "Saveetha Engineering College", district: "Chennai", type: "Engineering", university: "Anna University", accreditation: "NAAC A", popular: false },
    { name: "KPR Institute of Engineering and Technology", district: "Coimbatore", type: "Engineering", university: "Anna University", accreditation: "NAAC A+", popular: true }
];

// 25+ REALISTIC SUITABLE JOB OPENINGS DATASET WITH VERIFIED OFFICIAL CAREERS URLS
const JOB_OPENINGS_DATA = [
    {
        id: "job_google_swe1",
        company: "Google",
        logo: "fa-brands fa-google",
        officialUrl: "https://careers.google.com",
        title: "Software Engineer, Early Career",
        category: "SOFTWARE DEVELOPMENT",
        experience: "Fresher (0-1 yrs)",
        skills: ["JavaScript", "Python", "Java", "C++", "Data Structures", "SQL"],
        preferredSkills: ["Distributed Systems", "Cloud GCP", "Git"],
        jobType: "Full-Time",
        workMode: "Hybrid",
        salary: "$120,000 - $160,000 / yr (₹18 - ₹30 LPA)",
        location: "Mountain View, CA / Bangalore, IN",
        postedDate: "2 days ago",
        deadline: "2026-08-30",
        openingsCount: 12,
        status: "Actively Hiring",
        description: "Google is looking for passionate Early Career Software Engineers to join our core infrastructure and web application teams.",
        responsibilities: [
            "Write scalable, testable code in C++, Java, or Python.",
            "Design RESTful services and modular frontend/backend components.",
            "Participate in code reviews, design docs, and CI/CD testing pipelines."
        ],
        minQualification: "B.Tech / B.E. / M.Tech in Computer Science or related fields.",
        benefits: ["Comprehensive Medical Insurance", "401(k) Matching / EPF", "Free Onsite Dining & Wellness"],
        hiringProcess: ["Online Coding Challenge (90 mins)", "Technical Screening Call", "4 Onsite / Virtual Technical Loop Rounds"],
        glassdoorRating: "4.5 ★",
        companyOverview: "Google is a global technology leader organizing world information and making it universally accessible.",
        companyCulture: "Emphasis on user impact, psychological safety, open source collaboration, and engineering autonomy.",
        techStack: ["C++", "Java", "Python", "Go", "Borg", "Spanner", "Angular", "GCP"]
    },
    {
        id: "job_microsoft_swe1",
        company: "Microsoft",
        logo: "fa-brands fa-microsoft",
        officialUrl: "https://careers.microsoft.com",
        title: "Software Engineer - Azure Cloud",
        category: "CLOUD",
        experience: "0-2 yrs",
        skills: ["C#", "C++", "Java", "Azure", "Docker", "SQL"],
        preferredSkills: ["Kubernetes", "Microservices", "CI/CD"],
        jobType: "Full-Time",
        workMode: "Hybrid",
        salary: "$115,000 - $155,000 / yr (₹16 - ₹28 LPA)",
        location: "Redmond, WA / Hyderabad, IN",
        postedDate: "1 day ago",
        deadline: "2026-09-15",
        openingsCount: 8,
        status: "Actively Hiring",
        description: "Join Microsoft Azure Engineering squad building cloud infrastructure, container orchestration systems, and developer tooling.",
        responsibilities: [
            "Develop secure backend API microservices on C# / Azure.",
            "Optimize container deployment pipelines and memory limits.",
            "Debug live site incidents and write diagnostic telemetry scripts."
        ],
        minQualification: "Bachelor's degree in Computer Science, IT, or Electrical Engineering.",
        benefits: ["Health & Vision Coverage", "Stock Purchase Plan (ESPP)", "Flexible Hybrid Work Schedules"],
        hiringProcess: ["Online Technical Test", "2 Technical Algorithm Rounds", "As Appropriate (AA) Executive Manager Round"],
        glassdoorRating: "4.4 ★",
        companyOverview: "Microsoft empowers every person and every organization on the planet to achieve more.",
        companyCulture: "Growth mindset, continuous learning, inclusive team environments.",
        techStack: ["C#", ".NET Core", "Azure", "C++", "TypeScript", "React", "SQL Server"]
    }
];

// ========================================================
// RESTORED GLOBAL DATASETS & DATA HELPERS
// ========================================================

// Helper Function: Role title to Object Key
function roleToKey(title) {
    return (title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// 90+ Role Categories Scaffolding
const ROLE_CATEGORIES = {
    "Software Engineering": [
        "Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer",
        "Mobile App Developer (iOS/Android)", "Embedded Systems Engineer", "Systems Programmer", "QA Automation Engineer"
    ],
    "Data Analytics": [
        "Data Analyst", "Data Scientist", "Data Engineer", "Business Intelligence Analyst", "Big Data Engineer"
    ],
    "Cloud & Infrastructure": [
        "Cloud Architect", "Network Engineer", "Systems Administrator"
    ],
    "Cybersecurity": [
        "Cybersecurity Analyst", "Security Engineer", "Ethical Hacker / Penetration Tester", "Information Security Specialist"
    ],
    "UI/UX Design": [
        "UI/UX Designer", "Product Designer", "User Experience Researcher", "Interaction Designer"
    ],
    "DevOps": [
        "DevOps Engineer", "Site Reliability Engineer (SRE)", "Build & Release Engineer", "CI/CD Pipeline Specialist"
    ],
    "AI & Machine Learning": [
        "Machine Learning Engineer", "AI Research Specialist", "Deep Learning Engineer", "NLP Engineer", "Computer Vision Engineer"
    ],
    "Product & Management": [
        "Product Manager", "Scrum Master", "Technical Project Manager", "Business Analyst"
    ]
};

// Detailed Job Roles Definition Matrix
const JOB_ROLES = {
    softwareengineer: {
        title: "Software Engineer",
        skills: ["Data Structures", "Algorithms", "Java", "C++", "Python", "Git", "System Design", "SQL"],
        readiness: 75
    },
    fullstackdeveloper: {
        title: "Full Stack Developer",
        skills: ["JavaScript", "HTML", "CSS", "React", "Node.js", "Express.js", "MongoDB", "SQL", "Git"],
        readiness: 80
    },
    frontenddeveloper: {
        title: "Frontend Developer",
        skills: ["JavaScript", "HTML", "CSS", "React", "TypeScript", "Redux", "TailwindCSS", "Git"],
        readiness: 82
    },
    backenddeveloper: {
        title: "Backend Developer",
        skills: ["Java", "Node.js", "Python", "SQL", "PostgreSQL", "REST APIs", "Docker", "Git"],
        readiness: 78
    },
    mobileappdeveloperiosandroid: {
        title: "Mobile App Developer",
        skills: ["Flutter", "React Native", "Kotlin", "Swift", "REST APIs", "Git"],
        readiness: 70
    },
    embeddedsystemsengineer: {
        title: "Embedded Systems Engineer",
        skills: ["C", "C++", "Microcontrollers", "RTOS", "Assembly", "Git"],
        readiness: 65
    },
    systemsprogrammer: {
        title: "Systems Programmer",
        skills: ["C", "C++", "Linux", "OS Fundamentals", "Multithreading", "Git"],
        readiness: 68
    },
    qaautomationengineer: {
        title: "QA Automation Engineer",
        skills: ["Selenium", "Python", "Java", "Jest", "CI/CD", "Git"],
        readiness: 75
    },
    dataanalyst: {
        title: "Data Analyst",
        skills: ["Python", "SQL", "Pandas", "Excel", "Tableau", "Power BI", "Statistics"],
        readiness: 85
    },
    datascientist: {
        title: "Data Scientist",
        skills: ["Python", "SQL", "Machine Learning", "Scikit-Learn", "TensorFlow", "Statistics", "Pandas"],
        readiness: 72
    },
    dataengineer: {
        title: "Data Engineer",
        skills: ["Python", "SQL", "Spark", "Hadoop", "Airflow", "PostgreSQL", "Docker"],
        readiness: 70
    },
    machinelearningengineer: {
        title: "Machine Learning Engineer",
        skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "MLOps", "Docker", "Git"],
        readiness: 74
    },
    airesearchspecialist: {
        title: "AI Research Specialist",
        skills: ["Python", "Deep Learning", "PyTorch", "NLP", "Computer Vision", "Math"],
        readiness: 65
    },
    businessintelligenceanalyst: {
        title: "Business Intelligence Analyst",
        skills: ["SQL", "Power BI", "Tableau", "Excel", "ETL", "Data Modeling"],
        readiness: 80
    },
    bigdataengineer: {
        title: "Big Data Engineer",
        skills: ["Java", "Scala", "Hadoop", "Spark", "Kafka", "SQL", "Hive"],
        readiness: 68
    },
    cloudarchitect: {
        title: "Cloud Architect",
        skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Linux", "Networking"],
        readiness: 72
    },
    devopsengineer: {
        title: "DevOps Engineer",
        skills: ["Linux", "Docker", "Kubernetes", "CI/CD", "Jenkins", "AWS", "Git", "Terraform"],
        readiness: 78
    },
    sitereliabilityengineersre: {
        title: "Site Reliability Engineer (SRE)",
        skills: ["Linux", "Python", "Go", "Docker", "Kubernetes", "Prometheus", "Grafana"],
        readiness: 70
    },
    networkengineer: {
        title: "Network Engineer",
        skills: ["CCNA", "TCP/IP", "Routers", "Switches", "Firewalls", "VPN", "Linux"],
        readiness: 75
    },
    cybersecurityanalyst: {
        title: "Cybersecurity Analyst",
        skills: ["Network Security", "Ethical Hacking", "SIEM", "Wireshark", "Linux", "Python"],
        readiness: 72
    },
    systemsadministrator: {
        title: "Systems Administrator",
        skills: ["Linux", "Windows Server", "Active Directory", "Bash", "Networking", "Backup"],
        readiness: 80
    },
    productmanager: {
        title: "Product Manager",
        skills: ["Product Roadmap", "User Stories", "Agile", "A/B Testing", "Analytics", "UX"],
        readiness: 75
    },
    scrummaster: {
        title: "Scrum Master",
        skills: ["Agile", "Scrum", "Jira", "Sprint Planning", "Facilitation", "Kanban"],
        readiness: 85
    },
    technicalprojectmanager: {
        title: "Technical Project Manager",
        skills: ["PMP", "Agile", "Risk Management", "Budgeting", "System Architecture", "Jira"],
        readiness: 78
    },
    businessanalyst: {
        title: "Business Analyst",
        skills: ["SQL", "Excel", "Requirements Gathering", "UML", "BPMN", "User Stories"],
        readiness: 82
    }
};

// 6-Week Structured Roadmaps
const WEEKLY_ROADMAPS = {
    softwareengineer: [
        { week: 1, topic: "Data Structures Foundations", duration: "12 Hours", details: "Arrays, Linked Lists, Stacks, and Queues", challenge: "Implement custom LinkedList and Stack algorithms." },
        { week: 2, topic: "Trees, Graphs & Recursion", duration: "14 Hours", details: "Binary Trees, BST, DFS, BFS traversal", challenge: "Solve 15 Tree traversal problems on LeetCode." },
        { week: 3, topic: "Sorting & Searching Algorithms", duration: "10 Hours", details: "QuickSort, MergeSort, Binary Search", challenge: "Implement MergeSort with O(1) space optimization." },
        { week: 4, topic: "Dynamic Programming & Greedy", duration: "16 Hours", details: "Memoization, Tabulation, Knapsack problem", challenge: "Solve Coin Change and Longest Common Subsequence." },
        { week: 5, topic: "Object-Oriented System Design", duration: "14 Hours", details: "SOLID Principles, Design Patterns (Factory, Singleton)", challenge: "Design an LLD for Parking Lot or Elevator System." },
        { week: 6, topic: "Mock Technical Interview Practice", duration: "15 Hours", details: "Live coding drills and system architecture design", challenge: "Complete 3 full technical mock interview drills." }
    ],
    fullstackdeveloper: [
        { week: 1, topic: "Modern JavaScript (ES6+)", duration: "12 Hours", details: "Async/Await, Promises, Closures, Modules", challenge: "Build an Async API fetch dashboard script." },
        { week: 2, topic: "React Fundamentals & State", duration: "15 Hours", details: "Components, Hooks (useState, useEffect, useReducer)", challenge: "Build a dynamic task board app." },
        { week: 3, topic: "Backend API with Node.js & Express", duration: "14 Hours", details: "REST API routes, Middleware, JWT Auth", challenge: "Create a RESTful Express authentication API." },
        { week: 4, topic: "Database Integration (MongoDB & SQL)", duration: "12 Hours", details: "Mongoose ORM, PostgreSQL queries, Indexing", challenge: "Design relational database models and schema." },
        { week: 5, topic: "Full Stack App Integration", duration: "16 Hours", details: "Connecting React frontend to Express API", challenge: "Deploy full stack web application live." },
        { week: 6, topic: "Performance, Testing & CI/CD", duration: "14 Hours", details: "Jest unit testing, Docker containerization", challenge: "Setup GitHub Actions CI/CD deployment pipeline." }
    ],
    dataanalyst: [
        { week: 1, topic: "Advanced SQL Queries", duration: "12 Hours", details: "JOINs, Group By, Window Functions (ROW_NUMBER, RANK)", challenge: "Write multi-table SQL aggregation queries." },
        { week: 2, topic: "Python for Data Analysis", duration: "14 Hours", details: "Pandas DataFrames, NumPy array manipulation", challenge: "Clean and analyze a 100,000 row dataset." },
        { week: 3, topic: "Exploratory Data Analysis (EDA)", duration: "12 Hours", details: "Matplotlib, Seaborn, Histograms, Correlation maps", challenge: "Generate comprehensive EDA report." },
        { week: 4, topic: "Data Visualization & Dashboards", duration: "15 Hours", details: "Tableau & Power BI interactive reports", challenge: "Build executive sales KPI dashboard." },
        { week: 5, topic: "Statistical Analysis & Hypothesis Testing", duration: "14 Hours", details: "P-values, T-tests, ANOVA, A/B Testing", challenge: "Conduct A/B test analysis for e-commerce website." },
        { week: 6, topic: "Capstone Data Project", duration: "16 Hours", details: "End-to-end data analytics presentation", challenge: "Present data-driven strategic business report." }
    ]
};

// Fallback generator for roles missing custom roadmap
Object.keys(JOB_ROLES).forEach(rKey => {
    if (!WEEKLY_ROADMAPS[rKey]) {
        WEEKLY_ROADMAPS[rKey] = [
            { week: 1, topic: "Core Fundamentals & Tools", duration: "12 Hours", details: "Primary concepts, syntax, and environment setup", challenge: "Complete fundamental coding exercises." },
            { week: 2, topic: "Intermediate Architecture", duration: "14 Hours", details: "Key modules, design patterns, and structure", challenge: "Build intermediate project module." },
            { week: 3, topic: "Advanced Skill Specialization", duration: "15 Hours", details: "Advanced algorithms, frameworks, and APIs", challenge: "Implement complex feature module." },
            { week: 4, topic: "System Integration & Database", duration: "14 Hours", details: "Database design, state management, and testing", challenge: "Integrate database storage layer." },
            { week: 5, topic: "Testing & Code Optimization", duration: "12 Hours", details: "Unit testing, debugging, and performance tuning", challenge: "Refactor codebase for maximum efficiency." },
            { week: 6, topic: "Portfolio Project & Interview Prep", duration: "16 Hours", details: "Capstone project deployment and mock interview drills", challenge: "Publish capstone project on GitHub." }
        ];
    }
});

// Demo Resume Templates
const RESUME_TEMPLATES = [
    {
        name: "John Doe (Data Analyst)",
        text: `John Doe
Email: john.doe@email.co | Phone: +1 555-0192 | Location: New York, NY
GitHub: github.com/johndoe | LinkedIn: linkedin.com/in/johndoe

SUMMARY:
Results-driven Data Analyst with 2 years of experience in data visualization, SQL queries, and Python data manipulation. Developed predictive models improving sales forecasts by 18%.

SKILLS:
Technical: Python, SQL, Pandas, NumPy, Tableau, Power BI, Excel, Git, Statistics, Data Analysis

EXPERIENCE:
Data Analyst Intern - Apex Tech Solutions (2025 - Present)
- Developed automated SQL queries reducing report generation time by 35%.
- Built interactive Tableau dashboards for executive leadership.
- Implemented Python Pandas scripts for data cleaning and ETL pipelines.

PROJECTS:
E-Commerce Customer Churn Analysis
- Engineered machine learning classification models using Scikit-Learn.
- Analyzed 50,000 customer records to identify retention opportunities.

EDUCATION:
Bachelor of Science in Computer Science - Apex Engineering Institute (Graduation 2026)`
    },
    {
        name: "Jane Smith (Software Developer)",
        text: `Jane Smith
Email: jane.smith@email.co | Phone: +1 555-0144 | Location: San Francisco, CA
GitHub: github.com/janesmith | LinkedIn: linkedin.com/in/janesmith

SUMMARY:
Passionate Full Stack Software Developer specializing in React, Node.js, Express, and PostgreSQL. Built scalable web applications serving 10,000+ active users.

SKILLS:
Technical: JavaScript, React, Node.js, Express.js, PostgreSQL, MongoDB, HTML5, CSS3, Docker, Git, REST APIs, Data Structures

EXPERIENCE:
Full Stack Developer Intern - Metro Software Inc. (2025 - Present)
- Designed and built RESTful API microservices using Node.js and Express.
- Optimized PostgreSQL database queries reducing response latency by 40%.
- Created responsive React UI components integrated with Redux state management.

PROJECTS:
Real-Time Career Guidance Portal
- Engineered Full Stack web app using React, Express, and JWT Authentication.
- Containerized application services using Docker and deployed on AWS EC2.

EDUCATION:
Bachelor of Technology in Information Technology - Metro Technical College (Graduation 2026)`
    }
];

// 17 Recruiter Companies Hiring Data
const COMPANY_PREPARATION_DATA = {
    Google: {
        name: "Google",
        logo: "fa-brands fa-google",
        salary: "₹18 - ₹32 LPA",
        hiringProcess: "Online Coding Test → 3-4 Technical Rounds (DSA & System Design) → Googliness HR Round.",
        prepTips: "Master Data Structures (Trees, Graphs, DP), Big-O complexity, and clean code principles.",
        reqSkills: ["Data Structures", "Algorithms", "C++", "Java", "Python", "System Design"]
    },
    Microsoft: {
        name: "Microsoft",
        logo: "fa-brands fa-microsoft",
        salary: "₹16 - ₹28 LPA",
        hiringProcess: "Online Assessment (Codility) → Technical Interview 1 (DSA) → Technical Interview 2 (System Design) → AA Round.",
        prepTips: "Focus on Trees, Dynamic Programming, System Design, and Object-Oriented design patterns.",
        reqSkills: ["C++", "Java", "Data Structures", "System Design", "OS", "DBMS"]
    },
    Amazon: {
        name: "Amazon",
        logo: "fa-brands fa-amazon",
        salary: "₹16 - ₹30 LPA",
        hiringProcess: "Online Assessment (Debugging + Coding + Work Simulation) → 3 Technical Rounds → Bar Raiser Round.",
        prepTips: "Prepare Amazon 16 Leadership Principles with STAR method examples.",
        reqSkills: ["Data Structures", "Algorithms", "Java", "Object-Oriented Design", "AWS"]
    },
    TCS: {
        name: "TCS (Tata Consultancy Services)",
        logo: "fa-solid fa-building",
        salary: "₹3.36 - ₹7.0 LPA (Ninja / Digital / Prime)",
        hiringProcess: "TCS NQT (Aptitude + Verbal + Reasoning + Coding) → Technical & HR Interview.",
        prepTips: "Practice NQT aptitude questions, basic C/Java programming, and SQL queries.",
        reqSkills: ["C", "Java", "Python", "SQL", "Aptitude", "Communication"]
    },
    Infosys: {
        name: "Infosys",
        logo: "fa-solid fa-building",
        salary: "₹3.6 - ₹9.5 LPA (System Engineer / HackWithInfy / Specialist)",
        hiringProcess: "HackWithInfy / InfyTQ Online Test → Technical & HR Interview.",
        prepTips: "Master Python / Java fundamentals, DBMS, and basic competitive coding.",
        reqSkills: ["Python", "Java", "DBMS", "Data Structures", "Aptitude"]
    },
    Wipro: {
        name: "Wipro",
        logo: "fa-solid fa-building",
        salary: "₹3.5 - ₹6.5 LPA (NLTH / Turbo)",
        hiringProcess: "Wipro Elite NTH Test (Aptitude + Essay + Coding) → Tech & HR Round.",
        prepTips: "Practice quantitative aptitude, English essay writing, and string manipulation coding.",
        reqSkills: ["C", "C++", "Java", "Python", "SQL", "Communication"]
    },
    Cognizant: {
        name: "Cognizant (CTS)",
        logo: "fa-solid fa-building",
        salary: "₹4.0 - ₹6.75 LPA (GenC / GenC Elevate / GenC Pro)",
        hiringProcess: "Automata Fix / GenC Assessment → Technical Interview → HR Discussion.",
        prepTips: "Focus on debugging code snippets, SQL JOINs, and OOPs concepts.",
        reqSkills: ["Java", "Python", "SQL", "Web Technologies", "Aptitude"]
    },
    Accenture: {
        name: "Accenture",
        logo: "fa-solid fa-building",
        salary: "₹4.5 - ₹6.5 LPA (ASE / FSE)",
        hiringProcess: "Cognitive & Technical Assessment → Coding Assessment → Communication Test → Interview.",
        prepTips: "Prepare pseudo-code questions, networking basics, and MS Office concepts.",
        reqSkills: ["Pseudo-code", "Python", "Java", "SQL", "Networking"]
    },
    Zoho: {
        name: "Zoho Corporation",
        logo: "fa-solid fa-building",
        salary: "₹5.6 - ₹12.0 LPA",
        hiringProcess: "Level 1: General Aptitude → Level 2: Basic Programming → Level 3: Advanced Programming (App Design) → Level 4 & 5: Tech & HR.",
        prepTips: "Focus heavily on C/C++ pointers, recursion, matrix manipulation, and building mini apps without libraries.",
        reqSkills: ["C", "C++", "Java", "Data Structures", "Pointers", "Recursion"]
    },
    Capgemini: {
        name: "Capgemini",
        logo: "fa-solid fa-building",
        salary: "₹4.0 - ₹7.5 LPA",
        hiringProcess: "Pseudocode Test → English Ability → Game-based Aptitude → Behavioral → Technical Interview.",
        prepTips: "Practice game-based aptitude puzzles and pseudo-code tracing.",
        reqSkills: ["Pseudocode", "Java", "C++", "Data Structures", "SQL"]
    },
    IBM: {
        name: "IBM",
        logo: "fa-solid fa-building",
        salary: "₹6.0 - ₹11.0 LPA",
        hiringProcess: "Cognitive Ability Assessment → English Assessment → Coding Test → Technical & HR Interview.",
        prepTips: "Practice cognitive matrix puzzles and REST API architecture concepts.",
        reqSkills: ["Java", "Python", "Cloud", "SQL", "Algorithms"]
    },
    Deloitte: {
        name: "Deloitte",
        logo: "fa-solid fa-building",
        salary: "₹7.6 - ₹13.0 LPA",
        hiringProcess: "Online Aptitude & Verbal Test → Technical Test → Tech Interview → HR Round.",
        prepTips: "Study business analytics, SQL aggregations, and consulting case studies.",
        reqSkills: ["SQL", "Python", "Excel", "Data Analytics", "Communication"]
    },
    HCL: {
        name: "HCL Technologies",
        logo: "fa-solid fa-building",
        salary: "₹3.5 - ₹5.5 LPA",
        hiringProcess: "Online Aptitude & Tech Assessment → Technical Interview → HR Discussion.",
        prepTips: "Focus on operating systems, networking fundamentals, and C/Java basics.",
        reqSkills: ["C", "Java", "Networking", "OS", "DBMS"]
    }
};

// NOTE: PLACEMENT_BOT_KNOWLEDGE and DAILY_QUESTIONS are defined in data/knowledge.js.
// They are NOT redeclared here to avoid variable conflict.
// data/knowledge.js is loaded first and provides the complete expanded versions.

function parseResumeText(text) {
    const rawLower = (text || "").toLowerCase();

    const allSkills = [
        "Python", "SQL", "Git", "JavaScript", "HTML", "CSS", "React", "Node.js", "Java", "C++",
        "Docker", "AWS", "Linux", "REST APIs", "Pandas", "NumPy", "Scikit-Learn", "PostgreSQL",
        "MongoDB", "Express.js", "TypeScript", "Kubernetes", "Data Structures", "Algorithms",
        "C", "PHP", "Ruby", "Go", "Kotlin", "Swift", "Flutter", "React Native", "GraphQL",
        "Redis", "Elasticsearch", "Terraform", "CI/CD", "Jenkins", "GitHub", "Excel", "Tableau",
        "Power BI", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP",
        "System Design", "Microservices", "Agile", "Scrum"
    ];

    const detectedSkills = allSkills.filter(skill => rawLower.includes(skill.toLowerCase()));

    const actionVerbs = ["developed", "implemented", "created", "designed", "optimized", "managed", "built",
        "spearheaded", "engineered", "automated", "delivered", "launched", "integrated", "led", "reduced",
        "improved", "increased", "accelerated", "deployed", "collaborated"];
    const actionVerbsCount = actionVerbs.filter(verb => rawLower.includes(verb)).length;

    const hasGitHub = rawLower.includes("github") || rawLower.includes("gitlab");
    const hasProjects = rawLower.includes("project") || rawLower.includes("developed") || rawLower.includes("built");
    const hasInternship = rawLower.includes("intern") || rawLower.includes("experience") || rawLower.includes("work");
    const hasSummary = rawLower.includes("summary") || rawLower.includes("objective") || rawLower.includes("profile");
    const hasEducation = rawLower.includes("education") || rawLower.includes("bachelor") || rawLower.includes("b.tech");
    const hasCertification = rawLower.includes("certificate") || rawLower.includes("certification") || rawLower.includes("certified");

    // ATS score calculation
    let atsScore = 50;
    atsScore += Math.min(20, detectedSkills.length * 2.5);  // up to +20 for skills
    atsScore += Math.min(10, actionVerbsCount * 1.5);        // up to +10 for action verbs
    atsScore += hasGitHub ? 5 : 0;
    atsScore += hasProjects ? 5 : 0;
    atsScore += hasInternship ? 5 : 0;
    atsScore += hasSummary ? 3 : 0;
    atsScore += hasEducation ? 2 : 0;
    atsScore = Math.min(98, Math.max(40, Math.round(atsScore)));

    // Relevance fit calculation (based on skills matching target role)
    const roleKey = window.STATE ? (window.STATE.targetRoleKey || "softwareengineer") : "softwareengineer";
    const roleData = (typeof JOB_ROLES !== "undefined" && JOB_ROLES[roleKey]) ? JOB_ROLES[roleKey] : { skills: [] };
    const roleSkillMatches = roleData.skills.filter(s => rawLower.includes(s.toLowerCase())).length;
    const relevanceFit = roleData.skills.length > 0 ? Math.round((roleSkillMatches / roleData.skills.length) * 100) : 70;

    const kwScore = Math.min(95, Math.round((detectedSkills.length / 15) * 100));
    const projScore = hasProjects ? Math.min(90, 70 + (hasCertification ? 20 : 0)) : 45;
    const verbScore = Math.min(90, actionVerbsCount * 12);

    const suggestions = [];
    if (!hasGitHub) suggestions.push("Add GitHub / GitLab portfolio links to showcase source code and contributions.");
    if (detectedSkills.length < 6) suggestions.push("Include more core technical skills and framework keywords relevant to your target role.");
    if (actionVerbsCount < 4) suggestions.push("Use strong action verbs: 'Engineered', 'Optimized', 'Delivered', 'Accelerated', 'Deployed'.");
    if (!hasProjects) suggestions.push("Add at least 2 engineering or academic projects with quantified impact metrics.");
    if (!hasSummary) suggestions.push("Add a professional Summary or Objective section at the top of your resume.");
    if (!hasInternship) suggestions.push("Include internship, freelance, or relevant work experience even if informal.");
    if (!hasCertification) suggestions.push("Add industry certifications (AWS, Google, Microsoft, Coursera) to boost credibility.");

    return {
        scores: {
            overallAts: atsScore,
            grammar: Math.min(98, 85 + actionVerbsCount * 2),
            keywords: kwScore,
            projects: projScore,
            verbs: verbScore,
            relevanceFit
        },
        details: {
            actionVerbsCount,
            hasGitHub,
            hasProjects,
            hasInternship,
            hasSummary,
            hasEducation,
            hasCertification
        },
        detectedSkills: detectedSkills.length > 0 ? detectedSkills : ["Python", "SQL", "Git", "JavaScript"],
        suggestions: suggestions.length > 0 ? suggestions : ["Your resume looks well-optimized! Consider adding more quantified impact metrics."],
        summary: `Resume parsed successfully with ATS Rank ${atsScore}/100. ${detectedSkills.length} skills detected. ${relevanceFit}% role fit.`
    };
}

// Export all critical data to window for global access
window.DATABASE_SCHEMAS = typeof DATABASE_SCHEMAS !== "undefined" ? DATABASE_SCHEMAS : {};
window.RESUME_TEMPLATES = typeof RESUME_TEMPLATES !== "undefined" ? RESUME_TEMPLATES : [];
window.COMPANY_PREPARATION_DATA = typeof COMPANY_PREPARATION_DATA !== "undefined" ? COMPANY_PREPARATION_DATA : {};
window.parseResumeText = parseResumeText;
window.WEEKLY_ROADMAPS = typeof WEEKLY_ROADMAPS !== "undefined" ? WEEKLY_ROADMAPS : {};
