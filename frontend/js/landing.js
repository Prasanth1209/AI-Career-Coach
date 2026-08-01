// ============================================================
// AI Career Coach — Landing Page Interactive Controller
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    initLandingNavbar();
    initMouseReactiveCards();
    initCounterObserver();
    initShowcaseTabs();
    initFAQAccordions();
    initAuthModalControls();
    initHeroFeatureAnimation();
});

// 1. Sticky Navbar & Mobile Drawer
function initLandingNavbar() {
    const navbar = document.getElementById("landing-navbar");
    const mobileToggle = document.getElementById("mobile-nav-toggle");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener("click", () => {
            navbar.classList.toggle("mobile-open");
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll(".nav-links a[href^='#'], .footer-links a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                if (navbar) navbar.classList.remove("mobile-open");
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

// 2. Mouse Reactive Card Spotlight Effect
function initMouseReactiveCards() {
    const cards = document.querySelectorAll(".bento-card, .why-card, .pricing-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

// 3. Scroll-Triggered Animated Counters
function initCounterObserver() {
    const statsSection = document.querySelector(".stats-section");
    if (!statsSection) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

function animateCounters() {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        const suffix = counter.getAttribute("data-suffix") || "";
        const duration = 2000; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            counter.textContent = currentVal.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(updateCount);
    });
}

// 4. Product Showcase Tab Switcher
function initShowcaseTabs() {
    const tabBtns = document.querySelectorAll(".showcase-tab-btn");
    const panels = document.querySelectorAll(".showcase-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabTarget = btn.getAttribute("data-showcase");

            tabBtns.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const targetPanel = document.getElementById(`showcase-${tabTarget}`);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });
}

// 5. Testimonials Carousel
let currentTestimonialIndex = 0;
let testimonialTimer = null;

function initTestimonialsCarousel() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.getElementById("carousel-dots");
    const prevBtn = document.getElementById("prev-testimonial-btn");
    const nextBtn = document.getElementById("next-testimonial-btn");

    if (!slides.length) return;

    // Generate dots
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = `dot ${i === 0 ? "active" : ""}`;
            dot.addEventListener("click", () => showTestimonial(i));
            dotsContainer.appendChild(dot);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            const newIndex = (currentTestimonialIndex - 1 + slides.length) % slides.length;
            showTestimonial(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const newIndex = (currentTestimonialIndex + 1) % slides.length;
            showTestimonial(newIndex);
        });
    }

    startTestimonialAutoSlide();
}

function showTestimonial(index) {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll("#carousel-dots .dot");

    slides.forEach((s, i) => {
        if (i === index) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });

    dots.forEach((d, i) => {
        if (i === index) {
            d.classList.add("active");
        } else {
            d.classList.remove("active");
        }
    });

    currentTestimonialIndex = index;
    resetTestimonialAutoSlide();
}

function startTestimonialAutoSlide() {
    testimonialTimer = setInterval(() => {
        const slides = document.querySelectorAll(".testimonial-slide");
        if (!slides.length) return;
        const nextIndex = (currentTestimonialIndex + 1) % slides.length;
        showTestimonial(nextIndex);
    }, 6000);
}

function resetTestimonialAutoSlide() {
    if (testimonialTimer) clearInterval(testimonialTimer);
    startTestimonialAutoSlide();
}

// 6. FAQ Accordion Toggle
function initFAQAccordions() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                faqItems.forEach(i => i.classList.remove("active"));
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        }
    });
}

// 7. Pricing Toggle
function initPricingToggle() {
    const switchEl = document.getElementById("pricing-switch");
    if (!switchEl) return;

    switchEl.addEventListener("click", () => {
        switchEl.classList.toggle("active");
        const isAnnual = switchEl.classList.contains("active");

        const proPrice = document.getElementById("price-pro");
        const proBilling = document.getElementById("billing-pro");

        if (proPrice && proBilling) {
            if (isAnnual) {
                proPrice.textContent = "$19";
                proBilling.textContent = "/ month (billed annually)";
            } else {
                proPrice.textContent = "$29";
                proBilling.textContent = "/ month";
            }
        }
    });
}

// 8. Auth Modal & Demo Modal Handlers
function initAuthModalControls() {
    // Buttons that open registration view
    document.querySelectorAll(".btn-open-register").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openAuthModal("register");
        });
    });

    // Buttons that open login view
    document.querySelectorAll(".btn-open-login").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openAuthModal("login");
        });
    });

    // Watch Demo button
    document.querySelectorAll(".btn-open-demo").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openDemoModal();
        });
    });

    // Close Demo Modal
    const closeDemoBtn = document.getElementById("btn-close-demo-modal");
    const demoModal = document.getElementById("demo-modal");
    if (closeDemoBtn && demoModal) {
        closeDemoBtn.addEventListener("click", closeDemoModal);
        demoModal.addEventListener("click", (e) => {
            if (e.target === demoModal) closeDemoModal();
        });
    }
}

function openAuthModal(view = "login") {
    if (typeof window.showAuthView === "function") {
        window.showAuthView(view);
    }
    const authOverlay = document.getElementById("auth-overlay");
    if (authOverlay) {
        authOverlay.classList.remove("hidden");
        authOverlay.style.display = "flex";
        authOverlay.style.opacity = "1";
        authOverlay.style.pointerEvents = "auto";
        authOverlay.style.visibility = "visible";
    }
}

function closeAuthModal() {
    const authOverlay = document.getElementById("auth-overlay");
    if (authOverlay) {
        authOverlay.classList.add("hidden");
        authOverlay.style.display = "none";
        authOverlay.style.opacity = "0";
        authOverlay.style.pointerEvents = "none";
        authOverlay.style.visibility = "hidden";
    }
}

function openDemoModal() {
    const demoModal = document.getElementById("demo-modal");
    if (demoModal) {
        demoModal.classList.add("active");
    }
}

function closeDemoModal() {
    const demoModal = document.getElementById("demo-modal");
    if (demoModal) {
        demoModal.classList.remove("active");
    }
}

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;

// ============================================================
// HERO ANIMATED FEATURE SHOWCASE
// Linear / Stripe / Cursor inspired — Pure Vanilla JS
// ============================================================

function initHeroFeatureAnimation() {
    const wrapper = document.getElementById("hero-visual-anim");
    const grid    = document.getElementById("hero-feat-grid");
    const canvas  = document.getElementById("hero-canvas");
    const mouseGl = document.getElementById("hero-mouse-glow");

    if (!wrapper || !grid || !canvas) return;

    const cards = Array.from(grid.querySelectorAll(".hfc"));

    // ── Inject per-card float CSS vars ──────────────────────
    cards.forEach(card => {
        const dur   = card.dataset.floatDur   || "4.5";
        const delay = card.dataset.floatDelay || "0";
        card.style.setProperty("--float-dur",   `${dur}s`);
        card.style.setProperty("--float-delay", `${delay}s`);
    });

    // ── Active card cycling (journey sequence) ───────────────
    let activeIdx = 0;

    function setActive(idx) {
        cards.forEach((c, i) => c.classList.toggle("hfc-active", i === idx));
    }

    setActive(0);

    setInterval(() => {
        activeIdx = (activeIdx + 1) % cards.length;
        setActive(activeIdx);
    }, 3000);

    // ── Mouse glow ───────────────────────────────────────────
    if (mouseGl) {
        wrapper.addEventListener("mouseenter", () => { mouseGl.style.opacity = "1"; });
        wrapper.addEventListener("mouseleave", () => { mouseGl.style.opacity = "0"; });
        wrapper.addEventListener("mousemove", (e) => {
            const rect = wrapper.getBoundingClientRect();
            mouseGl.style.left = (e.clientX - rect.left) + "px";
            mouseGl.style.top  = (e.clientY - rect.top)  + "px";
        });
    }

    // ── Particle + Connection Canvas ─────────────────────────
    const ctx = canvas.getContext("2d");
    let W, H;

    function resizeCanvas() {
        W = canvas.width  = wrapper.offsetWidth;
        H = canvas.height = wrapper.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Tiny floating particles
    const PARTICLE_COUNT = 38;
    const particles = [];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.r  = 0.6 + Math.random() * 1.2;
            this.vx = (Math.random() - 0.5) * 0.22;
            this.vy = -0.08 - Math.random() * 0.18;
            this.a  = 0.08 + Math.random() * 0.28;
            const t = Math.random();
            this.color = t < 0.45 ? "139,92,246" : t < 0.72 ? "34,211,238" : "248,113,113";
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -4 || this.x < -4 || this.x > W + 4) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.a})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Connection line state
    const CONNECTIONS = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
        [0, 3], [1, 4], [2, 5]
    ];
    let connAlpha  = 0;
    let connTarget = 0;
    let connTimer  = 0;
    const CONN_CYCLE = 110; // frames

    function getCardCenter(card) {
        const wr = wrapper.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        return {
            x: cr.left - wr.left + cr.width  / 2,
            y: cr.top  - wr.top  + cr.height / 2
        };
    }

    function drawConnections() {
        connTimer++;
        // Fade in/out connection lines every CONN_CYCLE frames
        const phase = connTimer % CONN_CYCLE;
        if (phase < 30)       connAlpha = phase / 30;
        else if (phase < 70)  connAlpha = 1;
        else                  connAlpha = Math.max(0, 1 - (phase - 70) / 40);

        if (connTimer % CONN_CYCLE === 0) {
            connTarget = Math.floor(Math.random() * CONNECTIONS.length);
        }

        const [ai, bi] = CONNECTIONS[connTarget];
        if (!cards[ai] || !cards[bi]) return;
        const a = getCardCenter(cards[ai]);
        const b = getCardCenter(cards[bi]);

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(139,92,246,${connAlpha * 0.45})`);
        grad.addColorStop(1, `rgba(34,211,238,${connAlpha * 0.35})`);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Tiny travelling dot along the connection
        const t = (connTimer % 60) / 60;
        const tx = a.x + (b.x - a.x) * t;
        const ty = a.y + (b.y - a.y) * t;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${connAlpha * 0.85})`;
        ctx.fill();
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(loop);
    }
    loop();
}
