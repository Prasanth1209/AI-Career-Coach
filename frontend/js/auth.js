// AI Career Coach - js/auth.js
// Auth functions are defined in the root app.js.
// This file provides safe stubs so early script execution doesn't fail.

// All actual auth logic lives in frontend/app.js.
// This stub ensures auth functions are available as window globals
// before app.js fully initializes.

if (typeof window.setApplicationState === "undefined") {
    window.setApplicationState = function(isAuthenticated) {
        const authOverlay = document.getElementById("auth-overlay");
        const appShell = document.getElementById("main-application-shell");
        const landingContainer = document.getElementById("landing-page-container");

        if (isAuthenticated) {
            if (landingContainer) { landingContainer.style.display = "none"; }
            if (authOverlay) { authOverlay.classList.add("hidden"); authOverlay.style.display = "none"; }
            if (appShell)    { appShell.classList.remove("hidden"); appShell.style.display = "flex"; }
        } else {
            if (appShell)    { appShell.classList.add("hidden"); appShell.style.display = "none"; }
            if (landingContainer) { landingContainer.style.display = "block"; }
            // Auth overlay remains modal (hidden by default unless triggered)
            if (authOverlay && authOverlay.classList.contains("force-open")) {
                authOverlay.classList.remove("hidden");
                authOverlay.style.display = "flex";
            } else if (authOverlay) {
                authOverlay.classList.add("hidden");
                authOverlay.style.display = "none";
            }
        }
    };
}

if (typeof window.showAuthView === "undefined") {
    window.showAuthView = function(viewName) {
        const views = ["register","login","forgot","reset"];
        views.forEach(v => {
            const el = document.getElementById(`auth-${v}-view`) ||
                       document.getElementById(`auth-${v === "forgot" ? "forgot-password" : v === "reset" ? "reset-password" : v}-view`);
            if (el) { el.classList.add("hidden"); el.style.display = "none"; }
        });
        const map = {
            register: "auth-register-view",
            login: "auth-login-view",
            forgot: "auth-forgot-password-view",
            reset: "auth-reset-password-view"
        };
        const target = document.getElementById(map[viewName] || map.login);
        if (target) { target.classList.remove("hidden"); target.style.display = "block"; }
    };
}

// Stub guard for initAuthListeners
if (typeof window.initAuthListeners === "undefined") {
    window.initAuthListeners = function() {};
}

if (typeof window.checkExistingAuthSession === "undefined") {
    window.checkExistingAuthSession = function() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.setApplicationState(false);
            window.showAuthView("register");
        }
    };
}

if (typeof window.logout === "undefined") {
    window.logout = function() {
        localStorage.removeItem("authToken");
        if (window.STATE) window.STATE.currentUser = null;
        window.setApplicationState(false);
        window.showAuthView("login");
    };
}
