// AI Career Coach - Job Roles & Categories Dataset

function roleToKey(title) {
    return (title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

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
        skills: ["Python", "PyTorch", "LaTeX", "Deep Learning", "Transformers", "Math"],
        readiness: 65
    },
    devopsengineer: {
        title: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux", "Bash", "Git"],
        readiness: 76
    },
    uiuxdesigner: {
        title: "UI/UX Designer",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping", "HTML", "CSS", "Design Systems"],
        readiness: 80
    },
    cybersecurityanalyst: {
        title: "Cybersecurity Analyst",
        skills: ["Network Security", "Wireshark", "SIEM", "Linux", "Python", "Risk Assessment"],
        readiness: 71
    },
    cloudarchitect: {
        title: "Cloud Architect",
        skills: ["AWS", "Azure", "GCP", "System Design", "Networking", "Security", "Terraform"],
        readiness: 68
    },
    productmanager: {
        title: "Product Manager",
        skills: ["User Stories", "Agile", "Roadmapping", "SQL", "A/B Testing", "Communication"],
        readiness: 75
    }
};

window.roleToKey = roleToKey;
window.ROLE_CATEGORIES = ROLE_CATEGORIES;
window.JOB_ROLES = JOB_ROLES;
