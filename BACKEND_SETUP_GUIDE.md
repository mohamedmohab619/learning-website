# MongoDB Backend Setup Guide

This guide will help you set up a complete MongoDB backend for the educational platform.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Step 1: Install MongoDB

### Option A: Local MongoDB Installation

1. **Windows:**
   - Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Run the installer and follow the setup wizard
   - MongoDB will be installed as a Windows service

2. **macOS:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

3. **Linux:**
   ```bash
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

## Step 2: Create Backend Directory Structure

```bash
mkdir backend
cd backend
npm init -y
```

## Step 3: Install Dependencies

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

## Step 4: Create Backend Files

### package.json
```json
{
  "name": "education-platform-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### .env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/education-platform
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/education-platform?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### server.js
```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
```

## Step 5: Create Database Models

### models/User.js
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    enrolledAt: { type: Date, default: Date.now },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
```

### models/Course.js
```javascript
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x200',
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  students: {
    type: Number,
    default: 0,
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Course', courseSchema);
```

### models/Lesson.js
```javascript
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'quiz', 'text'],
    default: 'video',
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  thumbnail: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  content: {
    type: String,
  },
  resources: [{
    title: String,
    url: String,
    type: String,
  }],
  quiz: {
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
    }],
  },
  order: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Lesson', lessonSchema);
```

### models/Progress.js
```javascript
import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  quizScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  completedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

progressSchema.index({ userId: 1, courseId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
```

## Step 6: Create Middleware

### middleware/auth.js
```javascript
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
```

## Step 7: Create Routes

### routes/auth.js
```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, gender } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = new User({ username, email, password, phone, gender });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
```

### routes/courses.js
```javascript
import express from 'express';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('lessons')
      .populate('instructorId', 'username email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in course
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const isEnrolled = user.enrolledCourses.some(
      (ec) => ec.courseId.toString() === req.params.id
    );

    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Enroll user
    user.enrolledCourses.push({
      courseId: course._id,
      progress: 0,
    });
    await user.save();

    // Update course student count
    course.students += 1;
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user progress
router.get('/progress', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const progress = await Progress.find({ userId: req.userId });
    
    const progressMap = {};
    progress.forEach((p) => {
      if (!progressMap[p.courseId]) {
        progressMap[p.courseId] = { completed: 0, total: 0, percentage: 0 };
      }
      progressMap[p.courseId].total += 1;
      if (p.completed) {
        progressMap[p.courseId].completed += 1;
      }
    });

    Object.keys(progressMap).forEach((courseId) => {
      const p = progressMap[courseId];
      p.percentage = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
    });

    res.json(Object.entries(progressMap).map(([courseId, data]) => ({
      courseId,
      ...data,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update lesson progress
router.post('/:courseId/lessons/:lessonId/progress', authenticate, async (req, res) => {
  try {
    const { completed } = req.body;
    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.userId,
        courseId: req.params.courseId,
        lessonId: req.params.lessonId,
      },
      {
        userId: req.userId,
        courseId: req.params.courseId,
        lessonId: req.params.lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz
router.post('/:courseId/lessons/:lessonId/quiz', authenticate, async (req, res) => {
  try {
    const { answers } = req.body;
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson || !lesson.quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correct = 0;
    lesson.quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct += 1;
      }
    });

    const score = Math.round((correct / lesson.quiz.questions.length) * 100);

    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.userId,
        courseId: req.params.courseId,
        lessonId: req.params.lessonId,
      },
      {
        userId: req.userId,
        courseId: req.params.courseId,
        lessonId: req.params.lessonId,
        completed: score >= 60,
        quizScore: score,
        completedAt: score >= 60 ? new Date() : null,
      },
      { upsert: true, new: true }
    );

    res.json({ score, total: lesson.quiz.questions.length, progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
```

### routes/users.js
```javascript
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get dashboard data
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('enrolledCourses.courseId')
      .select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update settings
router.put('/settings', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
```

## Step 8: Run the Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## Step 9: Test the API

You can test the API using:
- Postman
- curl
- Your frontend application

Example test:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Step 10: Update Frontend API URL

In your frontend `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Additional Features to Implement

1. **File Upload**: Use Multer for course thumbnails and video uploads
2. **Email Verification**: Send verification emails using Nodemailer
3. **Password Reset**: Implement password reset functionality
4. **Rate Limiting**: Use express-rate-limit to prevent abuse
5. **Validation**: Use express-validator for input validation
6. **Error Handling**: Create centralized error handling middleware
7. **Logging**: Use Winston or Morgan for logging
8. **Testing**: Add unit and integration tests

## Security Best Practices

1. Always use HTTPS in production
2. Store JWT_SECRET in environment variables
3. Implement rate limiting
4. Validate and sanitize all inputs
5. Use strong password requirements
6. Implement CORS properly
7. Use helmet.js for security headers
8. Regularly update dependencies

## Deployment

### Heroku
1. Create a Heroku app
2. Add MongoDB Atlas connection string
3. Set environment variables
4. Deploy using Git

### Vercel/Netlify
- These are primarily for frontend
- Use a separate service (Railway, Render, etc.) for backend

### Railway/Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## Troubleshooting

1. **Connection Issues**: Check MongoDB URI and network access
2. **CORS Errors**: Ensure CORS is properly configured
3. **JWT Errors**: Verify JWT_SECRET is set correctly
4. **Port Conflicts**: Change PORT in .env if 5000 is in use

## Next Steps

1. Seed the database with sample courses and lessons
2. Implement file upload for course content
3. Add search and filtering functionality
4. Implement notifications
5. Add analytics and reporting

