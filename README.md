# 📚 StudyNook – Library Study Room Booking System

🔗 Live Site: https://study-nook-kzhimel.vercel.app/
🔗 Client Repo: https://github.com/Kz-Himel/study-nook  
🔗 Server Repo: https://github.com/Kz-Himel/studynook-server    

---

## 🧠 About The Project

StudyNook is a full-stack MERN + Next.js web application where students and library users can:

- Create study rooms they control
- Browse and search available rooms
- Book rooms with specific time slots
- Manage their own bookings and listings

The system includes **secure JWT authentication using HTTP-only cookies**, role-based access control, and a smart booking conflict detection system.

---

## 🚀 Key Features

### 🔐 Authentication
- Email/password login & registration
- Google OAuth login
- JWT stored in HTTP-only cookies
- Protected routes with middleware
- Secure logout system

### 🏠 Room Management
- Add new study rooms (private route)
- Edit & delete only own rooms
- View all available rooms
- Room details page with full info

### 📅 Booking System
- Book rooms with date & time slots
- Real-time total cost calculation
- Conflict detection (no double booking)
- Cancel future bookings

### 📊 Dashboard System
- My Listings (rooms you created)
- My Bookings (rooms you booked)

### 🔎 Search & Filter
- Search rooms by name (`$regex`)
- Filter by amenities (`$in`)
- Price & floor filtering (`$gte`, `$lte`)

### 🎨 UI/UX
- Fully responsive (mobile, tablet, desktop)
- Dark/Light theme toggle
- Framer Motion animations
- Clean SaaS-style UI
- Toast notifications (no alert used)

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Hot Toast
- Next.js Image Optimization

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- CORS

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server generates JWT token
3. Token stored in HTTP-only cookie
4. Middleware verifies token on every protected route
5. Logout clears cookie securely

---

## 📅 Booking Logic (Core Feature)

### Conflict Prevention Algorithm:
- Each booking has:
  - startTime
  - endTime
  - date

### Conflict Rule:
A new booking is rejected if:

This ensures no overlapping bookings for the same room.

---

## 🏠 Pages Overview

### Public Routes
- `/` → Home page
- `/rooms` → All rooms
- `/login` → Login page
- `/register` → Register page

### Private Routes
- `/add-room` → Create room
- `/rooms/:id` → Room details
- `/my-listings` → Your rooms
- `/my-bookings` → Your bookings

---

## ⚙️ Environment Variables

### Client (.env)


---

## 🧪 API Features Used

- `$regex` → search rooms
- `$in` → amenities filtering
- `$gte / $lte` → price filtering
- `$push` → add booking ID to user
- `$pull` → remove booking on cancel
- JWT middleware for protected routes

---

## 📱 Responsive Design

- Mobile: 1 column grid
- Tablet: 2 column grid
- Desktop: 3 column grid
- Fully responsive navbar & dashboard

---

## 🏆 Challenge Requirements Fulfilled

✔ JWT authentication with HTTP-only cookies  
✔ Role-based access control (owner-only edit/delete)  
✔ Advanced booking conflict system  
✔ Search & filter system  
✔ Secure CRUD operations  
✔ Fully responsive UI  
✔ Dynamic dashboard system  
✔ Toast-based notifications (no alerts)  
✔ Custom 404 page  
✔ Protected routes persist after reload  

---

## 👨‍💻 Developer Info

**Name:** Your Name  
**Role:** Full Stack Developer  
**Stack:** MERN + Next.js  

---

## 📌 Notes

This project is built for **CAT_12 Assignment** with full-stack functionality, secure authentication, and production-level UI/UX design.

All requirements from the assignment brief have been implemented including:
- Booking system logic
- Authentication security
- CRUD operations
- Search/filter system
- Responsive design

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub and feel free to explore or contribute!
