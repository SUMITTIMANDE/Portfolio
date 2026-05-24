"""
Sumit Timande - Personal Portfolio
Flask application with contact form email delivery.
"""

import os
import re

from dotenv import load_dotenv
from flask import Flask, flash, redirect, render_template, request, url_for

from utils.email_service import send_contact_email

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-portfolio-secret-change-in-production")

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@app.route("/")
def index():
    """Render the main portfolio page."""
    return render_template("index.html")


@app.route("/contact", methods=["POST"])
def contact():
    """Handle contact form submissions and email them to the portfolio owner."""
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not email or not message:
        flash("Please fill in all fields.", "danger")
        return redirect(url_for("index") + "#contact")

    if not EMAIL_PATTERN.match(email):
        flash("Please enter a valid email address.", "danger")
        return redirect(url_for("index") + "#contact")

    success, error = send_contact_email(name, email, message)

    if success:
        flash("Thank you! Your message has been sent. I will get back to you soon.", "success")
    else:
        app.logger.error("Contact email failed: %s", error)
        flash(
            "Sorry, the message could not be sent right now. Please email me directly at "
            "sumittimande002@gmail.com",
            "danger",
        )

    return redirect(url_for("index") + "#contact")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
