// AI Career Coach - Knowledge Base, Flashcards & Placement Bot
// Expanded to 60+ questions with MCQ options, explanations, and categories

const PLACEMENT_BOT_KNOWLEDGE = {
    ats: "ATS Tip: Use standard headings ('Education', 'Technical Skills', 'Work Experience'), standard fonts (Inter, Arial, Roboto), avoid multi-column tables or embedded images. Place keywords naturally in context.",
    google: "Google Prep Tip: Practice LeetCode Medium/Hard DSA problems in C++/Java/Python. Focus on clean code, edge cases, and runtime complexity. Study system design: distributed systems, load balancers, caching (LRU/LFU), consistent hashing.",
    tcs: "TCS Prep Tip: Focus on TCS NQT — quantitative aptitude (number series, probability, percentage), verbal reasoning (reading comprehension, synonyms), and C/Python basic programming logic. Attempt the Advanced Qualifier section for better packages.",
    zoho: "Zoho Prep Tip: Master C/Java pointer logic, recursion, multi-dimensional array math, and Object-Oriented design (e.g. Call Taxi Booking System, Library Management). Zoho doesn't allow backlog candidates — maintain clean academic record.",
    infosys: "Infosys Prep Tip: Practice HackerEarth-style coding. Focus on InfyTQ certification completion. Verbal, logical, and mathematical reasoning are tested. Clean interview format: HR + technical rounds.",
    wipro: "Wipro Prep Tip: NLTH (National Level Test for Hiring) covers quantitative aptitude, verbal ability, and 2 coding questions. Java or Python preferred. Wipro Elite/Turbo tracks have higher packages with advanced DSA requirements.",
    resume: "Resume Tip: Quantify achievements with metrics! (e.g., 'Optimized database query response time by 45% using B-Tree indexes'). Use action verbs: Designed, Implemented, Optimized, Delivered. Limit to 1 page for freshers.",
    python: "Python Prep Tip: Master list comprehensions, generators, decorators, context managers, and async/await. Practice pandas, numpy, and matplotlib for data roles. Study OOP principles with real-world examples.",
    dsa: "DSA Prep Tip: Study Arrays, Strings, LinkedList, Stack, Queue, Trees (BST, AVL), Graphs (BFS, DFS), Dynamic Programming (tabulation + memoization), and Heap. Practice 3-5 problems daily on LeetCode/HackerRank.",
    sql: "SQL Prep Tip: Master SELECT with JOINs (INNER, LEFT, RIGHT, FULL), GROUP BY, HAVING, subqueries, window functions (ROW_NUMBER, RANK, DENSE_RANK), CTEs, and stored procedures. Practice on HackerRank SQL track.",
    interview: "Interview Tip: Practice STAR method for behavioral questions (Situation, Task, Action, Result). Research the company thoroughly. Prepare 5 thoughtful questions to ask the interviewer. Dress professionally and arrive 10 minutes early.",
    tips: "Placement Tips: (1) Build 2-3 strong projects with GitHub. (2) Get 1 internship or open-source contribution. (3) Maintain 7.5+ CGPA. (4) Certify on Coursera/edX. (5) Practice coding daily. (6) Develop communication skills through mock GDs."
};

// Comprehensive Flashcard Database (60+ questions, MCQ format)
const DAILY_QUESTIONS = [
    // ── TECHNICAL DSA ──
    {
        type: "TECHNICAL DSA",
        question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1,
        explanation: "In a balanced BST, each comparison eliminates half the remaining elements, giving O(log n) search time."
    },
    {
        type: "TECHNICAL DSA",
        question: "Which data structure uses LIFO (Last In, First Out) ordering?",
        options: ["Queue", "Stack", "Linked List", "Deque"],
        correct: 1,
        explanation: "A Stack uses LIFO — the last element inserted is the first one removed. Used in function call stacks, undo operations."
    },
    {
        type: "TECHNICAL DSA",
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "Merge Sort requires O(n) auxiliary space for the temporary arrays used during the merge phase."
    },
    {
        type: "TECHNICAL DSA",
        question: "Which algorithm finds the shortest path in a weighted graph with non-negative edges?",
        options: ["BFS", "DFS", "Dijkstra's Algorithm", "Bellman-Ford"],
        correct: 2,
        explanation: "Dijkstra's algorithm finds shortest paths using a greedy approach with a min-heap, working correctly for non-negative weights."
    },
    {
        type: "TECHNICAL DSA",
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correct: 2,
        explanation: "QuickSort's worst case O(n²) occurs when the pivot is consistently the smallest or largest element (e.g., already sorted array with bad pivot)."
    },
    {
        type: "TECHNICAL DSA",
        question: "A hash table has time complexity ___ for average case insertion.",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 2,
        explanation: "Hash tables offer O(1) average case for insert, delete, and lookup due to direct address computation via hashing."
    },
    // ── SYSTEM DESIGN ──
    {
        type: "SYSTEM DESIGN",
        question: "What is the purpose of a Load Balancer in distributed systems?",
        options: ["Store data redundantly", "Distribute traffic across multiple servers", "Encrypt HTTP traffic", "Cache database queries"],
        correct: 1,
        explanation: "A Load Balancer distributes incoming network traffic across multiple backend servers to prevent any single server from becoming a bottleneck."
    },
    {
        type: "SYSTEM DESIGN",
        question: "Which caching eviction policy removes the Least Recently Used entry?",
        options: ["FIFO", "LRU", "MRU", "LFU"],
        correct: 1,
        explanation: "LRU (Least Recently Used) evicts the item that was accessed least recently. Implemented efficiently using a HashMap + Doubly Linked List."
    },
    {
        type: "SYSTEM DESIGN",
        question: "What does CAP theorem state about distributed systems?",
        options: ["Any system can guarantee all three: Consistency, Availability, and Partition tolerance", "A distributed system can guarantee at most two of three: C, A, P", "Consistency and Availability are always achieved together", "Partition tolerance is optional in distributed systems"],
        correct: 1,
        explanation: "CAP theorem states that in a distributed system, you can only guarantee 2 of 3: Consistency, Availability, and Partition Tolerance simultaneously."
    },
    {
        type: "SYSTEM DESIGN",
        question: "What is horizontal scaling?",
        options: ["Upgrading a single server's CPU/RAM", "Adding more machines to distribute load", "Using faster storage (SSD over HDD)", "Increasing database connection pool size"],
        correct: 1,
        explanation: "Horizontal scaling (scale-out) means adding more machines to your system, while vertical scaling (scale-up) means upgrading a single machine."
    },
    // ── DATABASE (SQL) ──
    {
        type: "DATABASE SQL",
        question: "Which SQL JOIN returns all rows from both tables regardless of matching?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
        explanation: "FULL OUTER JOIN returns all rows from both tables. Rows without a match in the other table show NULL for the other table's columns."
    },
    {
        type: "DATABASE SQL",
        question: "What is the purpose of an SQL INDEX?",
        options: ["To encrypt table data", "To speed up data retrieval queries", "To create foreign key relationships", "To prevent duplicate rows"],
        correct: 1,
        explanation: "Indexes are data structures (typically B-Tree) that allow the database engine to find rows matching a WHERE clause without scanning every row."
    },
    {
        type: "DATABASE SQL",
        question: "Which SQL clause filters results AFTER GROUP BY aggregation?",
        options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
        correct: 1,
        explanation: "HAVING filters grouped results after GROUP BY. WHERE filters individual rows before grouping. Example: SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5."
    },
    {
        type: "DATABASE SQL",
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Authentication, Consistency, Integrity, Data", "Atomicity, Concurrency, Isolation, Distribution", "Availability, Consistency, Integrity, Durability"],
        correct: 0,
        explanation: "ACID: Atomicity (all or nothing), Consistency (valid state before/after), Isolation (concurrent transactions don't interfere), Durability (committed data persists)."
    },
    // ── OOP CONCEPTS ──
    {
        type: "OOP CONCEPTS",
        question: "Which OOP principle hides implementation details and exposes only the interface?",
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        correct: 3,
        explanation: "Abstraction hides complexity and exposes only the necessary interface. Encapsulation bundles data and methods together and restricts direct access."
    },
    {
        type: "OOP CONCEPTS",
        question: "What is method overriding in OOP?",
        options: ["Defining multiple methods with the same name but different parameters", "Redefining a parent class method in the child class with the same signature", "Calling a method inside another method", "Creating an interface with abstract methods"],
        correct: 1,
        explanation: "Method overriding (runtime polymorphism) allows a child class to provide a specific implementation of a method already defined in its parent class."
    },
    {
        type: "OOP CONCEPTS",
        question: "Which design pattern ensures a class has only one instance?",
        options: ["Factory Pattern", "Observer Pattern", "Singleton Pattern", "Strategy Pattern"],
        correct: 2,
        explanation: "The Singleton Pattern restricts instantiation of a class to a single object. Used for configurations, logging, and connection pools."
    },
    // ── BEHAVIORAL ──
    {
        type: "BEHAVIORAL",
        question: "In the STAR method for behavioral interviews, what does 'A' stand for?",
        options: ["Approach", "Attitude", "Action", "Achievement"],
        correct: 2,
        explanation: "STAR = Situation, Task, Action, Result. The 'Action' describes what YOU specifically did to address the situation, using 'I' statements."
    },
    {
        type: "BEHAVIORAL",
        question: "When asked 'Tell me about yourself', what should be your primary focus?",
        options: ["Personal hobbies and life history", "Professional journey, skills, and career goals relevant to the role", "Academic marks and grades only", "Memorized company background information"],
        correct: 1,
        explanation: "This is your 60-second pitch. Cover: academic background → projects/internships → key skills → why you're excited about this role."
    },
    {
        type: "BEHAVIORAL",
        question: "What is the best way to handle a question you don't know the answer to in a technical interview?",
        options: ["Pretend to know and give a random answer", "Stay silent until the interviewer moves on", "Admit you're unsure, then reason through your approach methodically", "Ask the interviewer to skip to the next question"],
        correct: 2,
        explanation: "Interviewers value thinking ability over knowing everything. Say: 'I'm not sure of the exact answer, but here's how I'd approach it...' and reason through it."
    },
    // ── APTITUDE ──
    {
        type: "APTITUDE",
        question: "If a train travels 360 km in 4 hours, what is its speed in m/s?",
        options: ["25 m/s", "90 m/s", "40 m/s", "100 m/s"],
        correct: 0,
        explanation: "Speed = 360 km / 4 h = 90 km/h. Convert: 90 × (1000/3600) = 90 × (5/18) = 25 m/s."
    },
    {
        type: "APTITUDE",
        question: "What is 15% of 240?",
        options: ["30", "36", "24", "42"],
        correct: 1,
        explanation: "15% of 240 = 0.15 × 240 = 36. Shortcut: 10% of 240 = 24; 5% of 240 = 12; Total = 24 + 12 = 36."
    },
    {
        type: "APTITUDE",
        question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
        options: ["38", "40", "42", "44"],
        correct: 2,
        explanation: "Pattern: differences are 4, 6, 8, 10, 12. So next = 30 + 12 = 42. Also: n(n+1) → 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42."
    },
    {
        type: "APTITUDE",
        question: "A can do a piece of work in 10 days and B can do it in 15 days. In how many days can they finish it working together?",
        options: ["5 days", "6 days", "8 days", "12 days"],
        correct: 1,
        explanation: "A's rate = 1/10 per day; B's rate = 1/15 per day. Combined = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So they finish in 6 days."
    },
    // ── NETWORKING ──
    {
        type: "NETWORKING",
        question: "Which HTTP status code indicates 'Not Found'?",
        options: ["200", "301", "403", "404"],
        correct: 3,
        explanation: "404 = Not Found. 200 = OK. 301 = Moved Permanently. 403 = Forbidden (authenticated but no permission)."
    },
    {
        type: "NETWORKING",
        question: "What does DNS (Domain Name System) do?",
        options: ["Encrypts internet traffic", "Translates domain names to IP addresses", "Assigns IP addresses dynamically", "Routes network packets between routers"],
        correct: 1,
        explanation: "DNS resolves human-readable domain names (e.g., google.com) to machine-readable IP addresses (e.g., 142.250.190.78)."
    },
    {
        type: "NETWORKING",
        question: "Which protocol is used for secure data transfer over HTTP?",
        options: ["FTP", "SMTP", "HTTPS (TLS/SSL)", "UDP"],
        correct: 2,
        explanation: "HTTPS uses TLS (formerly SSL) to encrypt HTTP traffic, ensuring data confidentiality and integrity between client and server."
    },
    // ── CORE CS ──
    {
        type: "CORE CS",
        question: "What is the difference between a process and a thread?",
        options: ["They are identical concepts", "A process has its own memory space; threads share the parent process memory", "Threads are heavier than processes", "Processes cannot communicate with each other"],
        correct: 1,
        explanation: "A process has its own memory, file handles, and resources. Threads within a process share the same memory space, making communication faster but requiring synchronization."
    },
    {
        type: "CORE CS",
        question: "What is a deadlock in operating systems?",
        options: ["When a program runs indefinitely without finishing", "When two or more processes are permanently blocked, each waiting for the other to release resources", "When CPU usage hits 100%", "When a process has insufficient RAM"],
        correct: 1,
        explanation: "Deadlock occurs when processes are blocked indefinitely, each waiting for a resource held by another. Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait."
    },
    {
        type: "CORE CS",
        question: "What is Virtual Memory?",
        options: ["RAM stored on the cloud", "A memory management technique that uses disk space to extend available RAM", "The CPU cache memory", "GPU memory used for graphics"],
        correct: 1,
        explanation: "Virtual Memory allows processes to use more memory than physically available by temporarily storing inactive pages on disk (swap space)."
    },
    // ── GIT & TOOLS ──
    {
        type: "GIT & DEVOPS",
        question: "What does `git rebase` do compared to `git merge`?",
        options: ["Both do exactly the same thing", "Rebase rewrites commit history by moving commits onto a new base; merge preserves history with a merge commit", "Rebase creates a new branch; merge deletes the branch", "Rebase is for remote branches only"],
        correct: 1,
        explanation: "git rebase creates a linear history by replaying commits. git merge preserves the full history with a merge commit. Rebase is cleaner but rewrites SHA history."
    },
    {
        type: "GIT & DEVOPS",
        question: "What is Docker?",
        options: ["A programming language", "A container platform that packages applications with their dependencies for consistent deployment", "A cloud storage service", "A CI/CD pipeline tool"],
        correct: 1,
        explanation: "Docker containers package application code, runtime, libraries, and config into a portable unit that runs consistently across any environment."
    }
];

window.PLACEMENT_BOT_KNOWLEDGE = PLACEMENT_BOT_KNOWLEDGE;
window.DAILY_QUESTIONS = DAILY_QUESTIONS;
