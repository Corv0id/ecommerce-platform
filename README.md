# L U X E - High-End Premium E-commerce Platform

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Backend-Django%205.0-green)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

L U X E is a professional-grade, headless e-commerce solution designed with a focus on **Premium UX**, **Scalability**, and **Security**. It leverages a modern decoupling architecture to provide a seamless shopping experience for high-end products.

---

## 🏗️ Architecture & Concepts (Course Mapping)

This project was built following the academic principles of modern digital commerce:

- **Headless Commerce**: Complete separation between the **Django REST Framework (DRF)** backend and the **Next.js** frontend, communicating via a secure API.
- **Microservices-Ready**: Modular app structure (Catalog, Accounts, Orders, Cart, Analytics) prepared for distributed scaling.
- **Security & Compliance**: 
  - Implementation of **JWT (JSON Web Tokens)** for stateless authentication.
  - **RBAC (Role-Based Access Control)** distinguishing between Customers and Merchants.
  - Adherence to **OWASP** best practices (SQL Injection protection via Django ORM, XSS protection).
- **Performance**:
  - **Server-Side Rendering (SSR)** for SEO and initial load speed.
  - **Client-Side Rendering (CSR)** for dynamic interactions (Cart, Wishlist).
  - Optimized images and **Core Web Vitals** focused design.
- **Data & IA**:
  - **Smart Search Engine**: A heuristic NLP search algorithm to map user intent to product categories.
  - **Real-time Analytics**: Tracking user behavior for future personalization.

---

## 🚀 Key Features

### 🛍️ Product Catalog
- **Premium Seeding**: 20+ realistic products with HD assets.
- **Dynamic Taxonomy**: Hierarchical categories and sub-categories (Men/Women/Accessories).
- **Filtering System**: Real-time filtering by category and price without page reloads.

### 🔐 User Experience
- **Smooth Navigation**: Framer Motion animations and Skeleton screens for a premium feel.
- **Cart & Wishlist**: Persistent state management using **Zustand**.
- **Account Management**: Multiple address management, order history, and profile updates.

### 💳 Logistics & Payment
- **Order Management System (OMS)**: Comprehensive order tracking and status updates.
- **Localization**: Full support for **Tunisian Dinar (TND)** with 3-decimal precision.

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js 14/15 (App Router)
- **Styling:** Tailwind CSS 4 + Lucide Icons
- **State Management:** Zustand
- **Animations:** Framer Motion

**Backend:**
- **Framework:** Django 5.0 + Django REST Framework
- **Auth:** SimpleJWT (Stateless)
- **Database:** PostgreSQL (Production) / SQLite (Dev)
- **Task Queue:** Celery + Redis (Ready for background processing)

---

## 📥 Getting Started

### 1. Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL (optional for dev)

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements/base.txt
python manage.py migrate
python manage.py shell -c "import seed_v2; seed_v2.run()"
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Methodology (Agile Scrum)

The project followed a **Scrum** methodology across 8 Sprints:
1. **Sprint 1-2**: Cadrage & Architecture (Headless setup).
2. **Sprint 3-4**: Core Features (Auth & Catalog).
3. **Sprint 5**: IA & Search (Smart Search integration).
4. **Sprint 6-7**: UX/UI Polish & QA.
5. **Sprint 8**: Localization (TND) & Final Seeding.

---

## 📝 Authors
- Ranim Rtimi
- Nour Elhouda Louhichi
- Mohamed Ali Adouni
---
*L U X E - Designed for the future of digital retail.*
