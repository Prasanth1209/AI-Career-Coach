// AI Career Coach - Tab Navigation & View Switcher
// This module provides the switchTab function used across the entire app.

function switchTab(tabId) {
    if (!tabId) return;

    // Update state
    if (window.STATE) STATE.activeTab = tabId;

    // Update sidebar nav active state
    document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Show/hide tab panels
    document.querySelectorAll(".tab-panel").forEach(panel => {
        if (panel.id === `tab-${tabId}`) {
            panel.classList.add("active");
            panel.classList.remove("hidden");
            panel.style.display = "";
        } else {
            panel.classList.remove("active");
            panel.classList.add("hidden");
        }
    });

    // Update page header
    const navTitles = {
        dashboard: { title: "Career Hub Overview", subtitle: "Track progress, compile recommendations, and review schedules." },
        "resume-parser": { title: "ATS Resume Analyzer", subtitle: "Scan PDF/DOCX/TXT files, evaluate ATS rank, and view recommendations." },
        "skill-analyzer": { title: "Skill Gap Analyzer", subtitle: "Target skills checks, identify deficiencies, and prepare metrics across 90+ roles." },
        roadmap: { title: "Personalized Learning Roadmap", subtitle: "Structured 6-Week milestones tracker for target engineering roles." },
        interview: { title: "AI Mock Interview & Voice Coach", subtitle: "Practice situational queries, technical puzzles, and voice speech simulation." },
        recommendations: { title: "Company Preparation & Suitable Jobs", subtitle: "Corporate hiring guidelines, recruiter profiles, and AI matched job postings." },
        "placement-tracker": { title: "Placement Tracker", subtitle: "Track corporate job applications, test schedules, round progress, next interview dates, and offers." },
        profile: { title: "Student Profile", subtitle: "Sync credentials, college branch, and graduation attributes." }
    };

    const navInfo = navTitles[tabId] || { title: "AI Career Assistant", subtitle: "Campus placements trainer." };
    const pTitle = document.getElementById("page-title");
    const pSub = document.getElementById("page-subtitle");
    if (pTitle) pTitle.textContent = navInfo.title;
    if (pSub) pSub.textContent = navInfo.subtitle;

    // Trigger tab-specific render functions (safe guards)
    try {
        if (tabId === "skill-analyzer" && typeof renderSkillGapAnalyser === "function") renderSkillGapAnalyser();
        else if (tabId === "roadmap" && typeof renderRoadmapTimeline === "function") renderRoadmapTimeline();
        else if (tabId === "recommendations") {
            if (typeof renderPlacementRecommendations === "function") renderPlacementRecommendations();
            if (typeof fetchAndRenderJobs === "function") fetchAndRenderJobs();
        } else if (tabId === "placement-tracker" && typeof renderPlacementTracker === "function") {
            renderPlacementTracker();
        }
    } catch (e) {
        console.warn("[switchTab] Render error for tab:", tabId, e);
    }

    if (typeof refreshModernIcons === "function") refreshModernIcons();
}

function initNavListeners() {
    document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = item.getAttribute("data-tab");
            if (tabId) switchTab(tabId);
        });
    });

    const userCard = document.getElementById("sidebar-user-profile-card");
    if (userCard) {
        userCard.addEventListener("click", () => {
            switchTab("profile");
        });
    }
}

window.switchTab = switchTab;
window.initNavListeners = initNavListeners;
