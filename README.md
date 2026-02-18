# 🚀 FixMitra – Smart Service Booking Platform

FixMitra is a full-stack Smart Service Booking Platform built using the MERN stack.  
It connects Users, Providers, and Admin in a secure, scalable ecosystem.

This project is designed with production-level architecture, role-based access control, analytics dashboard, and secure authentication.

---

## 🌍 Project Vision

FixMitra aims to digitize local and industrial services by providing:

- Instant booking of trusted professionals
- Secure payment flow
- Multi-role authentication
- Admin monitoring & control system
- Analytics & revenue tracking
- Provider performance monitoring

---

# 🏗️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- Recharts (Analytics)
- Context API (Auth System)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Role-Based Middleware

### Other
- Razorpay (Demo Mode)
- Socket.io (Real-time Admin Updates)
- Bcrypt (Password Hashing)

---

# 👥 Roles & Permissions

## 👤 USER
- Register / Login
- Browse Services
- Filter by Category
- Book Services
- Review Providers
- Report Providers
- Secure Payment

## 🛠️ PROVIDER
- Add Service
- Delete Own Services
- Manage Bookings
- View Dashboard
- Performance Tracking

## 🛡️ ADMIN
- View All Users
- Block / Unblock Users
- Delete Providers
- Revenue Monitoring
- Analytics Dashboard
- View Reports
- Monitor Platform Activity

---

# 🔐 Authentication System

- JWT Based Authentication
- Role-Based Route Protection
- Multi-Role Login (Same Browser)
- Active Role Switching
- Token Expiry: 7 Days
- Secure Password Hashing (bcrypt)

---

# 📊 Admin Intelligence System

### Revenue Tracking
Revenue is calculated dynamically from COMPLETED bookings.

### Provider Auto-Flag System
If provider rating < 2.0 → flagged for review.

### Analytics
- Monthly booking growth
- Revenue trend
- Booking status distribution
- Active user tracking

### Monitoring Panel
- Total Users
- Total Providers
- Services
- Bookings
- Active Sessions

---

# 📦 Database Design (MongoDB)

## Collections

### Users


name
email
password
role (USER / PROVIDER / ADMIN)
isBlocked
performanceScore
timestamps


### Services


title
description
price
location
image
provider (ObjectId)
category (ObjectId)
timestamps


### Categories


name


### Bookings


user
service
address
scheduledAt
status (PENDING / ACCEPTED / COMPLETED)
timestamps


### Reviews


user
service
rating
comment


---

# 🧠 Architecture Philosophy

This project follows:

- Clean route separation
- Middleware-based security
- Scalable role architecture
- Stateless authentication
- API-first design
- Component-based frontend architecture

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository



git clone <repo-url>
cd UrbanClap


---

## 2️⃣ Backend Setup



cd backend
npm install


Create `.env`



PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run server:



npm run dev


---

## 3️⃣ Frontend Setup



cd frontend
npm install
npm run dev


---

# 🔄 Multi-Login System

FixMitra supports:

- Admin login
- Provider login
- User login
- Same browser multi-session
- Role switching system

Storage format:


user_USER
user_PROVIDER
user_ADMIN
activeRole


---

# 📈 Future Improvements

- Razorpay Live Integration
- AI-based Provider Ranking
- Real-time Notifications
- Chat System
- Geo-based Service Filtering
- Service Recommendation Engine
- Admin AI Risk Detection
- Dark Mode
- PWA Support

---

# 🧪 Production Readiness Checklist

✔ Role-based access control  
✔ Secure JWT system  
✔ Protected API routes  
✔ Admin moderation system  
✔ Clean database schema  
✔ Analytics dashboard  
✔ Error handling middleware  
✔ Scalable architecture  

---

# 💡 Developer Mindset

This project was built keeping:

- Startup scalability
- Real-world architecture
- Security best practices
- Clean coding principles
- Component reusability
- Performance optimization

---

# 👨‍💻 Author

Rahul Singh  
Full Stack Developer  
MERN Stack | System Design | Backend Architecture  

---

# ⭐ Final Note

FixMitra is not just a project.  
It is a production-ready foundation for a scalable service marketplace platform.