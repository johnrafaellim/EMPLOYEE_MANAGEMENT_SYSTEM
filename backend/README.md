# 🏢 Employee Management System — Backend API

A RESTful backend for managing employees, attendance, leaves, payroll, and company announcements, with separate admin and employee access levels.

> **Base URL:** `http://localhost:8000`

---

## ✨ Features

- 🔐 **Authentication**: admin signup, login, OTP verification, and password reset
- 👥 **Employee management**: full CRUD with profile image upload
- 🕒 **Attendance tracking**: employees mark attendance and view their history
- 🌴 **Leave management**: employees apply, admins review and decide
- 💰 **Payroll**: create and view payroll records
- 📢 **Announcements**: admins post and manage company-wide notices
- 📊 **Admin dashboard**: chart data and attendance overview

## 🧰 Tech Stack

- Node.js + Express (ES Modules)
- Token-based auth (`verifyToken` / `isAdmin` middleware)
- Multer for file uploads
- CORS and dotenv for configuration

---

## 📑 Table of Contents

- [Authentication Levels](#-authentication-levels)
- [Quick Reference](#-quick-reference)
- [Auth](#-auth--apiauth)
- [Employees](#-employees--apiemployee)
- [Payroll](#-payroll--apipayroll)
- [Leave](#-leave--apileave)
- [Attendance](#-attendance--apiattendance)
- [Admin Attendance](#-admin-attendance--apiadminattendance)
- [Admin Dashboard](#-admin-dashboard--apiadmindashboard)
- [Announcements](#-announcements--apiannouncements)

---

## 🔑 Authentication Levels

| Badge | Level      | Requirement                          |
| ----- | ---------- | ------------------------------------ |
| 🟢    | **Public** | No token required                    |
| 🟡    | **Auth**   | Valid token (any logged-in user)     |
| 🔴    | **Admin**  | Valid token + admin role             |

## 📌 Quick Reference

| Module           | Base Path                | Routes |
| ---------------- | ------------------------ | :----: |
| Health Check     | `/`                      | 1      |
| Auth             | `/api/auth`              | 6      |
| Employees        | `/api/employee`          | 5      |
| Payroll          | `/api/payroll`           | 2      |
| Leave            | `/api/leave`             | 2      |
| Attendance       | `/api/attendance`        | 3      |
| Admin Attendance | `/api/admin/attendance`  | 5      |
| Admin Dashboard  | `/api/admin/dashboard`   | 1      |
| Announcements    | `/api/announcements`     | 3      |
| **Total**        |                          | **28** |

---

## ❤️ Health Check

| Method | Endpoint | Access    | Description           |
| ------ | -------- | --------- | --------------------- |
| GET    | `/`      | 🟢 Public | Returns `API WORKING` |

---

## 🔐 Auth — `/api/auth`

| Method | Endpoint                    | Access    | Handler          |
| ------ | --------------------------- | --------- | ---------------- |
| POST   | `/api/auth/signup-admin`    | 🟢 Public | `signupAdmin`    |
| POST   | `/api/auth/login`           | 🟢 Public | `login`          |
| POST   | `/api/auth/verify-otp`      | 🟢 Public | `verifyOtp`      |
| POST   | `/api/auth/resend-otp`      | 🟢 Public | `resendOtp`      |
| POST   | `/api/auth/forgot-password` | 🟢 Public | `forgotPassword` |
| POST   | `/api/auth/reset-password`  | 🟢 Public | `resetPassword`  |

---

## 👥 Employees — `/api/employee`

| Method | Endpoint            | Access   | Handler           | Notes                                  |
| ------ | ------------------- | -------- | ----------------- | -------------------------------------- |
| POST   | `/api/employee`     | 🔴 Admin | `createEmployee`  | `multipart/form-data` (`profileImage`) |
| GET    | `/api/employee`     | 🔴 Admin | `getAllEmployees` |                                        |
| GET    | `/api/employee/:id` | 🔴 Admin | `getEmployee`     |                                        |
| PUT    | `/api/employee/:id` | 🔴 Admin | `updateEmployee`  | `multipart/form-data` (`profileImage`) |
| DELETE | `/api/employee/:id` | 🔴 Admin | `deleteEmployee`  |                                        |

---

## 💰 Payroll — `/api/payroll`

| Method | Endpoint       | Access   | Handler         |
| ------ | -------------- | -------- | --------------- |
| POST   | `/api/payroll` | 🔴 Admin | `createPayroll` |
| GET    | `/api/payroll` | 🔴 Admin | `getPayroll`    |

---

## 🌴 Leave — `/api/leave`

| Method | Endpoint           | Access  | Handler      |
| ------ | ------------------ | ------- | ------------ |
| POST   | `/api/leave/apply` | 🟡 Auth | `applyLeave` |
| GET    | `/api/leave`       | 🟡 Auth | `getLeaves`  |

---

## 🕒 Attendance — `/api/attendance`

| Method | Endpoint                | Access  | Handler                |
| ------ | ----------------------- | ------- | ---------------------- |
| POST   | `/api/attendance/mark`  | 🟡 Auth | `markAttendance`       |
| GET    | `/api/attendance`       | 🟡 Auth | `getAttendanceHistory` |
| GET    | `/api/attendance/:date` | 🟡 Auth | `getAttendanceByDate`  |

---

## 🗂️ Admin Attendance — `/api/admin/attendance`

| Method | Endpoint                             | Access   | Handler                        |
| ------ | ------------------------------------ | -------- | ------------------------------ |
| GET    | `/api/admin/attendance/dashboard`    | 🔴 Admin | `getAttendanceDashboard`       |
| GET    | `/api/admin/attendance/list`         | 🔴 Admin | `getAttendanceList`            |
| GET    | `/api/admin/attendance/leaves`       | 🔴 Admin | `getAllLeaves`                 |
| GET    | `/api/admin/attendance/employee/:id` | 🔴 Admin | `getEmployeeAttendanceDetails` |
| PUT    | `/api/admin/attendance/leave/:id`    | 🔴 Admin | `decideLeave`                  |

---

## 📊 Admin Dashboard — `/api/admin/dashboard`

| Method | Endpoint                      | Access   | Handler        |
| ------ | ----------------------------- | -------- | -------------- |
| GET    | `/api/admin/dashboard/charts` | 🔴 Admin | `getChartData` |

---

## 📢 Announcements — `/api/announcements`

| Method | Endpoint                 | Access   | Handler              |
| ------ | ------------------------ | -------- | -------------------- |
| POST   | `/api/announcements`     | 🔴 Admin | `createAnnouncement` |
| GET    | `/api/announcements`     | 🔴 Admin | `getAnnouncements`   |
| DELETE | `/api/announcements/:id` | 🔴 Admin | `deleteAnnouncement` |