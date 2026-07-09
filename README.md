# JWT Authentication System

A full-stack web application demonstrating JWT (JSON Web Token) authentication with a React frontend and Express.js backend. This project showcases secure authentication patterns, user session management, and protected routes.

## Features

- **JWT Authentication**: Secure token-based authentication system
- **User Login & Registration**: Complete authentication flow
- **Protected Routes**: Role-based access control
- **Student Dashboard**: Display student information with mock data
- **Responsive UI**: Built with Bootstrap and Tailwind CSS
- **REST API**: Express.js backend with proper middleware
- **Database Integration**: MySQL for data persistence
- **Environment Configuration**: Secure environment variable management

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Faker.js** - Generate mock data

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT (jsonwebtoken)** - Token authentication
- **MySQL2** - Database driver
- **Dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## Project Structure

```
JWT/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main component
│   └── package.json
├── backend/                  # Express server
│   ├── config/              # Configuration files
│   ├── controller/          # Route controllers
│   ├── middleware/          # Custom middleware (JWT)
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jwt_auth
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server with auto-open
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start server with nodemon (auto-reload)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User
- `GET /api/user/profile` - Get user profile (protected)
- `GET /api/user/student` - Get student information (protected)

## Authentication Flow

1. User registers with email and password
2. Backend stores hashed password in MySQL
3. User logs in with credentials
4. Backend generates JWT token
5. Frontend stores token in localStorage/sessionStorage
6. Token is included in Authorization header for protected routes
7. Backend middleware verifies token on each request

## Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing
- ✅ CORS protection
- ✅ Protected API routes
- ✅ Environment variables for sensitive data
- ✅ Middleware validation

## Future Enhancements

- [ ] Token refresh mechanism
- [ ] Role-based authorization
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Test suite

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, please open an issue in the repository.
