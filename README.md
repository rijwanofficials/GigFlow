GigFlow – Freelance Gig Management Platform

GigFlow is a backend-focused full-stack web application designed to connect clients and freelancers through a simple gig posting and bidding workflow. The project demonstrates real-world backend engineering concepts including authentication, REST API design, database integration, and production-level debugging.

This application was built with a strong emphasis on backend development practices, secure authentication, and scalable API architecture.

Features

Authentication & Authorization

JWT-based authentication

Secure login & signup flow

Protected routes using middleware

User & Profile Management

User registration and login

Profile fetching and updates

Gig Management

Create, fetch, and list gigs

Role-based access (owner vs freelancer)

Budget and gig ownership handling

Bidding System

Freelancers can place bids on gigs

Gig owners can view bids on their gigs

Hiring workflow with secure validation

Real-Time Notifications

Socket.io integration for hiring events

Instant notifications when a freelancer is hired

RESTful API Architecture

Clean API structure with proper HTTP status codes

Centralized error handling

Production-Ready Setup

Environment-based configuration

Debugged real deployment issues (CORS, 500 errors, auth edge cases)

Backend deployed on Render

Frontend deployed on Vercel

📁 Project Structure
gigflow/
├── backend/
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── gig.controller.ts
│   │   ├── bid.controller.ts
│   │   └── notification.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Gig.ts
│   │   ├── Bid.ts
│   │   └── Notification.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── gig.routes.ts
│   │   ├── bid.routes.ts
│   │   └── notification.routes.ts
│   ├── socket/
│   │   └── index.ts           # Socket.io setup
│   ├── app.ts
│  
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── socket/
│   │   └── utils/
│   └── vite.config.ts
├
├
└── README.md

🛠️ Prerequisites

Before running the project, ensure you have:

Node.js (v18+)

MongoDB (local or Atlas)

npm or yarn

Git

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/rijwanofficials/gigflow.git
cd gigflow

2. Environment Configuration

Create a .env file in the backend directory:

PORT=4000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173

3. Backend Setup
cd backend
npm install
npm run dev


Backend will start at:

http://localhost:4000

4. Frontend Setup
cd frontend
npm install
npm run dev


Frontend will start at:

http://localhost:5173

🔑 API Endpoints (Core)
Authentication
Method	Endpoint	Description
POST	/api/v1/auth/signup	User registration
POST	/api/v1/auth/login	User login
GET	/api/v1/users/profile	Get logged-in user
Gigs
Method	Endpoint	Description
POST	/api/v1/gigs	Create a gig
GET	/api/v1/gigs	Fetch all gigs
GET	/api/v1/gigs/:id	Get gig by ID
Bids
Method	Endpoint	Description
POST	/api/v1/bids	Place a bid
GET	/api/v1/bids/my	Get my bids
GET	/api/v1/bids/:gigId	View bids for a gig
PATCH	/api/v1/bids/:bidId/hire	Hire a freelancer
Notifications
Method	Endpoint	Description
GET	/api/v1/notifications/my	Fetch user notifications
🔒 Security Highlights

Password hashing using bcrypt

JWT-secured API routes

HTTP-only cookies for authentication

Environment variables for sensitive data

Role-based access checks

🧪 Testing & Debugging

APIs tested using Postman

Debugged:

CORS issues between Vercel & Render

500 Internal Server Errors

Authentication cookie issues

Socket.io production setup

🚀 Deployment
Backend

Deployed on Render

Environment variables configured securely

Frontend

Deployed on Vercel

Backend base URL injected using VITE_BACKEND_URL

📈 What This Project Demonstrates

Strong backend fundamentals

REST API design & security

Authentication & authorization workflows

Real-time communication using Socket.io

Production debugging & deployment experience

End-to-end MERN stack understanding

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Rijwan Husain
📧 Email: husainrijwan2001@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/rijwanln/

💻 GitHub: https://github.com/rijwanofficials
