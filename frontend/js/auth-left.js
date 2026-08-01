// ============================================================
// AI Career Coach — Right Panel Career Journey Animation
// Cursor AI / Linear / Claude / Perplexity inspired
// Pure CSS + Vanilla JS — No Three.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    initCareerJourneyAnimation();
});

function initCareerJourneyAnimation() {
    const container = document.getElementById("auth-right-showcase");
    if (!container) return;

    // ── Scenes & State ──────────────────────────────────────
    const SCENES = ["resume", "skills", "interview", "offer"];
    const LABELS  = ["Resume", "AI Scan", "Skills", "Offer Letter"];
    const DURATIONS = [3800, 3200, 3200, 3800]; // ms each scene plays

    let currentScene = 0;
    let scanTimeout = null;

    const sceneEls = {
        resume:    document.getElementById("rp-scene-resume"),
        skills:    document.getElementById("rp-scene-skills"),
        interview: document.getElementById("rp-scene-interview"),
        offer:     document.getElementById("rp-scene-offer"),
    };
    const stepDots  = container.querySelectorAll(".rp-step-dot");
    const stepLabel = document.getElementById("rp-step-label");
    const scanLine  = document.getElementById("rp-scan-line");
    const confettiLayer = document.getElementById("rp-confetti-layer");

    // ── Scene Switcher ───────────────────────────────────────
    function showScene(idx) {
        // Hide all
        SCENES.forEach((name) => {
            const el = sceneEls[name];
            el.classList.add("rp-scene-hidden");
        });

        // Reset chip animations
        container.querySelectorAll(".rp-chip").forEach(c => c.classList.remove("rp-chip-visible"));
        container.querySelectorAll(".rp-neural-path").forEach(p => p.classList.remove("rp-path-anim"));

        // Update dots
        stepDots.forEach((dot, i) => {
            dot.classList.toggle("rp-dot-active", i === idx);
        });

        // Update label
        stepLabel.style.opacity = "0";
        setTimeout(() => {
            stepLabel.textContent = LABELS[idx];
            stepLabel.style.opacity = "1";
        }, 200);

        // Show new scene after a tiny stagger
        const newScene = SCENES[idx];
        const newEl = sceneEls[newScene];

        setTimeout(() => {
            newEl.classList.remove("rp-scene-hidden");

            // Scene-specific entry logic
            if (newScene === "resume") {
                // Trigger scan after resume is visible
                clearTimeout(scanTimeout);
                scanLine.classList.remove("rp-scanning");
                void scanLine.offsetWidth; // force reflow
                scanTimeout = setTimeout(() => {
                    scanLine.classList.add("rp-scanning");
                }, 600);
            }

            if (newScene === "skills") {
                // Stagger chip entry
                container.querySelectorAll(".rp-chip").forEach((chip) => {
                    const delay = parseInt(chip.dataset.delay || "0", 10);
                    setTimeout(() => chip.classList.add("rp-chip-visible"), delay + 200);
                });
                // Draw neural paths
                setTimeout(() => {
                    container.querySelectorAll(".rp-neural-path").forEach(p => p.classList.add("rp-path-anim"));
                }, 800);
            }

            if (newScene === "offer") {
                spawnConfetti();
            }
        }, 50);
    }

    // ── Confetti ─────────────────────────────────────────────
    function spawnConfetti() {
        if (!confettiLayer) return;
        confettiLayer.innerHTML = "";
        const colors = ["#8b5cf6", "#22d3ee", "#34d399", "#fbbf24", "#f472b6", "#60a5fa"];

        for (let i = 0; i < 28; i++) {
            const dot = document.createElement("div");
            dot.className = "rp-confetti-dot";
            dot.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 30}%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                animation-duration: ${1.8 + Math.random() * 1.5}s;
                animation-delay: ${Math.random() * 0.8}s;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
            `;
            confettiLayer.appendChild(dot);
        }
    }

    // ── Auto-advance loop ─────────────────────────────────────
    function advance() {
        currentScene = (currentScene + 1) % SCENES.length;
        showScene(currentScene);
        scheduleNext();
    }

    function scheduleNext() {
        setTimeout(advance, DURATIONS[currentScene]);
    }

    // Boot
    showScene(0);
    scheduleNext();

    // ── Particle Canvas ───────────────────────────────────────
    const particleCanvas = document.getElementById("rp-particles-canvas");
    if (particleCanvas) {
        const ctx = particleCanvas.getContext("2d");
        let pW, pH;
        const PARTICLE_COUNT = 55;
        const particles = [];

        function resizeCanvas() {
            pW = particleCanvas.width  = container.offsetWidth;
            pH = particleCanvas.height = container.offsetHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x     = Math.random() * pW;
                this.y     = Math.random() * pH;
                this.size  = 0.5 + Math.random() * 1.5;
                this.speedX = (Math.random() - 0.5) * 0.18;
                this.speedY = -0.1 - Math.random() * 0.2;
                this.opacity = 0.1 + Math.random() * 0.3;
                const r = Math.random();
                this.color = r < 0.45 ? "139,92,246" : r < 0.75 ? "34,211,238" : "99,102,241";
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < -4 || this.x < -4 || this.x > pW + 4) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
                ctx.fill();
            }
        }

        resizeCanvas();
        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, pW, pH);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener("resize", resizeCanvas);
    }

    // ── Mouse Glow ────────────────────────────────────────────
    const mouseGlow = document.getElementById("rp-mouse-glow");
    if (mouseGlow) {
        container.addEventListener("mouseenter", () => { mouseGlow.style.opacity = "1"; });
        container.addEventListener("mouseleave", () => { mouseGlow.style.opacity = "0"; });
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            mouseGlow.style.left = (e.clientX - rect.left) + "px";
            mouseGlow.style.top  = (e.clientY - rect.top)  + "px";
        });
    }
}
