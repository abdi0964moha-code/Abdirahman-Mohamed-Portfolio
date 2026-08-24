"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       CONTACT FORM
       Professional Flask AJAX Submission
       Identity: Abdirahman Mohamed
       ========================================================= */

    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");
    const submitButton = document.getElementById("submitButton");

    /* =========================================================
       CONFIGURATION
       ========================================================= */

    const CONFIG = {
        endpoint: form?.getAttribute("action") || "/contact",
        messageDuration: 6000
    };

    let statusTimer = null;


    /* =========================================================
       STOP IF FORM DOES NOT EXIST
       ========================================================= */

    if (!form) {
        console.warn(
            "Contact form not found: #contactForm"
        );

        return;
    }


    /* =========================================================
       HELPER: GET INPUT VALUE
       ========================================================= */

    function getValue(id) {
        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    }


    /* =========================================================
       EMAIL VALIDATION
       ========================================================= */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
            email
        );
    }


    /* =========================================================
       STATUS MESSAGE
       ========================================================= */

    function showStatus(
        message,
        type = "success"
    ) {
        if (!status) {
            return;
        }

        /* Clear previous timer */
        if (statusTimer) {
            clearTimeout(statusTimer);
            statusTimer = null;
        }


        /* Reset classes */
        status.className =
            "contact-status";


        /* Add message type */
        status.classList.add(type);


        /* Set accessibility */
        status.setAttribute(
            "role",
            type === "error"
                ? "alert"
                : "status"
        );

        status.setAttribute(
            "aria-live",
            "polite"
        );


        /* Set message */
        status.textContent =
            message;


        /* Display */
        status.style.display =
            "block";


        /* Optional smooth visibility */
        requestAnimationFrame(() => {
            status.classList.add("visible");
        });


        /* Automatically hide */
        statusTimer = setTimeout(() => {
            status.classList.remove(
                "visible"
            );

            setTimeout(() => {
                if (status) {
                    status.style.display =
                        "none";
                }
            }, 250);

        }, CONFIG.messageDuration);
    }


    /* =========================================================
       BUTTON LOADING STATE
       ========================================================= */

    function setLoadingState(isLoading) {
        if (!submitButton) {
            return;
        }


        if (isLoading) {
            submitButton.disabled =
                true;

            submitButton.setAttribute(
                "aria-busy",
                "true"
            );

            submitButton.innerHTML = `
                <i
                    class="fas fa-spinner fa-spin"
                    aria-hidden="true"
                ></i>

                <span>Sending...</span>
            `;

        } else {
            submitButton.disabled =
                false;

            submitButton.removeAttribute(
                "aria-busy"
            );

            submitButton.innerHTML = `
                <i
                    class="fas fa-paper-plane"
                    aria-hidden="true"
                ></i>

                <span>Send Message</span>
            `;
        }
    }


    /* =========================================================
       INPUT ERROR HANDLING
       ========================================================= */

    function clearInputErrors() {
        form.querySelectorAll(
            ".input-error"
        ).forEach((input) => {
            input.classList.remove(
                "input-error"
            );

            input.removeAttribute(
                "aria-invalid"
            );
        });
    }


    function markInputError(id) {
        const input =
            document.getElementById(id);

        if (!input) {
            return;
        }

        input.classList.add(
            "input-error"
        );

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        input.focus();
    }


    /* =========================================================
       CLEAR INPUT ERROR WHEN USER TYPES
       ========================================================= */

    form.querySelectorAll(
        "input, textarea"
    ).forEach((input) => {
        input.addEventListener(
            "input",
            () => {
                input.classList.remove(
                    "input-error"
                );

                input.removeAttribute(
                    "aria-invalid"
                );
            }
        );
    });


    /* =========================================================
       CONTACT FORM SUBMISSION
       ========================================================= */

    form.addEventListener(
        "submit",
        async (event) => {
            event.preventDefault();


            /* =============================================
               CLEAR OLD ERRORS
               ============================================= */

            clearInputErrors();


            /* =============================================
               GET FORM VALUES
               ============================================= */

            const name =
                getValue("name");

            const email =
                getValue("email");

            const subject =
                getValue("subject");

            const message =
                getValue("message");


            /* =============================================
               VALIDATE NAME
               ============================================= */

            if (!name) {
                showStatus(
                    "Please enter your name.",
                    "error"
                );

                markInputError("name");

                return;
            }


            /* =============================================
               VALIDATE EMAIL
               ============================================= */

            if (!email) {
                showStatus(
                    "Please enter your email address.",
                    "error"
                );

                markInputError("email");

                return;
            }


            if (!isValidEmail(email)) {
                showStatus(
                    "Please enter a valid email address.",
                    "error"
                );

                markInputError("email");

                return;
            }


            /* =============================================
               VALIDATE SUBJECT
               ============================================= */

            if (!subject) {
                showStatus(
                    "Please enter a subject.",
                    "error"
                );

                markInputError("subject");

                return;
            }


            /* =============================================
               VALIDATE MESSAGE
               ============================================= */

            if (!message) {
                showStatus(
                    "Please enter your message.",
                    "error"
                );

                markInputError("message");

                return;
            }


            /* =============================================
               LOADING STATE
               ============================================= */

            setLoadingState(true);


            try {
                /* =========================================
                   CREATE FORM DATA

                   IMPORTANT:
                   This is NOT JSON.

                   Flask can read it with:

                   request.form.get("name")
                   request.form.get("email")
                   request.form.get("subject")
                   request.form.get("message")
                   ========================================= */

                const formData =
                    new FormData(form);


                /* =========================================
                   SEND REQUEST TO FLASK
                   ========================================= */

                const response =
                    await fetch(
                        CONFIG.endpoint,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /* =========================================
                   READ SERVER RESPONSE SAFELY
                   ========================================= */

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";


                let result;


                if (
                    contentType.includes(
                        "application/json"
                    )
                ) {
                    result =
                        await response.json();

                } else {
                    const text =
                        await response.text();

                    result = {
                        success:
                            response.ok,

                        message:
                            text ||
                            (
                                response.ok
                                    ? "Your message has been received successfully."
                                    : "Unable to send your message."
                            )
                    };
                }


                /* =========================================
                   SUCCESS
                   ========================================= */

                if (
                    response.ok &&
                    result.success === true
                ) {
                    showStatus(
                        result.message ||
                        "Thank you! Your message has been received successfully.",
                        "success"
                    );


                    /* Reset form */
                    form.reset();


                    /* Remove validation states */
                    clearInputErrors();


                    /* Optional success class */
                    form.classList.add(
                        "form-submitted"
                    );


                    setTimeout(() => {
                        form.classList.remove(
                            "form-submitted"
                        );
                    }, 1000);


                    return;
                }


                /* =========================================
                   SERVER ERROR
                   ========================================= */

                showStatus(
                    result.message ||
                    "Unable to send your message. Please try again.",
                    "error"
                );


            } catch (error) {
                /* =========================================
                   NETWORK / CONNECTION ERROR
                   ========================================= */

                console.error(
                    "Contact form error:",
                    error
                );


                showStatus(
                    "Unable to connect to the server. Please check your connection and try again.",
                    "error"
                );


            } finally {
                /* =========================================
                   RESTORE BUTTON
                   ========================================= */

                setLoadingState(false);
            }
        }
    );


    /* =========================================================
       INITIAL STATE
       ========================================================= */

    if (status) {
        status.style.display =
            "none";
    }


    console.log(
        "%cContact form initialized successfully.",
        "color:#22d3ee;font-weight:700;"
    );
});