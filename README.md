# Sumit Timande - Personal Portfolio

Modern, responsive portfolio website built with **Flask**, **Bootstrap 5**, and vanilla JavaScript.

## Features

- Dark / light theme toggle
- Particle.js hero background & Typed.js typing effect
- Glassmorphism UI, AOS scroll animations
- **Contact form emails you directly** (Gmail SMTP or SendGrid)
- Fully responsive, recruiter-friendly layout

## Quick Start

```powershell
cd C:\Users\sumit\sumit-portfolio
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your Gmail App Password (see below)
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Profile Photo

Save your headshot as:

`static/images/profile.jpg`

(See `static/images/SAVE_PROFILE_HERE.txt`)

## Contact Form Email Setup (Gmail SMTP)

1. Copy `.env.example` to `.env`
2. Enable 2-Step Verification on your Google account
3. Create an **App Password**: [Google App Passwords](https://myaccount.google.com/apppasswords)
4. Set in `.env`:

```env
MAIL_PROVIDER=smtp
MAIL_USERNAME=sumittimande002@gmail.com
MAIL_PASSWORD=your-16-character-app-password
MAIL_RECIPIENT=sumittimande002@gmail.com
```

5. Restart Flask and submit the contact form — messages arrive in your inbox.

## SendGrid (Optional)

```env
MAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.your-api-key
SENDGRID_FROM_EMAIL=sumittimande002@gmail.com
MAIL_RECIPIENT=sumittimande002@gmail.com
```

## Project Structure

```
sumit-portfolio/
├── app.py
├── requirements.txt
├── .env.example
├── utils/
│   └── email_service.py
├── templates/
│   └── index.html
└── static/
    ├── css/style.css
    ├── js/script.js
    └── images/
        └── profile.jpg   ← your photo
```

## LinkedIn

Profile link: [linkedin.com/in/sumit-timande-478656287](https://www.linkedin.com/in/sumit-timande-478656287)
