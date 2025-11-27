# Complete Setup Instructions

This document provides step-by-step instructions to set up and run the complete educational platform.

## Project Overview

This is a full-stack educational platform with:
- **Frontend**: React 18 with Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB
- **Features**: User authentication, course management, video lessons, quizzes, progress tracking

## Quick Start Guide

### Step 1: Frontend Setup

1. **Navigate to the project directory**
   ```bash
   cd MERGED_PROJECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Step 2: Backend Setup

1. **Create backend directory**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install backend dependencies**
   ```bash
   npm install express mongoose cors dotenv bcryptjs jsonwebtoken
   npm install --save-dev nodemon
   ```

3. **Set up MongoDB**
   - **Option A**: Install MongoDB locally
   - **Option B**: Use MongoDB Atlas (recommended for beginners)
     - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
     - Create a free cluster
     - Get your connection string

4. **Create backend files**
   Follow the complete guide in `BACKEND_SETUP_GUIDE.md` to create:
   - `server.js`
   - `models/` directory with User, Course, Lesson, Progress models
   - `routes/` directory with auth, courses, users routes
   - `middleware/auth.js`

5. **Create backend `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/education-platform
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/education-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

6. **Start backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Step 3: Verify Setup

1. **Check frontend**: Open `http://localhost:3000` in your browser
2. **Check backend**: Visit `http://localhost:5000/api/health` - should return `{"status":"OK"}`
3. **Test registration**: Try registering a new user
4. **Test login**: Login with your credentials

## Project Structure

```
MERGED_PROJECT/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CourseCard.jsx
│   │   ├── LessonPlayer.jsx
│   │   ├── Quiz.jsx
│   │   ├── ProgressTracker.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── CoursePage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Dashboard.jsx
│   │   └── Settings.jsx
│   ├── contexts/            # React Context
│   │   ├── AuthContext.jsx
│   │   └── CourseContext.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── useMediaQuery.js
│   │   └── useLocalStorage.js
│   ├── services/           # API services
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── BACKEND_SETUP_GUIDE.md   # Complete backend guide
├── README.md               # Project documentation
└── package.json
```

## React Hooks Used

### Built-in Hooks
- **useState**: Component state management
- **useEffect**: Side effects and lifecycle
- **useContext**: Access context values
- **useRef**: DOM references
- **useMemo**: Memoization for performance
- **useCallback**: Function memoization

### Custom Hooks
- **useMediaQuery**: Responsive design detection
- **useLocalStorage**: Local storage management
- **useAuth**: Authentication context hook
- **useCourse**: Course context hook

## Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes
- ✅ Profile management
- ✅ Password hashing with bcrypt

### Course Management
- ✅ Browse all courses
- ✅ Search and filter courses
- ✅ Course enrollment
- ✅ Progress tracking
- ✅ Lesson completion

### Learning Features
- ✅ Custom video player with controls
- ✅ Interactive quizzes
- ✅ Progress tracking
- ✅ Resource downloads
- ✅ Course completion tracking

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean interface
- ✅ Loading states
- ✅ Error handling
- ✅ Success messages

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/progress` - Get user progress
- `POST /api/courses/:courseId/lessons/:lessonId/progress` - Update progress
- `POST /api/courses/:courseId/lessons/:lessonId/quiz` - Submit quiz

### Users
- `GET /api/users/dashboard` - Get dashboard data
- `PUT /api/users/settings` - Update settings

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Ensure CORS is enabled in backend `server.js`:
```javascript
app.use(cors());
```

### Issue: Cannot connect to MongoDB
**Solution**: 
- Check MongoDB is running (if local)
- Verify connection string in `.env`
- Check network access (if using Atlas)

### Issue: JWT Token Errors
**Solution**: 
- Ensure JWT_SECRET is set in backend `.env`
- Check token is being sent in Authorization header
- Verify token hasn't expired

### Issue: Port Already in Use
**Solution**: 
- Change PORT in `.env` file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

## Next Steps

1. **Seed Database**: Create sample courses and lessons
2. **Add File Upload**: Implement course thumbnail and video uploads
3. **Email Verification**: Add email verification on registration
4. **Password Reset**: Implement password reset functionality
5. **Notifications**: Add real-time notifications
6. **Analytics**: Track user engagement and course completion
7. **Payment Integration**: Add payment processing for paid courses
8. **Certificates**: Generate completion certificates

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

### Backend (Railway/Render/Heroku)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## Support

For detailed backend setup, see `BACKEND_SETUP_GUIDE.md`
For project documentation, see `README.md`

## License

This project is open source and available under the MIT License.

