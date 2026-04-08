# GSU GradPortal — Graduate University Management System

## Overview

A full-stack web application that combines three interconnected university systems into a single monorepo: the graduate **admissions portal** (SLATE), the **student self-service portal** (PAWS), and the **office of graduate management system** (OGMS). Each system has its own namespaced backend routes and frontend pages, all served from a single Flask API and React SPA.

The backend is a Flask REST API with a shared SQLAlchemy database, and the frontend is a React SPA using React Router for navigation between all three portals.

---

## Features

**Admissions (SLATE) — `/`**
- Applicant registration, login, and profile management
- Graduate program application (department, degree, term selection)
- GRE and TOEFL score submission
- Admin view: full applicant list, individual application review
- Accept / reject decisions on applications
- Admission statistics by department, program, and term

**Student Portal (PAWS) — `/paws`**
- Student login
- Course catalog browsing by semester
- Add/drop course enrollment
- Schedule view with course details
- Financial aid / assistantship waiver display

**Graduate Management (OGMS) — `/ogms`**
- View students by department
- View course listings by department
- View enrollment records by department
- Grade entry and updates per enrollment
- Assistantship award management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS |
| Database | SQLite (default for local dev) / PostgreSQL (production) |
| Frontend | React 16, React Router, Axios, Reactstrap, Bootstrap 4 |
| Auth | Werkzeug password hashing |
| API style | REST JSON — namespaced under `/`, `/paws/`, `/ogms/` |
