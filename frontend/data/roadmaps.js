// AI Career Coach - 6-Week Structured Learning Roadmaps

const WEEKLY_ROADMAPS = {
    softwareengineer: [
        { week: 1, topic: "Modern JavaScript (ES6+)", duration: "12 Hours", details: "Async/Await, Promises, Closures, Modules", challenge: "Build an Async API fetch dashboard script." },
        { week: 2, topic: "Data Structures & Algorithms", duration: "16 Hours", details: "Arrays, Linked Lists, Stacks, Queues, Binary Trees", challenge: "Solve 10 LeetCode Medium problems." },
        { week: 3, topic: "Java / C++ Object Oriented Design", duration: "14 Hours", details: "Inheritance, Polymorphism, SOLID Principles", challenge: "Design an ATM Machine Simulator class model." },
        { week: 4, topic: "System Design & REST APIs", duration: "15 Hours", details: "HTTP Verbs, Status Codes, Microservices, Caching", challenge: "Document a scalable E-commerce API specification." },
        { week: 5, topic: "Database Architecture & SQL", duration: "12 Hours", details: "Indexes, Joins, Normalization, Transactions", challenge: "Optimize a 100k row SELECT join query." },
        { week: 6, topic: "Mock Placement Interviews", duration: "10 Hours", duration: "10 Hours", details: "Live Technical Loop & Behavioral Q&A", challenge: "Pass AI Mock Interview with score > 80%." }
    ],
    fullstackdeveloper: [
        { week: 1, topic: "HTML5, Modern CSS & Flex/Grid", duration: "10 Hours", details: "Semantic Layouts, Responsive Design, CSS Variables", challenge: "Create a Glassmorphism SaaS Hero Section." },
        { week: 2, topic: "JavaScript & DOM Manipulation", duration: "14 Hours", details: "Event Delegation, Fetch API, LocalStorage, ES Modules", challenge: "Build a Client-side State Manager." },
        { week: 3, topic: "React Fundamentals", duration: "16 Hours", details: "Components, JSX, Props, Hooks (useState, useEffect)", challenge: "Build a Task Management App." },
        { week: 4, topic: "Node.js & Express API Backend", duration: "15 Hours", details: "Routing, Middleware, Controllers, Error Handling", challenge: "Build a RESTful CRUD API." },
        { week: 5, topic: "MongoDB & Database Integration", duration: "12 Hours", details: "Schemas, Mongoose Models, Aggregation Pipelines", challenge: "Connect Express app to MongoDB." },
        { week: 6, topic: "Full Stack Deployment & CI/CD", duration: "10 Hours", details: "Docker, Vercel/Render, Environment Variables", challenge: "Deploy full stack app with live URL." }
    ],
    dataanalyst: [
        { week: 1, topic: "Excel & Advanced Formulas", duration: "10 Hours", details: "VLOOKUP, INDEX/MATCH, Pivot Tables, Charts", challenge: "Analyze 5,000 row sales dataset." },
        { week: 2, topic: "SQL for Data Analysis", duration: "15 Hours", details: "GROUP BY, HAVING, Subqueries, Window Functions", challenge: "Write 5 complex analytical SQL queries." },
        { week: 3, topic: "Python Basics for Analytics", duration: "14 Hours", details: "Variables, Loops, Functions, Lists, Dictionaries", challenge: "Write Python script to parse CSV files." },
        { week: 4, topic: "Pandas & NumPy", duration: "16 Hours", details: "DataFrames, Data Cleaning, Merging, Filtering", challenge: "Clean and transform messy raw dataset." },
        { week: 5, topic: "Data Visualization (Matplotlib/Seaborn)", duration: "12 Hours", details: "Bar charts, Histograms, Scatter plots, Heatmaps", challenge: "Create an EDA visual summary report." },
        { week: 6, topic: "Tableau / Power BI Dashboards", duration: "12 Hours", details: "DAX, Calculated Fields, Interactive Filters", challenge: "Build an executive KPI dashboard." }
    ]
};

window.WEEKLY_ROADMAPS = WEEKLY_ROADMAPS;
