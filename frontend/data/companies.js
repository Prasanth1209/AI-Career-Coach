// AI Career Coach - Role-Specific Corporate Recruiter Preparation Guides

var COMPANY_PREPARATION_DATA = window.COMPANY_PREPARATION_DATA || {
    // ----------------------------------------------------
    // 1. SOFTWARE ENGINEER
    // ----------------------------------------------------
    softwareengineer: [
        {
            name: "Google",
            logo: "fa-brands fa-google",
            jobRole: "Software Engineer I (Early Career)",
            officialCareersUrl: "https://careers.google.com",
            overview: "Google builds planetary-scale search engines, GCP cloud infrastructure, Android OS, and AI systems.",
            hiringProcess: "Online Coding Assessment (90 mins) ➔ Technical Screening ➔ 4 Onsite Loop Rounds (DSA & System Design) ➔ Googleyness Fit.",
            eligibility: "B.Tech / M.Tech CS/IT/ECE with CGPA >= 7.5 or strong algorithmic project portfolio.",
            rounds: ["Online Coding Assessment (2 Hard DSA)", "Phone Screening", "System Design & Algorithms (3 Rounds)", "Googleyness & Culture Fit"],
            codingQuestions: ["Merge K Sorted Lists", "Word Ladder II", "Median of Two Sorted Arrays", "Course Schedule II"],
            hrQuestions: ["Describe a time you resolved a complex technical disagreement.", "How do you align with Google's mission to organize world information?"],
            salary: "₹18 - ₹35 LPA (Base + Stocks + Bonus)",
            requiredSkills: ["Data Structures", "Algorithms", "C++", "Java", "Python", "System Design", "Git"],
            preparationTips: "Master Graph algorithms, Dynamic Programming, edge-case optimization, and speak your solution logic out loud.",
            badgeColor: "purple"
        },
        {
            name: "Microsoft",
            logo: "fa-brands fa-microsoft",
            jobRole: "Software Engineer - Azure & Core Systems",
            officialCareersUrl: "https://careers.microsoft.com",
            overview: "Microsoft empowers developers and enterprises through Azure cloud, Windows OS, Developer Tooling (VS Code/GitHub), and AI.",
            hiringProcess: "Codility Online Test (3 Questions) ➔ 3 Technical DSA & OOP Rounds ➔ As Appropriate (AA) Executive Manager Round.",
            eligibility: "B.Tech / M.Tech with CGPA >= 7.0.",
            rounds: ["Codility Online Assessment", "Data Structures & Memory Management", "OOAD & Architecture Round", "AA Executive Manager Round"],
            codingQuestions: ["Serialize and Deserialize Binary Tree", "Lowest Common Ancestor", "LRU Cache", "Rotate Image"],
            hrQuestions: ["How do you embody Microsoft's Growth Mindset?", "Tell me about a failed project and what you learned."],
            salary: "₹16 - ₹28 LPA",
            requiredSkills: ["C#", "C++", "Java", "Data Structures", "OOP", "SQL", "System Design"],
            preparationTips: "Practice object-oriented design patterns in C++/Java/C#, master binary tree traversals, and demonstrate adaptability.",
            badgeColor: "teal"
        },
        {
            name: "Amazon",
            logo: "fa-brands fa-amazon",
            jobRole: "Software Development Engineer (SDE-1)",
            officialCareersUrl: "https://www.amazon.jobs",
            overview: "Amazon is a global leader in e-commerce, cloud computing (AWS), digital streaming, and logistics technologies.",
            hiringProcess: "Online Assessment (OA1 Debugging + OA2 Coding + OA3 Work Simulation) ➔ 3 Technical Loop Rounds.",
            eligibility: "B.E / B.Tech / MCA / M.Tech with CGPA >= 6.5.",
            rounds: ["Debugging & Work Simulation OA", "Technical Problem Solving (2 Rounds)", "Bar Raiser & Leadership Principles Round"],
            codingQuestions: ["Top K Frequent Words", "Reorganize String", "Number of Islands", "Trapping Rain Water"],
            hrQuestions: ["Give an example of when you showed Customer Obsession.", "Describe a time you had to deliver under tight deadlines."],
            salary: "₹15 - ₹29 LPA",
            requiredSkills: ["Java", "C++", "Python", "Data Structures", "Algorithms", "System Design", "AWS"],
            preparationTips: "Memorize and structure your behavioral answers using the STAR method mapped to Amazon's 16 Leadership Principles.",
            badgeColor: "amber"
        },
        {
            name: "Adobe",
            logo: "fa-solid fa-cube",
            jobRole: "Member of Technical Staff (Software Engineer)",
            officialCareersUrl: "https://www.adobe.com/careers.html",
            overview: "Adobe is the global leader in digital creative media (Photoshop, Illustrator) and enterprise document management software.",
            hiringProcess: "HackerRank Assessment ➔ 3 Technical DSA & Core Systems Rounds ➔ Director HR Round.",
            eligibility: "B.Tech / M.Tech CS/IT with CGPA >= 7.0.",
            rounds: ["Online Technical Test", "DSA & Algorithms Round", "C++ / Computer Graphics & Memory Management", "Director HR Round"],
            codingQuestions: ["Word Search II", "Clone Graph", "Maximum Subarray", "Design Hit Counter"],
            hrQuestions: ["What creative engineering project are you most proud of?", "Why Adobe Creative Cloud team?"],
            salary: "₹18 - ₹30 LPA",
            requiredSkills: ["C++", "Java", "Data Structures", "Algorithms", "Multithreading", "Git"],
            preparationTips: "Focus heavily on C++, pointers, memory layout, and complex graph algorithms.",
            badgeColor: "pink"
        },
        {
            name: "Flipkart",
            logo: "fa-solid fa-bag-shopping",
            jobRole: "Software Development Engineer - 1",
            officialCareersUrl: "https://www.flipkartcareers.com",
            overview: "Flipkart is India's leading e-commerce ecosystem, driving large-scale distributed systems and supply chain logistics.",
            hiringProcess: "Machine Coding Round (2 Hours object-oriented design implementation) ➔ DSA & Problem Solving ➔ Hiring Manager Round.",
            eligibility: "B.Tech / M.Tech CS/IT with CGPA >= 7.0.",
            rounds: ["Machine Coding (Working Code Required)", "DSA & Problem Solving", "System Design & Architecture", "Cultural Fit Round"],
            codingQuestions: ["Design Parking Lot", "Design In-Memory Key-Value Store", "Minimum Swaps to Sort", "Sliding Window Maximum"],
            hrQuestions: ["How do you approach refactoring tech debt?", "Describe how you handled a production bug under pressure."],
            salary: "₹18 - ₹32 LPA",
            requiredSkills: ["Java", "Python", "Machine Coding", "OOP Design", "DSA", "Distributed Systems"],
            preparationTips: "Practice machine coding rounds where you write executable, modular, object-oriented code within 2 hours.",
            badgeColor: "blue"
        },
        {
            name: "Zoho",
            logo: "fa-solid fa-cloud",
            jobRole: "Software Developer",
            officialCareersUrl: "https://www.zoho.com/careers",
            overview: "Zoho builds cloud software suites for enterprise CRM, email, accounting, and business operations globally.",
            hiringProcess: "General Aptitude & C Programming ➔ Advanced C Coding & Complex Logic ➔ Design & Machine Coding ➔ HR Interview.",
            eligibility: "B.E / B.Tech / B.Sc / MCA / M.Tech (Open to all branches with strong programming skills).",
            rounds: ["C Programming & Logic Test", "Advanced Problem Solving & Array Manipulation", "Design Patterns & Object Modeling", "HR Fit"],
            codingQuestions: ["Print Pattern (Snake / Matrix)", "Subarray with Given Sum", "Base Conversion", "Evaluate Expression Tree"],
            hrQuestions: ["Why do you want to build a long-term career at Zoho?", "How do you learn new programming concepts independently?"],
            salary: "₹7 - ₹14 LPA",
            requiredSkills: ["C", "C++", "Java", "Logic Building", "Pointers", "Data Structures"],
            preparationTips: "Practice pointer manipulation in C, matrix operations, nested loop patterns, and clean code optimization.",
            badgeColor: "emerald"
        }
    ],

    // ----------------------------------------------------
    // 2. DATA ANALYST
    // ----------------------------------------------------
    dataanalyst: [
        {
            name: "Google",
            logo: "fa-brands fa-google",
            jobRole: "Data Analyst - Product & Business Insights",
            officialCareersUrl: "https://careers.google.com",
            overview: "Google Data Analysts transform billions of user metrics into actionable product and business strategy recommendations.",
            hiringProcess: "SQL & Analytics Screening ➔ Analytical Case Study Assessment ➔ 3 Technical & Statistical Rounds ➔ Googler Fit.",
            eligibility: "Bachelor's / Master's degree in Statistics, CS, Mathematics, Economics, or related quantitative field.",
            rounds: ["Advanced SQL & Data Wrangling Screen", "Business Metric & A/B Testing Case Study", "Python & Statistics Round", "Leadership & Communication"],
            codingQuestions: ["Calculate User Retention Rate over 30 days (SQL)", "Identify Top 10% Revenue Generating Users", "A/B Test Significance Calculation in Python"],
            hrQuestions: ["How do you explain complex statistical metrics to non-technical stakeholders?", "Tell me about a time data contradicted your initial hypothesis."],
            salary: "₹16 - ₹32 LPA",
            requiredSkills: ["SQL", "Python", "Tableau", "Pandas", "Statistics", "A/B Testing", "Excel"],
            preparationTips: "Master window functions in SQL (`WINDOW`, `LEAD/LAG`), hypothesis testing (t-tests, p-values), and cohort analysis.",
            badgeColor: "purple"
        },
        {
            name: "Microsoft",
            logo: "fa-brands fa-microsoft",
            jobRole: "Data Analyst - Business Intelligence & Strategy",
            officialCareersUrl: "https://careers.microsoft.com",
            overview: "Drives telemetry analytics, customer adoption insight, and financial forecasting across Microsoft products.",
            hiringProcess: "BI & SQL Online Test ➔ Data Modeling Technical Round ➔ Business Case Study ➔ Managerial Round.",
            eligibility: "Degree in CS, IT, Statistics, Business Analytics, or Engineering with CGPA >= 7.0.",
            rounds: ["SQL & Power BI Assessment", "Data Modeling & Data Warehouse Round", "Business Analytics & Problem Solving", "Manager Round"],
            codingQuestions: ["Write DAX for Year-over-Year Growth Rate", "Optimize Slow SQL Join on 100M Rows", "Customer Churn Prediction Dataset Query"],
            hrQuestions: ["Why Microsoft's Data & AI division?", "How do you prioritize multiple data requests from different teams?"],
            salary: "₹15 - ₹28 LPA",
            requiredSkills: ["SQL", "Power BI", "DAX", "Python", "Excel", "Data Warehousing", "Statistics"],
            preparationTips: "Build projects featuring interactive Power BI dashboards, star schema data models, and complex DAX formulas.",
            badgeColor: "teal"
        },
        {
            name: "Amazon",
            logo: "fa-brands fa-amazon",
            jobRole: "Business Analyst / Data Analyst",
            officialCareersUrl: "https://www.amazon.jobs",
            overview: "Analyzes supply chain bottlenecks, seller performance metrics, and AWS customer utilization patterns.",
            hiringProcess: "SQL OA ➔ Data Analytics Technical Round ➔ Business Case Study ➔ Bar Raiser Leadership Round.",
            eligibility: "B.E/B.Tech/B.Sc/MBA/MCA with strong SQL and analytical problem-solving skills.",
            rounds: ["Online SQL & Logic Assessment", "Advanced SQL & ETL Pipeline Technical", "Business Metrics & Customer Insights", "Bar Raiser Round"],
            codingQuestions: ["Find Repeat Purchase Rate per Category", "Calculate Warehouse Lead Time Variance", "Unpivot Sales Matrix using SQL"],
            hrQuestions: ["Give an example of when data led you to challenge a manager's decision.", "How do you ensure data accuracy in ambiguous reports?"],
            salary: "₹14 - ₹26 LPA",
            requiredSkills: ["SQL", "Excel", "Redshift", "Python", "Tableau", "QuickSight", "Statistics"],
            preparationTips: "Focus on Amazon's Leadership Principles (Earn Trust, Dive Deep, Insist on Highest Standards) backed by data stories.",
            badgeColor: "amber"
        },
        {
            name: "Deloitte",
            logo: "fa-solid fa-chart-pie",
            jobRole: "Analytics & Data Consultant",
            officialCareersUrl: "https://www2.deloitte.com/careers",
            overview: "Deloitte Analytics delivers end-to-end data transformation, risk modeling, and BI dashboards for Fortune 500 enterprise clients.",
            hiringProcess: "Aptitude & SQL Online Test ➔ Technical Analytics Interview ➔ Client Case Study ➔ HR Partner Round.",
            eligibility: "B.Tech / B.E / B.Sc / BCA / MBA with CGPA >= 6.5.",
            rounds: ["Aptitude & SQL Screening", "Data Visualization & SQL Live Coding", "Consulting Case Study Round", "Partner Fit"],
            codingQuestions: ["Aggregate Sales by Region & Quarter (SQL)", "Build Sales Funnel Conversion Metric", "Clean Messy CSV Dataset using Python"],
            hrQuestions: ["How do you handle scope changes during a client consulting engagement?", "Why Deloitte Risk & Financial Advisory?"],
            salary: "₹8 - ₹16 LPA",
            requiredSkills: ["SQL", "Power BI", "Tableau", "Excel", "Python", "Data Storytelling"],
            preparationTips: "Practice data storytelling: explaining *why* metrics changed and providing 3 business action items.",
            badgeColor: "emerald"
        },
        {
            name: "EY (Ernst & Young)",
            logo: "fa-solid fa-chart-line",
            jobRole: "Data & Advanced Analytics Associate",
            officialCareersUrl: "https://www.ey.com/careers",
            overview: "EY Analytics assists global clients in fraud detection, financial reporting automation, and operational performance analysis.",
            hiringProcess: "Online Analytical & Logical Assessment ➔ Technical SQL & Python Round ➔ Senior Manager Case Study ➔ HR.",
            eligibility: "Graduates in CS, IT, Statistics, Mathematics, or Commerce with data analytics training.",
            rounds: ["Aptitude & SQL OA", "SQL & Python Technical Interview", "Manager Case Study", "HR Interview"],
            codingQuestions: ["Detect Duplicate Transactions in Financial Log", "Calculate Moving Average of Daily Revenue", "Python Script to Export Cleaned JSON"],
            hrQuestions: ["Tell us about a time you worked with an incomplete dataset.", "Where do you see yourself in 3 years at EY?"],
            salary: "₹7 - ₹14 LPA",
            requiredSkills: ["SQL", "Excel", "Python", "Power BI", "Financial Analytics", "Statistics"],
            preparationTips: "Review SQL group functions, CTEs, financial ratio metrics, and data cleansing methods in Python Pandas.",
            badgeColor: "amber"
        },
        {
            name: "Accenture",
            logo: "fa-solid fa-chart-simple",
            jobRole: "Data Analyst",
            officialCareersUrl: "https://www.accenture.com/careers",
            overview: "Accenture Applied Intelligence leverages AI and data analytics to optimize enterprise digital operations globally.",
            hiringProcess: "Cognitive & Technical Assessment ➔ Coding / SQL Test ➔ Communication Assessment ➔ Technical & HR Round.",
            eligibility: "B.E / B.Tech / MCA / M.Sc with CGPA >= 6.0.",
            rounds: ["Cognitive & Assessment Test", "Live SQL Query Round", "Communication Test", "HR Interview"],
            codingQuestions: ["Find Top 3 Performing Products per Region", "Calculate Customer Lifetime Value (CLV)", "Join Customer and Order Tables"],
            hrQuestions: ["Why Accenture Data & AI practice?", "How do you handle tight project deadlines?"],
            salary: "₹6.5 - ₹12 LPA",
            requiredSkills: ["SQL", "Excel", "Power BI", "Python", "Tableau", "Communication"],
            preparationTips: "Practice live coding of SQL JOINs, aggregate queries, and build structured dashboards in Power BI.",
            badgeColor: "purple"
        }
    ],

    // ----------------------------------------------------
    // 3. DATA SCIENTIST
    // ----------------------------------------------------
    datascientist: [
        {
            name: "Google",
            logo: "fa-brands fa-google",
            jobRole: "Data Scientist - AI & Predictive Analytics",
            officialCareersUrl: "https://careers.google.com",
            overview: "Google Data Scientists design core machine learning algorithms, causal inference models, and large-scale experimental frameworks.",
            hiringProcess: "Coding & Stats Screen ➔ Technical Deep Dive (Machine Learning & Causal Inference) ➔ 3 Onsite Rounds ➔ Leadership Fit.",
            eligibility: "Master's or Ph.D. in CS, Statistics, Machine Learning, Mathematics, or quantitative field.",
            rounds: ["Coding & Statistics Screening", "Machine Learning Architecture & Math", "Causal Inference & Experimentation", "Googler Behavioral Round"],
            codingQuestions: ["Implement Gradient Descent from Scratch in Python", "Design Recommendation System Metric", "Evaluate Causal Effect of Feature Release"],
            hrQuestions: ["How do you explain complex deep learning model trade-offs to business executives?", "Tell me about a research problem you solved under ambiguity."],
            salary: "₹22 - ₹45 LPA",
            requiredSkills: ["Python", "SQL", "Machine Learning", "Scikit-Learn", "TensorFlow", "Statistics", "Causal Inference"],
            preparationTips: "Deep dive into statistical theory, probability distributions, matrix calculus, and ML algorithm internals (SVM, XGBoost, Random Forests).",
            badgeColor: "purple"
        },
        {
            name: "Microsoft",
            logo: "fa-brands fa-microsoft",
            jobRole: "Data Scientist - AI Research & Azure ML",
            officialCareersUrl: "https://careers.microsoft.com",
            overview: "Develops predictive models, NLP capabilities, and intelligence services for Azure AI and Microsoft 365 Copilot.",
            hiringProcess: "Online Technical OA ➔ ML & Applied Math Technical Round ➔ System Design & Data Pipelines ➔ Executive AA Round.",
            eligibility: "Master's degree or B.Tech with strong ML research/project experience.",
            rounds: ["Online Coding & ML Test", "Machine Learning Theory & Code", "Data Systems & Pipeline Architecture", "Executive Manager Round"],
            codingQuestions: ["Build K-Means Clustering Algorithm in NumPy", "Compute Precision-Recall Curve from Scratch", "Tune Hyperparameters for LightGBM"],
            hrQuestions: ["How do you ensure ethical AI practices and prevent model bias?", "Why Microsoft AI Research?"],
            salary: "₹20 - ₹40 LPA",
            requiredSkills: ["Python", "PyTorch", "Scikit-Learn", "SQL", "Azure ML", "NLP", "Statistics"],
            preparationTips: "Practice writing ML algorithms using only NumPy, understand precision/recall trade-offs, and master feature engineering.",
            badgeColor: "teal"
        },
        {
            name: "Meta",
            logo: "fa-brands fa-facebook",
            jobRole: "Data Scientist - Core Algorithms",
            officialCareersUrl: "https://www.metacareers.com",
            overview: "Meta Data Scientists solve complex graph analytics, user retention modeling, and generative AI features for billions of users.",
            hiringProcess: "Technical Screening (Stats + SQL + Python) ➔ Product Analytics Round ➔ 2 ML & Coding Onsite Rounds.",
            eligibility: "B.Tech / M.Tech / Ph.D. with proven track record in statistical modeling or machine learning.",
            rounds: ["Product Intuition & Stats Screen", "SQL & Data Wrangling Live Coding", "ML Model Architecture & Coding", "Culture Fit Round"],
            codingQuestions: ["Simulate Random Walk on Graph Network", "Design Newsfeed Ranking Metric", "Compute ROC-AUC Metric"],
            hrQuestions: ["Describe a time your model failed in production and how you recovered.", "How do you prioritize metric impact versus engineering complexity?"],
            salary: "₹25 - ₹48 LPA",
            requiredSkills: ["Python", "SQL", "Machine Learning", "PyTorch", "Graph Analytics", "Statistics", "A/B Testing"],
            preparationTips: "Focus heavily on AB testing design, product metrics intuition, and fast Python algorithm implementation.",
            badgeColor: "pink"
        },
        {
            name: "Amazon",
            logo: "fa-brands fa-amazon",
            jobRole: "Applied Scientist / Data Scientist",
            officialCareersUrl: "https://www.amazon.jobs",
            overview: "Powers demand forecasting, personal recommendations, automated pricing, and Alexa speech systems.",
            hiringProcess: "OA (Coding & ML Concepts) ➔ 3 Technical Loop Rounds (Algorithms, ML Architecture, Deep Learning) ➔ Bar Raiser.",
            eligibility: "Master's or Ph.D. in Computer Science, Machine Learning, Statistics, or Operations Research.",
            rounds: ["Online Science Assessment", "Algorithms & ML Theory", "Deep Learning & System Design", "Bar Raiser Leadership Round"],
            codingQuestions: ["Implement Transformer Attention Mechanism", "Forecast Weekly Demand given Time-Series Data", "Handle Class Imbalance in Credit Risk Model"],
            hrQuestions: ["Describe a time you invented a new algorithm to solve a stubborn problem.", "How do you validate model stability over time?"],
            salary: "₹24 - ₹46 LPA",
            requiredSkills: ["Python", "PyTorch", "TensorFlow", "Machine Learning", "Deep Learning", "SQL", "Statistics"],
            preparationTips: "Be ready to explain math formulas on a whiteboard and align past research projects with Amazon Leadership Principles.",
            badgeColor: "amber"
        },
        {
            name: "NVIDIA",
            logo: "fa-solid fa-microchip",
            jobRole: "AI / Data Scientist",
            officialCareersUrl: "https://www.nvidia.com/en-us/about-nvidia/careers",
            overview: "NVIDIA accelerates deep learning, GPU computing frameworks (CUDA), synthetic data generation, and autonomous systems.",
            hiringProcess: "Coding & Math Screening ➔ Deep Learning & CUDA Architecture ➔ Model Optimization & Quantization ➔ Director Fit.",
            eligibility: "B.Tech/M.Tech/Ph.D. in CS, EE, or Applied Math with deep learning concentration.",
            rounds: ["Math & Python Coding Screen", "Deep Learning Architectures (CNNs, Transformers)", "Model Quantization & TensorRT", "Managerial Round"],
            codingQuestions: ["Optimize Matrix Multiplication using CUDA/NumPy", "Implement Custom Loss Function in PyTorch", "Quantize FP32 Model to INT8"],
            hrQuestions: ["Why GPU computing and AI hardware at NVIDIA?", "How do you stay ahead of cutting-edge AI research papers?"],
            salary: "₹28 - ₹55 LPA",
            requiredSkills: ["Python", "PyTorch", "CUDA", "C++", "Deep Learning", "TensorRT", "Computer Vision"],
            preparationTips: "Master PyTorch internals, CUDA parallelism concepts, memory bandwidth bottlenecks, and LLM quantization techniques.",
            badgeColor: "emerald"
        }
    ],

    // ----------------------------------------------------
    // 4. AI / MACHINE LEARNING ENGINEER
    // ----------------------------------------------------
    machinelearningengineer: [
        {
            name: "OpenAI",
            logo: "fa-solid fa-brain",
            jobRole: "Machine Learning Engineer - Foundation Models",
            officialCareersUrl: "https://openai.com/careers",
            overview: "OpenAI researches and deploys safe, beneficial artificial general intelligence (AGI) through GPT and Sora models.",
            hiringProcess: "Practical Coding Screen ➔ ML Systems & Scaling Architecture ➔ Research Deep Dive ➔ Alignment & Culture Fit.",
            eligibility: "Strong background in deep learning research, distributed training systems, or large language models (LLMs).",
            rounds: ["Practical Python/PyTorch Screen", "Distributed Training & System Scaling", "Research Paper Walkthrough", "Alignment & Behavioral"],
            codingQuestions: ["Implement FlashAttention Mechanism", "Distributed All-Reduce Communication Loop", "Implement KV-Cache for LLM Inference"],
            hrQuestions: ["How do you balance AI safety concerns with rapid deployment?", "Why OpenAI and AGI research?"],
            salary: "₹35 - ₹70 LPA (Equity + Compensation)",
            requiredSkills: ["Python", "PyTorch", "LLMs", "Distributed Systems", "CUDA", "Transformers", "MLOps"],
            preparationTips: "Deeply study Transformer architecture implementation, vLLM / Hugging Face internals, multi-GPU training, and RLHF.",
            badgeColor: "purple"
        },
        {
            name: "NVIDIA",
            logo: "fa-solid fa-microchip",
            jobRole: "Deep Learning Engineer - AI Systems",
            officialCareersUrl: "https://www.nvidia.com/careers",
            overview: "NVIDIA drives AI computing hardware acceleration, NeMo framework, and Enterprise LLM microservices (NIM).",
            hiringProcess: "C++/Python Coding Screen ➔ Deep Learning Architecture ➔ TensorRT / Model Inference Optimization ➔ Manager Round.",
            eligibility: "B.Tech / M.Tech in CS/ECE with strong CUDA, C++, and PyTorch experience.",
            rounds: ["C++ & Python Coding Screen", "Transformer & Convolutions Architecture", "GPU Memory & Inference Optimization", "Manager Round"],
            codingQuestions: ["Write Custom PyTorch C++ Extension", "Optimize Transformer Inference Latency", "Implement Memory-Efficient Backprop"],
            hrQuestions: ["Describe a project where you solved low-level performance bottlenecks.", "Why NVIDIA AI Infrastructure?"],
            salary: "₹28 - ₹55 LPA",
            requiredSkills: ["Python", "C++", "PyTorch", "CUDA", "TensorRT", "MLOps", "Deep Learning"],
            preparationTips: "Focus on GPU architecture, memory bandwidth vs compute bound operations, and C++/PyTorch bindings.",
            badgeColor: "emerald"
        },
        {
            name: "Google DeepMind",
            logo: "fa-brands fa-google",
            jobRole: "Research Engineer - Machine Learning",
            officialCareersUrl: "https://deepmind.google",
            overview: "Google DeepMind advances AI research across Gemini models, AlphaFold science systems, and reinforcement learning.",
            hiringProcess: "Coding Assessment (Math & Algorithms) ➔ ML Theory & Paper Presentation ➔ 3 Technical Onsite Loops ➔ Culture Round.",
            eligibility: "M.Tech / Ph.D. or top-tier open-source ML research publications (NeurIPS, ICML, ICLR).",
            rounds: ["Algorithms & Math Screen", "Research Paper Presentation", "ML Systems & Reinforcement Learning", "Googleyness Fit"],
            codingQuestions: ["Implement Deep Q-Learning (DQN) Agent", "Custom Attention Layer in JAX / PyTorch", "Monte Carlo Tree Search (MCTS) Implementation"],
            hrQuestions: ["Describe how you handle research dead-ends.", "What scientific breakthrough in AI excites you most?"],
            salary: "₹30 - ₹65 LPA",
            requiredSkills: ["Python", "JAX", "PyTorch", "Reinforcement Learning", "Deep Learning", "Mathematics"],
            preparationTips: "Master JAX/Flax or PyTorch, probability theory, linear algebra, and be ready to present your research paper.",
            badgeColor: "teal"
        },
        {
            name: "Microsoft AI",
            logo: "fa-brands fa-microsoft",
            jobRole: "Machine Learning Engineer - Copilot & LLM",
            officialCareersUrl: "https://careers.microsoft.com",
            overview: "Builds production AI microservices, fine-tuning infrastructure, and RAG search systems for Microsoft 365 Copilot.",
            hiringProcess: "Codility Test ➔ ML System Design & RAG Architecture ➔ Coding & Algorithms ➔ Executive AA Round.",
            eligibility: "B.Tech / M.Tech with CGPA >= 7.5 and ML engineering project background.",
            rounds: ["Codility Online Assessment", "RAG & Vector Search Architecture", "PyTorch Coding & Model Serving", "AA Manager Round"],
            codingQuestions: ["Implement Vector Similarity Search (Cosine / HNSW)", "Fine-tune LLaMA Model using LoRA", "Design Rate-Limited Model API"],
            hrQuestions: ["How do you ensure enterprise data privacy in AI applications?", "Why Microsoft AI?"],
            salary: "₹22 - ₹42 LPA",
            requiredSkills: ["Python", "PyTorch", "LangChain", "Vector DBs", "Docker", "Azure ML", "REST APIs"],
            preparationTips: "Build end-to-end RAG pipelines with Pinecone/Milvus, master LoRA/QLoRA fine-tuning, and fast inference deployment.",
            badgeColor: "amber"
        },
        {
            name: "IBM AI",
            logo: "fa-solid fa-server",
            jobRole: "AI / Machine Learning Engineer",
            officialCareersUrl: "https://www.ibm.com/employment",
            overview: "IBM watsonx builds enterprise foundation models, governance frameworks, and hybrid cloud AI solutions.",
            hiringProcess: "Online Technical Test ➔ ML Algorithms & Data Pipelines ➔ Model Deployment & API Round ➔ HR Fit.",
            eligibility: "B.Tech / M.Tech CS/IT with CGPA >= 7.0.",
            rounds: ["Online Technical Test", "Machine Learning & Scikit-Learn", "Model Serving & Flask/FastAPI", "HR Fit Round"],
            codingQuestions: ["Build Sentiment Classifier Pipeline in Scikit-Learn", "Deploy ML Model via FastAPI & Docker", "Handle Missing Data & Feature Scaling"],
            hrQuestions: ["Why IBM watsonx platform?", "How do you explain model predictions using SHAP or LIME?"],
            salary: "₹16 - ₹30 LPA",
            requiredSkills: ["Python", "Scikit-Learn", "PyTorch", "Docker", "FastAPI", "SQL", "Git"],
            preparationTips: "Practice building complete ML pipelines from data ingestion to Dockerized API deployment.",
            badgeColor: "blue"
        }
    ],

    // ----------------------------------------------------
    // 5. CYBERSECURITY ANALYST
    // ----------------------------------------------------
    cybersecurityanalyst: [
        {
            name: "Palo Alto Networks",
            logo: "fa-solid fa-shield-cat",
            jobRole: "Cyber Security Engineer / Threat Analyst",
            officialCareersUrl: "https://www.paloaltonetworks.com/company/careers",
            overview: "Palo Alto Networks is the global leader in cybersecurity, next-gen firewalls, SASE, and cloud security suites (Prisma).",
            hiringProcess: "Networking & Security Online Test ➔ Hands-on Packet Analysis & Linux Round ➔ System Vulnerability Assessment ➔ Manager Round.",
            eligibility: "B.Tech CS / IT / ECE with networking and cybersecurity background (CEH, Network+ preferred).",
            rounds: ["Networking & Security Online Test", "Wireshark Packet Analysis & Linux Mechanics", "Penetration Testing & Vulnerability Assessment", "Manager Fit"],
            codingQuestions: ["Python Script to Parse Syslog for Anomaly Detection", "Port Scanner Script in Python Socket Library", "Analyze PCAP File for SQL Injection"],
            hrQuestions: ["Walk me through how you would contain a zero-day ransomware attack.", "Why Palo Alto Networks?"],
            salary: "₹18 - ₹35 LPA",
            requiredSkills: ["Network Security", "Wireshark", "Linux", "Python", "SIEM", "Firewalls", "Penetration Testing"],
            preparationTips: "Master OSI model layers, TCP/IP handshake, Wireshark PCAP analysis, and Python socket programming.",
            badgeColor: "purple"
        },
        {
            name: "Cisco",
            logo: "fa-solid fa-network-wired",
            jobRole: "Information Security Engineer",
            officialCareersUrl: "https://jobs.cisco.com",
            overview: "Cisco secures worldwide internet infrastructure, enterprise networks, zero-trust architectures, and VPN tunnels.",
            hiringProcess: "Online Aptitude & Cisco Networking Test ➔ Technical Network Security Round ➔ Cryptography & OS Round ➔ HR Fit.",
            eligibility: "B.Tech CS / ECE / IT with CGPA >= 7.0.",
            rounds: ["Networking & Aptitude Test", "Network Protocols & Routing Security", "Cryptography & Operating Systems", "HR Interview"],
            codingQuestions: ["Implement AES Encryption / Decryption Wrapper", "Identify Malicious IP Ranges using Python", "Configure Subnet Masks & Firewall Rules"],
            hrQuestions: ["How do you balance user convenience with strict security policies?", "Why Cisco Security team?"],
            salary: "₹16 - ₹30 LPA",
            requiredSkills: ["Networking", "Cisco IOS", "Python", "Cryptography", "Linux", "Wireshark", "Firewalls"],
            preparationTips: "Brush up on CCNA fundamentals, public key infrastructure (PKI), TLS/SSL handshakes, and IPSec VPNs.",
            badgeColor: "teal"
        },
        {
            name: "CrowdStrike",
            logo: "fa-solid fa-bug-slash",
            jobRole: "Falcon Security Analyst / Engineer",
            officialCareersUrl: "https://www.crowdstrike.com/careers",
            overview: "CrowdStrike provides cloud-native endpoint protection (Falcon platform), threat intelligence, and incident response.",
            hiringProcess: "Threat Assessment OA ➔ Malware Analysis & Reverse Engineering Round ➔ Cloud Security Architecture ➔ Director Fit.",
            eligibility: "Degree in CS, Cybersecurity, or IT with hands-on threat hunting or CTF experience.",
            rounds: ["Threat Intelligence Online Test", "Endpoint Detection & Malware Analysis", "Cloud Security & Incident Response", "Director Round"],
            codingQuestions: ["Write YARA Rule to Detect Malware Payload", "Parse Windows Event Logs using Python", "Reverse Engineer Obfuscated PowerShell Payload"],
            hrQuestions: ["Tell us about a CTF challenge you solved.", "How do you handle high-pressure security incident alerts?"],
            salary: "₹20 - ₹38 LPA",
            requiredSkills: ["Endpoint Security", "Malware Analysis", "Python", "SIEM", "Linux", "YARA", "Incident Response"],
            preparationTips: "Participate in CTF competitions (TryHackMe, HackTheBox), practice writing YARA rules, and study Endpoint Detection (EDR).",
            badgeColor: "amber"
        },
        {
            name: "EY (Ernst & Young)",
            logo: "fa-solid fa-shield-halved",
            jobRole: "Cyber Risk Consultant",
            officialCareersUrl: "https://www.ey.com/careers",
            overview: "EY Cyber Risk Advisory helps Fortune 500 organizations defend against cyber attacks, conduct audits, and ensure ISO 27001 compliance.",
            hiringProcess: "Security & Risk Aptitude Test ➔ Cyber Risk Case Study ➔ Technical Security Audit Round ➔ Partner Fit.",
            eligibility: "B.Tech / MCA / M.Sc CS/IT with cyber security certifications or coursework.",
            rounds: ["Online Security Test", "Cyber Incident Scenario & Case Study", "Vulnerability Management & Audit", "Partner HR Round"],
            codingQuestions: ["Evaluate SOC 2 Compliance Audit Checklist", "Draft Incident Response Plan for Data Breach", "Identify OWASP Top 10 Flaws in Sample Code"],
            hrQuestions: ["How do you explain security risks to C-level executives?", "Why EY Cyber Advisory?"],
            salary: "₹8 - ₹16 LPA",
            requiredSkills: ["Cyber Risk", "ISO 27001", "OWASP Top 10", "SIEM", "NIST Framework", "Network Security"],
            preparationTips: "Study OWASP Top 10 web vulnerabilities, NIST Cybersecurity Framework, SOC 2 compliance, and security audit procedures.",
            badgeColor: "emerald"
        }
    ],

    // ----------------------------------------------------
    // 6. FULL STACK DEVELOPER
    // ----------------------------------------------------
    fullstackdeveloper: [
        {
            name: "Razorpay",
            logo: "fa-solid fa-credit-card",
            jobRole: "Full Stack Engineer (MERN / Node + React)",
            officialCareersUrl: "https://razorpay.com/jobs",
            overview: "Razorpay is India's leading fintech payment gateway powering online payments, business banking, and checkout infrastructure.",
            hiringProcess: "Machine Coding Assessment (Build Mini App in 2.5 hours) ➔ System Architecture & Frontend/Backend Deep Dive ➔ Cultural Fit Round.",
            eligibility: "B.Tech / M.Tech / MCA with strong JavaScript/TypeScript, React, and Node.js expertise.",
            rounds: ["Machine Coding (Working Full Stack App)", "Frontend & Performance Deep Dive", "Backend & Microservices System Design", "Culture Fit Round"],
            codingQuestions: ["Build Payment Checkout Modal in React with State Management", "Implement Rate Limiter Middleware in Express.js", "Design Idempotent Payment Webhook Receiver"],
            hrQuestions: ["How do you balance rapid feature delivery with 99.99% system availability?", "Why Razorpay fintech squad?"],
            salary: "₹18 - ₹34 LPA",
            requiredSkills: ["React", "Node.js", "Express.js", "TypeScript", "MongoDB", "PostgreSQL", "REST APIs"],
            preparationTips: "Practice machine coding rounds building full stack React+Node apps, state management, and custom Express middleware.",
            badgeColor: "purple"
        },
        {
            name: "Swiggy",
            logo: "fa-solid fa-utensils",
            jobRole: "Full Stack Developer",
            officialCareersUrl: "https://careers.swiggy.com",
            overview: "Swiggy operates India's largest on-demand hyper-local delivery network, Instamart, and food ordering platform.",
            hiringProcess: "Online Coding Test ➔ Machine Coding (Full Stack Feature) ➔ System Architecture Round ➔ HR Manager Round.",
            eligibility: "B.Tech / M.Tech CS/IT with strong web development fundamentals.",
            rounds: ["Online Algorithmic Test", "Full Stack Machine Coding", "High-Availability System Design", "HR Interview"],
            codingQuestions: ["Build Live Delivery Tracking UI with WebSockets", "Design Distributed Caching Layer for Menu Items", "Optimize React Bundle Size & Render Time"],
            hrQuestions: ["Tell us about a time you optimized a slow web app.", "Why Swiggy engineering team?"],
            salary: "₹16 - ₹30 LPA",
            requiredSkills: ["JavaScript", "React", "Node.js", "Redis", "MySQL", "WebSockets", "Git"],
            preparationTips: "Focus on WebSockets for real-time updates, React rendering performance optimization, and Redis caching.",
            badgeColor: "amber"
        },
        {
            name: "Zomato",
            logo: "fa-solid fa-bowl-food",
            jobRole: "Full Stack Software Engineer",
            officialCareersUrl: "https://www.zomato.com/careers",
            overview: "Zomato connects millions of food lovers with restaurant partners, Blinkit quick commerce, and dining experiences.",
            hiringProcess: "HackerRank Test ➔ Technical Frontend & Backend Interview ➔ System Architecture Round ➔ HR Fit.",
            eligibility: "B.Tech / M.Tech / BCA / MCA with strong full stack portfolio projects.",
            rounds: ["Online Technical Test", "React & Node.js Deep Dive", "Database & Microservices Architecture", "HR Culture Fit"],
            codingQuestions: ["Build Infinite Scroll Restaurant List in React", "Design Order Status State Machine in Node.js", "SQL Query for Daily Active Users"],
            hrQuestions: ["What excites you about quick-commerce technologies?", "How do you handle ambiguous product requirements?"],
            salary: "₹16 - ₹28 LPA",
            requiredSkills: ["React", "Node.js", "JavaScript", "HTML", "CSS", "PostgreSQL", "GraphQL"],
            preparationTips: "Build responsive, high-performance web UIs with CSS glassmorphism, React custom hooks, and REST/GraphQL APIs.",
            badgeColor: "pink"
        }
    ],

    // ----------------------------------------------------
    // 7. UI / UX DESIGNER
    // ----------------------------------------------------
    uiuxdesigner: [
        {
            name: "Adobe",
            logo: "fa-solid fa-palette",
            jobRole: "Product Designer / UI/UX Specialist",
            officialCareersUrl: "https://www.adobe.com/careers.html",
            overview: "Adobe sets the world standard for digital design software, creative design systems, and seamless user experiences.",
            hiringProcess: "Portfolio Review ➔ Design Challenge / Take-Home Prompt ➔ Onsite Design Presentation ➔ Behavioral & HR Fit.",
            eligibility: "Degree in Design, Human-Computer Interaction (HCI), CS, or equivalent design portfolio.",
            rounds: ["Portfolio Screening", "Take-Home Design App Challenge", "Design System & Interaction Critique", "Culture Fit Round"],
            codingQuestions: ["Design Accessible Mobile Onboarding Flow in Figma", "Build Modular Design System Components", "Create Interactive Micro-Animations Prototype"],
            hrQuestions: ["Walk us through a design trade-off where business goals clashed with user experience.", "Why Adobe Design Lab?"],
            salary: "₹16 - ₹32 LPA",
            requiredSkills: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems", "HTML", "CSS"],
            preparationTips: "Prepare a polished Behance / Figma portfolio highlighting your design thinking process, wireframes, and user research metrics.",
            badgeColor: "purple"
        },
        {
            name: "Airbnb",
            logo: "fa-solid fa-house-chimney",
            jobRole: "Experience Designer / UX Researcher",
            officialCareersUrl: "https://careers.airbnb.com",
            overview: "Airbnb designs world-class travel booking experiences, host dashboards, and delightful micro-interactions.",
            hiringProcess: "Portfolio Review ➔ App Critique Session ➔ Whiteboard Design Challenge ➔ Cross-Functional Partner Round.",
            eligibility: "Degree or certification in UI/UX Design, HCI, or strong Figma/Framer portfolio.",
            rounds: ["Portfolio Review", "Live App Critique (Deconstruct Popular App)", "Whiteboard UX Problem Solving", "Core Values Interview"],
            codingQuestions: ["Redesign Airbnb Search Filter Modal for Accessibility", "Create High-Fidelity Framer Prototype", "Define User Persona Journey Map"],
            hrQuestions: ["How do you incorporate user feedback into iterative designs?", "Why Airbnb design philosophy?"],
            salary: "₹18 - ₹35 LPA",
            requiredSkills: ["Figma", "User Journey Mapping", "Usability Testing", "Framer", "Design Systems", "UI Design"],
            preparationTips: "Practice live app critiques and whiteboard design challenges focusing on problem definition before jumping to solutions.",
            badgeColor: "pink"
        }
    ],

    // ----------------------------------------------------
    // 8. DEVOPS & CLOUD ARCHITECT
    // ----------------------------------------------------
    devopsengineer: [
        {
            name: "AWS (Amazon Web Services)",
            logo: "fa-brands fa-aws",
            jobRole: "Cloud / DevOps Solutions Architect",
            officialCareersUrl: "https://www.amazon.jobs",
            overview: "AWS powers global cloud infrastructure, serverless compute (Lambda), Kubernetes (EKS), and DevOps automation.",
            hiringProcess: "Online Technical Test ➔ Infrastructure Automation Deep Dive ➔ Cloud Architecture Loop ➔ Bar Raiser Round.",
            eligibility: "B.Tech CS / IT / ECE with AWS Certifications (Solutions Architect / DevOps Engineer preferred).",
            rounds: ["Online Cloud Test", "Terraform & Docker Live Coding", "Distributed Systems & Networking Architecture", "Bar Raiser Leadership Round"],
            codingQuestions: ["Write Terraform Script to Provision EKS Cluster", "Create CI/CD GitHub Action for Container Build", "Debug High Memory Utilization in Kubernetes Pod"],
            hrQuestions: ["Tell me about a cloud outage you resolved.", "How do you enforce security controls in CI/CD pipelines?"],
            salary: "₹18 - ₹36 LPA",
            requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Bash", "Python"],
            preparationTips: "Master Infrastructure as Code (Terraform), Kubernetes pod orchestration, Docker multi-stage builds, and AWS VPC networking.",
            badgeColor: "amber"
        },
        {
            name: "HashiCorp",
            logo: "fa-solid fa-server",
            jobRole: "Infrastructure Engineer (DevOps)",
            officialCareersUrl: "https://www.hashicorp.com/jobs",
            overview: "HashiCorp builds foundational cloud automation tools including Terraform, Vault, Consul, and Vagrant.",
            hiringProcess: "Practical Coding Test ➔ Systems & Networking Deep Dive ➔ Cloud Automation Round ➔ Manager Fit.",
            eligibility: "B.Tech / M.Tech in CS/IT with strong Linux, Go/Python, and cloud automation background.",
            rounds: ["Practical Coding Test (Go / Python)", "Linux Mechanics & Networking", "Terraform & Vault Architecture", "Culture Fit"],
            codingQuestions: ["Write Go Script to Automate Vault Secret Rotation", "Design High-Availability Consul Cluster", "Implement Custom Terraform Provider"],
            hrQuestions: ["Why open-source cloud automation at HashiCorp?", "How do you handle breaking API changes in infrastructure scripts?"],
            salary: "₹20 - ₹40 LPA",
            requiredSkills: ["Terraform", "Vault", "Go", "Docker", "Kubernetes", "Linux", "CI/CD"],
            preparationTips: "Deep dive into Terraform syntax, Go programming basics, Linux kernel cgroups/namespaces, and Vault secrets management.",
            badgeColor: "purple"
        }
    ]
};

// Aliases for matching role keys to datasets
COMPANY_PREPARATION_DATA.frontenddeveloper = COMPANY_PREPARATION_DATA.fullstackdeveloper;
COMPANY_PREPARATION_DATA.backenddeveloper = COMPANY_PREPARATION_DATA.softwareengineer;
COMPANY_PREPARATION_DATA.qaautomationengineer = COMPANY_PREPARATION_DATA.softwareengineer;
COMPANY_PREPARATION_DATA.dataengineer = COMPANY_PREPARATION_DATA.datascientist;
COMPANY_PREPARATION_DATA.airesearchspecialist = COMPANY_PREPARATION_DATA.machinelearningengineer;
COMPANY_PREPARATION_DATA.cloudarchitect = COMPANY_PREPARATION_DATA.devopsengineer;

window.COMPANY_PREPARATION_DATA = COMPANY_PREPARATION_DATA;
