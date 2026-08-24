/* =========================================================
   ABDIRAHMAN MOHAMED SALAT
   PORTFOLIO JAVASCRIPT
   Version 4.0
   Python Developer • AI Automation • Data • Web

   Designed for:
   - Flask / Jinja
   - Responsive navigation
   - Scroll animations
   - Contact form
   - Accessibility
   - Mobile navigation
   - Hero effects
   - Back to top
   - Reduced motion
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CORE ELEMENTS
    ===================================================== */

    const body = document.body;

    const html = document.documentElement;

    const header = document.getElementById("header");

    const navMenu = document.getElementById("navMenu");

    const menuToggle = document.getElementById("menuToggle");

    const backToTop = document.getElementById("backToTop");

    const pageLoader = document.getElementById("pageLoader");

    const contactForm = document.getElementById("contactForm");

    const submitButton =
        document.getElementById("submitButton");

    const contactStatus =
        document.getElementById("contactStatus");

    const messageInput =
        document.getElementById("message");

    const characterCounter =
        document.getElementById("characterCounter");

    const characterCount =
        document.getElementById("characterCount");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("main section[id]");


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateReducedMotion() {

        if (reducedMotionQuery.matches) {

            html.classList.add("reduce-motion");

        } else {

            html.classList.remove("reduce-motion");

        }

    }


    updateReducedMotion();


    if (reducedMotionQuery.addEventListener) {

        reducedMotionQuery.addEventListener(
            "change",
            updateReducedMotion
        );

    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    function hidePageLoader() {

        if (!pageLoader) {
            return;
        }

        /*
         * Support multiple possible CSS states.
         * This prevents CSS/JS class mismatches.
         */

        pageLoader.classList.add("loaded");
        pageLoader.classList.add("is-hidden");
        pageLoader.classList.add("hidden");

        pageLoader.setAttribute(
            "aria-hidden",
            "true"
        );

        window.setTimeout(() => {

            pageLoader.style.display = "none";

        }, 750);

    }


    /*
     * Normal page load.
     */

    window.addEventListener(
        "load",
        hidePageLoader,
        { once: true }
    );


    /*
     * Safety fallback.
     *
     * Even if an image, font or external resource
     * takes too long, the portfolio will still appear.
     */

    window.setTimeout(
        hidePageLoader,
        2500
    );


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function openMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.add("active");

        menuToggle.classList.add("active");

        body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    function closeMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    function toggleMenu() {

        if (!navMenu) {
            return;
        }

        if (
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU ON NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =====================================================
       CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navMenu ||
                !menuToggle
            ) {
                return;
            }

            if (
                !navMenu.classList.contains("active")
            ) {
                return;
            }

            const insideMenu =
                navMenu.contains(event.target);

            const insideToggle =
                menuToggle.contains(event.target);

            if (
                !insideMenu &&
                !insideToggle
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation(sectionId) {

        if (!sectionId) {
            return;
        }

        navLinks.forEach((link) => {

            const target =
                link.getAttribute(
                    "data-section"
                );

            if (target === sectionId) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION OBSERVER
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        sections.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            setActiveNavigation(
                                entry.target.id
                            );

                        }

                    });

                },
                {
                    root: null,
                    rootMargin:
                        "-25% 0px -60% 0px",
                    threshold: 0
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#" ||
                    href.length < 2
                ) {

                    return;

                }


                let target = null;


                try {

                    target =
                        document.querySelector(
                            href
                        );

                } catch (error) {

                    return;

                }


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                if (
                    reducedMotionQuery.matches
                ) {

                    window.scrollTo(
                        0,
                        Math.max(
                            targetPosition,
                            0
                        )
                    );

                } else {

                    window.scrollTo({

                        top: Math.max(
                            targetPosition,
                            0
                        ),

                        behavior: "smooth"

                    });

                }


                closeMenu();

            }
        );

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                if (
                    reducedMotionQuery.matches
                ) {

                    window.scrollTo(
                        0,
                        0
                    );

                } else {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
       
       IMPORTANT:
       The CSS should use:
       
       .reveal
       .reveal.revealed
       
       We also add .visible for compatibility.
       
       Most importantly, elements are NOT left hidden
       if IntersectionObserver is unavailable.
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-heading,
            .about-text,
            .about-stats,
            .service-card,
            .skill-category,
            .timeline-item,
            .project-card,
            .education-card,
            .training-list span,
            .language-card,
            .contact-content,
            .contact-form-wrapper,
            .footer-column,
            .footer-brand
            `
        );


    /*
     * Reduced motion:
     * show everything immediately.
     */

    if (
        reducedMotionQuery.matches
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                element.classList.add(
                    "revealed"
                );

                element.classList.add(
                    "visible"
                );

                element.style.opacity = "1";

                element.style.transform =
                    "none";

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            "IntersectionObserver" in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "revealed"
                                    );

                                    /*
                                     * Compatibility
                                     * with older CSS.
                                     */

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.08,
                        rootMargin:
                            "0px 0px -40px 0px"
                    }
                );


            revealElements.forEach(
                (element) => {

                    revealObserver.observe(
                        element
                    );

                }
            );


            /*
             * Safety fallback.
             *
             * If an element somehow remains hidden
             * after 1.5 seconds, show it.
             */

            window.setTimeout(
                () => {

                    revealElements.forEach(
                        (element) => {

                            element.classList.add(
                                "revealed"
                            );

                            element.classList.add(
                                "visible"
                            );

                        }
                    );

                },
                1500
            );

        } else {

            /*
             * Browser does not support
             * IntersectionObserver.
             */

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "revealed"
                    );

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }

    }


    /* =====================================================
       STAGGERED CARD ANIMATION
    ===================================================== */

    const cardGroups = [
        ".services-grid .service-card",
        ".skills-container .skill-category",
        ".projects-grid .project-card",
        ".education-grid .education-card",
        ".language-grid .language-card",
        ".training-list span"
    ];


    cardGroups.forEach(
        (selector) => {

            const cards =
                document.querySelectorAll(
                    selector
                );


            cards.forEach(
                (card, index) => {

                    const delay =
                        Math.min(
                            index * 70,
                            420
                        );


                    card.style.setProperty(
                        "--reveal-delay",
                        `${delay}ms`
                    );

                }
            );

        }
    );


    /* =====================================================
       MESSAGE CHARACTER COUNTER
    ===================================================== */

    function updateCharacterCounter() {

        if (
            !messageInput ||
            !characterCount
        ) {

            return;

        }


        const length =
            messageInput.value.length;


        characterCount.textContent =
            length.toString();


        if (characterCounter) {

            characterCounter.classList.remove(
                "warning",
                "danger"
            );


            if (length >= 4500) {

                characterCounter.classList.add(
                    "danger"
                );

            } else if (length >= 4000) {

                characterCounter.classList.add(
                    "warning"
                );

            }

        }

    }


    if (messageInput) {

        messageInput.addEventListener(
            "input",
            updateCharacterCounter
        );

        updateCharacterCounter();

    }


    /* =====================================================
       CONTACT FORM STATUS
    ===================================================== */

    function showStatus(
        message,
        type = "info"
    ) {

        if (!contactStatus) {
            return;
        }


        contactStatus.hidden = false;


        contactStatus.textContent =
            message;


        contactStatus.classList.remove(
            "success",
            "error",
            "info"
        );


        contactStatus.classList.add(
            type
        );

    }


    function clearStatus() {

        if (!contactStatus) {
            return;
        }


        contactStatus.hidden = true;


        contactStatus.textContent =
            "";


        contactStatus.classList.remove(
            "success",
            "error",
            "info"
        );

    }


    /* =====================================================
       FORM FIELD ERRORS
    ===================================================== */

    function clearFieldError(field) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "input-error"
        );


        field.removeAttribute(
            "aria-invalid"
        );

    }


    function setFieldError(field) {

        if (!field) {
            return;
        }


        field.classList.add(
            "input-error"
        );


        field.setAttribute(
            "aria-invalid",
            "true"
        );

    }


    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    function validateField(field) {

        if (!field) {
            return true;
        }


        clearFieldError(field);


        const value =
            field.value.trim();


        if (
            field.required &&
            !value
        ) {

            setFieldError(field);

            return false;

        }


        if (
            field.minLength > 0 &&
            value.length < field.minLength
        ) {

            setFieldError(field);

            return false;

        }


        if (
            field.maxLength > 0 &&
            value.length > field.maxLength
        ) {

            setFieldError(field);

            return false;

        }


        if (
            field.type === "email" &&
            value
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(value)
            ) {

                setFieldError(field);

                return false;

            }

        }


        return true;

    }


    /* =====================================================
       FORM LIVE VALIDATION
    ===================================================== */

    if (contactForm) {

        const formFields =
            contactForm.querySelectorAll(
                "input, textarea"
            );


        formFields.forEach(
            (field) => {

                field.addEventListener(
                    "blur",
                    () => {

                        validateField(
                            field
                        );

                    }
                );


                field.addEventListener(
                    "input",
                    () => {

                        if (
                            field.classList.contains(
                                "input-error"
                            )
                        ) {

                            validateField(
                                field
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       CONTACT FORM SUBMISSION
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                clearStatus();


                const fields =
                    contactForm.querySelectorAll(
                        "input, textarea"
                    );


                let valid = true;


                fields.forEach(
                    (field) => {

                        /*
                         * Ignore hidden CSRF input.
                         */

                        if (
                            field.type !== "hidden" &&
                            !validateField(field)
                        ) {

                            valid = false;

                        }

                    }
                );


                if (!valid) {

                    showStatus(
                        "Please check the highlighted fields and try again.",
                        "error"
                    );


                    const firstInvalid =
                        contactForm.querySelector(
                            ".input-error"
                        );


                    if (firstInvalid) {

                        firstInvalid.focus();

                    }


                    return;

                }


                /*
                 * Prevent duplicate submission.
                 */

                if (
                    submitButton &&
                    submitButton.disabled
                ) {

                    return;

                }


                const originalHTML =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.classList.add(
                        "loading"
                    );


                    submitButton.innerHTML = `
                        <i
                            class="fas fa-spinner fa-spin"
                            aria-hidden="true"
                        ></i>
                        <span>Sending...</span>
                    `;

                }


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method:
                                    contactForm.method ||
                                    "POST",

                                body:
                                    formData,

                                headers: {
                                    "X-Requested-With":
                                        "XMLHttpRequest",

                                    "Accept":
                                        "application/json, text/html"
                                },

                                credentials:
                                    "same-origin"
                            }
                        );


                    const contentType =
                        response.headers.get(
                            "content-type"
                        ) || "";


                    let result = null;


                    /*
                     * Flask JSON response.
                     */

                    if (
                        contentType.includes(
                            "application/json"
                        )
                    ) {

                        result =
                            await response.json();

                    } else {

                        /*
                         * Flask redirect / HTML response.
                         *
                         * We do not dump the returned HTML
                         * into the status box.
                         */

                        await response.text();


                        result = {

                            success:
                                response.ok,

                            message:
                                response.ok
                                    ? "Your message was sent successfully. Thank you for reaching out!"
                                    : "Unable to send your message. Please try again."

                        };

                    }


                    if (
                        response.ok &&
                        result.success !== false
                    ) {

                        showStatus(
                            result.message ||
                            "Your message was sent successfully. Thank you for reaching out!",
                            "success"
                        );


                        contactForm.reset();


                        updateCharacterCounter();


                        contactForm
                            .querySelectorAll(
                                ".input-error"
                            )
                            .forEach(
                                clearFieldError
                            );


                    } else {

                        showStatus(
                            result.message ||
                            "Something went wrong. Please try again.",
                            "error"
                        );

                    }


                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    showStatus(
                        "Unable to send your message right now. Please try again or contact me directly by email.",
                        "error"
                    );


                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;


                        submitButton.classList.remove(
                            "loading"
                        );


                        submitButton.innerHTML =
                            originalHTML;

                    }

                }

            }
        );

    }


    /* =====================================================
       PROFILE IMAGE FALLBACK
    ===================================================== */

    const profileImages =
        document.querySelectorAll(
            ".profile-image"
        );


    profileImages.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );


                    const wrapper =
                        image.closest(
                            ".profile-image-wrapper"
                        );


                    if (!wrapper) {
                        return;
                    }


                    const placeholder =
                        wrapper.querySelector(
                            ".profile-placeholder"
                        );


                    if (placeholder) {

                        placeholder.classList.add(
                            "show"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       EXTERNAL LINK SECURITY
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(
            (link) => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            (element) => {

                element.textContent =
                    currentYear.toString();

            }
        );


    /* =====================================================
       INITIAL HASH
    ===================================================== */

    if (window.location.hash) {

        let initialTarget = null;


        try {

            initialTarget =
                document.querySelector(
                    window.location.hash
                );

        } catch (error) {

            initialTarget = null;

        }


        if (initialTarget) {

            window.setTimeout(
                () => {

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const position =
                        initialTarget
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top: Math.max(
                            position,
                            0
                        ),

                        behavior:
                            "auto"

                    });

                },
                100
            );

        }

    }


    /* =====================================================
       RESIZE HANDLER
    ===================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        () => {

            window.clearTimeout(
                resizeTimer
            );


            resizeTimer =
                window.setTimeout(
                    () => {

                        if (
                            window.innerWidth >
                            900
                        ) {

                            closeMenu();

                        }

                    },
                    150
                );

        }
    );


    /* =====================================================
       ONLINE / OFFLINE
    ===================================================== */

    function updateConnectionStatus() {

        if (!navigator.onLine) {

            console.warn(
                "Portfolio is currently offline."
            );

        }

    }


    window.addEventListener(
        "online",
        updateConnectionStatus
    );


    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroGrid =
        document.querySelector(".hero-grid");


    if (
        hero &&
        heroGrid &&
        !reducedMotionQuery.matches
    ) {

        let parallaxTicking = false;


        function updateHeroParallax() {

            if (
                window.scrollY >
                window.innerHeight
            ) {

                parallaxTicking =
                    false;

                return;

            }


            const offset =
                window.scrollY * 0.08;


            heroGrid.style.transform =
                `translate3d(0, ${offset}px, 0)`;


            parallaxTicking =
                false;

        }


        window.addEventListener(
            "scroll",
            () => {

                if (
                    !parallaxTicking
                ) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );


                    parallaxTicking =
                        true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       CONTACT FORM CTRL + ENTER
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" &&
                    event.ctrlKey &&
                    event.target.tagName ===
                        "TEXTAREA"
                ) {

                    event.preventDefault();


                    if (
                        typeof contactForm.requestSubmit ===
                        "function"
                    ) {

                        contactForm.requestSubmit();

                    } else {

                        contactForm.submit();

                    }

                }

            }
        );

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".btn, .header-cta, .footer-cta-button"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    function (event) {

                        if (
                            reducedMotionQuery.matches
                        ) {

                            return;

                        }


                        const rect =
                            this.getBoundingClientRect();


                        const ripple =
                            document.createElement(
                                "span"
                            );


                        ripple.className =
                            "button-ripple";


                        ripple.style.left =
                            `${event.clientX - rect.left}px`;


                        ripple.style.top =
                            `${event.clientY - rect.top}px`;


                        this.appendChild(
                            ripple
                        );


                        window.setTimeout(
                            () => {

                                ripple.remove();

                            },
                            650
                        );

                    }
                );

            }
        );


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Tab") {

                body.classList.add(
                    "keyboard-navigation"
                );

            }

        }
    );


    document.addEventListener(
        "mousedown",
        () => {

            body.classList.remove(
                "keyboard-navigation"
            );

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateHeader();

    updateBackToTop();

    updateCharacterCounter();


    /*
     * Ensure the hero itself is never accidentally
     * hidden by an old animation class.
     */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (heroContent) {

        heroContent.classList.add(
            "hero-ready"
        );

    }


    if (heroVisual) {

        heroVisual.classList.add(
            "hero-ready"
        );

    }


    /* =====================================================
       CONSOLE INFORMATION
    ===================================================== */

    console.log(
        "%cAbdirahman Mohamed Salat Portfolio",
        "font-size:18px;font-weight:800;"
    );


    console.log(
        "%cPython • AI Automation • Data • Web",
        "font-size:13px;"
    );


});