
# 📦 Move-X Parcel Delivery API

A Role-based RESTful API for managing parcel deliveries, built with **Express.js**, **TypeScript**, and **MongoDB**. This backend service supports different user roles (User and Admin) with secured authentication, parcel lifecycle management, and status tracking.

---

## 🔗 Live API / Base URL

## 👥 User Roles

- **User**
  - Can register/login
  - Can view and manage their own parcels and profile
  - Acts as **Sender** or **Receiver** depending on the parcel
- **Admin**
  - Can manage all users and parcels
  - Can update parcel status and track delivery logs

---

## 🛡️ Authentication

- Uses **JWT (access & refresh tokens)**
- Middleware-protected routes based on roles


## 📌 API Endpoints

### 🧑‍💻 Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login existing user |

---

### 👤 User (Self)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/my-profile` | View own profile |
| PATCH | `/users/my-profile` | Update own profile (excluding role/status) |
| DELETE | `/users/my-profile` | Delete own profile |

---

### 🛠️ Admin - User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | View all users |
| GET | `/users/:id` | View single user |
| PATCH | `/users/status/:id` | Block/Unblock a user |
| DELETE | `/users/:id` | Delete user |

---

### 📦 Parcel (Users)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/parcels/me` | Sender & Receiver view their parcels |
| GET | `/parcels/incoming` | Receiver views incoming parcels |
| POST | `/parcels/create-parcel` | Sender creates a new parcel |
| PATCH | `/parcels/:id/cancel` | Sender cancels parcel |
| PATCH | `/parcels/confirm/:id` | Receiver confirms delivery |
| GET | `/parcels/:id/status-log` | View parcel status logs |

---

### 📦 Parcel (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/parcels/:id/status` | Update parcel status |
| GET | `/parcels` | View all parcels with filters |
| GET | `/parcels/:id` | View single parcel (details) |

---

## ⚙️ Technologies Used

- **Node.js + Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (schema validation)
- **JWT** (Authentication)
- **Dotenv, Cors, Morgan** (utilities)

---

## 🤝 Author
**Sujon Sheikh 🧑‍💻**   
Full-Stack MERN Developer  
📧 sujonsheikh.dev@gmail.com  

---

## **Happy coding! 🧑‍💻 🚀 **