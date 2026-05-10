# Luxe Enterprise E-Commerce Platform
![Django](https://img.shields.io/badge/Backend-Django_REST_Framework-092E20?style=for-the-badge&logo=django)
![Next JS](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)
![Scikit Learn](https://img.shields.io/badge/Machine_Learning-Scikit_Learn-F7931E?style=for-the-badge&logo=scikit-learn)
![Celery](https://img.shields.io/badge/Task_Queue-Celery-37814A?style=for-the-badge&logo=celery)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
## Project Overview
Luxe is a highly scalable, multi-role e-commerce platform built on a robust service-oriented architecture. Designed for high performance, extensibility, and data-driven decision making, the system strictly separates concerns between a powerful backend REST API and a highly interactive, server-side rendered frontend.
The platform goes beyond traditional e-commerce by integrating a predictive analytics pipeline, enabling intelligent business decisions based on user behavior and retention metrics.
The platform handles three distinct user personas natively:
- System Administrators: Global system supervision, user provisioning, role assignments, and audit logging.
- Merchants: Inventory management, localized catalog control, and business analytics with predictive modeling.
- Customers: Seamless browsing, cart management, and seamless checkout execution.
## Technical Architecture
The platform follows a Backend-For-Frontend (BFF) pattern and strictly adheres to Clean Architecture and SOLID design principles.
- Backend: Django, Django REST Framework (DRF), SimpleJWT for secure stateless authentication.
- Frontend: Next.js 14 (App Router), React, Tailwind CSS, Zustand for global state management.
- Machine Learning & Data Science: Python, Scikit-Learn (Logistic Regression, KNN, SVM), Pandas.
- Asynchronous Processing: Celery for background analytics ingestion and processing.
- Database: SQLite (Development) / PostgreSQL-ready (Production).
## Machine Learning & Predictive Analytics
A core differentiator of the Luxe platform is its integrated Data Science pipeline, specifically designed to monitor user engagement and predict customer churn.
### Features of the Analytics Engine:
- Asynchronous Data Ingestion: High-volume event tracking is offloaded to Celery background tasks via the Analytics Ingestion API, ensuring zero impact on the end-user latency.
- Customer Churn Prediction: Historical order data and user engagement metrics are processed through machine learning models to classify at-risk customers.
- Model Comparison: The system evaluates multiple predictive models (Logistic Regression, K-Nearest Neighbors, and Support Vector Machines) to ensure optimal accuracy (averaging 79% retention prediction accuracy).
- Merchant Intelligence: Insights are directly exposed to the Merchant Dashboard, allowing vendors to visualize churn rates versus order frequencies, thereby enabling targeted retention campaigns.
## Core Platform Features
- Role-Based Access Control (RBAC): Strict segregation of data and UI via the PortalGuard interceptor on the frontend and custom permission classes on the backend.
- High-Performance UI: Server-Side Rendering (SSR) via Next.js ensures fast Initial Page Loads and excellent SEO
- Intelligent Catalog Management: Dynamic variants, inventory tracking, and categorical relationships natively supported by the ORM.
- Stateless Authentication: Highly secure JWT-based sessions with silent token refresh handling.
## Methodology (Agile Scrum)
The project followed a strict Scrum methodology across 8 execution Sprints:
1. Sprint 1-2: Architecture framing and Headless ecosystem setup.
2. Sprint 3-4: Development of Core Features (Authentication, RBAC & Catalog mapping).
3. Sprint 5: Data Science integration, Machine Learning models and Analytics Pipeline.
4. Sprint 6-7: UX/UI refinement, Quality Assurance (QA), and Client state management.
5. Sprint 8: Localization (TND currency), Database seeding, and Final deployment preparation.
## Installation & Local Setup
### Prerequisites
- Python 3.10+
- Node.js 18+
- Redis (Required for Celery task processing)
### Backend Setup
1. Navigate to the backend directory:
   `cd backend`
2. Create a virtual environment:
   `python -m venv venv`
3. Activate the virtual environment:
   `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies:
   `pip install -r requirements.txt`
5. Apply migrations:
   `python manage.py migrate`
6. Run the server:
   `python manage.py runserver`
### Frontend Setup
1. Navigate to the frontend directory:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
The application will be accessible at http://localhost:3000.
---
## Authors
- Ranim Rtimi
- Nour Elhouda Louhichi
- Mohamed Ali Adouni
---
*L U X E - Designed for the future of digital retail.*