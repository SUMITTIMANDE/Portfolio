"""
Contact form email delivery via SMTP (Gmail) or SendGrid.
Configure credentials in .env — see .env.example.
"""

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional, Tuple

import requests


def _recipient() -> str:
    return os.environ.get("MAIL_RECIPIENT", "sumittimande002@gmail.com")


def send_via_smtp(name: str, sender_email: str, message: str) -> Tuple[bool, Optional[str]]:
    """Send contact message using SMTP (Gmail recommended with App Password)."""
    mail_user = os.environ.get("MAIL_USERNAME")
    mail_pass = os.environ.get("MAIL_PASSWORD")

    if not mail_user or not mail_pass:
        return False, "SMTP is not configured. Set MAIL_USERNAME and MAIL_PASSWORD in .env"

    smtp_server = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("MAIL_PORT", "587"))
    recipient = _recipient()

    msg = MIMEMultipart()
    msg["From"] = mail_user
    msg["To"] = recipient
    msg["Reply-To"] = sender_email
    msg["Subject"] = f"Portfolio Contact: {name}"

    body = (
        f"You received a new message from your portfolio website.\n\n"
        f"Name: {name}\n"
        f"Email: {sender_email}\n\n"
        f"Message:\n{message}\n"
    )
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port, timeout=15) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(mail_user, mail_pass)
            server.sendmail(mail_user, [recipient], msg.as_string())
        return True, None
    except smtplib.SMTPException as exc:
        return False, f"Failed to send email: {exc}"


def send_via_sendgrid(name: str, sender_email: str, message: str) -> Tuple[bool, Optional[str]]:
    """Send contact message using SendGrid HTTP API."""
    api_key = os.environ.get("SENDGRID_API_KEY")
    from_email = os.environ.get("SENDGRID_FROM_EMAIL") or os.environ.get("MAIL_USERNAME")

    if not api_key or not from_email:
        return False, "SendGrid is not configured. Set SENDGRID_API_KEY and SENDGRID_FROM_EMAIL in .env"

    recipient = _recipient()
    payload = {
        "personalizations": [{"to": [{"email": recipient}]}],
        "from": {"email": from_email, "name": "Sumit Timande Portfolio"},
        "reply_to": {"email": sender_email, "name": name},
        "subject": f"Portfolio Contact: {name}",
        "content": [
            {
                "type": "text/plain",
                "value": (
                    f"Name: {name}\nEmail: {sender_email}\n\nMessage:\n{message}"
                ),
            }
        ],
    }

    try:
        response = requests.post(
            "https://api.sendgrid.com/v3/mail/send",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=15,
        )
        if response.status_code in (200, 202):
            return True, None
        return False, f"SendGrid error ({response.status_code}): {response.text}"
    except requests.RequestException as exc:
        return False, f"SendGrid request failed: {exc}"


def send_contact_email(name: str, sender_email: str, message: str) -> Tuple[bool, Optional[str]]:
    """Route to SMTP or SendGrid based on MAIL_PROVIDER env variable."""
    provider = os.environ.get("MAIL_PROVIDER", "smtp").lower().strip()

    if provider == "sendgrid":
        return send_via_sendgrid(name, sender_email, message)
    return send_via_smtp(name, sender_email, message)
