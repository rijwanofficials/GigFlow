# GigFlow – Freelance Gig Management Platform

GigFlow is a backend-focused full-stack web application built using the **MERN stack** to connect clients and freelancers through gig posting, bidding, and hiring workflows.  
This project demonstrates real-world backend engineering concepts including authentication, REST API design, database integration, real-time communication, and production debugging.

---

## ✨ Features

- **Secure Authentication**
  - JWT-based authentication
  - HTTP-only cookies
  - Password hashing using bcrypt

- **User & Profile Management**
  - Signup & login flow
  - Fetch logged-in user profile
  - Role-based access handling

- **Gig Management**
  - Create, view, and list gigs
  - Budget & ownership validation
  - Public gig discovery

- **Bidding & Hiring System**
  - Freelancers can place bids on gigs
  - Gig owners can view bids
  - Hire freelancer functionality

- **Real-Time Notifications**
  - Socket.io integration
  - Instant notification when a freelancer is hired

- **RESTful API Architecture**
  - Clean route structure
  - Centralized error handling
  - Proper HTTP status codes

- **Production-Ready Setup**
  - Environment-based configuration
  - Debugged real production issues (CORS, 500 errors, auth)
  - Backend deployed on Render
  - Frontend deployed on Vercel

---

## 📁 Project Structure

```
GigFlow/
├── Frontend/
│ ├── src/
│ │ ├── assets/ # Static assets (images, icons)
│ │ │
│ │ ├── components/ # Reusable UI components
│ │ │ ├── CallToAction.tsx
│ │ │ ├── EditableProfileDetails.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Freelancers.tsx
│ │ │ ├── GigsSection.tsx
│ │ │ ├── HeroSection.tsx
│ │ │ ├── HowItWorks.tsx
│ │ │ ├── LandingNavbar.tsx
│ │ │ ├── MyBids.tsx
│ │ │ ├── NotificationsPanel.tsx
│ │ │ ├── ProfileCard.tsx
│ │ │ ├── ProtectedRoutes.tsx
│ │ │ └── Sidebar.tsx
│ │ │
│ │ ├── config/ # Frontend configuration
│ │ ├── layout/ # App layouts
│ │ │
│ │ ├── Pages/ # Route-level pages
│ │ │ ├── CreateGig.tsx
│ │ │ ├── Dashboard.tsx
│ │ │ ├── Homes.tsx
│ │ │ ├── Login.tsx
│ │ │ ├── PageNotFound.tsx
│ │ │ ├── PlaceBid.tsx
│ │ │ ├── Profile.tsx
│ │ │ ├── Signup.tsx
│ │ │ └── ViewBids.tsx
│ │ │
│ │ ├── redux/ # Redux Toolkit slices
│ │ │ ├── authSlice.ts
│ │ │ ├── bidSlice.ts
│ │ │ ├── gigSlice.ts
│ │ │ ├── notificationSlice.ts
│ │ │ └── store.ts
│ │ │
│ │ ├── socket/ # Socket.io client
│ │ │ └── socket.ts
│ │ │
│ │ ├── Ui/ # Shared UI primitives
│ │ ├── utils/ # Utility helpers
│ │ │ └── toast.ts
│ │ │
│ │ ├── App.tsx # Root component
│ │ ├── AppRoutes.tsx # Route configuration
│ │ ├── index.css # Global styles
│ │ ├── main.tsx # Entry point
│ │ └── vite-env.d.ts
│ │
│ ├── .env # Frontend environment variables
│ ├── eslint.config.js
│ ├── package.json
│ └── .gitignore
│
├── Backend/
│ ├── api/
│ │ └── v1/
│ │ ├── auth/
│ │ │ ├── controller.ts
│ │ │ ├── routes.ts
│ │ │ └── validator.ts
│ │ │
│ │ ├── bid/
│ │ │ ├── controller.ts
│ │ │ ├── routes.ts
│ │ │ └── validator.ts
│ │ │
│ │ ├── gig/
│ │ │ ├── controller.ts
│ │ │ ├── routes.ts
│ │ │ └── validator.ts
│ │ │
│ │ ├── notification/
│ │ │ ├── controller.ts
│ │ │ └── routes.ts
│ │ │
│ │ ├── otp/
│ │ │ ├── controller.ts
│ │ │ ├── routes.ts
│ │ │ └── validator.ts
│ │ │
│ │ ├── user/
│ │ │ ├── controller.ts
│ │ │ ├── middleware.ts
│ │ │ └── routes.ts
│ │ │
│ │ └── helpers/
│ │ └── authHelper.ts
│ │
│ ├── middleware/
│ │ ├── otpMiddleware.ts
│ │ └── upload.ts
│ │
│ ├── config/
│ │ ├── cloudinary.ts
│ │ ├── mongo.ts
│ │ └── postgre.ts
│ │
│ ├── models/
│ │ ├── bidSchema.ts
│ │ ├── gigSchema.ts
│ │ ├── notificationSchema.ts
│ │ ├── otpSchema.ts
│ │ └── userSchema.ts
│ │
│ ├── prisma/ # Prisma schema & migrations
│ │
│ ├── service/
│ │ └── emailHelper.ts
│ │
│ ├── socket/
│ │ └── index.ts # Socket.io server
│ │
│ ├── types/ # Shared TypeScript types
│ │
│ ├── app.ts # Express app setup
│ ├── package.json
│ ├── package-lock.json
│ ├── .env # Backend environment variables
│ └── .gitignore
│
└── README.md
```

## 🛠️ Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - Choose one:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local installation)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud database)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (for cloning the repository)

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GigFlow

```
2. Environment Configuration

Create environment files for both backend and frontend.

Backend (Backend/.env)

Edit the `.env` file with your configuration:

```env
# Backend Environment Variables
PORT=4000
MONGO_URI=mongodb+srv://husainr***********************
POSTGRES_URL=postgresql://neondb_owner:npg_LgmyvY6Jk8aF@ep-ancient-bonus-a13j*****************************
DATABASE_URL=postgresql://neondb_owner:npg_LgmyvY6Jk8aF@ep-ancient********************
RESEND_API_KEY=re_jdRggugd_6KB2pXAde3gUvhF7pcnwBCBg
JWT_SECRET=your_jwt_secret_key_her
CLOUDINARY_CLOUD_NAME=**************
CLOUDINARY_API_KEY=147964************
CLOUDINARY_API_SECRET=cjSvMRsap*************

# Frontend Environment Variables
VITE_BACKEND_URL=https://gigflow-42******
```

**Important Notes:**
- Replace `your_super_secret_jwt_key_here` with a strong, unique secret key
- For MongoDB Atlas, use your connection string: `mongodb+srv://username:password@cluster.mongodb.net/***`
- Ensure MongoDB is running if using local installation

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Start the backend development server:

```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

**Expected Output:**
```
[nodemon] starting `node server.js`
Server running in development mode on port 5000
MongoDB Connected: <your-mongodb-connection>
```

### 4. Frontend Setup

Open a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

**Expected Output:**
```
▲ Next.js 15.5.0
- Local:        http://localhost:3000
- Environments: .env

✓ Starting...
✓ Ready in 2.1s
```

5. Initial Application Setup

Open your browser and navigate to http://localhost:5173

Sign up as a User / Freelancer
Verify email using OTP
Login to access the dashboard

## 📚 Usage Guide

### User Authentication

Sign up using email and password
OTP verification for secure registration
JWT-based authentication for protected routes

### Gigs Management

# For Clients

Create new gigs with title, description, and budget
View all gigs posted by you
Track bids received on your gigs

# For Freelancers

Browse available gigs
View gig details
Place bids on gigs
Track bids you have placed

### Bidding System

Freelancers can place bids on available gigs

Clients can:
View all bids on their gig
Accept or review bids

### Profile Management
View and update user profile
Edit personal details
View activity (posted gigs / bids)

### Notifications
Real-time notifications using Socket.io
Notifications for:
New bids
Bid updates
Gig-related actions



## 🔧 API Documentation

Base URL:http://localhost:5000/api/v1



---

## 🔐 Authentication & OTP

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| POST | `/auth/signin` | Register a new user | No |
| POST | `/auth/login` | Login with email & password | No |
| GET | `/auth/profile` | Get logged-in user profile | Yes |

---

### OTP Endpoints

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| POST | `/otps/send` | Send OTP to email | No |
| POST | `/otps/verify` | Verify OTP | No |

---

## 👤 User Management

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| GET | `/users/profile` | Get user profile | Yes |
| PUT | `/users/profile` | Update profile details | Yes |

---

## 💼 Gig Management

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| POST | `/gigs` | Create a new gig | Yes |
| GET | `/gigs` | Get all available gigs | No |
| GET | `/gigs/:id` | Get gig by ID | No |
| PUT | `/gigs/:id` | Update gig | Yes (Owner) |
| DELETE | `/gigs/:id` | Delete gig | Yes (Owner) |

---

## 💰 Bid Management

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| POST | `/bids/:gigId` | Place bid on a gig | Yes |
| GET | `/bids/my-bids` | Get bids placed by user | Yes |
| GET | `/bids/gig/:gigId` | Get bids for a gig | Yes (Owner) |

---

## 🔔 Notifications

| Method | Endpoint | Description | Auth Required |
|------|--------|------------|---------------|
| GET | `/notifications` | Get user notifications | Yes |
| PUT | `/notifications/read/:id` | Mark notification as read | Yes |

---

## 🔌 Real-Time (Socket.io)

| Event | Description |
|-----|------------|
| `newBid` | Triggered when a new bid is placed |
| `notification` | Sends real-time notifications |
| `joinRoom` | Join user-specific socket room |

---

## ⚠️ Error Handling

All API responses follow a consistent error format:

json

```{
  "success": false,
  "message": "Error message here"
}
```


Success responses:

```{
  "success": true,
  "data": {}
}
```

## 🛠️ Technology Stack

### Backend Technologies

- **Node.js** – JavaScript runtime for backend services
- **Express.js** – REST API framework
- **TypeScript** – Type-safe backend development
- **MongoDB** – NoSQL database for users, gigs, bids, and notifications
- **Mongoose** – ODM for MongoDB schema modeling
- **JWT (JSON Web Tokens)** – Authentication & authorization
- **bcrypt** – Secure password hashing
- **Multer** – File upload handling
- **Cloudinary** – Media storage & image uploads
- **Socket.io** – Real-time notifications & bid updates
- **CORS** – Cross-origin request handling
- **dotenv** – Environment variable management

---

### Frontend Technologies

- **React.js** – UI library
- **TypeScript** – Strong typing & maintainability
- **Vite** – Fast development & build tooling
- **Tailwind CSS** – Utility-first styling
- **Redux Toolkit** – Global state management
- **React Router DOM** – Client-side routing
- **Axios** – API communication
- **React Toastify** – Toast notifications
- **Lucide React / React Icons** – Icon system

---

### DevOps & Tools

- **Git & GitHub** – Version control
- **Postman** – API testing
- **Render** – Backend deployment
- **Vercel** – Frontend deployment
- **ESLint** – Code linting & quality
- **Socket.io Client** – Real-time frontend communication

---

## 🔍 Troubleshooting

### Common Issues and Solutions

---

### Backend Issues

#### MongoDB Connection Error
```
**Solution:** Ensure MongoDB is running locally or check your Atlas connection string.

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in your `.env` file or kill the process using port 5000.

**JWT Secret Missing**
```
Error: JWT_SECRET is not defined
```
**Solution:** Add a JWT_SECRET to your `.env` file.

#### Frontend Issues

**API Connection Error**
```
Network Error or CORS issues
```
**Solution:** Ensure backend is running and NEXT_PUBLIC_API_URL is correct in `.env`.

**Build Errors**
```
TypeScript or ESLint errors
```
**Solution:** Run `npm run lint` to identify and fix linting issues.

### Development Commands

#### Backend Commands
```bash
cd Backend
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

#### Frontend Commands
```bash
cd Frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **Password Hashing**: User passwords are securely hashed using bcrypt before storing in the database
- **JWT Authentication**: Token-based authentication with protected routes and middleware
- **Role-Based Access Control**: Access restrictions for actions like posting gigs, bidding, and hiring
- **Input Validation**: Server-side validation using custom validators to prevent invalid or malicious requests
- **CORS Protection**: Configured CORS to allow only trusted frontend origins with credential support
- **Secure Cookies & Headers**: Authentication tokens handled securely across requests
- **Environment Variables**: Sensitive data (JWT secret, DB URI, API keys) stored using environment variables
- **Socket Event Validation**: Secure real-time events for hiring and notifications

---

## 📈 Performance Considerations

- **Efficient Database Queries**: Indexed fields for users, gigs, and bids to optimize read performance
- **Lean API Responses**: Optimized API payloads to reduce response size
- **Error Handling Middleware**: Centralized error handling to prevent server crashes
- **Connection Pooling**: MongoDB connection pooling for improved scalability
- **Asynchronous Operations**: Non-blocking async controllers for better request handling
- **Socket.io Optimization**: Event-driven notifications instead of frequent polling
- **Environment-Based Configurations**: Separate development and production configurations for stability

---


## 🚀 Deployment

### Production Build

1. **Backend Production:**
   ```bash
   cd Backend
   npm start
   ```

2. **Frontend Production:**
   ```bash
   cd Frontend
   npm run build
   npm start
   ```

### Environment Variables for Production

Update your production `.env` file:
```env
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=30d
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all prerequisites are properly installed
4. Verify environment variables are correctly configured

---
