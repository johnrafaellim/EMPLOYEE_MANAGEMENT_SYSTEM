# Employee Management System (EMS)

A full-stack web application for managing employees, attendance, leave requests, payroll, and announcements. Built with
the **MERN** stack (MongoDB, Express.js, React.js, Node.js), this system provides separate portals for **employees** and
**administrators** with role-based access control.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)

---

## ✨ Features

### Employee Portal

- **Authentication** — Secure login with JWT-based authentication
- **Dashboard** — Overview of personal stats and quick actions
- **Attendance** — Mark and view daily attendance records
- **Leave Management** — Submit and track leave requests
- **Payslip** — View and download monthly payslips

### Admin Portal

- **Authentication** — Secure admin login with role-based access
- **Dashboard** — Overview of company-wide statistics
- **Employee Management** — Add, edit, and manage employee records with profile images
- **Attendance Management** — Review and manage all employee attendance
- **Leave Management** — Approve or reject employee leave requests
- **Payroll Management** — Generate and manage employee payroll
- **Announcements** — Create and manage company-wide announcements

---

## 🛠 Tech Stack

### Backend

| Technology             | Version | Purpose                       |
|------------------------|---------|-------------------------------|
| **Node.js**            | —       | Runtime environment           |
| **Express.js**         | 5.x     | Web framework                 |
| **MongoDB**            | —       | Database                      |
| **Mongoose**           | 9.x     | ODM for MongoDB               |
| **JWT (jsonwebtoken)** | 9.x     | Authentication                |
| **bcryptjs**           | 3.x     | Password hashing              |
| **Multer**             | 2.x     | File uploads                  |
| **ImageKit**           | 7.x     | Image management and CDN      |
| **CORS**               | 2.x     | Cross-origin resource sharing |
| **dotenv**             | 18.x    | Environment variables         |
| **nodemon**            | 3.x     | Development auto-restart      |

### Frontend (Employee Portal)

| Technology           | Version | Purpose                     |
|----------------------|---------|-----------------------------|
| **React**            | 19.x    | UI library                  |
| **Vite**             | 8.x     | Build tool and dev server   |
| **React Router DOM** | 7.x     | Client-side routing         |
| **Tailwind CSS**     | 4.x     | Utility-first CSS framework |
| **Lucide React**     | 1.x     | Icon library                |
| **ESLint**           | 10.x    | Code linting                |
| **Prettier**         | 3.x     | Code formatting             |

### Admin Portal

| Technology           | Version | Purpose                     |
|----------------------|---------|-----------------------------|
| **React**            | 19.x    | UI library                  |
| **Vite**             | 8.x     | Build tool and dev server   |
| **React Router DOM** | 7.x     | Client-side routing         |
| **Tailwind CSS**     | 4.x     | Utility-first CSS framework |
| **Lucide React**     | 1.x     | Icon library                |
| **ESLint**           | 10.x    | Code linting                |
| **Prettier**         | 3.x     | Code formatting             |

---

## 📁 Project Structure

```
ems_mern/
├── backend/               # Node.js + Express backend API
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   │   ├── User.js        # User authentication model
│   │   ├── Employee.js    # Employee data model
│   │   ├── Attendance.js  # Attendance records model
│   │   ├── Leave.js       # Leave request model
│   │   ├── Payroll.js     # Payroll records model
│   │   └── Announcement.js# Company announcements model
│   ├── routes/            # API route definitions
│   └── server.js          # Entry point
├── frontend/              # React employee portal
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── routes/        # Route protection (ProtectedRoute, PublicOnlyRoute)
│       ├── auth/          # Authentication utilities
│       └── data/          # Static data and configurations
└── admin/                 # React admin portal
    └── src/
        ├── components/    # Reusable UI components
        ├── pages/         # Page components
        └── routes/        # Route protection
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ems_mern
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install admin dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Running the Application

Run all three services simultaneously:

```bash
# Terminal 1 — Backend
cd backend
npm start

# Terminal 2 — Frontend (Employee Portal)
cd frontend
npm run dev

# Terminal 3 — Admin Portal
cd admin
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## 📡 API Endpoints

| Module               | Routes                                                                                             |
|----------------------|----------------------------------------------------------------------------------------------------|
| **Auth**             | `POST /api/auth/register`, `POST /api/auth/login`                                                  |
| **Employees**        | `GET /api/employees`, `POST /api/employees`, `PUT /api/employees/:id`, `DELETE /api/employees/:id` |
| **Attendance**       | `GET /api/attendance`, `POST /api/attendance`                                                      |
| **Admin Attendance** | `GET /api/admin/attendance`, `PUT /api/admin/attendance/:id`                                       |
| **Leaves**           | `GET /api/leaves`, `POST /api/leaves`, `PUT /api/leaves/:id`                                       |
| **Payroll**          | `GET /api/payroll`, `POST /api/payroll`, `PUT /api/payroll/:id`                                    |
| **Announcements**    | `GET /api/announcements`, `POST /api/announcements`, `DELETE /api/announcements/:id`               |
| **Dashboard**        | `GET /api/dashboard/stats`                                                                         |

---

## 👥 Roles

| Role         | Access                                                                                               |
|--------------|------------------------------------------------------------------------------------------------------|
| **Employee** | Personal dashboard, attendance, leave requests, payslips                                             |
| **Admin**    | Full access to all modules including employee management, leave approval, payroll, and announcements |
