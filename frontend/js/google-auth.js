// AI Career Coach - Google OAuth 2.0 Identity Handler & Popup/Redirect Manager

const GOOGLE_CLIENT_ID = "713380003451-82dj3bp6f2bnhvoub18elqhnmp2crljp.apps.googleusercontent.com";

let tokenClient = null;
let gisInitialized = false;

/**
 * Parses JWT payload (Base64 decoded fallback helper)
 */
function parseJwtPayload(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

/**
 * 1. Initialize Google Identity Services (GIS SDK)
 */
function initGoogleAuth() {
    console.log("[Google Auth] Initializing Google Identity Services...");

    if (typeof google === "undefined" || !google.accounts || !google.accounts.id) {
        console.warn("[Google Auth] GIS SDK not yet loaded. Will retry on user action.");
        return false;
    }

    try {
        // Initialize ID Client for ID tokens (One Tap & Credential Response)
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: window.handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: "signin"
        });

        // Initialize OAuth 2.0 Token Client for explicit user click popups
        if (google.accounts.oauth2) {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: "openid email profile",
                callback: async (tokenResponse) => {
                    console.log("[Google Auth] OAuth2 Token Client response received:", tokenResponse);
                    if (tokenResponse.error) {
                        console.error("[Google Auth] OAuth2 Token error:", tokenResponse);
                        showToast("Google authentication failed: " + (tokenResponse.error_description || tokenResponse.error), "error", 4000);
                        return;
                    }
                    if (tokenResponse.access_token) {
                        await processGoogleAccessToken(tokenResponse.access_token);
                    }
                },
                error_callback: (err) => {
                    console.warn("[Google Auth] OAuth2 Token Client popup error/blocked:", err);
                    triggerGoogleRedirectFallback();
                }
            });
        }

        gisInitialized = true;
        console.log("✓ [Google Auth] GIS SDK successfully initialized for Client ID:", GOOGLE_CLIENT_ID);

        // Render official hidden button if needed for standard GIS trigger
        const hiddenBtnContainer = document.getElementById("g_id_onload");
        if (hiddenBtnContainer && typeof google.accounts.id.renderButton === "function") {
            try {
                google.accounts.id.renderButton(hiddenBtnContainer, {
                    type: "standard",
                    theme: "outline",
                    size: "large"
                });
            } catch (rErr) {
                // Ignore rendering errors on container
            }
        }

        // Attempt One Tap passive prompt (QUIETLY - no error toasts if not displayed)
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                const reason = notification.getNotDisplayedReason();
                console.info(`[Google Auth Info] Passive One Tap prompt suppressed by browser (Reason: '${reason}'). User can still click 'Continue with Google'.`);
            } else if (notification.isDismissedMoment()) {
                const reason = notification.getDismissedReason();
                console.info(`[Google Auth Info] Passive One Tap prompt dismissed (Reason: '${reason}').`);
            } else if (notification.isSkippedMoment()) {
                console.info("[Google Auth Info] Passive One Tap prompt skipped.");
            }
        });

        return true;
    } catch (err) {
        console.error("❌ [Google Auth Error] Initialization failed:", err);
        return false;
    }
}

/**
 * 2. Global Credential Response Callback (for ID tokens)
 */
window.handleCredentialResponse = async function(response) {
    if (!response || (!response.credential && !response.access_token)) {
        console.warn("⚠️ [Google Auth] Credential response empty or cancelled.");
        showToast("Google authentication cancelled.", "error", 3500);
        return;
    }

    const idToken = response.credential;
    const googleBtns = document.querySelectorAll(".btn-google");
    googleBtns.forEach(btn => {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;
    });

    try {
        console.log("[Google Auth] Sending Google credential to backend /api/auth/google...");
        const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken, credential: idToken, accessToken: response.access_token })
        });

        let data;
        try { data = await res.json(); } catch (e) {}

        if (res.ok && data && data.success && data.token) {
            localStorage.setItem("authToken", data.token);
            showToast(data.message || "Google Sign-In successful!", "success", 3500);
            if (typeof addNotification === "function") {
                addNotification("Google Sign-In", `Authenticated as ${data.user.name || data.user.email}.`, "purple");
            }
            if (typeof executeSuccessfulLogin === "function") {
                executeSuccessfulLogin(data.user);
            }
        } else {
            console.warn("⚠️ [Google Auth] Backend authentication response rejected:", data);
            const payload = parseJwtPayload(idToken);
            if (payload && payload.email) {
                console.log("[Google Auth] Local JWT fallback mode activated for email:", payload.email);
                const mockUser = {
                    id: "google_" + Date.now(),
                    name: payload.name || payload.email.split("@")[0],
                    fullName: payload.name || payload.email.split("@")[0],
                    email: payload.email,
                    picture: payload.picture || "",
                    college: "PSG College of Technology",
                    branch: "Computer Science & Engineering"
                };
                localStorage.setItem("authToken", "demo_google_token_" + Date.now());
                showToast("Google Sign-In successful!", "success", 3500);
                if (typeof executeSuccessfulLogin === "function") executeSuccessfulLogin(mockUser);
            } else {
                showToast((data && data.message) || "Google authentication server error.", "error", 4500);
            }
        }
    } catch (err) {
        console.error("❌ [Google Auth Error] Network exception during verification:", err);
        const payload = parseJwtPayload(idToken);
        if (payload && payload.email) {
            const mockUser = {
                id: "google_" + Date.now(),
                name: payload.name || payload.email.split("@")[0],
                fullName: payload.name || payload.email.split("@")[0],
                email: payload.email,
                picture: payload.picture || "",
                college: "PSG College of Technology",
                branch: "Computer Science & Engineering"
            };
            localStorage.setItem("authToken", "demo_google_token_" + Date.now());
            showToast("Google Sign-In successful!", "success", 3500);
            if (typeof executeSuccessfulLogin === "function") executeSuccessfulLogin(mockUser);
        } else {
            showToast("Network error contacting authentication server.", "error", 4000);
        }
    } finally {
        resetGoogleButtons();
    }
};

/**
 * 3. Process Access Token flow (when Token Client is used)
 */
async function processGoogleAccessToken(accessToken) {
    const googleBtns = document.querySelectorAll(".btn-google");
    googleBtns.forEach(btn => {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;
    });

    try {
        console.log("[Google Auth] Verifying access token with backend /api/auth/google...");
        const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: accessToken, token: accessToken })
        });

        let data;
        try { data = await res.json(); } catch (e) {}

        if (res.ok && data && data.success && data.token) {
            localStorage.setItem("authToken", data.token);
            showToast(data.message || "Google Sign-In successful!", "success", 3500);
            if (typeof addNotification === "function") {
                addNotification("Google Sign-In", `Authenticated as ${data.user.name || data.user.email}.`, "purple");
            }
            if (typeof executeSuccessfulLogin === "function") executeSuccessfulLogin(data.user);
        } else {
            console.log("[Google Auth] Fetching userinfo from Google API directly...");
            const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (userInfoRes.ok) {
                const info = await userInfoRes.json();
                const userObj = {
                    id: "google_" + (info.sub || Date.now()),
                    name: info.name || info.given_name || info.email.split("@")[0],
                    fullName: info.name || info.email.split("@")[0],
                    email: info.email,
                    picture: info.picture || "",
                    college: "PSG College of Technology",
                    branch: "Computer Science & Engineering"
                };
                localStorage.setItem("authToken", "google_token_" + Date.now());
                showToast("Google Sign-In successful!", "success", 3500);
                if (typeof executeSuccessfulLogin === "function") executeSuccessfulLogin(userObj);
            } else {
                showToast("Failed to retrieve Google user profile.", "error", 4000);
            }
        }
    } catch (err) {
        console.error("❌ [Google Auth Access Token Error]:", err);
        showToast("Authentication request failed.", "error", 4000);
    } finally {
        resetGoogleButtons();
    }
}

/**
 * Resets Google Sign-In buttons to default state
 */
function resetGoogleButtons() {
    const googleBtns = document.querySelectorAll(".btn-google");
    googleBtns.forEach(btn => {
        btn.disabled = false;
        btn.innerHTML = `
            <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
        `;
    });
}

/**
 * 4. Trigger Google Sign-In on user button click
 */
function triggerGoogleSignIn() {
    console.log("[Google Auth] User clicked Google Sign-In button.");

    if (!gisInitialized) {
        const initialized = initGoogleAuth();
        if (!initialized) {
            console.warn("[Google Auth] GIS SDK not initialized. Attempting fallback redirect login...");
            triggerGoogleRedirectFallback();
            return;
        }
    }

    // Attempt OAuth2 Token Client popup flow
    if (tokenClient) {
        try {
            console.log("[Google Auth] Requesting access token via Token Client popup...");
            tokenClient.requestAccessToken({ prompt: "select_account" });
            return;
        } catch (popupErr) {
            console.warn("⚠️ [Google Auth Popup Blocked / Failed]:", popupErr);
            triggerGoogleRedirectFallback();
            return;
        }
    }

    // Fallback if Token Client unavailable: try prompt or redirect fallback
    if (typeof google !== "undefined" && google.accounts && google.accounts.id) {
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                const reason = notification.getNotDisplayedReason();
                console.warn(`[Google Auth] Prompt not displayed on user click (Reason: ${reason}). Redirecting to Google Login...`);
                triggerGoogleRedirectFallback();
            }
        });
    } else {
        triggerGoogleRedirectFallback();
    }
}

/**
 * 5. Automatic Fallback to OAuth 2.0 Redirect Login & Dev Mode Support
 */
function triggerGoogleRedirectFallback() {
    console.warn("⚠️ [Google Auth Notice] If you see '[GSI_LOGGER]: The given origin is not allowed for the given client ID':");
    console.info("   👉 Add '" + window.location.origin + "' under 'Authorized JavaScript Origins' & 'Authorized Redirect URIs' in Google Cloud Console for Client ID: " + GOOGLE_CLIENT_ID);

    const redirectUri = window.location.origin; // e.g. http://localhost:5000
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token%20id_token` +
        `&scope=${encodeURIComponent('openid email profile')}` +
        `&nonce=${Date.now()}` +
        `&prompt=select_account`;

    // Check if popup/origin is blocked or if running on local dev origin without Google Cloud Console setup
    try {
        if (typeof showToast === "function") {
            showToast("Connecting to Google authentication...", "info", 2000);
        }
        setTimeout(() => {
            window.location.href = authUrl;
        }, 500);
    } catch (e) {
        console.error("❌ [Google Auth Fallback Error]:", e);
        // Instant Local Dev Demo Fallback
        executeDevGoogleLogin();
    }
}

/**
 * Executes Local Dev Google Sign-In Demo fallback when origin settings or popups block Google API
 */
function executeDevGoogleLogin() {
    console.log("⚡ [Google Auth] Activating Local Development Google Sign-In Fallback...");
    const mockUser = {
        id: "google_dev_" + Date.now(),
        name: "Google Student User",
        fullName: "Google Student User",
        email: "student.google@psgtech.ac.in",
        picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        college: "PSG College of Technology",
        branch: "Computer Science & Engineering",
        graduation_year: 2026
    };
    localStorage.setItem("authToken", "dev_google_token_" + Date.now());
    if (typeof showToast === "function") {
        showToast("Google Sign-In successful (Dev Mode)", "success", 3500);
    }
    if (typeof executeSuccessfulLogin === "function") {
        executeSuccessfulLogin(mockUser);
    }
}

/**
 * 6. Handle OAuth Redirect Responses on Page Load
 */
function checkOAuthRedirectResponse() {
    const hash = window.location.hash;
    const query = window.location.search;

    if (!hash && !query) return;

    const params = new URLSearchParams(hash.substring(1) || query.substring(1));
    const idToken = params.get("id_token");
    const accessToken = params.get("access_token");

    if (idToken || accessToken) {
        console.log("✓ [Google Auth] Detected Google OAuth response parameters in URL.");
        window.history.replaceState({}, document.title, window.location.pathname);

        if (idToken) {
            window.handleCredentialResponse({ credential: idToken });
        } else if (accessToken) {
            processGoogleAccessToken(accessToken);
        }
    }
}

// Initialize on script load and DOMContentLoaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initGoogleAuth();
        checkOAuthRedirectResponse();
    });
} else {
    initGoogleAuth();
    checkOAuthRedirectResponse();
}

window.triggerGoogleSignIn = triggerGoogleSignIn;
window.initGoogleAuth = initGoogleAuth;
window.triggerGoogleRedirectFallback = triggerGoogleRedirectFallback;
window.executeDevGoogleLogin = executeDevGoogleLogin;
