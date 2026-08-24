from flask import Flask, render_template, request, jsonify
from datetime import datetime
from pathlib import Path
import os
import re


# ============================================================
# APPLICATION CONFIGURATION
# ============================================================

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get(
    "SECRET_KEY",
    "change-this-secret-key-in-production"
)


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MESSAGES_DIR = BASE_DIR / "messages"
MESSAGES_FILE = MESSAGES_DIR / "contact_messages.txt"


# ============================================================
# MESSAGE STORAGE
# ============================================================

def ensure_message_storage():
    """
    Make sure the messages directory and file exist.
    """

    try:

        MESSAGES_DIR.mkdir(
            parents=True,
            exist_ok=True
        )

        MESSAGES_FILE.touch(
            exist_ok=True
        )

        return True

    except Exception as error:

        print()
        print("=" * 70)
        print("MESSAGE STORAGE INITIALIZATION ERROR")
        print("=" * 70)
        print(error)
        print("=" * 70)
        print()

        return False


# Create storage when application starts
ensure_message_storage()


# ============================================================
# STARTUP INFORMATION
# ============================================================

print()
print("=" * 70)
print("ABDIRAHMAN MOHAMED SALAT PORTFOLIO")
print("=" * 70)
print(f"Project folder:")
print(f"  {BASE_DIR}")
print()
print("Messages folder:")
print(f"  {MESSAGES_DIR}")
print()
print("Messages file:")
print(f"  {MESSAGES_FILE}")
print("=" * 70)
print()


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def home():

    return render_template(
        "index.html",
        current_year=datetime.now().year
    )


# ============================================================
# EMAIL VALIDATION
# ============================================================

def is_valid_email(email):
    """
    Basic email validation.
    """

    pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"

    return bool(
        re.match(
            pattern,
            email,
            re.IGNORECASE
        )
    )


# ============================================================
# CLEAN SINGLE-LINE VALUES
# ============================================================

def clean_single_line(value):
    """
    Prevent visitors from inserting fake headers
    into the message text file.
    """

    return " ".join(
        value.splitlines()
    ).strip()


# ============================================================
# CONTACT FORM
# ============================================================

@app.route("/contact", methods=["POST"])
def contact():

    print()
    print("=" * 70)
    print("NEW CONTACT FORM SUBMISSION")
    print("=" * 70)


    # ========================================================
    # GET FORM DATA
    # ========================================================

    name = request.form.get(
        "name",
        ""
    ).strip()

    email = request.form.get(
        "email",
        ""
    ).strip()

    subject = request.form.get(
        "subject",
        ""
    ).strip()

    message = request.form.get(
        "message",
        ""
    ).strip()


    # ========================================================
    # DEBUG INFORMATION
    # ========================================================

    print(f"Name received:    {name}")
    print(f"Email received:   {email}")
    print(f"Subject received: {subject}")
    print(f"Message received: {message}")


    # ========================================================
    # REQUIRED FIELD VALIDATION
    # ========================================================

    if not name:

        return jsonify({
            "success": False,
            "message": "Please enter your name."
        }), 400


    if not email:

        return jsonify({
            "success": False,
            "message": "Please enter your email address."
        }), 400


    if not subject:

        return jsonify({
            "success": False,
            "message": "Please enter a subject."
        }), 400


    if not message:

        return jsonify({
            "success": False,
            "message": "Please enter your message."
        }), 400


    # ========================================================
    # FIELD LENGTH VALIDATION
    # ========================================================

    if len(name) < 2:

        return jsonify({
            "success": False,
            "message": "Please enter a valid name."
        }), 400


    if len(name) > 120:

        return jsonify({
            "success": False,
            "message": "Your name is too long."
        }), 400


    if len(subject) < 3:

        return jsonify({
            "success": False,
            "message": "Please enter a valid subject."
        }), 400


    if len(subject) > 200:

        return jsonify({
            "success": False,
            "message": "Your subject is too long."
        }), 400


    if len(message) < 10:

        return jsonify({
            "success": False,
            "message":
                "Your message should contain at least 10 characters."
        }), 400


    if len(message) > 10000:

        return jsonify({
            "success": False,
            "message":
                "Your message is too long. Please keep it under 10,000 characters."
        }), 400


    # ========================================================
    # EMAIL VALIDATION
    # ========================================================

    if not is_valid_email(email):

        return jsonify({
            "success": False,
            "message": "Please enter a valid email address."
        }), 400


    # ========================================================
    # EMAIL LENGTH
    # ========================================================

    if len(email) > 254:

        return jsonify({
            "success": False,
            "message": "Your email address is too long."
        }), 400


    # ========================================================
    # CLEAN HEADER VALUES
    # ========================================================

    name = clean_single_line(name)

    email = clean_single_line(email)

    subject = clean_single_line(subject)


    # ========================================================
    # ENSURE STORAGE EXISTS
    # ========================================================

    if not ensure_message_storage():

        return jsonify({
            "success": False,
            "message":
                "The message service is temporarily unavailable."
        }), 500


    # ========================================================
    # TIMESTAMP
    # ========================================================

    timestamp = datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )


    # ========================================================
    # CREATE MESSAGE RECORD
    # ========================================================

    message_record = (
        "\n"
        + "=" * 70
        + "\n"
        + "NEW CONTACT MESSAGE\n"
        + "=" * 70
        + "\n"
        + f"Date: {timestamp}\n"
        + f"Name: {name}\n"
        + f"Email: {email}\n"
        + f"Subject: {subject}\n"
        + "\n"
        + "Message:\n"
        + f"{message}\n"
        + "=" * 70
        + "\n"
    )


    # ========================================================
    # SAVE MESSAGE
    # ========================================================

    try:

        with open(
            MESSAGES_FILE,
            "a",
            encoding="utf-8"
        ) as file:

            file.write(
                message_record
            )

            file.flush()


        # ====================================================
        # VERIFY SAVE
        # ====================================================

        if not MESSAGES_FILE.exists():

            raise FileNotFoundError(
                "Message file was not created."
            )


        file_size = MESSAGES_FILE.stat().st_size


        # ====================================================
        # SERVER LOG
        # ====================================================

        print()
        print("MESSAGE SAVED SUCCESSFULLY")
        print("-" * 70)
        print(f"Saved to:")
        print(f"  {MESSAGES_FILE}")
        print()
        print(f"File size:")
        print(f"  {file_size} bytes")
        print("-" * 70)
        print()


        # ====================================================
        # SUCCESS RESPONSE
        #
        # IMPORTANT:
        # Return JSON instead of redirecting.
        #
        # This prevents the website from reloading.
        # ====================================================

        return jsonify({
            "success": True,
            "message":
                "Thank you! Your message has been received successfully."
        }), 200


    # ========================================================
    # PERMISSION ERROR
    # ========================================================

    except PermissionError as error:

        print()
        print("=" * 70)
        print("MESSAGE STORAGE PERMISSION ERROR")
        print("=" * 70)
        print(error)
        print("=" * 70)
        print()

        return jsonify({
            "success": False,
            "message":
                "The server does not have permission to save your message."
        }), 500


    # ========================================================
    # GENERAL STORAGE ERROR
    # ========================================================

    except Exception as error:

        print()
        print("=" * 70)
        print("MESSAGE SAVE ERROR")
        print("=" * 70)
        print(error)
        print("=" * 70)
        print()

        return jsonify({
            "success": False,
            "message":
                "Sorry, your message could not be saved. Please try again."
        }), 500


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route("/health")
def health():

    return jsonify({
        "status": "online",
        "application":
            "Abdirahman Mohamed Salat Portfolio",
        "timestamp":
            datetime.now().isoformat()
    })


# ============================================================
# 404 ERROR
# ============================================================

@app.errorhandler(404)
def page_not_found(error):

    return render_template(
        "index.html",
        current_year=datetime.now().year
    ), 404


# ============================================================
# 500 ERROR
# ============================================================

@app.errorhandler(500)
def internal_server_error(error):

    return render_template(
        "index.html",
        current_year=datetime.now().year
    ), 500


# ============================================================
# APPLICATION ENTRY POINT
# ============================================================

if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            5000
        )
    )

    debug_mode = (
        os.environ.get(
            "FLASK_DEBUG",
            "true"
        ).lower() == "true"
    )

    print()
    print("=" * 70)
    print("FLASK SERVER STARTING")
    print("=" * 70)
    print(f"Port: {port}")
    print(f"Debug mode: {debug_mode}")
    print(f"Message storage: {MESSAGES_FILE}")
    print("=" * 70)
    print()

    app.run(
        host="0.0.0.0",
        port=port,
        debug=debug_mode
    )