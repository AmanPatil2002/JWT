# JWT Authentication System

A full-stack web application demonstrating JWT (JSON Web Token) authentication with a React frontend and an Express.js backend. It shows token-based authentication, user session handling, and protected routes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Security Notes](#security-notes)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

## Features

- JWT-based authentication
- User registration and login
- Protected frontend routes and protected API endpoints
- Student dashboard displaying student information (mock data)
- Responsive UI built with Bootstrap and Tailwind CSS
- REST API with middleware for token verification
- MySQL database for data persistence
- Secrets and configuration kept in environment variables

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router DOM
- Bootstrap 5
- Tailwind CSS
- Faker.js (mock data)

**Backend**

- Node.js and Express.js
- `jsonwebtoken` (JWT)
- `mysql2`
- `dotenv`
- `cors`
- `nodemon` (development auto-reload)

## Project Structure

```
JWT/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx           # Main component
│   └── package.json
├── backend/                  # Express server
│   ├── config/               # Configuration files
│   ├── controller/           # Route controllers
│   ├── middleware/           # Custom middleware (JWT verification)
│   ├── routes/               # API routes
│   ├── server.js             # Entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jwt_auth
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

> Never commit your `.env` file. Use a long, random value for `JWT_SECRET`.

## Available Scripts

**Frontend**

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

**Backend**

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server with nodemon (auto-reload) |

## API Endpoints

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| POST | `/api/auth/logout` | Log out | No |
| GET | `/api/user/profile` | Get the user profile | Yes |
| GET | `/api/user/student` | Get student information | Yes |

## Authentication Flow

1. The user registers with an email and password.
2. The backend stores the hashed password in MySQL.
3. The user logs in with their credentials.
4. The backend generates a JWT.
5. The frontend stores the token on the client.
6. The token is sent in the `Authorization` header for protected routes.
7. Backend middleware verifies the token on each protected request.

## Security Notes

- Passwords are hashed before storage.
- Protected API routes are guarded by JWT verification middleware.
- CORS is configured on the backend.
- Sensitive values live in environment variables, not in the code.

## Future Enhancements

- [ ] Token refresh mechanism
- [ ] Role-based authorization
- [ ] Email verification
- [ ] Password reset
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Test suite

## Author

**Aman Patil** — [@AmanPatil2002](https://github.com/AmanPatil2002)
