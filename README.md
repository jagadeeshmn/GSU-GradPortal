# GSU GradPortal — Graduate University Management System

## Overview

A full-stack web application that combines three interconnected university systems into a single monorepo: the graduate **admissions portal** (SLATE), the **student self-service portal** (PAWS), and the **office of graduate management system** (OGMS). Each system has its own namespaced backend routes and frontend pages, all served from a single Flask API and React SPA.

The backend is a Flask REST API with a shared SQLAlchemy database, and the frontend is a React SPA using React Router for navigation between all three portals.

> **Note:** This project was developed as part of an initiative in the **Department of Computer Science at Georgia State University**. It was designed to study and address real limitations observed in GSU's existing administrative systems.
>
> **Drawbacks of the existing GSU systems:**
> - SLATE, PAWS, and OGMS operate as completely isolated systems with no shared data layer — admissions data accepted in SLATE must be manually re-entered into PAWS, leading to delays and errors.
> - No unified API — each system is a standalone application, making cross-system queries (e.g., linking an applicant's admission status to their enrollment record) impossible without manual intervention.
> - No real-time status visibility — applicants have no way to track their application status programmatically; staff must communicate updates out-of-band.
> - Grade and assistantship management in OGMS is disconnected from student enrollment records in PAWS, requiring duplicate data entry.
>
> **How this implementation addresses them:**
> - All three systems share a **single database** — applicant, student, enrollment, and assistantship records are linked by design, eliminating redundant data entry.
> - A **unified REST API** with namespaced routes (`/`, `/paws/`, `/ogms/`) allows any system to query data from another with a single request.
> - Applicants can view their **admission status in real time** through the SLATE portal after logging in.
> - OGMS grade and assistantship updates operate directly on the same enrollment records that PAWS students see, keeping data consistent across portals.

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
