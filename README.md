# 🚀 GigFlow – Real-Time Gig Hiring Platform

GigFlow is a full-stack MERN application designed to simplify gig hiring with secure authentication and real-time updates. The platform allows users to post gigs, apply for jobs, and receive instant notifications when they are hired.

---

## ✨ Features

- 🔐 Secure authentication using JWT and HTTP-only cookies  
- 👤 User profiles with role-based access  
- 📄 Create, browse, and apply for gigs  
- ⚡ Real-time hiring notifications using Socket.IO  
- 🔔 Notification system stored and managed via Redux  
- 🌐 Production-ready setup with CORS and cookie handling  

---

## 🛠 Tech Stack

**Frontend**
- React  
- Redux Toolkit  
- TypeScript  
- Fetch API  

**Backend**
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- Socket.IO  

**Other**
- Cookie-based authentication (HTTP-only cookies)  
- CORS configuration for cross-origin requests  

---

## 🔄 Application Flow

1. Users register and log in securely using email and password  
2. JWT is stored in an HTTP-only cookie for authentication  
3. Logged-in users can create gigs or apply for available gigs  
4. When a user is hired, a real-time notification is sent using Socket.IO  
5. Users can log out, which clears the authentication cookie from the browser  

---

## 🧪 Authentication & Security

- Uses HTTP-only cookies to prevent XSS attacks  
- Secure and SameSite cookie configuration for production  
- Proper logout flow that clears cookies from the browser  
- Backend-protected routes with middleware  

---

## 📦 Setup Instructions (Local)


# Clone the repository
git clone <your-repo-url>

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Backend
npm run dev

# Frontend
npm run dev
🚀 Deployment
Frontend deployed on Vercel

Backend deployed on Render
MongoDB hosted on MongoDB Atlas

#Future Improvements
Payment integration for gigs

Advanced search and filtering

Admin dashboard

Analytics and reporting

Author
Rijwan Husain
Full Stack MERN Developer
