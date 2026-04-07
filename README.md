# GSU GradPortal — Graduate Admissions Portal

## Overview

A full-stack web application that replicates the graduate admissions system used by Georgia State University. The portal supports the full applicant lifecycle — from registration and profile completion to program application and admission status tracking. Admissions staff can view all applicants, review individual applications, and accept or reject candidates.

The backend is a Flask REST API connected to a relational database, and the frontend is a React SPA that communicates with it via Axios. Both are structured as separate services within this monorepo.

---

## Features

- Applicant registration and secure login (password hashing via Werkzeug)
- Profile management with personal details and standardized test scores (GRE, TOEFL)
- Program application with department, degree level, and term selection
- Admin views: full applicant list with application details
- Admission decision workflow — accept or reject individual applications
- Accepted applicants list for reporting
- Statistics dashboard by department, program, and admission term

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS |
| Database | SQLite (default for local dev) / PostgreSQL (production) |
| Frontend | React 16, React Router, Axios, Reactstrap, Bootstrap 4 |
| Auth | Werkzeug password hashing |
| API style | REST JSON |
