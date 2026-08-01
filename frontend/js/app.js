// AI Career Coach - js/app.js
// This file ONLY re-exports STATE for modules loaded before app.js.
// The main STATE and all functions live in frontend/app.js (the root-level file).

// Minimal global STATE that will be REPLACED by the root app.js STATE declaration.
// This prevents "STATE is not defined" errors in early-loading modules (auth.js, navigation.js).
if (typeof window.STATE === "undefined") {
    window.STATE = {
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
            ttsEnabled: true
        },
        notifications: [],
        activeFlashcardIndex: 0,
        placementStatusFilter: "all",
        placementSearchQuery: "",
        savedJobIds: [],
        jobApplications: [],
        jobActiveFilterTab: "all",
        jobWorkModeFilter: "all",
        jobTypeFilter: "all",
        jobExpFilter: "all",
        jobSearchQuery: "",
        targetRoleKey: "softwareengineer"
    };
}

// Utility: convert role title to key
if (typeof window.roleToKey === "undefined") {
    window.roleToKey = function(title) {
        return (title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    };
}

// Stub functions that will be overridden by app.js
function populateGlobalRoleDropdowns() {
    // Populated by app.js after data loads
}

function refreshModernIcons() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        try { lucide.createIcons(); } catch (e) {}
    }
}

function syncDesiredRoleMetrics() {
    // Overridden by app.js
}

function refreshDashboard() {
    // Overridden by app.js
}

window.populateGlobalRoleDropdowns = populateGlobalRoleDropdowns;
window.refreshModernIcons = refreshModernIcons;
window.syncDesiredRoleMetrics = syncDesiredRoleMetrics;
window.refreshDashboard = refreshDashboard;
