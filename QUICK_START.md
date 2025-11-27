# Quick Start Guide

## ✅ What's Been Set Up

Your backend is now fully configured with:
- ✅ Express server (`backend/server.js`)
- ✅ Database models (User, Course, Lesson, Progress)
- ✅ API routes (auth, courses, users)
- ✅ Authentication middleware
- ✅ Package.json with proper scripts

## 🚀 Next Steps to Get Running

### Step 1: Set Up MongoDB

**Option A: MongoDB Atlas (Recommended - Free & Easy)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Whitelist your IP (or use `0.0.0.0/0` for development)
6. Get your connection string

**Option B: Local MongoDB**
- Install MongoDB locally
- Default connection: `mongodb://localhost:27017/education-platform`

### Step 2: Create Environment Files

**Backend `.env` file** (create `backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/education-platform
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/education-platform?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Frontend `.env` file** (create `.env` in root):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/api/health
```

### Step 4: Start the Frontend

In a new terminal:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Step 5: Test It Out

1. **Test Backend Health**: Visit `http://localhost:5000/api/health`
2. **Register a User**: Use the registration form in the frontend
3. **Login**: Use your credentials or the mock accounts:
   - Admin: `admin` / `admin123`
   - Instructor: `instructor` / `instructor123`
   - Student: `student` / `student123`

## 📝 Important Notes

- The frontend will automatically fall back to mock data if the backend is unavailable
- Make sure MongoDB is running before starting the backend
- Change `JWT_SECRET` to a secure random string in production
- The backend uses ES modules (`"type": "module"`)

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB connection string in `.env`
- Make sure MongoDB is running (if local)
- Check if port 5000 is already in use

**Frontend can't connect:**
- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console for CORS errors

**MongoDB connection fails:**
- Verify connection string format
- Check network access (for Atlas)
- Ensure database user has proper permissions

## 🎯 What You Can Do Now

1. **Test Authentication**: Register and login users
2. **Create Courses**: Use the instructor dashboard (when implemented)
3. **Enroll in Courses**: Browse and enroll as a student
4. **Track Progress**: Complete lessons and track your progress
5. **Take Quizzes**: Complete quizzes in lessons

## 📚 Next Features to Add

- [ ] Database seeding script (populate with sample courses)
- [ ] File upload for course thumbnails and videos
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Admin dashboard features
- [ ] Instructor course creation
- [ ] Search and filtering
- [ ] Payment integration

## 📖 Documentation

- See `BACKEND_SETUP_GUIDE.md` for detailed backend setup
- See `SETUP_INSTRUCTIONS.md` for complete project setup
- See `README.md` for project overview

