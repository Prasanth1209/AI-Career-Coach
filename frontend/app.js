// AI Career Coach - Application Controller & State Manager

// Global Application State Manager
// NOTE: js/app.js may have created a stub STATE — we override it here.
const STATE = window.STATE && window.STATE.currentUser !== undefined ? window.STATE : {
    currentUser: null,
    activeTab: "dashboard",
    resumeParsedData: null,
    roadmapStates: {},
    interviewState: {
        active: false,
        role: "softwareengineer",
        category: "hr",
        currentQuestionIndex: 0,
        questions: [],
        answers: [],
        score: { confidence: 0, communication: 0, technical: 0, total: 0 },
        ttsEnabled: false
    },
    notifications: [],
    activeFlashcardIndex: 0,
    flashcardScore: { correct: 0, incorrect: 0, total: 0 },
    dbActiveTable: "Students",
    dbActiveSubpanel: "schema",
    dbActiveFilter: "all",
    dbSearchQuery: "",
    // Job Opportunities Portal State
    savedJobIds: [],
    jobApplications: [],
    jobActiveFilterTab: "all",
    jobWorkModeFilter: "all",
    jobTypeFilter: "all",
    jobExpFilter: "all",
    jobSearchQuery: "",
    targetRoleKey: "softwareengineer"
};
window.STATE = STATE;

// Start application when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const initSteps = [
        { name: "populateGlobalRoleDropdowns", fn: populateGlobalRoleDropdowns },
        { name: "initNotificationCenter", fn: initNotificationCenter },
        { name: "initAuthListeners", fn: initAuthListeners },
        { name: "initCollegeAutocomplete", fn: initCollegeAutocomplete },
        { name: "initNavListeners", fn: initNavListeners },
        { name: "initResumeListeners", fn: initResumeListeners },
        { name: "initRoadmapListeners", fn: initRoadmapListeners },
        { name: "initInterviewListeners", fn: initInterviewListeners },
        { name: "initPlacementAdviceListeners", fn: initPlacementAdviceListeners },
        { name: "initFlashcardListeners", fn: initFlashcardListeners },
        { name: "initPlacementTrackerListeners", fn: initPlacementTrackerListeners },
        { name: "initJobPortalListeners", fn: initJobPortalListeners },
        { name: "initProfileFormListeners", fn: initProfileFormListeners },
        { name: "initThemeController", fn: initThemeController },
        { name: "initAuthNeuralCanvas", fn: initAuthNeuralCanvas },
        { name: "initAchieversCarousel", fn: initAchieversCarousel },
        { name: "initDailyQuote", fn: initDailyQuote },
        { name: "initMouseParallax", fn: initMouseParallax },
        { name: "initRippleEffect", fn: initRippleEffect },
        { name: "initKeyboardShortcuts", fn: initKeyboardShortcuts },
        { name: "initNetworkStatusController", fn: initNetworkStatusController },
        { name: "initFloatingAiAssistant", fn: initFloatingAiAssistant },
        { name: "startAnimatedCounters", fn: startAnimatedCounters },
        { name: "checkExistingAuthSession", fn: checkExistingAuthSession },
        { name: "initMobileSidebarToggle", fn: initMobileSidebarToggle },
        { name: "refreshModernIcons", fn: refreshModernIcons }
    ];

    initSteps.forEach(step => {
        try {
            if (typeof step.fn === "function") {
                step.fn();
            }
        } catch (err) {
            console.warn(`[App Init Warning] Step "${step.name}" encountered an error:`, err);
        }
    });

    // Target role change handler
    try {
        const targetRoleSelect = document.getElementById("global-target-role");
        if (targetRoleSelect) {
            targetRoleSelect.addEventListener("change", () => {
                STATE.targetRoleKey = targetRoleSelect.value;
                syncDesiredRoleMetrics();
            });
        }
    } catch (err) {
        console.warn("[App Init Warning] Role selector event binding error:", err);
    }
});

// Modern Icon Refresh Helper (Lucide Icons)
function refreshModernIcons() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        try {
            lucide.createIcons();
        } catch (e) {
            console.warn("Lucide icons initialization warning:", e);
        }
    }
}

// ========================================================
// THEME SWITCHER CONTROLLER (Light / Dark Mode)
// ========================================================
function initThemeController() {
    const btnTheme = document.getElementById("btn-theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("theme-label");

    const savedTheme = localStorage.getItem("appTheme") || "dark";
    applyTheme(savedTheme);

    if (btnTheme) {
        btnTheme.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} Mode!`, "info", 2000);
        });
    }

    function applyTheme(theme) {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("appTheme", theme);
        if (themeIcon) {
            themeIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun text-amber";
        }
        if (themeLabel) {
            themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
        }
    }
}

// ========================================================
// MULTI-LANGUAGE TRANSLATION CONTROLLER (EN, TA, HI)
// ========================================================
const AUTH_I18N_STRINGS = {
    en: {
        heroTitle: "AI Career Path",
        heroSubtitle: "Your Intelligent Career Companion",
        heroDesc: "Analyse your resume, identify skill gaps, prepare for interviews, and achieve placement success with AI-powered guidance.",
        welcomeHeader: "Welcome to AI Career Academy",
        signInSubtitle: "Sign in to continue your career journey.",
        googleBtn: "Continue with Google",
        emailLabel: "Email Address",
        passLabel: "Password",
        rememberMe: "Remember Me",
        forgotPass: "Forgot Password?",
        signInBtn: "Continue",
        registerBtn: "Create Account",
        quoteTitle: "Quote of the Day",
        quoteText: '"Success doesn\'t come from luck. It comes from consistent preparation."'
    },
    ta: {
        heroTitle: "AI வாழ்க்கைப்பாதை",
        heroSubtitle: "உங்கள் அறிவாரந்த தொழில் துணைவன்",
        heroDesc: "உங்கள் ரெஸ்யூமை பகுப்பாய்வு செய்து, திறன்களை மேம்படுத்தி, நேர்காணல்களுக்கு தயாராகி வெற்றி பெறுங்கள்.",
        welcomeHeader: "AI தொழில் அகாடமிக்கு வருக",
        signInSubtitle: "உங்கள் பயணத்தைத் தொடர உள்நுழையவும்.",
        googleBtn: "கூகிள் மூலம் தொடரவும்",
        emailLabel: "மின்னஞ்சல் முகவரி",
        passLabel: "கடவுச்சொல்",
        rememberMe: "என்னை நினைவில் கொள்",
        forgotPass: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
        signInBtn: "தொடரவும்",
        registerBtn: "கணக்கை உருவாக்குங்கள்",
        quoteTitle: "இன்றைய பொன்மொழி",
        quoteText: '"வெற்றி அதிர்ஷ்டத்தால் வருவதில்லை. அது தொடர் முயற்சியால் மட்டுமே சாத்தியமாகிறது."'
    },
    hi: {
        heroTitle: "AI करियर पाथ",
        heroSubtitle: "आपका बुद्धिमान करियर साथी",
        heroDesc: "अपने रिज्यूमे का विश्लेषण करें, कौशल अंतराल को पहचानें और साक्षात्कार की तैयारी करें।",
        welcomeHeader: "AI करियर अकादमी में आपका स्वागत है",
        signInSubtitle: "अपनी करियर यात्रा जारी रखने के लिए साइन इन करें।",
        googleBtn: "Google के साथ जारी रखें",
        emailLabel: "ईमेल पता",
        passLabel: "पासवर्ड",
        rememberMe: "मुझे याद रखें",
        forgotPass: "पासवर्ड भूल गए?",
        signInBtn: "जारी रखें",
        registerBtn: "खाता बनाएं",
        quoteTitle: "आज का सुविचार",
        quoteText: '"सफलता भाग्य से नहीं मिलती, यह निरंतर तैयारी से आती है।"'
    }
};

function initAuthLanguageController() {
    const select = document.getElementById("auth-lang-select");
    if (!select) return;

    select.addEventListener("change", (e) => {
        const lang = e.target.value;
        const strings = AUTH_I18N_STRINGS[lang] || AUTH_I18N_STRINGS.en;

        const hTitle = document.getElementById("txt-hero-title");
        const hSub = document.getElementById("txt-hero-subtitle");
        const hDesc = document.getElementById("txt-hero-desc");
        const wHeading = document.getElementById("txt-welcome-heading");
        const sSub = document.getElementById("txt-signin-subtitle");
        const gBtn = document.getElementById("lbl-google-btn");
        const eLabel = document.getElementById("lbl-email");
        const pLabel = document.getElementById("lbl-pass");
        const rLabel = document.getElementById("lbl-remember");
        const fLabel = document.getElementById("lbl-forgot");
        const sBtn = document.getElementById("lbl-signin-btn");
        const regBtn = document.getElementById("lbl-register-btn");
        const qTitle = document.getElementById("lbl-quote-title");
        const qText = document.getElementById("quote-text-val");

        if (hTitle) hTitle.textContent = strings.heroTitle;
        if (hSub) hSub.textContent = strings.heroSubtitle;
        if (hDesc) hDesc.textContent = strings.heroDesc;
        if (wHeading) wHeading.textContent = strings.welcomeHeader;
        if (sSub) sSub.textContent = strings.signInSubtitle;
        if (gBtn) gBtn.textContent = strings.googleBtn;
        if (eLabel) eLabel.innerHTML = `<i class="fa-solid fa-envelope"></i> ${strings.emailLabel}`;
        if (pLabel) pLabel.innerHTML = `<i class="fa-solid fa-lock"></i> ${strings.passLabel}`;
        if (rLabel) rLabel.textContent = strings.rememberMe;
        if (fLabel) fLabel.textContent = strings.forgotPass;
        if (sBtn) sBtn.textContent = strings.signInBtn;
        if (regBtn) regBtn.textContent = strings.registerBtn;
        if (qTitle) qTitle.innerHTML = `<i class="fa-solid fa-quote-left text-teal"></i> ${strings.quoteTitle}`;
        if (qText) qText.textContent = strings.quoteText;

        showToast(`Language changed to ${lang === 'ta' ? 'தமிழ்' : lang === 'hi' ? 'हिन्दी' : 'English'}`, "info", 2000);
    });
}

// ========================================================
// NETWORK STATUS INDICATOR & OFFLINE DETECTOR
// ========================================================
function initNetworkStatusController() {
    const badge = document.getElementById("network-status-badge");
    const label = document.getElementById("network-status-label");

    function updateNetworkStatus() {
        if (!badge || !label) return;
        if (navigator.onLine) {
            badge.className = "network-badge online";
            label.textContent = "Online";
        } else {
            badge.className = "network-badge offline";
            label.textContent = "Offline";
            showToast("Network connection lost. Running in local offline mode.", "error", 4000);
        }
    }

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    updateNetworkStatus();
}

// ========================================================
// ANIMATED NEURAL CANVAS BACKGROUND
// ========================================================
function initAuthNeuralCanvas() {
    const canvas = document.getElementById("auth-neural-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = canvas.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.offsetHeight || window.innerHeight;

    const particles = [];
    const particleCount = Math.min(45, Math.floor(width / 30));

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${0.25 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        width = canvas.width = canvas.offsetWidth || window.innerWidth;
        height = canvas.height = canvas.offsetHeight || window.innerHeight;
    });
}

// ========================================================
// TYPEWRITER & PARALLAX & RIPPLE CONTROLLERS
// ========================================================
function initTypewriterEffect() {
    const heading = document.getElementById("txt-welcome-heading");
    if (!heading) return;
    const text = "Welcome to AI Career Academy";
    heading.textContent = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(type, 45);
        }
    }
    type();
}

function initMouseParallax() {
    const overlay = document.getElementById("auth-overlay");
    const blobs = document.querySelectorAll(".bg-blob");
    if (!overlay || blobs.length === 0) return;

    overlay.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        blobs.forEach((blob, idx) => {
            const factor = (idx + 1) * 0.7;
            blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

function initRippleEffect() {
    document.querySelectorAll(".btn-ripple").forEach(btn => {
        btn.addEventListener("click", function(e) {
            const circle = document.createElement("span");
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
            circle.classList.add("ripple-element");

            const ripple = btn.getElementsByClassName("ripple-element")[0];
            if (ripple) ripple.remove();

            btn.appendChild(circle);
        });
    });
}

// ========================================================
// LIVE ANIMATED COUNTERS ENGINE (125K+, 48K+, 320+, 94%)
// ========================================================
function startAnimatedCounters() {
    const cReg = document.getElementById("counter-registered");
    const cPlaced = document.getElementById("counter-placed");
    const cComp = document.getElementById("counter-companies");
    const cRate = document.getElementById("counter-success-rate");

    if (!cReg) return;

    animateSingleCounter(cReg, 0, 125, 1500, "K+");
    animateSingleCounter(cPlaced, 0, 48, 1500, "K+");
    animateSingleCounter(cComp, 0, 320, 1200, "+");
    animateSingleCounter(cRate, 0, 94.5, 1200, "%", true);
}

function animateSingleCounter(el, start, end, duration, suffix = "", isFloat = false) {
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;

        if (isFloat) {
            el.textContent = current.toFixed(1) + suffix;
        } else {
            el.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// ========================================================
// TOP ACHIEVERS AUTO-SLIDING CAROUSEL
// ========================================================
const TOP_ACHIEVERS_DATA = [
    { name: "Priya Sundaram", college: "PSG College of Technology", company: "Google", package: "₹28.5 LPA", role: "Software Engineer", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
    { name: "Karthik Raja", college: "Anna University (CEG)", company: "Microsoft", package: "₹26.0 LPA", role: "Cloud Engineer", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { name: "Ananya Sharma", college: "IIT Madras", company: "Amazon", package: "₹32.0 LPA", role: "SDE-1", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" },
    { name: "Venkatesh Kumar", college: "SSN College of Engineering", company: "Zoho", package: "₹16.5 LPA", role: "Product Developer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
];

function initAchieversCarousel() {
    const slideBox = document.getElementById("achiever-slide-box");
    const dotsBox = document.getElementById("carousel-dots-container");

    if (!slideBox) return;

    let currentIndex = 0;

    function renderSlide(idx) {
        const item = TOP_ACHIEVERS_DATA[idx];
        slideBox.innerHTML = `
            <img src="${item.photo}" class="achiever-avatar" alt="${item.name}">
            <div>
                <h4 style="color: #fff; font-size: 0.9rem;">${item.name}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted);">${item.college}</p>
                <div style="display: flex; gap: 6px; margin-top: 4px;">
                    <span class="badge badge-accent" style="font-size: 0.65rem;">${item.company}</span>
                    <span class="badge badge-completed" style="font-size: 0.65rem;">${item.package}</span>
                </div>
            </div>
        `;
    }

    renderSlide(0);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % TOP_ACHIEVERS_DATA.length;
        renderSlide(currentIndex);
    }, 5000);
}

// ========================================================
// DAILY MOTIVATION QUOTE ROTATION
// ========================================================
const DAILY_MOTIVATION_QUOTES = [
    '"Success doesn\'t come from luck. It comes from consistent preparation."',
    '"The future belongs to those who learn more skills and combine them in creative ways."',
    '"Your limitation—it\'s only your imagination. Push harder every single day."',
    '"Great things never come from comfort zones. Master your engineering fundamentals."',
    '"Opportunities don\'t happen, you create them through structured practice."'
];

function initDailyQuote() {
    const qEl = document.getElementById("quote-text-val");
    if (!qEl) return;
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const qIndex = dayOfYear % DAILY_MOTIVATION_QUOTES.length;
    qEl.textContent = DAILY_MOTIVATION_QUOTES[qIndex];
}

// ========================================================
// PASSKEY WEBAUTHN SIMULATION CONTROLLER
// ========================================================
function initPasskeyController() {
    const btnPasskey = document.getElementById("btn-passkey-login");
    if (!btnPasskey) return;

    btnPasskey.addEventListener("click", async () => {
        showToast("Initializing Passkey WebAuthn sensor...", "info", 2000);
        if (window.PublicKeyCredential) {
            setTimeout(() => {
                showToast("Passkey verified cleanly! Signing in candidate...", "success", 3000);
                const mockUser = {
                    id: "usr_passkey_demo",
                    name: "Passkey Verified Candidate",
                    email: "candidate@passkey.auth",
                    college: "PSG College of Technology",
                    branch: "Computer Science",
                    graduation_year: 2026
                };
                executeSuccessfulLogin(mockUser);
            }, 1200);
        } else {
            showToast("WebAuthn Passkeys supported on HTTPS / modern browser.", "info", 3000);
        }
    });
}

// ========================================================
// KEYBOARD SHORTCUTS CONTROLLER
// ========================================================
function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key.toLowerCase() === "t") {
            e.preventDefault();
            const btnTheme = document.getElementById("btn-theme-toggle");
            if (btnTheme) btnTheme.click();
        } else if (e.altKey && e.key.toLowerCase() === "l") {
            e.preventDefault();
            const linkLogin = document.getElementById("link-to-login");
            if (linkLogin) linkLogin.click();
        } else if (e.altKey && e.key.toLowerCase() === "r") {
            e.preventDefault();
            const linkReg = document.getElementById("link-to-register");
            if (linkReg) linkReg.click();
        } else if (e.altKey && e.key.toLowerCase() === "h") {
            e.preventDefault();
            const drawerHeader = document.getElementById("btn-toggle-drawer");
            if (drawerHeader) drawerHeader.click();
        }
    });
}

// ========================================================
// FLOATING AI CHAT ASSISTANT CONTROLLER
// ========================================================
function initFloatingAiAssistant() {
    const btnAssistant = document.getElementById("btn-floating-ai-assistant");
    if (!btnAssistant) return;

    btnAssistant.addEventListener("click", () => {
        const drawerHeader = document.getElementById("btn-toggle-drawer");
        if (drawerHeader) {
            drawerHeader.click();
            showToast("Opening AI Placement Advisory Assistant...", "info", 2000);
        }
    });
}

// ========================================================
// ROLE DROPDOWN INITIALIZER (90+ Roles)
// ========================================================
function populateGlobalRoleDropdowns() {
    const globalSelect = document.getElementById("global-target-role");
    const interviewSelect = document.getElementById("interview-role-select");

    if (!globalSelect) return;

    globalSelect.innerHTML = "";
    if (interviewSelect) interviewSelect.innerHTML = "";

    Object.keys(ROLE_CATEGORIES).forEach(category => {
        const optgroupGlobal = document.createElement("optgroup");
        optgroupGlobal.label = category;

        let optgroupInterview = null;
        if (interviewSelect) {
            optgroupInterview = document.createElement("optgroup");
            optgroupInterview.label = category;
        }

        ROLE_CATEGORIES[category].forEach(roleTitle => {
            const rKey = roleToKey(roleTitle);

            const optG = document.createElement("option");
            optG.value = rKey;
            optG.textContent = roleTitle;
            optgroupGlobal.appendChild(optG);

            if (optgroupInterview) {
                const optI = document.createElement("option");
                optI.value = rKey;
                optI.textContent = roleTitle;
                optgroupInterview.appendChild(optI);
            }
        });

        globalSelect.appendChild(optgroupGlobal);
        if (interviewSelect && optgroupInterview) {
            interviewSelect.appendChild(optgroupInterview);
        }
    });

    globalSelect.value = "softwareengineer";
    if (interviewSelect) interviewSelect.value = "softwareengineer";
}

// ========================================================
// SEARCHABLE COLLEGE AUTOCOMPLETE COMBOBOX CONTROLLER
// ========================================================
function initCollegeAutocomplete() {
    const collegeInput = document.getElementById("reg-college");
    const dropdownBox = document.getElementById("college-autocomplete-box");
    const resultsList = document.getElementById("college-results-list");
    const filterPills = document.querySelectorAll("#college-filters-row .college-filter-pill");

    if (!collegeInput || !dropdownBox || !resultsList) return;

    let activeFilterCategory = "all";
    let highlightedIndex = -1;
    let currentRenderedItems = [];

    function getRecentColleges() {
        const saved = localStorage.getItem("recentColleges");
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return []; }
        }
        return ["Anna University (CEG Campus), Guindy", "PSG College of Technology", "Loyola College (Autonomous)"];
    }

    function saveRecentCollege(collegeName) {
        if (!collegeName || collegeName.trim() === "") return;
        let list = getRecentColleges();
        list = list.filter(c => c.toLowerCase() !== collegeName.toLowerCase());
        list.unshift(collegeName.trim());
        if (list.length > 5) list = list.slice(0, 5);
        localStorage.setItem("recentColleges", JSON.stringify(list));
    }

    function normalizeStr(str) {
        return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function highlightText(text, query) {
        if (!query || !query.trim()) return text;
        const qClean = query.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const regex = new RegExp(`(${qClean})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function renderDropdown() {
        const query = collegeInput.value.trim();
        const normQ = normalizeStr(query);
        resultsList.innerHTML = "";
        currentRenderedItems = [];
        highlightedIndex = -1;

        if (normQ === "") {
            const recents = getRecentColleges();
            if (recents.length > 0) {
                const recHeader = document.createElement("div");
                recHeader.className = "college-group-header";
                recHeader.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> Recent Colleges`;
                resultsList.appendChild(recHeader);

                recents.forEach(rName => {
                    const itemData = TAMILNADU_COLLEGES_DATA.find(c => c.name.toLowerCase() === rName.toLowerCase()) || {
                        name: rName, district: "Tamil Nadu", type: "Institution", accreditation: "Recognized"
                    };
                    createItemNode(itemData, query);
                });
            }

            const popHeader = document.createElement("div");
            popHeader.className = "college-group-header";
            popHeader.innerHTML = `<i class="fa-solid fa-fire text-amber"></i> Popular Tamil Nadu Colleges`;
            resultsList.appendChild(popHeader);

            const populars = TAMILNADU_COLLEGES_DATA.filter(c => c.popular);
            populars.forEach(c => createItemNode(c, query));
        } else {
            let filtered = TAMILNADU_COLLEGES_DATA.filter(c => {
                const nameNorm = normalizeStr(c.name);
                const distNorm = normalizeStr(c.district);
                const typeNorm = normalizeStr(c.type);
                const univNorm = normalizeStr(c.university);
                return nameNorm.includes(normQ) || distNorm.includes(normQ) || typeNorm.includes(normQ) || univNorm.includes(normQ);
            });

            if (activeFilterCategory !== "all") {
                filtered = filtered.filter(c => {
                    if (activeFilterCategory === "Engineering") return c.type === "Engineering";
                    if (activeFilterCategory === "Arts & Science") return c.type === "Arts & Science";
                    if (activeFilterCategory === "Government") return c.university.includes("Government") || c.accreditation.includes("Government") || c.name.includes("Government");
                    if (activeFilterCategory === "Autonomous") return c.accreditation.includes("Autonomous") || c.university.includes("Autonomous");
                    if (activeFilterCategory === "Deemed University") return c.type.includes("Deemed") || c.type.includes("Central") || c.university.includes("Deemed") || c.university.includes("Central");
                    return true;
                });
            }

            if (filtered.length > 0) {
                const resHeader = document.createElement("div");
                resHeader.className = "college-group-header";
                resHeader.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Search Results (${filtered.length})`;
                resultsList.appendChild(resHeader);

                filtered.forEach(c => createItemNode(c, query));
            } else {
                const noRes = document.createElement("div");
                noRes.style.padding = "14px";
                noRes.style.textAlign = "center";
                noRes.style.color = "var(--text-muted)";
                noRes.style.fontSize = "0.84rem";
                noRes.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber"></i> This college is not currently in our recognized list.`;
                resultsList.appendChild(noRes);
            }
        }

        const customOpt = document.createElement("div");
        customOpt.className = "college-custom-option";
        customOpt.innerHTML = `<i class="fa-solid fa-pen"></i> Can't find your college? Enter College Manually`;
        customOpt.addEventListener("click", () => {
            if (query === "") {
                collegeInput.value = "";
                collegeInput.focus();
                showToast("Please type your custom college name directly in the box.", "info", 3000);
            } else {
                selectCollegeItem(query, true);
            }
        });
        resultsList.appendChild(customOpt);

        dropdownBox.classList.remove("hidden");
    }

    function createItemNode(collegeObj, query) {
        const itemNode = document.createElement("div");
        itemNode.className = "college-item";
        itemNode.innerHTML = `
            <div class="college-item-main">
                <span class="college-item-name">${highlightText(collegeObj.name, query)}</span>
                <span class="college-item-sub">${collegeObj.district} • ${collegeObj.university}</span>
            </div>
            <div class="college-item-badges">
                <span class="badge badge-accent" style="font-size: 0.65rem;">${collegeObj.type}</span>
                ${collegeObj.accreditation ? `<span class="badge badge-completed" style="font-size: 0.65rem;">${collegeObj.accreditation}</span>` : ''}
            </div>
        `;

        itemNode.addEventListener("click", () => selectCollegeItem(collegeObj.name, false));

        resultsList.appendChild(itemNode);
        currentRenderedItems.push({ element: itemNode, name: collegeObj.name });
    }

    function selectCollegeItem(collegeName, isCustom = false) {
        collegeInput.value = collegeName;
        saveRecentCollege(collegeName);
        dropdownBox.classList.add("hidden");
        if (isCustom) {
            showToast(`Custom college added: "${collegeName}". Proceed with registration!`, "info", 3500);
        } else {
            showToast(`Selected: ${collegeName}`, "success", 2000);
        }
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeFilterCategory = pill.getAttribute("data-filter");
            renderDropdown();
        });
    });

    collegeInput.addEventListener("focus", () => renderDropdown());
    collegeInput.addEventListener("input", () => renderDropdown());

    collegeInput.addEventListener("keydown", (e) => {
        if (dropdownBox.classList.contains("hidden")) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                renderDropdown();
                return;
            }
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentRenderedItems.length > 0) {
                highlightedIndex = (highlightedIndex + 1) % currentRenderedItems.length;
                updateKeyboardHighlight();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentRenderedItems.length > 0) {
                highlightedIndex = (highlightedIndex - 1 + currentRenderedItems.length) % currentRenderedItems.length;
                updateKeyboardHighlight();
            }
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0 && highlightedIndex < currentRenderedItems.length) {
                e.preventDefault();
                selectCollegeItem(currentRenderedItems[highlightedIndex].name, false);
            }
        } else if (e.key === "Escape" || e.key === "Tab") {
            dropdownBox.classList.add("hidden");
        }
    });

    function updateKeyboardHighlight() {
        currentRenderedItems.forEach((item, idx) => {
            if (idx === highlightedIndex) {
                item.element.classList.add("active-item");
                item.element.scrollIntoView({ block: "nearest", behavior: "smooth" });
            } else {
                item.element.classList.remove("active-item");
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (!collegeInput.contains(e.target) && !dropdownBox.contains(e.target)) {
            dropdownBox.classList.add("hidden");
        }
    });
}

// ========================================================
// SYSTEM TOAST NOTIFICATION CONTROLLER
// ========================================================
function showToast(message, type = "info", duration = 4500) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : type === 'success' ? 'fa-circle-check' : 'fa-bell'}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" type="button">&times;</button>
    `;
    const closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => toast.remove());
    }
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ========================================================
// NOTIFICATION SYSTEM CONTROLLER
// ========================================================
function initNotificationCenter() {
    const bellBtn = document.getElementById("btn-notification-bell");
    const dropdown = document.getElementById("notification-dropdown");
    const markAllBtn = document.getElementById("btn-mark-all-read");
    const clearAllBtn = document.getElementById("btn-clear-notifications");

    const saved = localStorage.getItem("userNotifications");
    if (saved) {
        try {
            STATE.notifications = JSON.parse(saved);
        } catch (e) {
            STATE.notifications = getDefaultNotifications();
        }
    } else {
        STATE.notifications = getDefaultNotifications();
    }

    renderNotificationsList();

    if (bellBtn && dropdown) {
        bellBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
                dropdown.classList.add("hidden");
            }
        });
    }

    if (markAllBtn) {
        markAllBtn.addEventListener("click", () => {
            STATE.notifications.forEach(n => n.read = true);
            saveAndRenderNotifications();
            showToast("All notifications marked as read.", "success", 2000);
        });
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
            STATE.notifications = [];
            saveAndRenderNotifications();
            showToast("Notifications cleared.", "info", 2000);
        });
    }
}

function getDefaultNotifications() {
    return [
        { id: 1, title: "Welcome to AI Career Path!", message: "Upload your resume in the Resume Analyzer tab to get started.", time: "Just now", read: false, type: "purple" },
        { id: 2, title: "25+ Corporate Job Openings Online", message: "Check Suitable Job Opportunities in Company Prep Hub.", time: "5m ago", read: false, type: "teal" },
        { id: 3, title: "Mock Interview Voice Ready", message: "Practice real-time HR and Technical drills with text-to-speech feedback.", time: "1h ago", read: false, type: "pink" }
    ];
}

function addNotification(title, message, type = "purple") {
    const newNotif = {
        id: Date.now(),
        title,
        message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type
    };
    STATE.notifications.unshift(newNotif);
    saveAndRenderNotifications();

    const bellBtn = document.getElementById("btn-notification-bell");
    if (bellBtn) {
        bellBtn.classList.add("bell-ring");
        setTimeout(() => bellBtn.classList.remove("bell-ring"), 600);
    }
}

function saveAndRenderNotifications() {
    localStorage.setItem("userNotifications", JSON.stringify(STATE.notifications));
    renderNotificationsList();
}

function renderNotificationsList() {
    const container = document.getElementById("notification-list-container");
    const countBadge = document.getElementById("notification-unread-count");

    if (!container) return;

    const unreadCount = STATE.notifications.filter(n => !n.read).length;
    if (countBadge) {
        countBadge.textContent = unreadCount;
        countBadge.style.display = unreadCount > 0 ? "flex" : "none";
    }

    container.innerHTML = "";
    if (STATE.notifications.length === 0) {
        container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No notifications right now.</div>`;
        return;
    }

    STATE.notifications.forEach(n => {
        const item = document.createElement("div");
        item.className = `notification-item ${n.read ? '' : 'unread'}`;
        item.innerHTML = `
            <div class="notification-icon bg-tag-${n.type}">
                <i class="fa-solid fa-bell"></i>
            </div>
            <div class="notification-content">
                <h5>${n.title}</h5>
                <p>${n.message}</p>
                <span class="notification-time">${n.time}</span>
            </div>
            <button class="notification-delete-btn" type="button" title="Delete notification">&times;</button>
        `;

        item.addEventListener("click", (e) => {
            if (!e.target.classList.contains("notification-delete-btn")) {
                n.read = true;
                saveAndRenderNotifications();
            }
        });

        const delBtn = item.querySelector(".notification-delete-btn");
        if (delBtn) {
            delBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                STATE.notifications = STATE.notifications.filter(x => x.id !== n.id);
                saveAndRenderNotifications();
            });
        }

        container.appendChild(item);
    });
}

// ========================================================
// SECURITY, AUTHENTICATION & GOOGLE OAUTH CONTROLLERS
// ========================================================

// Note: Google OAuth 2.0 identity and popup/redirect flow logic is managed by frontend/js/google-auth.js


// ========================================================
// CENTRALIZED AUTHENTICATION STATE & VIEW CONTROLLERS
// ========================================================

/**
 * Global Application State Switcher
 * Ensures ONLY #auth-overlay OR #main-application-shell is visible at any time.
 */
function setApplicationState(isAuthenticated) {
    const authOverlay = document.getElementById("auth-overlay");
    const appShell = document.getElementById("main-application-shell");
    const landingContainer = document.getElementById("landing-page-container");

    if (isAuthenticated) {
        // Authenticated Candidate State: Show App Shell, Hide Landing Page & Auth Overlay
        if (landingContainer) {
            landingContainer.style.display = "none";
        }
        if (authOverlay) {
            authOverlay.classList.add("hidden");
            authOverlay.style.display = "none";
            authOverlay.style.opacity = "0";
            authOverlay.style.pointerEvents = "none";
            authOverlay.style.visibility = "hidden";
        }
        if (appShell) {
            appShell.classList.remove("hidden");
            appShell.classList.remove("app-locked");
            appShell.style.display = "flex";
            appShell.style.opacity = "1";
            appShell.style.pointerEvents = "auto";
            appShell.style.visibility = "visible";
        }
    } else {
        // Unauthenticated / Guest State: Hide App Shell, Show Landing Page
        if (appShell) {
            appShell.classList.add("hidden");
            appShell.classList.add("app-locked");
            appShell.style.display = "none";
            appShell.style.opacity = "0";
            appShell.style.pointerEvents = "none";
            appShell.style.visibility = "hidden";
        }
        if (landingContainer) {
            landingContainer.style.display = "block";
        }
        // Keep authOverlay as modal popup (hidden unless triggered)
        if (authOverlay && authOverlay.classList.contains("force-open")) {
            authOverlay.classList.remove("hidden");
            authOverlay.style.display = "flex";
            authOverlay.style.opacity = "1";
            authOverlay.style.pointerEvents = "auto";
            authOverlay.style.visibility = "visible";
        } else if (authOverlay) {
            authOverlay.classList.add("hidden");
            authOverlay.style.display = "none";
            authOverlay.style.opacity = "0";
            authOverlay.style.pointerEvents = "none";
            authOverlay.style.visibility = "hidden";
        }
    }
}

/**
 * Centralized Auth Subview Switcher
 * Ensures ONLY ONE auth screen (#auth-register-view, #auth-login-view, #auth-forgot-password-view, #auth-reset-password-view) is visible.
 */
function showAuthView(viewName) {
    const views = {
        register: document.getElementById("auth-register-view"),
        login: document.getElementById("auth-login-view"),
        forgot: document.getElementById("auth-forgot-password-view"),
        reset: document.getElementById("auth-reset-password-view")
    };

    // Hide ALL auth subviews unconditionally
    Object.keys(views).forEach(key => {
        if (views[key]) {
            views[key].classList.add("hidden");
            views[key].style.display = "none";
            views[key].style.visibility = "hidden";
            views[key].style.opacity = "0";
            views[key].style.pointerEvents = "none";
            views[key].classList.remove("auth-view-anim");
        }
    });

    // Clear password fields for security
    document.querySelectorAll("#auth-overlay input[type='password']").forEach(input => input.value = "");

    // Show ONLY the requested subview
    const target = views[viewName] || views.login;
    if (target) {
        target.classList.remove("hidden");
        target.style.display = "block";
        target.style.visibility = "visible";
        target.style.opacity = "1";
        target.style.pointerEvents = "auto";

        void target.offsetWidth; // Force reflow for animation reset
        target.classList.add("auth-view-anim");

        // Focus management
        const focusInputMap = {
            register: "reg-name",
            login: "login-email",
            forgot: "forgot-email",
            reset: "reset-new-password"
        };
        const focusId = focusInputMap[viewName];
        if (focusId) {
            const inputEl = document.getElementById(focusId);
            if (inputEl) setTimeout(() => inputEl.focus(), 50);
        }
    }
}

// Convenience Wrappers for Auth Views & Application Controller
function showRegister() {
    setApplicationState(false);
    showAuthView("register");
}

function showLogin() {
    setApplicationState(false);
    showAuthView("login");
}

function showForgotPassword() {
    setApplicationState(false);
    showAuthView("forgot");
}

function showResetPassword() {
    setApplicationState(false);
    showAuthView("reset");
}

function showDashboard() {
    setApplicationState(true);
    switchTab("dashboard");
}

function logout() {
    localStorage.removeItem("authToken");
    STATE.currentUser = null;

    if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
        try { google.accounts.id.disableAutoSelect(); } catch (e) {}
    }

    setApplicationState(false);
    showAuthView("login");
    showToast("Signed out successfully.", "info", 3000);
}

function logoutUser() {
    logout();
}

// Bind to window object for global availability
window.showRegister = showRegister;
window.showLogin = showLogin;
window.showForgotPassword = showForgotPassword;
window.showResetPassword = showResetPassword;
window.showDashboard = showDashboard;
window.logout = logout;
window.logoutUser = logoutUser;
window.showAuthView = showAuthView;
window.setApplicationState = setApplicationState;

function initAuthListeners() {
    const linkToLogin = document.getElementById("link-to-login");
    const linkToRegister = document.getElementById("link-to-register");
    const linkToForgot = document.getElementById("link-to-forgot");
    const btnBackFromForgot = document.getElementById("btn-back-from-forgot");

    const formRegister = document.getElementById("form-register");
    const formLogin = document.getElementById("form-login");
    const formForgot = document.getElementById("form-forgot-password");

    function syncEmailValue(sourceId, targetId) {
        const src = document.getElementById(sourceId);
        const tgt = document.getElementById(targetId);
        if (src && tgt && src.value.trim() !== "") {
            tgt.value = src.value.trim();
        }
    }

    // Google Sign-In Buttons
    document.querySelectorAll(".btn-google").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            triggerGoogleSignIn();
        });
    });

    // Logout Action Handlers
    const sidebarLogout = document.getElementById("btn-sidebar-logout");
    const profileLogout = document.getElementById("btn-profile-logout");
    if (sidebarLogout) sidebarLogout.addEventListener("click", (e) => { e.stopPropagation(); logoutUser(); });
    if (profileLogout) profileLogout.addEventListener("click", logoutUser);

    // Password Visibility Toggles
    document.querySelectorAll(".toggle-password-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute("data-target");
            const input = document.getElementById(targetId);
            const icon = btn.querySelector("i");
            if (input) {
                if (input.type === "password") {
                    input.type = "text";
                    if (icon) {
                        icon.classList.remove("fa-eye");
                        icon.classList.add("fa-eye-slash");
                    }
                } else {
                    input.type = "password";
                    if (icon) {
                        icon.classList.remove("fa-eye-slash");
                        icon.classList.add("fa-eye");
                    }
                }
            }
        });
    });

    // 1. Navigation: Register View -> Login View ("Sign In here")
    if (linkToLogin) {
        const navigateToLogin = (e) => {
            e.preventDefault();
            e.stopPropagation();
            syncEmailValue("reg-email", "login-email");
            showAuthView("login");
        };
        linkToLogin.addEventListener("click", navigateToLogin);
        linkToLogin.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") navigateToLogin(e);
        });
    }

    // 2. Navigation: Login View -> Register View ("Create Account")
    if (linkToRegister) {
        const navigateToRegister = (e) => {
            e.preventDefault();
            e.stopPropagation();
            syncEmailValue("login-email", "reg-email");
            showAuthView("register");
        };
        linkToRegister.addEventListener("click", navigateToRegister);
        linkToRegister.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") navigateToRegister(e);
        });
    }

    // 3. Navigation: Login View -> Forgot Password View ("Forgot password?")
    if (linkToForgot) {
        const navigateToForgot = (e) => {
            e.preventDefault();
            e.stopPropagation();
            syncEmailValue("login-email", "forgot-email");
            showAuthView("forgot");
        };
        linkToForgot.addEventListener("click", navigateToForgot);
        linkToForgot.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") navigateToForgot(e);
        });
    }

    // 4. Navigation: Forgot Password View -> Login View ("Back to Sign In")
    if (btnBackFromForgot) {
        const navigateBackToLogin = (e) => {
            e.preventDefault();
            e.stopPropagation();
            syncEmailValue("forgot-email", "login-email");
            showAuthView("login");
        };
        btnBackFromForgot.addEventListener("click", navigateBackToLogin);
        btnBackFromForgot.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") navigateBackToLogin(e);
        });
    }

    if (formRegister) {
        formRegister.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nameVal = document.getElementById("reg-name").value.trim();
            const emailVal = document.getElementById("reg-email").value.trim();
            const passVal = document.getElementById("reg-password").value;
            const confirmPassVal = document.getElementById("reg-confirm-password").value;
            const collegeVal = document.getElementById("reg-college") ? document.getElementById("reg-college").value.trim() : "";
            const branchVal = document.getElementById("reg-branch") ? document.getElementById("reg-branch").value.trim() : "";

            if (!nameVal || !emailVal || !passVal || !confirmPassVal || !collegeVal) {
                showToast("Please fill in all required fields including College.", "error", 4000);
                return;
            }

            if (passVal !== confirmPassVal) {
                showToast("Passwords do not match.", "error", 4000);
                return;
            }

            const submitBtn = document.getElementById("btn-register-submit");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;
            }

            try {
                const response = await fetch(`${API_BASE}/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName: nameVal, name: nameVal, email: emailVal, password: passVal, confirmPassword: confirmPassVal, college: collegeVal, branch: branchVal })
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    showToast(data.message || "Registration successful! Please log in.", "success", 5000);
                    formRegister.reset();
                    showAuthView("login");
                } else {
                    showToast(data.message || "Registration failed.", "error", 5000);
                }
            } catch (err) {
                showToast("Network error contacting server.", "error", 4000);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Create Account`;
                }
            }
        });
    }

    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const emailVal = document.getElementById("login-email").value.trim();
            const passVal = document.getElementById("login-password").value;

            if (!emailVal || !passVal) {
                showToast("Please enter email and password.", "error", 4000);
                return;
            }

            const submitBtn = document.getElementById("btn-login-submit");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Signing In...`;
            }

            try {
                const response = await fetch(`${API_BASE}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailVal, password: passVal })
                });
                const data = await response.json();
                if (response.ok && data.success && data.token) {
                    localStorage.setItem("authToken", data.token);
                    showToast("Welcome back!", "success", 3000);
                    executeSuccessfulLogin(data.user);
                } else {
                    showToast(data.message || "Invalid credentials.", "error", 4000);
                }
            } catch (err) {
                showToast("Network error contacting server.", "error", 4000);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Sign In`;
                }
            }
        });
    }
}

async function checkExistingAuthSession() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        setApplicationState(false);
        showAuthView("register");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.success && data.user) {
            executeSuccessfulLogin(data.user);
        } else {
            localStorage.removeItem("authToken");
            setApplicationState(false);
            showAuthView("login");
        }
    } catch (err) {
        console.warn("[Auth Session Warning] Could not verify JWT token with server:", err.message);
        setApplicationState(false);
        showAuthView("login");
    }
}

function executeSuccessfulLogin(userData) {
    STATE.currentUser = userData;

    const sidebarName = document.getElementById("sidebar-user-name");
    if (sidebarName) sidebarName.textContent = userData.name || userData.fullName || "Candidate";

    const sidebarAvatar = document.querySelector("#sidebar-user-profile-card .user-avatar");
    if (sidebarAvatar && (userData.profilePicture || userData.picture)) {
        sidebarAvatar.innerHTML = `<img src="${userData.profilePicture || userData.picture}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }

    const pName = document.getElementById("prof-name");
    const pEmail = document.getElementById("prof-email");
    const pCollege = document.getElementById("prof-college");
    const pBranch = document.getElementById("prof-branch");
    const pGrad = document.getElementById("prof-gradyear");

    if (pName) pName.value = userData.name || userData.fullName || "";
    if (pEmail) pEmail.value = userData.email || "";
    if (pCollege) pCollege.value = userData.college || "";
    if (pBranch) pBranch.value = userData.branch || "";
    if (pGrad) pGrad.value = userData.graduation_year || 2026;

    Object.keys(WEEKLY_ROADMAPS).forEach(role => {
        STATE.roadmapStates[role] = WEEKLY_ROADMAPS[role].map(node => ({
            week: node.week,
            status: "Pending"
        }));
    });

    setApplicationState(true);
    syncDesiredRoleMetrics();
    refreshDashboard();
}

// ========================================================
// ROUTING & NAVIGATION
// ========================================================
function initNavListeners() {
    document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = item.getAttribute("data-tab");
            switchTab(tabId);
        });
    });

    const userCard = document.getElementById("sidebar-user-profile-card");
    if (userCard) {
        userCard.addEventListener("click", () => {
            switchTab("profile");
        });
    }
}

// switchTab is defined in js/navigation.js and exposed as window.switchTab
// This version in app.js serves as a fallback if navigation.js failed
function switchTab(tabId) {
    if (!tabId) return;
    STATE.activeTab = tabId;
    STATE.targetRoleKey = (document.getElementById("global-target-role") || {}).value || STATE.targetRoleKey;

    document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
    });

    document.querySelectorAll(".tab-panel").forEach(panel => {
        const isActive = panel.id === `tab-${tabId}`;
        panel.classList.toggle("active", isActive);
        panel.classList.toggle("hidden", !isActive);
    });

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

    try {
        if (tabId === "skill-analyzer") renderSkillGapAnalyser();
        else if (tabId === "roadmap") renderRoadmapTimeline();
        else if (tabId === "recommendations") { renderPlacementRecommendations(); fetchAndRenderJobs(); }
        else if (tabId === "placement-tracker") { renderPlacementTracker(); }
    } catch (e) { console.warn("[switchTab render error]", e); }

    refreshModernIcons();
}

function syncDesiredRoleMetrics() {
    const select = document.getElementById("global-target-role");
    if (!select) return;
    const value = select.value;
    STATE.targetRoleKey = value;
    localStorage.setItem("targetRoleKey", value);

    const subSelect = document.getElementById("interview-role-select");
    if (subSelect) subSelect.value = value;

    const roleLabel = document.getElementById("skill-target-role-label");
    if (roleLabel && JOB_ROLES[value]) {
        roleLabel.textContent = JOB_ROLES[value].title;
    }

    // Refresh ALL dependent career modules dynamically on role change
    try { if (typeof renderSkillGapAnalyser === "function") renderSkillGapAnalyser(); } catch (e) {}
    try { if (typeof renderRoadmapTimeline === "function") renderRoadmapTimeline(); } catch (e) {}
    try { if (typeof renderPlacementRecommendations === "function") renderPlacementRecommendations(); } catch (e) {}
    try { if (typeof filterAndRenderJobs === "function") filterAndRenderJobs(); } catch (e) {}
    try { if (typeof refreshDashboard === "function") refreshDashboard(); } catch (e) {}
}

// ========================================================
// RESUME PARSING CONTROLLERS
// ========================================================
function initResumeListeners() {
    const btnParse = document.getElementById("btn-parse-resume");
    const tmplSelect = document.getElementById("resume-template-select");
    const textInput = document.getElementById("resume-text-input");
    const fileInput = document.getElementById("file-input");
    const btnBrowser = document.getElementById("btn-browser-files");
    const uploadZone = document.getElementById("upload-zone");
    const btnDownloadReport = document.getElementById("btn-download-ats-report");

    if (tmplSelect) {
        tmplSelect.addEventListener("change", () => {
            const val = tmplSelect.value;
            if (val !== "") {
                const templates = (typeof RESUME_TEMPLATES !== "undefined") ? RESUME_TEMPLATES : [];
                const selectedTmpl = templates[parseInt(val)];
                if (selectedTmpl && textInput) {
                    textInput.value = selectedTmpl.text;
                    showToast(`Loaded demo profile: ${selectedTmpl.name}`, "info", 2500);
                }
            }
        });
    }

    if (btnBrowser && fileInput) {
        btnBrowser.addEventListener("click", (e) => {
            e.preventDefault();
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) processUploadedResumeFile(file);
        });
    }

    if (uploadZone) {
        uploadZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadZone.classList.add("dragover");
        });
        uploadZone.addEventListener("dragleave", () => {
            uploadZone.classList.remove("dragover");
        });
        uploadZone.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadZone.classList.remove("dragover");
            const file = e.dataTransfer.files[0];
            if (file) processUploadedResumeFile(file);
        });
    }

    if (btnParse) {
        btnParse.addEventListener("click", async () => {
            const text = textInput ? textInput.value.trim() : "";
            if (!text) {
                showToast("Please paste or upload resume text content first.", "error", 4000);
                return;
            }
            await performResumeAnalysis(text);
        });
    }

    if (btnDownloadReport) {
        btnDownloadReport.addEventListener("click", () => {
            if (!STATE.resumeParsedData) {
                showToast("No resume analysis data available to download.", "warning", 3000);
                return;
            }
            downloadAtsReport(STATE.resumeParsedData);
        });
    }
}

async function processUploadedResumeFile(file) {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
        showToast("File is too large. Please select a resume under 10MB.", "error", 4000);
        return;
    }

    const textInput = document.getElementById("resume-text-input");
    const parseLoading = document.getElementById("parse-loading");
    const parseEmpty = document.getElementById("parse-empty");

    if (parseEmpty) parseEmpty.classList.add("hidden");
    if (parseLoading) parseLoading.classList.remove("hidden");

    showToast(`Extracting text from ${file.name}...`, "info", 3000);

    const ext = file.name.split(".").pop().toLowerCase();
    let extractedText = "";

    try {
        if (ext === "txt") {
            extractedText = await file.text();
        } else if (ext === "docx") {
            if (window.mammoth) {
                const arrayBuffer = await file.arrayBuffer();
                const res = await window.mammoth.extractRawText({ arrayBuffer });
                extractedText = res.value;
            }
        } else if (ext === "pdf") {
            if (window.pdfjsLib) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(" ") + "\n";
                }
                extractedText = fullText;
            }
        } else {
            showToast("Unsupported format. Please upload PDF, DOCX, or TXT.", "error", 4000);
            if (parseLoading) parseLoading.classList.add("hidden");
            if (parseEmpty) parseEmpty.classList.remove("hidden");
            return;
        }

        if (extractedText && extractedText.trim().length > 10) {
            if (textInput) textInput.value = extractedText;
            showToast(`Extracted ${extractedText.trim().length} characters from ${file.name}!`, "success", 3000);
        }

        await performResumeAnalysis(extractedText, file);

    } catch (err) {
        console.error("[File Processing Error]:", err);
        showToast("Client parsing failed. Processing file on server...", "warning", 3000);
        try {
            await performResumeAnalysis(extractedText, file);
        } catch (apiErr) {
            showToast("Error processing file. Please paste text manually.", "error", 5000);
            if (parseLoading) parseLoading.classList.add("hidden");
            if (parseEmpty) parseEmpty.classList.remove("hidden");
        }
    }
}

async function performResumeAnalysis(text, file = null) {
    const parseLoading = document.getElementById("parse-loading");
    const parseEmpty = document.getElementById("parse-empty");
    const parseResults = document.getElementById("parse-results");
    const btnDownloadReport = document.getElementById("btn-download-ats-report");
    const timestampEl = document.getElementById("analysis-timestamp");

    if (parseEmpty) parseEmpty.classList.add("hidden");
    if (parseResults) parseResults.classList.add("hidden");
    if (parseLoading) parseLoading.classList.remove("hidden");

    try {
        let resultData = null;
        const targetRole = (document.getElementById("global-target-role") || {}).value || "softwareengineer";

        // Try Backend API Request first
        try {
            let response;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("targetRole", targetRole);
                if (text) formData.append("text", text);

                response = await fetch(`${API_BASE}/api/resume/analyze`, {
                    method: "POST",
                    body: formData
                });
            } else {
                response = await fetch(`${API_BASE}/api/resume/analyze`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, targetRole })
                });
            }

            if (response && response.ok) {
                const json = await response.json();
                if (json && json.success) {
                    resultData = json;
                }
            }
        } catch (apiErr) {
            console.warn("[Resume API Warning] Backend API fetch failed, switching to local rule-based analysis:", apiErr);
        }

        // Fallback to client-side rule-based analysis if backend call failed or was offline
        if (!resultData) {
            if (typeof parseResumeText === "function") {
                resultData = parseResumeText(text);
            } else {
                throw new Error("Resume parsing engine not loaded.");
            }
        }

        if (resultData.extractedText && resultData.extractedText.trim().length > 0) {
            const textInput = document.getElementById("resume-text-input");
            if (textInput && (!textInput.value || textInput.value.trim().length < 5)) {
                textInput.value = resultData.extractedText;
            }
        }

        STATE.resumeParsedData = resultData;

        renderAtsScanningReport(resultData);
        refreshDashboard();

        if (timestampEl) timestampEl.textContent = "Analyzed on " + new Date().toLocaleTimeString();
        if (parseResults) parseResults.classList.remove("hidden");
        if (btnDownloadReport) btnDownloadReport.classList.remove("hidden");

        showToast("ATS Analysis Complete! Score: " + resultData.scores.overallAts + "/100", "success", 4000);
        addNotification("ATS Resume Analyzed", `Resume Score: ${resultData.scores.overallAts}/100. Extracted ${resultData.detectedSkills.length} skills.`, "purple");

    } catch (err) {
        console.error("[Resume Analysis Error]:", err);
        showToast("Failed to analyze resume: " + err.message, "error", 5000);
        if (parseEmpty) parseEmpty.classList.remove("hidden");
    } finally {
        // ALWAYS STOP LOADING SPINNER
        if (parseLoading) parseLoading.classList.add("hidden");
    }
}

function renderAtsScanningReport(data) {
    if (!data || !data.scores) return;

    const scoreText = document.getElementById("ats-score-text");
    if (scoreText) scoreText.textContent = data.scores.overallAts;

    const circle = document.getElementById("ats-progress-bar");
    if (circle) {
        const radius = circle.r && circle.r.baseVal ? circle.r.baseVal.value : 50;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (data.scores.overallAts / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    const statSpell = document.getElementById("stat-spell-layout");
    const statVerbs = document.getElementById("stat-verbs-count");
    const statGithub = document.getElementById("stat-github-linked");
    const statProjects = document.getElementById("stat-projects-interns");

    if (statSpell) statSpell.textContent = (data.scores.grammar || 90) + "%";
    if (statVerbs) statVerbs.textContent = (data.details.actionVerbsCount || 0) + " Verbs";
    if (statGithub) statGithub.innerHTML = data.details.hasGitHub ? '<span class="text-teal">Linked ✔</span>' : '<span class="text-danger">None ✘</span>';
    if (statProjects) statProjects.textContent = ((data.details.hasProjects ? 1 : 0) + (data.details.hasInternship ? 1 : 0)) + " / 2";

    // Granular Score Bars
    const kwVal = document.getElementById("score-kw-val");
    const kwFill = document.getElementById("score-kw-fill");
    const projVal = document.getElementById("score-proj-val");
    const projFill = document.getElementById("score-proj-fill");
    const verbVal = document.getElementById("score-verb-val");
    const verbFill = document.getElementById("score-verb-fill");

    const kwPct = data.scores.keywords || 75;
    const projPct = data.scores.projects || 80;
    const verbPct = data.scores.verbs || 70;

    if (kwVal) kwVal.textContent = kwPct + "%";
    if (kwFill) kwFill.style.width = kwPct + "%";

    if (projVal) projVal.textContent = projPct + "%";
    if (projFill) projFill.style.width = projPct + "%";

    if (verbVal) verbVal.textContent = verbPct + "%";
    if (verbFill) verbFill.style.width = verbPct + "%";

    // Extracted Skills Tags
    const tagsContainer = document.getElementById("detected-skills-tags");
    if (tagsContainer) {
        tagsContainer.innerHTML = "";
        const skills = data.detectedSkills || [];
        if (skills.length === 0) {
            tagsContainer.innerHTML = `<span class="text-muted" style="font-size:0.85rem;">No technical skills automatically extracted. Try adding clear skill sections.</span>`;
        } else {
            skills.forEach(skill => {
                const tag = document.createElement("span");
                tag.className = "tech-tag bg-tag-blue";
                tag.textContent = skill;
                tagsContainer.appendChild(tag);
            });
        }
    }

    // Suggestions / Improvements Checklist
    const checklist = document.getElementById("resume-improvements-list");
    if (checklist) {
        checklist.innerHTML = "";
        const suggestions = data.suggestions || data.recommendations || [];
        if (suggestions.length === 0) {
            checklist.innerHTML = `<li><i class="fa-solid fa-check text-teal"></i> Resume format meets baseline ATS guidelines!</li>`;
        } else {
            suggestions.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<i class="fa-solid fa-circle-exclamation text-amber"></i> ${item}`;
                checklist.appendChild(li);
            });
        }
    }
}

function downloadAtsReport(data) {
    if (!data) return;

    const reportText = `==================================================
AI CAREER COACH - ATS RESUME ANALYSIS REPORT
Date: ${new Date().toLocaleString()}
==================================================
OVERALL ATS SCORE: ${data.scores.overallAts} / 100
Relevance Fit: ${data.scores.relevanceFit || 75}%
Grammar & Format Score: ${data.scores.grammar || 90}%
Keyword Match Score: ${data.scores.keywords || 75}%
Project Score: ${data.scores.projects || 80}%
Action Verbs Score: ${data.scores.verbs || 70}%

--------------------------------------------------
CANDIDATE DETAILS:
--------------------------------------------------
Name: ${data.details ? data.details.name || "Candidate" : "Candidate"}
Email: ${data.details ? data.details.email || "N/A" : "N/A"}
Phone: ${data.details ? data.details.phone || "N/A" : "N/A"}
Action Verbs Count: ${data.details ? data.details.actionVerbsCount || 0 : 0}
GitHub Linked: ${data.details && data.details.hasGitHub ? "Yes" : "No"}
Projects Found: ${data.details && data.details.hasProjects ? "Yes" : "No"}

--------------------------------------------------
DETECTED TECHNICAL SKILLS:
--------------------------------------------------
${(data.detectedSkills || []).join(", ") || "None"}

--------------------------------------------------
STRENGTHS:
--------------------------------------------------
${(data.strengths || ["Good structural layout."]).map(s => "• " + s).join("\n")}

--------------------------------------------------
WEAKNESSES / GAPS:
--------------------------------------------------
${(data.weaknesses || ["Add quantified metrics."]).map(w => "• " + w).join("\n")}

--------------------------------------------------
RECOMMENDED IMPROVEMENT ACTION ITEMS:
--------------------------------------------------
${(data.suggestions || data.recommendations || []).map(r => "• " + r).join("\n")}

==================================================
Generated by AI Career Coach Platform
==================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ATS_Resume_Report_${(data.details && data.details.name ? data.details.name : "Candidate").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded ATS Resume Report!", "success", 3000);
}

// ========================================================
// SKILL GAP ANALYZER
// ========================================================
function renderSkillGapAnalyser() {
    const select = document.getElementById("global-target-role");
    if (!select) return;
    const roleKey = select.value;
    const role = JOB_ROLES[roleKey];
    if (!role) return;

    const studentSkills = STATE.resumeParsedData ? STATE.resumeParsedData.detectedSkills : ["Python", "SQL", "Git"];
    const mastered = role.skills.filter(s => studentSkills.includes(s));
    const missing = role.skills.filter(s => !studentSkills.includes(s));

    const percentMatch = role.skills.length > 0 ? Math.round((mastered.length / role.skills.length) * 100) : 0;

    const badge = document.getElementById("skill-gap-percentage-badge");
    const perc = document.getElementById("gap-gauge-percentage");
    const fill = document.getElementById("gap-gauge-fill");

    if (badge) badge.textContent = percentMatch + "% Strength";
    if (perc) perc.textContent = percentMatch + "%";
    if (fill) fill.style.background = `conic-gradient(var(--secondary) ${percentMatch}%, rgba(255,255,255,0.06) ${percentMatch}% 100%)`;

    const mList = document.getElementById("skills-mastered-list");
    const gList = document.getElementById("skills-gaps-list");

    if (mList) {
        mList.innerHTML = "";
        mastered.forEach(skill => {
            mList.innerHTML += `<li><i class="fa-solid fa-check text-teal"></i> <span>${skill}</span></li>`;
        });
    }

    if (gList) {
        gList.innerHTML = "";
        missing.forEach(skill => {
            gList.innerHTML += `<li><i class="fa-solid fa-xmark text-danger"></i> <span>${skill}</span></li>`;
        });
    }
}

// ========================================================
// WEEKLY LEARNING ROADMAP TIMELINES
// ========================================================
function initRoadmapListeners() {
    const demoBtn = document.getElementById("btn-build-roadmap-demo");
    const trigBtn = document.getElementById("btn-trigger-roadmap");

    if (demoBtn) demoBtn.addEventListener("click", () => renderRoadmapTimeline(true));
    if (trigBtn) trigBtn.addEventListener("click", () => switchTab("roadmap"));
}

function renderRoadmapTimeline() {
    const select = document.getElementById("global-target-role");
    if (!select) return;
    const roleKey = select.value;
    const container = document.getElementById("roadmap-timeline-container");
    const emptyState = document.getElementById("roadmap-empty-state");

    const nodes = STATE.roadmapStates[roleKey];
    const roadmapData = WEEKLY_ROADMAPS[roleKey];

    if (!nodes || !container) return;

    if (emptyState) emptyState.classList.add("hidden");
    container.classList.remove("hidden");
    container.innerHTML = "";

    roadmapData.forEach((nodeData, idx) => {
        const activeState = nodes[idx] || { status: "Pending" };
        const div = document.createElement("div");
        div.className = "advisor-card cursor-pointer";
        div.style.marginBottom = "14px";
        div.innerHTML = `
            <div class="advisor-card-icon bg-tag-purple"><i class="fa-solid fa-calendar-week"></i></div>
            <div class="advisor-card-details">
                <h4>Week ${nodeData.week}: ${nodeData.topic}</h4>
                <p>${nodeData.details}</p>
            </div>
            <div><span class="roadmap-node-badge badge-pending">${activeState.status}</span></div>
        `;
        div.addEventListener("click", () => selectRoadmapNode(roleKey, idx));
        container.appendChild(div);
    });
}

function selectRoadmapNode(roleKey, idx) {
    const placeholder = document.getElementById("study-details-placeholder");
    const content = document.getElementById("study-details-content");

    if (placeholder) placeholder.classList.add("hidden");
    if (content) content.classList.remove("hidden");

    const nodeData = WEEKLY_ROADMAPS[roleKey][idx];
    document.getElementById("detail-skill-level").textContent = `Week ${nodeData.week}`;
    document.getElementById("detail-skill-title").textContent = nodeData.topic;
    document.getElementById("detail-skill-duration").textContent = nodeData.duration;
    document.getElementById("detail-skill-desc").textContent = nodeData.details;
    document.getElementById("detail-project-challenge").textContent = nodeData.challenge;
}

// ========================================================
// MOCK INTERVIEW ENGINE (Complete with real questions + scoring)
// ========================================================

const INTERVIEW_QUESTIONS = {
    hr: [
        "Tell me about yourself and your career goals.",
        "What are your greatest strengths and how have you demonstrated them?",
        "Describe a challenging situation you faced and how you resolved it.",
        "Where do you see yourself in 5 years?",
        "Why do you want to work at our company?",
        "How do you handle criticism and feedback from peers?",
        "Describe a time you worked effectively in a team under pressure.",
        "What motivates you to perform your best work?",
        "How do you prioritize tasks when you have multiple deadlines?",
        "Tell me about a time you showed leadership without a formal leadership role."
    ],
    technical: [
        "Explain the difference between a stack and a queue with use cases.",
        "What is the time complexity of binary search, and when can't you use it?",
        "Describe how you would design a URL shortener service like bit.ly.",
        "What is the difference between TCP and UDP protocols?",
        "Explain what a RESTful API is and its core principles.",
        "What is the difference between SQL and NoSQL databases? When would you choose each?",
        "Explain the concept of Big O notation with examples.",
        "How does garbage collection work in Java/Python?",
        "What are SOLID principles in software engineering?",
        "Explain the difference between process and thread with real-world examples."
    ],
    aptitude: [
        "If 8 workers can complete a project in 12 days, how many days will 16 workers take?",
        "A train travels at 60 km/h. How long to cover 240 km?",
        "Find the missing number: 2, 5, 10, 17, 26, ?",
        "If 30% of a number is 90, what is 60% of that number?",
        "A merchant marks goods 20% above cost and gives 10% discount. What is the profit %?",
        "Complete the series: A, C, F, J, ?",
        "If MANGO is coded as 13-1-14-7-15, what is the code for ORANGE?",
        "Two pipes A and B fill a tank in 3 and 4 hours. C can empty it in 2 hours. If all are open, in how many hours is the tank full?",
        "The average of 5 numbers is 27. If one number is excluded, the average becomes 25. What is the excluded number?",
        "In a room of 30 people, every person shakes hands with everyone else exactly once. How many handshakes occur?"
    ],
    dsa: [
        "Write the pseudocode to reverse a singly linked list in O(n) time and O(1) space.",
        "Explain how a HashMap handles hash collisions internally.",
        "What is the difference between DFS and BFS? When would you use each?",
        "Explain the concept of dynamic programming with a classic example (e.g., Fibonacci).",
        "How would you detect a cycle in a linked list?",
        "What is the difference between a min-heap and a max-heap? Give a use case for each.",
        "Explain the sliding window technique and give an example problem.",
        "What is the two-pointer technique? Describe a problem where you would use it.",
        "How would you find all pairs in an array that sum to a target value efficiently?",
        "Explain Topological Sort and where it is used."
    ]
};

const INTERVIEW_SCORING_KEYWORDS = {
    hr: ["team", "learn", "challenge", "success", "goal", "passion", "improve", "collaborate", "problem", "solution", "achieve", "responsibility", "impact", "growth"],
    technical: ["algorithm", "complexity", "design", "optimize", "database", "api", "cache", "scalable", "performance", "structure", "pattern", "protocol", "system", "code"],
    aptitude: ["calculate", "answer", "formula", "rate", "ratio", "percent", "speed", "distance", "time", "probability", "series", "sum", "average"],
    dsa: ["array", "list", "tree", "graph", "hash", "stack", "queue", "pointer", "recursive", "dynamic", "memo", "traverse", "node", "edge", "loop"]
};

function initInterviewListeners() {
    const startBtn = document.getElementById("btn-start-interview");
    const sendBtn = document.getElementById("btn-send-message");
    const input = document.getElementById("chat-user-input");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const roleEl = document.getElementById("interview-role-select");
            const catEl = document.getElementById("interview-type-select");
            const role = roleEl ? roleEl.value : "softwareengineer";
            const cat = catEl ? catEl.value : "hr";
            startInterviewSession(role, cat);
        });
    }

    if (sendBtn) sendBtn.addEventListener("click", handleUserAnswerSubmit);
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleUserAnswerSubmit(); }
        });
    }
}

function startInterviewSession(roleKey, category) {
    const questions = INTERVIEW_QUESTIONS[category] || INTERVIEW_QUESTIONS.hr;

    STATE.interviewState = {
        active: true,
        role: roleKey,
        category: category,
        currentQuestionIndex: 0,
        questions: [...questions].sort(() => Math.random() - 0.5).slice(0, 7),
        answers: [],
        score: { confidence: 0, communication: 0, technical: 0, total: 0 },
        ttsEnabled: false
    };

    const emptyState = document.getElementById("interview-empty-state");
    const activeZone = document.getElementById("interview-active-zone");
    const inputEl = document.getElementById("chat-user-input");
    const sendBtn = document.getElementById("btn-send-message");

    if (emptyState) emptyState.classList.add("hidden");
    if (activeZone) activeZone.classList.remove("hidden");
    if (inputEl) inputEl.disabled = false;
    if (sendBtn) sendBtn.disabled = false;

    const container = document.getElementById("chat-messages-box");
    if (container) container.innerHTML = "";

    const roleLabel = JOB_ROLES[roleKey] ? JOB_ROLES[roleKey].title : roleKey;
    appendChatMessage("bot", `🎯 <strong>AI Mock Interview Started</strong><br>Role: <strong>${roleLabel}</strong> | Category: <strong>${category.toUpperCase()}</strong><br><br>I'll ask you 7 questions. Answer each clearly and concisely. Type your answer below and press Enter or click Send.`);

    setTimeout(() => sendNextInterviewQuestion(), 800);
}

function sendNextInterviewQuestion() {
    const { questions, currentQuestionIndex } = STATE.interviewState;
    if (currentQuestionIndex >= questions.length) {
        endInterviewSession();
        return;
    }

    const questionNumber = currentQuestionIndex + 1;
    const question = questions[currentQuestionIndex];

    appendChatMessage("bot", `<strong>Q${questionNumber}/${questions.length}:</strong> ${question}`);
}

function handleUserAnswerSubmit() {
    const input = document.getElementById("chat-user-input");
    if (!input) return;
    const answer = input.value.trim();
    if (!answer) {
        showToast("Please type your answer before submitting.", "warning", 3000);
        return;
    }
    if (!STATE.interviewState.active) {
        showToast("Please start an interview session first.", "info", 3000);
        return;
    }

    appendChatMessage("user", answer);
    input.value = "";

    // Score this answer
    const category = STATE.interviewState.category;
    const keywords = INTERVIEW_SCORING_KEYWORDS[category] || [];
    const answerLower = answer.toLowerCase();
    const wordCount = answer.split(/\s+/).length;
    const keywordMatches = keywords.filter(k => answerLower.includes(k)).length;

    let answerScore = 0;
    if (wordCount >= 30) answerScore += 20;
    else if (wordCount >= 15) answerScore += 10;
    if (keywordMatches >= 3) answerScore += 30;
    else if (keywordMatches >= 1) answerScore += 15;
    if (wordCount > 10 && wordCount < 200) answerScore += 10;

    STATE.interviewState.answers.push({ question: STATE.interviewState.questions[STATE.interviewState.currentQuestionIndex], answer, score: answerScore });
    STATE.interviewState.currentQuestionIndex++;

    // Provide feedback
    setTimeout(() => {
        let feedback = "";
        if (answerScore >= 50) feedback = "✅ <strong>Excellent answer!</strong> Well-structured with relevant terminology.";
        else if (answerScore >= 25) feedback = "👍 <strong>Good attempt.</strong> Try to use more specific technical terms and expand your explanation.";
        else feedback = "💡 <strong>Keep practicing.</strong> Aim for longer, more structured answers using the STAR method or technical vocabulary.";

        appendChatMessage("bot", feedback);

        if (STATE.interviewState.currentQuestionIndex < STATE.interviewState.questions.length) {
            setTimeout(() => sendNextInterviewQuestion(), 1000);
        } else {
            setTimeout(() => endInterviewSession(), 1200);
        }
    }, 600);
}

function endInterviewSession() {
    STATE.interviewState.active = false;

    const answers = STATE.interviewState.answers;
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    const maxScore = answers.length * 60;
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    let grade = "";
    let gradeColor = "";
    if (percentage >= 80) { grade = "Outstanding"; gradeColor = "text-teal"; }
    else if (percentage >= 60) { grade = "Good"; gradeColor = "text-purple"; }
    else if (percentage >= 40) { grade = "Average"; gradeColor = "text-amber"; }
    else { grade = "Needs Work"; gradeColor = "text-danger"; }

    const confScore = Math.min(100, percentage + Math.floor(Math.random() * 15));
    const commScore = Math.min(100, percentage + Math.floor(Math.random() * 10) - 5);
    const techScore = Math.min(100, percentage);

    STATE.interviewState.score = { confidence: confScore, communication: commScore, technical: techScore, total: percentage };

    appendChatMessage("bot", `
        <strong>🎓 Interview Complete! Final Analysis:</strong><br><br>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0;">
            <div style="text-align:center;padding:8px;background:rgba(139,92,246,0.1);border-radius:8px;">
                <div style="font-size:1.4rem;font-weight:800;color:var(--primary);">${confScore}%</div>
                <div style="font-size:0.78rem;color:var(--text-muted);">Confidence</div>
            </div>
            <div style="text-align:center;padding:8px;background:rgba(16,185,129,0.1);border-radius:8px;">
                <div style="font-size:1.4rem;font-weight:800;color:var(--secondary);">${commScore}%</div>
                <div style="font-size:0.78rem;color:var(--text-muted);">Communication</div>
            </div>
            <div style="text-align:center;padding:8px;background:rgba(236,72,153,0.1);border-radius:8px;">
                <div style="font-size:1.4rem;font-weight:800;color:var(--accent-pink);">${techScore}%</div>
                <div style="font-size:0.78rem;color:var(--text-muted);">Technical</div>
            </div>
        </div>
        <strong>Overall Performance: <span class="${gradeColor}">${grade} (${percentage}%)</span></strong><br><br>
        <em>💡 Tip: Practice 10 minutes daily with varied categories to improve your score. Click Start Interview again for a new session.</em>
    `);

    const inputEl = document.getElementById("chat-user-input");
    const sendBtn = document.getElementById("btn-send-message");
    if (inputEl) inputEl.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    addNotification("Mock Interview Complete", `Your score: ${percentage}% (${grade}). Category: ${STATE.interviewState.category.toUpperCase()}.`, "purple");
    refreshDashboard();
}

function appendChatMessage(sender, html) {
    const container = document.getElementById("chat-messages-box");
    if (!container) return;
    const block = document.createElement("div");
    block.className = `chat-message ${sender === "bot" ? "bot" : "user"}`;
    block.innerHTML = `<div class="chat-bubble">${html}</div>`;
    container.appendChild(block);
    container.scrollTop = container.scrollHeight;
}

function calculateJobReadinessScore(roleKey) {
    const activeKey = roleKey || STATE.targetRoleKey || (document.getElementById("global-target-role") || {}).value || localStorage.getItem("targetRoleKey") || "softwareengineer";
    const role = JOB_ROLES[activeKey] || { skills: [], title: "Software Engineer" };
    
    const atsScore = (STATE.resumeParsedData && STATE.resumeParsedData.scores) ? STATE.resumeParsedData.scores.overallAts : 70;
    const studentSkills = (STATE.resumeParsedData && STATE.resumeParsedData.detectedSkills) ? STATE.resumeParsedData.detectedSkills : [];
    
    const matchedCount = role.skills.filter(s => studentSkills.some(st => st.toLowerCase() === s.toLowerCase())).length;
    const totalSkills = role.skills.length || 1;
    const skillPct = Math.round((matchedCount / totalSkills) * 100);
    
    const roadmapPct = STATE.roadmapProgress || 45;
    const interviewScore = (STATE.interviewState && STATE.interviewState.score && STATE.interviewState.score.total > 0) ? STATE.interviewState.score.total : 60;
    
    // Formula: 25% ATS Score + 35% Skill Gap Match + 20% Learning Roadmap + 20% Mock Interview
    const readiness = Math.min(98, Math.max(35, Math.round((atsScore * 0.25) + (skillPct * 0.35) + (roadmapPct * 0.20) + (interviewScore * 0.20))));
    return readiness;
}

function renderPlacementRecommendations() {
    const select = document.getElementById("global-target-role");
    const roleKey = (select && select.value) ? select.value : (STATE.targetRoleKey || localStorage.getItem("targetRoleKey") || "softwareengineer");
    STATE.targetRoleKey = roleKey;
    localStorage.setItem("targetRoleKey", roleKey);

    const role = JOB_ROLES[roleKey] || { title: "Software Engineer", skills: [] };
    const container = document.getElementById("company-fit-container");
    if (!container) return;

    // Update Header Role Title & Job Readiness Score
    const roleTitleEl = document.getElementById("recom-best-role");
    const readinessEl = document.getElementById("recom-best-readiness");
    const readinessScore = calculateJobReadinessScore(roleKey);

    if (roleTitleEl) roleTitleEl.textContent = role.title;
    if (readinessEl) readinessEl.textContent = `${readinessScore}% Ready`;

    const companyDataset = COMPANY_PREPARATION_DATA[roleKey] || [];

    if (!Array.isArray(companyDataset) || companyDataset.length === 0) {
        container.innerHTML = `
            <div class="glass-card text-center" style="grid-column: 1 / -1; padding: 45px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open large-icon" style="font-size: 2.8rem; margin-bottom: 14px; display: block; color: var(--primary);"></i>
                <h3 style="color: #fff; font-size: 1.25rem; margin-bottom: 8px;">No company data available for this role.</h3>
                <p style="font-size: 0.9rem; max-width: 500px; margin: 0 auto;">We are continuously expanding recruiter preparation guides for additional career specializations.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    const studentSkills = (STATE.resumeParsedData && STATE.resumeParsedData.detectedSkills) ? STATE.resumeParsedData.detectedSkills : [];

    companyDataset.forEach(company => {
        const reqSkills = company.requiredSkills || [];
        const matched = reqSkills.filter(s => studentSkills.some(st => st.toLowerCase() === s.toLowerCase())).length;
        const totalReq = reqSkills.length || 1;
        const skillRatio = matched / totalReq;
        const fitScore = Math.min(98, Math.max(45, Math.round((skillRatio * 50) + (readinessScore * 0.5))));

        const card = document.createElement("div");
        card.className = "company-card-expanded";
        card.innerHTML = `
            <div class="company-card-header-row">
                <div class="company-title-box">
                    <div class="company-logo-icon"><i class="${company.logo}"></i></div>
                    <div>
                        <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${company.name}</h4>
                        <span class="badge badge-accent" style="margin-top: 4px; display: inline-block;">${company.jobRole || role.title}</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="fit-pct-badge text-teal" style="font-weight: 700; font-size: 1.05rem;">${fitScore}% Fit</span>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${company.salary}</div>
                </div>
            </div>

            <div class="company-prep-section" style="margin-top: 14px;">
                <h5 style="color: #fff; font-size: 0.92rem; margin-bottom: 6px;"><i class="fa-solid fa-route text-purple"></i> Hiring Process</h5>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${company.hiringProcess}</p>
            </div>

            <div class="company-prep-section" style="margin-top: 10px;">
                <h5 style="color: #fff; font-size: 0.92rem; margin-bottom: 6px;"><i class="fa-solid fa-list-check text-teal"></i> Interview Rounds</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${(company.rounds || []).map(r => `<span class="tech-tag bg-tag-blue" style="font-size: 0.76rem;">${r}</span>`).join("")}
                </div>
            </div>

            <div class="company-prep-section" style="margin-top: 10px;">
                <h5 style="color: #fff; font-size: 0.92rem; margin-bottom: 6px;"><i class="fa-solid fa-tags text-amber"></i> Required Skills</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${reqSkills.map(s => {
                        const isMatched = studentSkills.some(st => st.toLowerCase() === s.toLowerCase());
                        const cls = isMatched ? "bg-teal" : "bg-tag-orange";
                        return `<span class="tech-tag ${cls}" style="font-size: 0.76rem;">${s} ${isMatched ? '✔' : ''}</span>`;
                    }).join("")}
                </div>
            </div>

            <div class="company-prep-section" style="margin-top: 10px;">
                <h5 style="color: #fff; font-size: 0.92rem; margin-bottom: 6px;"><i class="fa-solid fa-lightbulb text-pink"></i> Preparation Tip</h5>
                <p style="font-size: 0.84rem; color: var(--text-muted); font-style: italic;">${company.preparationTips}</p>
            </div>

            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-graduation-cap"></i> Eligibility: ${company.eligibility || "CGPA >= 6.5"}</span>
                <button type="button" class="btn btn-secondary btn-sm" onclick="openCompanyProfileModal('${company.name}')">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Preparation Details
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ========================================================
// SUITABLE JOB OPPORTUNITIES PORTAL CONTROLLER
// ========================================================

const JobPortalService = {
    async fetchJobOpenings() {
        try {
            const response = await fetch(`${API_BASE}/api/jobs`);
            if (response && response.ok) {
                const data = await response.json();
                if (data && data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
                    return data.jobs;
                }
            } else {
                console.warn("[JobPortalService] GET /api/jobs returned status:", response ? response.status : "unknown", "- Using local dataset fallback.");
            }
        } catch (e) {
            console.warn("[JobPortalService] API fetch encountered network error, falling back to local dataset:", e.message);
        }
        return typeof JOB_OPENINGS_DATA !== "undefined" ? JOB_OPENINGS_DATA : [];
    }
};

function initJobPortalListeners() {
    const savedJobs = localStorage.getItem("savedJobs");
    if (savedJobs) {
        try { STATE.savedJobIds = JSON.parse(savedJobs); } catch (e) {}
    }

    const savedApps = localStorage.getItem("jobApplications");
    if (savedApps) {
        try { STATE.jobApplications = JSON.parse(savedApps); } catch (e) {}
    }

    const searchInput = document.getElementById("job-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            STATE.jobSearchQuery = e.target.value.toLowerCase().trim();
            filterAndRenderJobs();
        });
    }

    const modeSelect = document.getElementById("job-filter-mode");
    const typeSelect = document.getElementById("job-filter-type");
    const expSelect = document.getElementById("job-filter-exp");

    if (modeSelect) modeSelect.addEventListener("change", (e) => { STATE.jobWorkModeFilter = e.target.value; filterAndRenderJobs(); });
    if (typeSelect) typeSelect.addEventListener("change", (e) => { STATE.jobTypeFilter = e.target.value; filterAndRenderJobs(); });
    if (expSelect) expSelect.addEventListener("change", (e) => { STATE.jobExpFilter = e.target.value; filterAndRenderJobs(); });

    const tabBtns = document.querySelectorAll("#job-rec-tabs .btn-filter-pill");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            STATE.jobActiveFilterTab = btn.getAttribute("data-tab");
            filterAndRenderJobs();
        });
    });

    const closeJobModal = document.getElementById("btn-close-job-modal");
    const closeCpModal = document.getElementById("btn-close-cp-modal");
    if (closeJobModal) closeJobModal.addEventListener("click", () => document.getElementById("job-details-modal").classList.add("hidden"));
    if (closeCpModal) closeCpModal.addEventListener("click", () => document.getElementById("company-profile-modal").classList.add("hidden"));

    updateJobCountsBadges();
}

async function fetchAndRenderJobs() {
    filterAndRenderJobs();
}

function calculateJobMatchScore(job) {
    const studentSkills = STATE.resumeParsedData ? STATE.resumeParsedData.detectedSkills : ["Python", "SQL", "Git", "JavaScript", "React", "Java", "C++"];
    const atsScore = STATE.resumeParsedData ? STATE.resumeParsedData.scores.overallAts : 78;

    const matchingSkills = job.skills.filter(s => studentSkills.some(st => st.toLowerCase() === s.toLowerCase()));
    const missingSkills = job.skills.filter(s => !studentSkills.some(st => st.toLowerCase() === s.toLowerCase()));

    let matchPct = 60;
    if (job.skills.length > 0) {
        const skillRatio = matchingSkills.length / job.skills.length;
        matchPct = Math.round((skillRatio * 50) + (atsScore * 0.4) + 10);
    }
    matchPct = Math.min(98, Math.max(45, matchPct));

    let colorClass = "match-badge-green";
    if (matchPct < 60) colorClass = "match-badge-red";
    else if (matchPct < 80) colorClass = "match-badge-yellow";

    return { matchPct, colorClass, matchingSkills, missingSkills };
}

async function filterAndRenderJobs() {
    const jobs = await JobPortalService.fetchJobOpenings();
    const container = document.getElementById("job-cards-container");
    const trackerContainer = document.getElementById("job-tracker-container");

    if (!container) return;

    if (STATE.jobActiveFilterTab === "tracker") {
        container.classList.add("hidden");
        if (trackerContainer) trackerContainer.classList.remove("hidden");
        renderApplicationTracker();
        return;
    } else {
        container.classList.remove("hidden");
        if (trackerContainer) trackerContainer.classList.add("hidden");
    }

    container.innerHTML = "";
    let matchedJobs = jobs;

    const activeRoleKey = STATE.targetRoleKey || (document.getElementById("global-target-role") || {}).value || localStorage.getItem("targetRoleKey") || "softwareengineer";
    const roleObj = JOB_ROLES[activeRoleKey] || { title: "Software Engineer" };

    // Filter jobs related to the selected target role
    matchedJobs = matchedJobs.filter(j => {
        if (j.roleKey && j.roleKey === activeRoleKey) return true;
        if (!j.roleKey) {
            const titleLower = (j.title || "").toLowerCase();
            const firstWord = (roleObj.title || "").toLowerCase().split(" ")[0];
            return titleLower.includes(firstWord);
        }
        return false;
    });

    const q = STATE.jobSearchQuery;
    if (q) {
        matchedJobs = matchedJobs.filter(j => 
            j.company.toLowerCase().includes(q) ||
            j.title.toLowerCase().includes(q) ||
            j.skills.some(s => s.toLowerCase().includes(q)) ||
            j.location.toLowerCase().includes(q)
        );
    }

    if (STATE.jobWorkModeFilter !== "all") {
        matchedJobs = matchedJobs.filter(j => j.workMode.toLowerCase() === STATE.jobWorkModeFilter.toLowerCase());
    }

    if (STATE.jobTypeFilter !== "all") {
        matchedJobs = matchedJobs.filter(j => j.jobType.toLowerCase() === STATE.jobTypeFilter.toLowerCase());
    }

    if (STATE.jobExpFilter === "fresher") {
        matchedJobs = matchedJobs.filter(j => j.experience.toLowerCase().includes("fresher") || j.experience.includes("0-1"));
    } else if (STATE.jobExpFilter === "experienced") {
        matchedJobs = matchedJobs.filter(j => j.experience.includes("1-3") || j.experience.includes("0-2"));
    }

    if (STATE.jobActiveFilterTab === "top-match") {
        matchedJobs = matchedJobs.filter(j => calculateJobMatchScore(j).matchPct >= 80);
    } else if (STATE.jobActiveFilterTab === "internship") {
        matchedJobs = matchedJobs.filter(j => j.jobType.toLowerCase() === "internship");
    } else if (STATE.jobActiveFilterTab === "remote") {
        matchedJobs = matchedJobs.filter(j => j.workMode.toLowerCase() === "remote");
    } else if (STATE.jobActiveFilterTab === "freshers") {
        matchedJobs = matchedJobs.filter(j => j.experience.toLowerCase().includes("fresher"));
    } else if (STATE.jobActiveFilterTab === "saved") {
        matchedJobs = matchedJobs.filter(j => STATE.savedJobIds.includes(j.id));
    }

    if (matchedJobs.length === 0) {
        container.innerHTML = `<div class="glass-card text-center" style="grid-column: 1/-1; padding: 30px; color: var(--text-muted);">No suitable job openings found matching selected filters.</div>`;
        return;
    }

    matchedJobs.forEach(job => {
        const matchData = calculateJobMatchScore(job);
        const isSaved = STATE.savedJobIds.includes(job.id);

        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
            <div class="job-card-header">
                <div class="job-company-box">
                    <div class="job-company-logo" title="View ${job.company} Company Profile" data-company="${job.company}">
                        <i class="${job.logo}"></i>
                    </div>
                    <div>
                        <h4 style="color: #fff; font-size: 1.05rem;">${job.title}</h4>
                        <span class="text-muted" style="font-size: 0.82rem;">${job.company} • ${job.location}</span>
                    </div>
                </div>
                <button type="button" class="icon-btn btn-bookmark ${isSaved ? 'saved' : ''}" data-id="${job.id}" title="${isSaved ? 'Remove Bookmark' : 'Bookmark Job'}">
                    <i class="fa-solid fa-bookmark"></i>
                </button>
            </div>

            <div class="job-card-body" style="margin: 12px 0;">
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;">
                    <span class="badge ${matchData.colorClass}">${matchData.matchPct}% Match</span>
                    <span class="badge work-mode-${job.workMode.toLowerCase()}">${job.workMode}</span>
                    <span class="badge badge-accent">${job.jobType}</span>
                </div>

                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;"><i class="fa-solid fa-coins text-teal"></i> ${job.salary}</p>

                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
                    ${job.skills.slice(0, 4).map(s => `<span class="tech-tag bg-tag-blue" style="font-size: 0.72rem;">${s}</span>`).join("")}
                </div>
            </div>

            <div class="job-card-footer" style="display: flex; gap: 8px; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 12px;">
                <button type="button" class="btn btn-secondary btn-small btn-view-details" data-id="${job.id}"><i class="fa-solid fa-info-circle"></i> Details</button>
                <a href="${job.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-small btn-apply-now" data-id="${job.id}">
                    <i class="fa-solid fa-paper-plane"></i> Apply Now <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                </a>
            </div>
        `;

        const logoBtn = card.querySelector(".job-company-logo");
        if (logoBtn) logoBtn.addEventListener("click", () => openCompanyProfileModal(job.company));

        const bookmarkBtn = card.querySelector(".btn-bookmark");
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener("click", () => {
                toggleBookmarkJob(job.id);
            });
        }

        const detailsBtn = card.querySelector(".btn-view-details");
        if (detailsBtn) detailsBtn.addEventListener("click", () => openJobDetailsModal(job.id));

        const applyBtn = card.querySelector(".btn-apply-now");
        if (applyBtn) {
            applyBtn.addEventListener("click", () => {
                registerJobApplication(job);
            });
        }

        container.appendChild(card);
    });

    updateJobCountsBadges();
}

function toggleBookmarkJob(jobId) {
    if (STATE.savedJobIds.includes(jobId)) {
        STATE.savedJobIds = STATE.savedJobIds.filter(id => id !== jobId);
        showToast("Removed job from saved bookmarks.", "info", 2000);
    } else {
        STATE.savedJobIds.push(jobId);
        showToast("Saved job to bookmarks!", "success", 2000);
    }
    localStorage.setItem("savedJobs", JSON.stringify(STATE.savedJobIds));
    filterAndRenderJobs();
}

function registerJobApplication(job) {
    const existing = STATE.jobApplications.find(a => a.jobId === job.id);
    if (!existing) {
        const app = {
            id: Date.now(),
            jobId: job.id,
            company: job.company,
            title: job.title,
            logo: job.logo,
            officialUrl: job.officialUrl,
            appliedDate: new Date().toLocaleDateString(),
            status: "Applied"
        };
        STATE.jobApplications.unshift(app);
        localStorage.setItem("jobApplications", JSON.stringify(STATE.jobApplications));
        addNotification("Job Application Sent", `Applied for ${job.title} at ${job.company}. Track status in Portal.`, "teal");
    }
    showToast(`Redirecting to official ${job.company} Careers portal...`, "success", 3000);
}

function updateJobCountsBadges() {
    const savedBadge = document.getElementById("saved-jobs-count");
    const trackerBadge = document.getElementById("tracker-jobs-count");
    if (savedBadge) savedBadge.textContent = STATE.savedJobIds.length;
    if (trackerBadge) trackerBadge.textContent = STATE.jobApplications.length;
}

// Cached jobs from API + local data (merged)
let _cachedAllJobs = null;

async function getAllJobsCached() {
    if (_cachedAllJobs) return _cachedAllJobs;
    const apiJobs = await JobPortalService.fetchJobOpenings();
    const localJobs = (typeof JOB_OPENINGS_DATA !== "undefined") ? JOB_OPENINGS_DATA : [];
    // Merge: API first, then local jobs not already in API set
    const apiIds = new Set(apiJobs.map(j => j.id));
    const merged = [...apiJobs, ...localJobs.filter(j => !apiIds.has(j.id))];
    _cachedAllJobs = merged;
    return merged;
}

function openJobDetailsModal(jobId) {
    const localJobs = (typeof JOB_OPENINGS_DATA !== "undefined") ? JOB_OPENINGS_DATA : [];
    const job = localJobs.find(j => j.id === jobId) || (_cachedAllJobs || []).find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById("job-details-modal");
    if (!modal) return;

    const matchData = calculateJobMatchScore(job);

    document.getElementById("modal-job-logo").innerHTML = `<i class="${job.logo}"></i>`;
    document.getElementById("modal-job-title").textContent = job.title;
    document.getElementById("modal-job-company").textContent = `${job.company} • ${job.location}`;

    const scoreBadge = document.getElementById("modal-match-score-badge");
    scoreBadge.textContent = `${matchData.matchPct}% Match`;
    scoreBadge.className = `fit-pct-badge ${matchData.colorClass}`;

    document.getElementById("modal-job-salary").textContent = job.salary;
    document.getElementById("modal-job-mode").textContent = `${job.workMode} | ${job.jobType}`;
    document.getElementById("modal-job-location").textContent = job.location;
    document.getElementById("modal-job-deadline").textContent = job.deadline;
    document.getElementById("modal-job-desc").textContent = job.description;

    const respList = document.getElementById("modal-job-resp");
    if (respList) {
        respList.innerHTML = job.responsibilities.map(r => `<li>${r}</li>`).join("");
    }

    const matchSkillsBox = document.getElementById("modal-matching-skills");
    const missSkillsBox = document.getElementById("modal-missing-skills");

    if (matchSkillsBox) {
        matchSkillsBox.innerHTML = matchData.matchingSkills.map(s => `<span class="tech-tag bg-tag-blue">${s}</span>`).join("") || `<span class="text-muted">None detected</span>`;
    }
    if (missSkillsBox) {
        missSkillsBox.innerHTML = matchData.missingSkills.map(s => `<span class="tech-tag bg-tag-orange">${s}</span>`).join("") || `<span class="text-teal">Full Skill Match!</span>`;
    }

    const applyBtn = document.getElementById("modal-btn-apply");
    if (applyBtn) {
        applyBtn.onclick = () => {
            registerJobApplication(job);
            window.open(job.officialUrl, "_blank", "noopener,noreferrer");
        };
    }

    const bookmarkBtn = document.getElementById("modal-btn-bookmark");
    if (bookmarkBtn) {
        bookmarkBtn.onclick = () => toggleBookmarkJob(job.id);
    }

    modal.classList.remove("hidden");
}

function openCompanyProfileModal(companyName) {
    const roleKey = STATE.targetRoleKey || (document.getElementById("global-target-role") || {}).value || localStorage.getItem("targetRoleKey") || "softwareengineer";
    const roleCompanies = COMPANY_PREPARATION_DATA[roleKey] || [];
    let compData = roleCompanies.find(c => c.name.toLowerCase() === companyName.toLowerCase());

    if (!compData) {
        Object.keys(COMPANY_PREPARATION_DATA).forEach(rk => {
            if (!compData && Array.isArray(COMPANY_PREPARATION_DATA[rk])) {
                compData = COMPANY_PREPARATION_DATA[rk].find(c => c.name.toLowerCase() === companyName.toLowerCase());
            }
        });
    }

    if (!compData) {
        compData = {
            name: companyName,
            jobRole: "Target Specialist",
            logo: "fa-solid fa-building",
            salary: "Competitive Market Package",
            hiringProcess: "Screening ➔ Technical Assessment ➔ HR Fit",
            preparationTips: "Focus on core fundamentals, problem solving, and domain knowledge.",
            requiredSkills: ["Core Fundamentals", "Problem Solving", "Communication"],
            rounds: ["Aptitude / Coding Screen", "Technical Interview", "HR Round"],
            eligibility: "CGPA >= 6.5"
        };
    }

    const jobComp = (JOB_OPENINGS_DATA || []).find(j => j.company.toLowerCase() === companyName.toLowerCase());
    const officialUrl = compData.officialCareersUrl || (jobComp ? jobComp.officialUrl : "https://careers.google.com");

    const modal = document.getElementById("company-profile-modal");
    if (!modal) return;

    const logoBox = document.getElementById("cp-modal-logo");
    if (logoBox) logoBox.innerHTML = `<i class="${compData.logo || 'fa-solid fa-building'}"></i>`;
    
    const nameBox = document.getElementById("cp-modal-name");
    if (nameBox) nameBox.textContent = `${compData.name} - ${compData.jobRole || 'Corporate Recruiter Guide'}`;
    
    const ratingBox = document.getElementById("cp-modal-rating");
    if (ratingBox) ratingBox.textContent = (jobComp ? jobComp.glassdoorRating : "4.5 ★") + " Recruiter Rating • " + compData.salary;
    
    const overviewBox = document.getElementById("cp-modal-overview");
    if (overviewBox) overviewBox.textContent = compData.overview || (jobComp ? jobComp.companyOverview : "Global corporate enterprise hiring top talent.");
    
    const cultureBox = document.getElementById("cp-modal-culture");
    if (cultureBox) cultureBox.textContent = compData.hiringProcess || "Structured hiring rounds with technical and behavioral evaluation.";

    const techBox = document.getElementById("cp-modal-techstack");
    if (techBox) {
        const stack = compData.requiredSkills || (jobComp ? jobComp.techStack : ["Data Structures", "Problem Solving", "Communication"]);
        techBox.innerHTML = stack.map(s => `<span class="tech-tag bg-tag-blue">${s}</span>`).join("");
    }

    const siteBtn = document.getElementById("cp-modal-btn-site");
    if (siteBtn) siteBtn.href = officialUrl;

    modal.classList.remove("hidden");
}

function renderApplicationTracker() {
    const container = document.getElementById("job-tracker-list");
    if (!container) return;

    if (STATE.jobApplications.length === 0) {
        container.innerHTML = `<div class="glass-card text-center" style="padding: 30px; color: var(--text-muted);">No job applications tracked yet. Click <strong>Apply Now</strong> on any job card to track submission stages.</div>`;
        return;
    }

    const stages = ["Applied", "Assessment", "Interview Scheduled", "Offer Received"];

    container.innerHTML = "";
    STATE.jobApplications.forEach(app => {
        const currentStageIdx = stages.indexOf(app.status);

        const row = document.createElement("div");
        row.className = "tracker-row";
        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="job-company-logo" style="width: 36px; height: 36px; font-size: 1.1rem;"><i class="${app.logo}"></i></div>
                    <div>
                        <h4 style="color: #fff; font-size: 1.05rem;">${app.title}</h4>
                        <span class="text-muted" style="font-size: 0.8rem;">${app.company} • Applied on ${app.appliedDate}</span>
                    </div>
                </div>
                <div>
                    <select class="custom-select tracker-status-select" data-id="${app.id}">
                        <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                        <option value="Assessment" ${app.status === 'Assessment' ? 'selected' : ''}>Assessment</option>
                        <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                        <option value="Offer Received" ${app.status === 'Offer Received' ? 'selected' : ''}>Offer Received</option>
                        <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted 🎉</option>
                        <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected ✘</option>
                    </select>
                </div>
            </div>

            <div class="tracker-timeline">
                ${stages.map((stg, idx) => {
                    let cls = "";
                    if (idx < currentStageIdx) cls = "completed";
                    else if (idx === currentStageIdx) cls = "active";
                    return `
                        <div class="tracker-step ${cls}">
                            <div class="tracker-step-dot">${idx < currentStageIdx ? '✔' : idx + 1}</div>
                            <span class="tracker-step-label">${stg}</span>
                        </div>
                    `;
                }).join("")}
            </div>
        `;

        const select = row.querySelector(".tracker-status-select");
        if (select) {
            select.addEventListener("change", (e) => {
                const newStatus = e.target.value;
                app.status = newStatus;
                localStorage.setItem("jobApplications", JSON.stringify(STATE.jobApplications));
                renderApplicationTracker();
                showToast(`Updated application status to: ${newStatus}`, "info", 2000);
            });
        }

        container.appendChild(row);
    });
}

// ========================================================
// EXECUTIVE DASHBOARD REFRESH
// ========================================================
function refreshDashboard() {
    const roleKey = STATE.targetRoleKey || (document.getElementById("global-target-role") || {}).value || "softwareengineer";
    const role = JOB_ROLES[roleKey] || { skills: [], readiness: 75, title: "Software Engineer" };
    const studentSkills = STATE.resumeParsedData ? STATE.resumeParsedData.detectedSkills : [];
    const mastered = role.skills.filter(s => studentSkills.some(st => st.toLowerCase() === s.toLowerCase())).length;
    const totalSkills = role.skills.length || 1;
    const skillPct = Math.round((mastered / totalSkills) * 100);

    // ATS Score Card
    const dashAts = document.getElementById("dash-ats-score");
    const dashAtsNote = document.getElementById("dash-ats-note");
    if (dashAts) dashAts.textContent = STATE.resumeParsedData ? `${STATE.resumeParsedData.scores.overallAts}/100` : "--/100";
    if (dashAtsNote) dashAtsNote.textContent = STATE.resumeParsedData ? `Target fit: ${STATE.resumeParsedData.scores.relevanceFit}%` : "Upload resume to calculate";

    // Skills Card
    const skillsMastered = document.getElementById("dash-skills-mastered-count");
    const skillsGapNote = document.getElementById("dash-skills-gap-note");
    if (skillsMastered) skillsMastered.textContent = `${mastered} / ${totalSkills}`;
    if (skillsGapNote) skillsGapNote.textContent = `${totalSkills - mastered} gaps remaining`;

    // Career Readiness
    const readinessEl = document.getElementById("dash-readiness-score");
    const readinessBar = document.getElementById("dash-readiness-bar");
    const readinessPct = STATE.resumeParsedData ? Math.min(100, Math.round((skillPct * 0.6) + (STATE.resumeParsedData.scores.overallAts * 0.4))) : skillPct;
    if (readinessEl) readinessEl.textContent = `${readinessPct}%`;
    if (readinessBar) readinessBar.style.width = `${readinessPct}%`;

    // Interview Score
    const interviewEl = document.getElementById("dash-interview-score");
    if (interviewEl && STATE.interviewState.score.total > 0) {
        interviewEl.textContent = `${STATE.interviewState.score.total}%`;
    }

    // Roadmap Progress
    const roadmapEl = document.getElementById("dash-roadmap-progress");
    if (roadmapEl) {
        const nodes = STATE.roadmapStates[roleKey] || [];
        const completed = nodes.filter(n => n.status === "Completed").length;
        const total = nodes.length || 1;
        roadmapEl.textContent = `${completed}/${total} weeks`;
    }
}

// ========================================================
// MYSQL DATABASE EXPLORER MODULE
// ========================================================
function initDbTableVisuals() {
    const searchInput = document.getElementById("db-search-input");
    const filterPills = document.querySelectorAll("#db-filter-pills .btn-filter-pill");
    const subtabBtns = document.querySelectorAll(".db-subtab-btn");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            STATE.dbSearchQuery = e.target.value.toLowerCase().trim();
            filterAndRenderDbTablesList();
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            STATE.dbActiveFilter = pill.getAttribute("data-filter");
            filterAndRenderDbTablesList();
        });
    });

    subtabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            subtabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const panelId = btn.getAttribute("data-subpanel");
            STATE.dbActiveSubpanel = panelId;

            document.querySelectorAll(".db-subpanel").forEach(p => p.classList.add("hidden"));
            const activePanel = document.getElementById(`db-subpanel-${panelId}`);
            if (activePanel) activePanel.classList.remove("hidden");
        });
    });

    const btnSql = document.getElementById("btn-export-sql");
    const btnJson = document.getElementById("btn-export-json");
    const btnCsv = document.getElementById("btn-export-csv");
    const btnPdf = document.getElementById("btn-export-pdf");
    const btnCopySql = document.getElementById("btn-copy-sql");

    if (btnSql) btnSql.addEventListener("click", exportSqlSchema);
    if (btnJson) btnJson.addEventListener("click", exportJsonMetadata);
    if (btnCsv) btnCsv.addEventListener("click", exportCsvData);
    if (btnPdf) btnPdf.addEventListener("click", exportPdfDocs);
    if (btnCopySql) {
        btnCopySql.addEventListener("click", () => {
            const sqlOutput = document.getElementById("db-sql-code-output");
            if (sqlOutput && navigator.clipboard) {
                navigator.clipboard.writeText(sqlOutput.innerText);
                showToast("Copied SQL query to clipboard!", "success", 2000);
            }
        });
    }

    filterAndRenderDbTablesList();
    renderActiveTableSchema();
}

// ========================================================
// PLACEMENT APPLICATIONS & INTERVIEW TRACKER CONTROLLER
// ========================================================
const DEFAULT_PLACEMENT_APPLICATIONS = [
    {
        id: "app_google_101",
        company: "Google",
        logo: "fa-brands fa-google",
        title: "Software Engineer I (Early Career)",
        appliedDate: "2026-07-15",
        nextInterviewDate: "2026-08-05",
        status: "Technical Round",
        rounds: {
            onlineAssessment: "Passed (90 mins OA)",
            technicalRound: "Scheduled (System Design & DSA)",
            hrRound: "Pending",
            offerStatus: "In Progress"
        },
        salaryOffer: "₹24 LPA (Expected)",
        notes: "Revise Graph DP algorithms, Trie trees, and system design principles.",
        badgeColor: "purple"
    },
    {
        id: "app_microsoft_102",
        company: "Microsoft",
        logo: "fa-brands fa-microsoft",
        title: "Data Analyst - Business Intelligence",
        appliedDate: "2026-07-10",
        nextInterviewDate: "2026-08-02",
        status: "Online Assessment",
        rounds: {
            onlineAssessment: "Submitted (SQL & PowerBI test)",
            technicalRound: "Awaiting OA Results",
            hrRound: "Pending",
            offerStatus: "Pending"
        },
        salaryOffer: "₹18 LPA",
        notes: "Practice DAX formulas, SQL window functions, and Power BI dashboards.",
        badgeColor: "teal"
    },
    {
        id: "app_amazon_103",
        company: "Amazon",
        logo: "fa-brands fa-amazon",
        title: "Software Development Engineer (SDE-1)",
        appliedDate: "2026-06-28",
        nextInterviewDate: "-",
        status: "Offer Received",
        rounds: {
            onlineAssessment: "Passed",
            technicalRound: "Passed (3 Loop Rounds)",
            hrRound: "Passed (Bar Raiser)",
            offerStatus: "Offer Extended 🎉"
        },
        salaryOffer: "₹28.5 LPA",
        notes: "Official offer letter received! Acceptance deadline: Aug 15.",
        badgeColor: "amber"
    },
    {
        id: "app_deloitte_104",
        company: "Deloitte",
        logo: "fa-solid fa-chart-pie",
        title: "Analytics Consultant",
        appliedDate: "2026-06-20",
        nextInterviewDate: "-",
        status: "Selected",
        rounds: {
            onlineAssessment: "Passed",
            technicalRound: "Passed",
            hrRound: "Passed",
            offerStatus: "Selected / Accepted"
        },
        salaryOffer: "₹14 LPA",
        notes: "Accepted offer! Onboarding documentation completed.",
        badgeColor: "emerald"
    }
];

function getPlacementApplications() {
    try {
        const stored = localStorage.getItem("placementApplications");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.warn("[getPlacementApplications] Error parsing localStorage", e);
    }
    localStorage.setItem("placementApplications", JSON.stringify(DEFAULT_PLACEMENT_APPLICATIONS));
    return DEFAULT_PLACEMENT_APPLICATIONS;
}

function savePlacementApplications(apps) {
    localStorage.setItem("placementApplications", JSON.stringify(apps));
}

function renderPlacementTracker() {
    const container = document.getElementById("placement-tracker-list-container");
    if (!container) return;

    const apps = getPlacementApplications();

    // 1. Calculate Statistics Dashboard
    const totalApps = apps.length;
    const activeInterviews = apps.filter(a => ["Online Assessment", "Technical Round", "HR Round"].includes(a.status)).length;
    const offersReceived = apps.filter(a => ["Offer Received", "Selected"].includes(a.status)).length;
    const rejections = apps.filter(a => a.status === "Rejected").length;
    const successRate = totalApps > 0 ? Math.round((offersReceived / totalApps) * 100) : 0;

    const elTotal = document.getElementById("tracker-stat-total");
    const elInterviews = document.getElementById("tracker-stat-interviews");
    const elOffers = document.getElementById("tracker-stat-offers");
    const elRejections = document.getElementById("tracker-stat-rejections");
    const elRate = document.getElementById("tracker-stat-rate");

    if (elTotal) elTotal.textContent = totalApps;
    if (elInterviews) elInterviews.textContent = activeInterviews;
    if (elOffers) elOffers.textContent = offersReceived;
    if (elRejections) elRejections.textContent = rejections;
    if (elRate) elRate.textContent = `${successRate}%`;

    // 2. Filter & Search Records
    const searchQuery = (STATE.placementSearchQuery || "").toLowerCase();
    const filterStatus = STATE.placementStatusFilter || "all";

    let filtered = apps.filter(a => {
        let matchesSearch = true;
        if (searchQuery) {
            matchesSearch = (a.company || "").toLowerCase().includes(searchQuery) ||
                (a.title || "").toLowerCase().includes(searchQuery) ||
                (a.status || "").toLowerCase().includes(searchQuery) ||
                (a.notes || "").toLowerCase().includes(searchQuery);
        }

        let matchesFilter = true;
        if (filterStatus !== "all") {
            matchesFilter = a.status === filterStatus;
        }

        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="glass-card text-center" style="padding: 45px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-clipboard-question large-icon" style="font-size: 2.8rem; margin-bottom: 14px; display: block; color: var(--primary);"></i>
                <h3 style="color: #fff; font-size: 1.25rem; margin-bottom: 8px;">No placement applications found.</h3>
                <p style="font-size: 0.9rem; max-width: 480px; margin: 0 auto 16px;">Try adjusting your search keywords or filter tab, or click "Log New Application" to add your first application.</p>
                <button type="button" class="btn btn-primary" onclick="openPlacementModal()"><i class="fa-solid fa-plus"></i> Log New Application</button>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    filtered.forEach(app => {
        const card = document.createElement("div");
        card.className = "glass-card placement-app-card";
        card.style.padding = "20px";
        card.style.borderLeft = `4px solid ${getPlacementBadgeColor(app.status)}`;

        const stageProgress = getPlacementStageProgress(app.status);

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
                <div style="display: flex; gap: 14px; align-items: center;">
                    <div class="job-company-logo" style="width: 46px; height: 46px; border-radius: 10px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff;">
                        <i class="${app.logo || 'fa-solid fa-building'}"></i>
                    </div>
                    <div>
                        <h3 style="color: #fff; font-size: 1.15rem; margin: 0;">${app.company}</h3>
                        <span style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 500;">${app.title}</span>
                    </div>
                </div>

                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <span class="badge" style="background: ${getPlacementBadgeBg(app.status)}; color: ${getPlacementBadgeColor(app.status)}; font-weight: 600; font-size: 0.82rem; padding: 6px 12px; border-radius: 20px;">
                        ${app.status}
                    </span>
                    <button type="button" class="icon-btn" onclick="openPlacementModal('${app.id}')" title="Edit Application">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="icon-btn text-danger" onclick="deletePlacementApplication('${app.id}')" title="Delete Record">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <!-- Progress Timeline Bar -->
            <div style="margin: 14px 0 16px 0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px; flex-wrap: wrap; gap: 4px;">
                    <span class="${stageProgress >= 20 ? 'text-teal' : ''}">Applied</span>
                    <span class="${stageProgress >= 40 ? 'text-teal' : ''}">Assessment</span>
                    <span class="${stageProgress >= 60 ? 'text-purple' : ''}">Technical</span>
                    <span class="${stageProgress >= 80 ? 'text-pink' : ''}">HR Round</span>
                    <span class="${stageProgress >= 100 ? 'text-amber' : ''}">Result / Offer</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${stageProgress}%; background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent)); transition: width 0.4s ease;"></div>
                </div>
            </div>

            <!-- Metadata & Round Chips Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; background: rgba(0,0,0,0.2); padding: 12px 14px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-glass); font-size: 0.82rem;">
                <div><span class="text-muted"><i class="fa-solid fa-calendar-day text-amber"></i> Applied Date:</span> <strong style="color: #fff;">${app.appliedDate}</strong></div>
                <div><span class="text-muted"><i class="fa-solid fa-clock text-pink"></i> Next Interview:</span> <strong style="color: ${app.nextInterviewDate && app.nextInterviewDate !== '-' ? 'var(--secondary)' : 'var(--text-muted)'};">${app.nextInterviewDate || '-'}</strong></div>
                <div><span class="text-muted"><i class="fa-solid fa-coins text-teal"></i> Salary / Offer:</span> <strong style="color: #fff;">${app.salaryOffer || 'Market Package'}</strong></div>
            </div>

            <!-- Notes Section -->
            ${app.notes ? `
                <div style="margin-top: 12px; font-size: 0.82rem; color: var(--text-secondary); background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 6px; border-left: 3px solid var(--border-glass);">
                    <i class="fa-solid fa-sticky-note text-amber" style="margin-right: 6px;"></i> <em>${app.notes}</em>
                </div>
            ` : ''}
        `;

        container.appendChild(card);
    });
}

function getPlacementBadgeColor(status) {
    switch (status) {
        case "Applied": return "#38bdf8";
        case "Online Assessment": return "#2dd4bf";
        case "Technical Round": return "#c084fc";
        case "HR Round": return "#f472b6";
        case "Offer Received": return "#fbbf24";
        case "Selected": return "#34d399";
        case "Rejected": return "#f87171";
        default: return "#94a3b8";
    }
}

function getPlacementBadgeBg(status) {
    switch (status) {
        case "Applied": return "rgba(56, 189, 248, 0.15)";
        case "Online Assessment": return "rgba(45, 212, 191, 0.15)";
        case "Technical Round": return "rgba(192, 132, 252, 0.15)";
        case "HR Round": return "rgba(244, 114, 182, 0.15)";
        case "Offer Received": return "rgba(251, 191, 36, 0.18)";
        case "Selected": return "rgba(52, 211, 153, 0.18)";
        case "Rejected": return "rgba(248, 113, 113, 0.15)";
        default: return "rgba(148, 163, 184, 0.15)";
    }
}

function getPlacementStageProgress(status) {
    switch (status) {
        case "Applied": return 20;
        case "Online Assessment": return 40;
        case "Technical Round": return 60;
        case "HR Round": return 80;
        case "Offer Received":
        case "Selected": return 100;
        case "Rejected": return 100;
        default: return 10;
    }
}

function openPlacementModal(appId) {
    const modal = document.getElementById("placement-app-modal");
    if (!modal) return;

    const titleEl = document.getElementById("placement-modal-title");
    const idInput = document.getElementById("placement-app-id");
    const compInput = document.getElementById("papp-company");
    const titleInput = document.getElementById("papp-title");
    const dateInput = document.getElementById("papp-applied-date");
    const nextInput = document.getElementById("papp-next-date");
    const statusSelect = document.getElementById("papp-status");
    const salaryInput = document.getElementById("papp-salary");
    const oaInput = document.getElementById("papp-round-oa");
    const techInput = document.getElementById("papp-round-tech");
    const notesInput = document.getElementById("papp-notes");

    if (appId) {
        const apps = getPlacementApplications();
        const app = apps.find(a => a.id === appId);
        if (app) {
            if (titleEl) titleEl.textContent = "Edit Application Record";
            if (idInput) idInput.value = app.id;
            if (compInput) compInput.value = app.company;
            if (titleInput) titleInput.value = app.title;
            if (dateInput) dateInput.value = app.appliedDate || "";
            if (nextInput) nextInput.value = app.nextInterviewDate === "-" ? "" : (app.nextInterviewDate || "");
            if (statusSelect) statusSelect.value = app.status;
            if (salaryInput) salaryInput.value = app.salaryOffer || "";
            if (oaInput) oaInput.value = (app.rounds && app.rounds.onlineAssessment) || "";
            if (techInput) techInput.value = (app.rounds && app.rounds.technicalRound) || "";
            if (notesInput) notesInput.value = app.notes || "";
        }
    } else {
        if (titleEl) titleEl.textContent = "Log Placement Application";
        if (idInput) idInput.value = "";
        if (compInput) compInput.value = "";
        if (titleInput) titleInput.value = "";
        if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
        if (nextInput) nextInput.value = "";
        if (statusSelect) statusSelect.value = "Applied";
        if (salaryInput) salaryInput.value = "";
        if (oaInput) oaInput.value = "";
        if (techInput) techInput.value = "";
        if (notesInput) notesInput.value = "";
    }

    modal.classList.remove("hidden");
}

function closePlacementModal() {
    const modal = document.getElementById("placement-app-modal");
    if (modal) modal.classList.add("hidden");
}

function initPlacementTrackerListeners() {
    const btnOpen = document.getElementById("btn-open-placement-modal");
    if (btnOpen) btnOpen.addEventListener("click", () => openPlacementModal());

    const btnClose = document.getElementById("btn-close-placement-modal");
    if (btnClose) btnClose.addEventListener("click", closePlacementModal);

    const btnCancel = document.getElementById("btn-cancel-placement-modal");
    if (btnCancel) btnCancel.addEventListener("click", closePlacementModal);

    const searchInput = document.getElementById("tracker-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            STATE.placementSearchQuery = e.target.value;
            renderPlacementTracker();
        });
    }

    const filterPills = document.querySelectorAll("#tracker-filter-pills .btn-filter-pill");
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            STATE.placementStatusFilter = pill.getAttribute("data-filter") || "all";
            renderPlacementTracker();
        });
    });

    const form = document.getElementById("form-placement-app");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const idInput = document.getElementById("placement-app-id");
            const compVal = document.getElementById("papp-company").value.trim();
            const titleVal = document.getElementById("papp-title").value.trim();
            const dateVal = document.getElementById("papp-applied-date").value;
            const nextVal = document.getElementById("papp-next-date").value || "-";
            const statusVal = document.getElementById("papp-status").value;
            const salaryVal = document.getElementById("papp-salary").value.trim();
            const oaVal = document.getElementById("papp-round-oa").value.trim();
            const techVal = document.getElementById("papp-round-tech").value.trim();
            const notesVal = document.getElementById("papp-notes").value.trim();

            let apps = getPlacementApplications();

            if (idInput && idInput.value) {
                const index = apps.findIndex(a => a.id === idInput.value);
                if (index !== -1) {
                    apps[index] = {
                        ...apps[index],
                        company: compVal,
                        title: titleVal,
                        appliedDate: dateVal,
                        nextInterviewDate: nextVal,
                        status: statusVal,
                        salaryOffer: salaryVal,
                        rounds: {
                            onlineAssessment: oaVal || (apps[index].rounds && apps[index].rounds.onlineAssessment) || "Applied",
                            technicalRound: techVal || (apps[index].rounds && apps[index].rounds.technicalRound) || "Pending",
                            hrRound: (apps[index].rounds && apps[index].rounds.hrRound) || "Pending",
                            offerStatus: statusVal
                        },
                        notes: notesVal
                    };
                    showToast(`Updated application for ${compVal}!`, "success");
                }
            } else {
                const newId = "app_" + Date.now();
                const logoMap = {
                    google: "fa-brands fa-google",
                    microsoft: "fa-brands fa-microsoft",
                    amazon: "fa-brands fa-amazon",
                    apple: "fa-brands fa-apple",
                    meta: "fa-brands fa-facebook",
                    deloitte: "fa-solid fa-chart-pie",
                    ey: "fa-solid fa-building-columns",
                    accenture: "fa-solid fa-laptop-code"
                };
                const compKey = compVal.toLowerCase().replace(/[^a-z]/g, "");
                const logoIcon = logoMap[compKey] || "fa-solid fa-building";

                apps.unshift({
                    id: newId,
                    company: compVal,
                    logo: logoIcon,
                    title: titleVal,
                    appliedDate: dateVal,
                    nextInterviewDate: nextVal,
                    status: statusVal,
                    salaryOffer: salaryVal,
                    rounds: {
                        onlineAssessment: oaVal || "Applied",
                        technicalRound: techVal || "Pending",
                        hrRound: "Pending",
                        offerStatus: statusVal
                    },
                    notes: notesVal
                });
                showToast(`Logged application for ${compVal}!`, "success");
            }

            savePlacementApplications(apps);
            closePlacementModal();
            renderPlacementTracker();
        });
    }
}

function deletePlacementApplication(appId) {
    if (!confirm("Are you sure you want to delete this placement application record?")) return;
    let apps = getPlacementApplications();
    apps = apps.filter(a => a.id !== appId);
    savePlacementApplications(apps);
    showToast("Application record deleted.", "info");
    renderPlacementTracker();
}

// ========================================================
// PLACEMENT ADVICE CHATBOT DRAWER
// ========================================================
function initPlacementAdviceListeners() {
    const drawerHeader = document.getElementById("btn-toggle-drawer");
    const chatBody = document.getElementById("drawer-chat-body");
    const chatDrawer = document.getElementById("placement-ai-chat-drawer");
    const sendBtn = document.getElementById("btn-send-drawer-msg");
    const inputMsg = document.getElementById("drawer-user-input");

    if (chatDrawer) chatDrawer.classList.add("minimized");

    if (drawerHeader && chatBody && chatDrawer) {
        drawerHeader.addEventListener("click", () => {
            if (chatBody.classList.contains("hidden")) {
                chatBody.classList.remove("hidden");
                chatDrawer.classList.remove("minimized");
            } else {
                chatBody.classList.add("hidden");
                chatDrawer.classList.add("minimized");
            }
        });
    }

    if (sendBtn) sendBtn.addEventListener("click", () => handlePlacementReply());
    if (inputMsg) {
        inputMsg.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handlePlacementReply();
        });
    }
}

function handlePlacementReply() {
    const input = document.getElementById("drawer-user-input");
    const container = document.getElementById("drawer-messages-box");
    if (!input || !container) return;

    const text = input.value.trim();
    if (!text) return;

    const userDiv = document.createElement("div");
    userDiv.className = "drawer-msg user";
    userDiv.innerHTML = `<p>${text}</p>`;
    container.appendChild(userDiv);
    input.value = "";
    container.scrollTop = container.scrollHeight;

    const promptLower = text.toLowerCase();
    let reply = "Placement AI Advice: Ask me about ATS formatting, Google/TCS/Zoho preparation tips, or resume optimization.";

    Object.keys(PLACEMENT_BOT_KNOWLEDGE).forEach(key => {
        if (promptLower.includes(key)) {
            reply = PLACEMENT_BOT_KNOWLEDGE[key];
        }
    });

    setTimeout(() => {
        const botDiv = document.createElement("div");
        botDiv.className = "drawer-msg bot";
        botDiv.innerHTML = `<p>${reply}</p>`;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 800);
}

// ========================================================
// DAILY FLASHCARDS PRACTICE MODAL (Full MCQ + Score System)
// ========================================================
function initFlashcardListeners() {
    const practiceLink = document.getElementById("btn-open-practice");
    const modal = document.getElementById("flashcard-modal");
    const closeBtn = document.getElementById("btn-close-flashcard");
    const nextBtn = document.getElementById("btn-next-fc");
    const prevBtn = document.getElementById("btn-prev-fc");

    if (practiceLink && modal) {
        practiceLink.addEventListener("click", () => {
            modal.classList.remove("hidden");
            STATE.activeFlashcardIndex = 0;
            STATE.flashcardScore = { correct: 0, incorrect: 0, total: 0 };
            renderActiveFlashcard();
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
            // Show score summary if at least 1 answered
            if (STATE.flashcardScore.total > 0) {
                showToast(`Flashcard session: ${STATE.flashcardScore.correct}/${STATE.flashcardScore.total} correct! Keep practicing!`, "info", 5000);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (STATE.activeFlashcardIndex < DAILY_QUESTIONS.length - 1) {
                STATE.activeFlashcardIndex++;
                renderActiveFlashcard();
            } else {
                // End of deck
                const { correct, total } = STATE.flashcardScore;
                const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
                showToast(`🎉 Deck complete! Score: ${correct}/${total} (${pct}%). Great work!`, "success", 5000);
                modal.classList.add("hidden");
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (STATE.activeFlashcardIndex > 0) {
                STATE.activeFlashcardIndex--;
                renderActiveFlashcard();
            }
        });
    }
}

function renderActiveFlashcard() {
    const q = DAILY_QUESTIONS[STATE.activeFlashcardIndex];
    if (!q) return;

    const total = DAILY_QUESTIONS.length;
    const current = STATE.activeFlashcardIndex + 1;
    const progressPct = (current / total) * 100;

    const fill = document.getElementById("fc-progress-fill");
    if (fill) fill.style.width = `${progressPct}%`;

    const typeTag = document.getElementById("fc-type");
    const qText = document.getElementById("fc-question");
    const optionsBox = document.getElementById("fc-options-box");
    const explanationBox = document.getElementById("fc-explanation-box");
    const explanationText = document.getElementById("fc-explanation-text");
    const nextBtn = document.getElementById("btn-next-fc");

    if (typeTag) typeTag.textContent = q.type;
    if (qText) qText.textContent = `Q${current}/${total}: ${q.question}`;
    if (explanationBox) explanationBox.classList.add("hidden");
    if (nextBtn) nextBtn.textContent = current < total ? `Next Question →` : `Finish Session 🎉`;

    // Render MCQ options if available, else open-ended
    if (optionsBox) {
        optionsBox.innerHTML = "";

        if (q.options && q.options.length > 0) {
            q.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "fc-option-btn";
                btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;

                btn.addEventListener("click", () => {
                    // Only allow answering once per question
                    if (optionsBox.querySelector(".fc-option-btn.answered")) return;

                    STATE.flashcardScore.total++;
                    const isCorrect = idx === q.correct;

                    if (isCorrect) {
                        btn.classList.add("correct");
                        STATE.flashcardScore.correct++;
                        showToast("✅ Correct!", "success", 1500);
                    } else {
                        btn.classList.add("incorrect");
                        STATE.flashcardScore.incorrect++;
                        // Highlight correct answer
                        const allBtns = optionsBox.querySelectorAll(".fc-option-btn");
                        allBtns[q.correct].classList.add("correct");
                        showToast("❌ Incorrect — see explanation below.", "error", 2000);
                    }

                    // Mark all as answered to prevent re-clicking
                    optionsBox.querySelectorAll(".fc-option-btn").forEach(b => b.classList.add("answered"));

                    // Show explanation
                    if (explanationBox && explanationText && q.explanation) {
                        explanationText.textContent = q.explanation;
                        explanationBox.classList.remove("hidden");
                    }
                });

                optionsBox.appendChild(btn);
            });
        } else {
            // Open-ended question fallback
            optionsBox.innerHTML = `<p style="color:var(--text-secondary);font-size:0.88rem;font-style:italic;">Open-ended question — Think through your answer, then click Next to reveal the explanation.</p>`;
            if (explanationBox && explanationText && q.explanation) {
                explanationText.textContent = q.explanation;
                explanationBox.classList.remove("hidden");
            }
        }
    }
}

window.renderActiveFlashcard = renderActiveFlashcard;

// ========================================================
// PROFILE FORM LISTENERS (Update Profile + Change Password)
// ========================================================
function initProfileFormListeners() {
    const formProfile = document.getElementById("form-profile-update");
    const changePassForm = document.getElementById("form-change-password");

    if (formProfile) {
        formProfile.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("prof-name") ? document.getElementById("prof-name").value.trim() : "";
            const college = document.getElementById("prof-college") ? document.getElementById("prof-college").value.trim() : "";
            const branch = document.getElementById("prof-branch") ? document.getElementById("prof-branch").value.trim() : "";
            const gradYear = document.getElementById("prof-gradyear") ? document.getElementById("prof-gradyear").value : "";

            if (!name || !college) {
                showToast("Name and College are required fields.", "error", 3000);
                return;
            }

            const submitBtn = formProfile.querySelector("button[type='submit']");
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Updating...`; }

            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`${API_BASE}/api/auth/update-profile`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({ name, fullName: name, college, branch, graduation_year: parseInt(gradYear) })
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    if (STATE.currentUser) {
                        STATE.currentUser.name = name;
                        STATE.currentUser.college = college;
                        STATE.currentUser.branch = branch;
                        STATE.currentUser.graduation_year = parseInt(gradYear);
                    }
                    const sidebarName = document.getElementById("sidebar-user-name");
                    if (sidebarName) sidebarName.textContent = name;
                    showToast("Profile updated successfully!", "success", 3000);
                } else {
                    // Offline fallback: update STATE only
                    if (STATE.currentUser) {
                        STATE.currentUser.name = name;
                        STATE.currentUser.college = college;
                        STATE.currentUser.branch = branch;
                    }
                    const sidebarName = document.getElementById("sidebar-user-name");
                    if (sidebarName) sidebarName.textContent = name;
                    showToast("Profile saved locally! (Server sync pending)", "info", 3000);
                }
            } catch (err) {
                // Network error — update locally
                if (STATE.currentUser) {
                    STATE.currentUser.name = name;
                    STATE.currentUser.college = college;
                }
                const sidebarName = document.getElementById("sidebar-user-name");
                if (sidebarName) sidebarName.textContent = name;
                showToast("Profile saved locally. Connect to server to sync.", "info", 3000);
            } finally {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = `Update Profile Details`; }
            }
        });
    }

    if (changePassForm) {
        changePassForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const currentPass = document.getElementById("prof-current-pass") ? document.getElementById("prof-current-pass").value : "";
            const newPass = document.getElementById("prof-new-pass") ? document.getElementById("prof-new-pass").value : "";
            const confirmPass = document.getElementById("prof-confirm-pass") ? document.getElementById("prof-confirm-pass").value : "";

            if (!currentPass || !newPass || !confirmPass) {
                showToast("All password fields are required.", "error", 3000);
                return;
            }
            if (newPass !== confirmPass) {
                showToast("New passwords do not match.", "error", 3000);
                return;
            }
            if (newPass.length < 8) {
                showToast("New password must be at least 8 characters.", "error", 3000);
                return;
            }

            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`${API_BASE}/api/auth/change-password`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    showToast("Password changed successfully!", "success", 3000);
                    changePassForm.reset();
                } else {
                    showToast(data.message || "Password change failed. Check current password.", "error", 4000);
                }
            } catch (err) {
                showToast("Network error. Please try again.", "error", 3000);
            }
        });
    }
}

// ========================================================
// SKILL GAP: Fixed case-insensitive comparison
// ========================================================
function renderSkillGapAnalyser() {
    const select = document.getElementById("global-target-role");
    if (!select) return;
    const roleKey = select.value;
    const role = (typeof JOB_ROLES !== "undefined") ? JOB_ROLES[roleKey] : null;
    if (!role) return;

    const studentSkills = STATE.resumeParsedData ? STATE.resumeParsedData.detectedSkills : ["Python", "SQL", "Git"];
    // Case-insensitive comparison
    const mastered = role.skills.filter(s =>
        studentSkills.some(st => st.toLowerCase().trim() === s.toLowerCase().trim())
    );
    const missing = role.skills.filter(s =>
        !studentSkills.some(st => st.toLowerCase().trim() === s.toLowerCase().trim())
    );

    const percentMatch = role.skills.length > 0 ? Math.round((mastered.length / role.skills.length) * 100) : 0;

    const badge = document.getElementById("skill-gap-percentage-badge");
    const perc = document.getElementById("gap-gauge-percentage");
    const fill = document.getElementById("gap-gauge-fill");

    if (badge) badge.textContent = percentMatch + "% Strength";
    if (perc) perc.textContent = percentMatch + "%";
    if (fill) fill.style.background = `conic-gradient(var(--secondary) ${percentMatch}%, rgba(255,255,255,0.06) ${percentMatch}% 100%)`;

    const mList = document.getElementById("skills-mastered-list");
    const gList = document.getElementById("skills-gaps-list");

    if (mList) {
        mList.innerHTML = mastered.length > 0
            ? mastered.map(skill => `<li><i class="fa-solid fa-check text-teal"></i> <span>${skill}</span></li>`).join("")
            : `<li class="text-muted">Upload your resume to detect matched skills.</li>`;
    }

    if (gList) {
        gList.innerHTML = missing.length > 0
            ? missing.map(skill => `<li><i class="fa-solid fa-xmark text-danger"></i> <span>${skill}</span></li>`).join("")
            : `<li class="text-teal"><i class="fa-solid fa-trophy"></i> <span>All required skills matched!</span></li>`;
    }
}

// ========================================================
// ROADMAP: Auto-generate state for default role on login
// ========================================================
function executeSuccessfulLogin(userData) {
    STATE.currentUser = userData;
    STATE.targetRoleKey = (document.getElementById("global-target-role") || {}).value || "softwareengineer";

    // Populate sidebar user info
    const sidebarName = document.getElementById("sidebar-user-name");
    if (sidebarName) sidebarName.textContent = userData.name || userData.fullName || "Candidate";

    const sidebarAvatar = document.querySelector("#sidebar-user-profile-card .user-avatar");
    if (sidebarAvatar && (userData.profilePicture || userData.picture)) {
        sidebarAvatar.innerHTML = `<img src="${userData.profilePicture || userData.picture}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }

    // Populate profile form
    const pName = document.getElementById("prof-name");
    const pEmail = document.getElementById("prof-email");
    const pCollege = document.getElementById("prof-college");
    const pBranch = document.getElementById("prof-branch");
    const pGrad = document.getElementById("prof-gradyear");

    if (pName) pName.value = userData.name || userData.fullName || "";
    if (pEmail) pEmail.value = userData.email || "";
    if (pCollege) pCollege.value = userData.college || "";
    if (pBranch) pBranch.value = userData.branch || "";
    if (pGrad) pGrad.value = userData.graduation_year || 2026;

    // Initialize roadmap states for ALL roles
    if (typeof WEEKLY_ROADMAPS !== "undefined") {
        Object.keys(WEEKLY_ROADMAPS).forEach(role => {
            if (!STATE.roadmapStates[role] || STATE.roadmapStates[role].length === 0) {
                STATE.roadmapStates[role] = WEEKLY_ROADMAPS[role].map(node => ({
                    week: node.week,
                    status: "Pending"
                }));
            }
        });
    }

    setApplicationState(true);
    try { syncDesiredRoleMetrics(); } catch (e) {}
    try { refreshDashboard(); } catch (e) {}
}

// ========================================================
// GLOBAL WINDOW EXPORTS
// ========================================================
window.initProfileFormListeners = initProfileFormListeners;
window.renderSkillGapAnalyser = renderSkillGapAnalyser;
window.executeSuccessfulLogin = executeSuccessfulLogin;
window.switchTab = switchTab;
window.refreshDashboard = refreshDashboard;
window.syncDesiredRoleMetrics = syncDesiredRoleMetrics;
window.populateGlobalRoleDropdowns = populateGlobalRoleDropdowns;
window.getAllJobsCached = getAllJobsCached;
