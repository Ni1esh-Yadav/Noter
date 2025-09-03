# 📒 Noter – Notes App with OTP Authentication

Noter is a full-stack **Notes application** built with **Node.js (Express + TypeScript + Prisma)** on the backend and **React + TailwindCSS** on the frontend.
It implements a **secure OTP-based authentication flow** (via email) and allows users to **create, update, and manage notes** after login.

---

## 🚀 Features

* **OTP Authentication**

  * Users sign up/login using their email.
  * OTP is sent to their email via **Nodemailer**.
  * Secure OTP storage with hashing and expiry (Prisma + bcrypt).
  * JWT session management for protected routes.

* **Notes CRUD**

  * Create, read, update, and delete notes.
  * Notes are linked to the authenticated user.
  * Protected with JWT middleware.

* **Frontend (React + TailwindCSS)**

  * Clean, modern signup & login UI.
  * OTP verification screen.
  * Notes dashboard to manage notes.
  * Responsive design.

* **Backend (Node.js + Prisma + PostgreSQL)**

  * Prisma ORM for database access.
  * PostgreSQL (can swap with SQLite for dev).
  * Nodemailer for email OTP delivery.
  * JWT authentication middleware.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* TailwindCSS
* Axios (API calls)
* React Router

### Backend

* Node.js + Express
* TypeScript
* Prisma ORM
* PostgreSQL
* bcrypt (hashing OTP)
* JWT (authentication)
* Nodemailer (email service)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ni1esh-Yadav/Noter
cd Noter
```

---

### 2️⃣ Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in `backend/`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/noter"
   JWT_SECRET="your-secret-key"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-app-password"
   ```

   ⚠️ Use a **PostgreSQL database** (or SQLite for dev: `DATABASE_URL="file:./dev.db"`).
   ⚠️ For Gmail, enable **App Passwords**.

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Build the backend:

   ```bash
   npm run build
   

6. Start the backend:

   ```bash
   npm run start
   ```

   The backend runs on `http://localhost:5000`.

---

### 3️⃣ Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

   The frontend runs on `http://localhost:5173`.

---

## 🔑 Authentication Flow

1. **User enters name, DOB, email → clicks "Get OTP".**

   * Backend generates OTP, saves hashed version, emails the user.

2. **User enters OTP on Verify screen.**

   * OTP validated against DB.
   * If valid → JWT is generated and returned.

3. **User accesses Notes dashboard.**

   * JWT stored in `localStorage`.
   * All API requests include `Authorization: Bearer <token>` header.

---

## 📝 Available API Endpoints

### Auth

* `POST auth/request-otp` → Send OTP
* `POST auth/verify-otp` → Verify OTP & return JWT

### Notes (Protected)

* `POST notes` → Create a note
* `GET notes` → Get all notes
* `PUT notes/:id` → Update note
* `DELETE notes/:id` → Delete note

---

## 📸 Screenshots

### Signup Page
**signup desktop view

<img width="1360" height="853" alt="signup" src="https://github.com/user-attachments/assets/8a1af004-ee5e-4d9d-8494-81785c5ffd6f" />

**signup mobile view

<img width="375" height="762" alt="signup mobile" src="https://github.com/user-attachments/assets/20b7b9f4-d915-44cf-8e74-3d566ed4fe45" />


### OTP Verification

**otp verification on desktop view

<img width="1237" height="855" alt="signup otp" src="https://github.com/user-attachments/assets/b295d33e-0fe6-4b34-bd11-533276c2fa7b" />


**otp verification on mobile view

<img width="376" height="812" alt="signup mobile otp" src="https://github.com/user-attachments/assets/a91f23f2-6736-4f1c-ab38-9b43e82854cb" />

### Notes Dashboard

**Notes Dashboard desktop view

<img width="1087" height="862" alt="dashboard " src="https://github.com/user-attachments/assets/ee5b372f-a7b9-4b79-9df1-fd2f7651a4eb" />

**Notes Dashboard mobile view

<img width="377" height="806" alt="dashboard mobile" src="https://github.com/user-attachments/assets/71a4b203-61e9-4a47-ab41-ca13ec98b715" />

---


