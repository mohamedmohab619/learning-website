# Mock Data and Role-Based Access Guide

This guide explains how to use mock data and the role-based access control system.

## Mock Data

The application includes mock data that automatically activates when the backend API is unavailable. This allows you to test the application without setting up a backend.

### Mock Users

You can login with these test accounts:

#### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: Full access to all features including admin dashboard

#### Instructor Account
- **Username**: `instructor`
- **Password**: `instructor123`
- **Role**: Instructor
- **Access**: Instructor dashboard, course management

#### Student Account
- **Username**: `student`
- **Password**: `student123`
- **Role**: Student
- **Access**: Student dashboard, course enrollment

### How Mock Data Works

1. **Automatic Fallback**: When the API is unavailable, the app automatically uses mock data
2. **Seamless Experience**: The UI works exactly the same with mock data
3. **Local Storage**: Mock data is stored in browser localStorage
4. **Console Warnings**: You'll see console warnings when mock data is active

### Mock Data Files

- `src/data/mockData.js` - Contains all mock data
- Mock courses, users, and progress data
- Mock API functions for testing

## Role-Based Access Control (RBAC)

The application supports three user roles:

### 1. Admin Role

**Capabilities:**
- Full system access
- Manage all users
- Manage all courses
- Manage instructors
- View system analytics
- Access admin dashboard

**Routes:**
- `/admin` - Admin dashboard
- `/dashboard` - Redirects to admin dashboard for admins

**Features:**
- User management
- Course management
- Instructor management
- System statistics
- Activity monitoring

### 2. Instructor Role

**Capabilities:**
- Create and manage own courses
- View student progress
- Access instructor dashboard
- View course analytics
- Manage course content

**Routes:**
- `/instructor` - Instructor dashboard
- `/dashboard` - Redirects to instructor dashboard for instructors

**Features:**
- Course creation and editing
- Student management
- Course analytics
- Performance tracking

### 3. Student Role (Default)

**Capabilities:**
- Browse courses
- Enroll in courses
- Take lessons
- Complete quizzes
- Track progress
- View certificates

**Routes:**
- `/dashboard` - Student dashboard
- `/course/:id` - Course details
- `/lesson/:courseId/:lessonId` - Lesson page

**Features:**
- Course browsing
- Enrollment
- Learning progress
- Quiz taking
- Certificate viewing

## Protected Routes

Routes can be protected by role using the `ProtectedRoute` component:

```jsx
// Any authenticated user
<ProtectedRoute>
  <Component />
</ProtectedRoute>

// Admin only
<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>

// Instructor or Admin
<ProtectedRoute requiredRole="instructor">
  <InstructorComponent />
</ProtectedRoute>

// Student, Instructor, or Admin
<ProtectedRoute requiredRole="student">
  <StudentComponent />
</ProtectedRoute>
```

## Using Auth Context

The `useAuth` hook provides role information:

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const {
    user,           // Current user object
    isAuthenticated, // Boolean
    isAdmin,        // Boolean
    isInstructor,   // Boolean
    isStudent,      // Boolean
    useMockData,    // Boolean - true if using mock data
  } = useAuth();

  if (isAdmin) {
    // Show admin features
  }
  
  if (isInstructor) {
    // Show instructor features
  }
}
```

## Testing Different Roles

### Method 1: Use Mock Login

1. Go to `/login`
2. Use one of the test accounts:
   - Admin: `admin` / `admin123`
   - Instructor: `instructor` / `instructor123`
   - Student: `student` / `student123`

### Method 2: Register New User

1. Go to `/register`
2. Register a new account (defaults to student role)
3. For admin/instructor, you'll need to update the role in the backend

### Method 3: Direct localStorage (Development Only)

```javascript
// In browser console
localStorage.setItem('user', JSON.stringify({
  _id: 'admin1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin'
}));
localStorage.setItem('token', 'mock-admin-token');
window.location.reload();
```

## Role-Based UI Components

### Header Navigation

The header automatically shows/hides links based on role:
- Admin: Shows "Admin" link
- Instructor: Shows "Instructor" link
- All authenticated users: Show "Dashboard" and "Profile"

### Dashboard Routing

The `/dashboard` route automatically redirects:
- Admin → `/admin`
- Instructor → `/instructor`
- Student → Student dashboard

## Backend Role Setup

When setting up the backend, ensure roles are properly set:

### User Model
```javascript
role: {
  type: String,
  enum: ['student', 'instructor', 'admin'],
  default: 'student'
}
```

### Creating Admin User
```javascript
// In MongoDB or seed script
db.users.insertOne({
  username: 'admin',
  email: 'admin@example.com',
  password: 'hashed_password',
  role: 'admin'
});
```

### Creating Instructor User
```javascript
db.users.insertOne({
  username: 'instructor',
  email: 'instructor@example.com',
  password: 'hashed_password',
  role: 'instructor'
});
```

## Mock Data Structure

### Courses
- Sample courses with lessons
- Includes video URLs, quizzes, resources
- Progress tracking data

### Users
- Admin user
- Instructor user
- Student user

### Progress
- Lesson completion data
- Quiz scores
- Course progress percentages

## Switching Between Real API and Mock Data

The app automatically detects API availability:

1. **API Available**: Uses real backend
2. **API Unavailable**: Falls back to mock data
3. **Console Warnings**: Shows when mock data is active

To force mock data (for testing):
```javascript
// In browser console
localStorage.setItem('useMockData', 'true');
window.location.reload();
```

## Best Practices

1. **Development**: Use mock data for frontend development
2. **Testing**: Test all three roles with mock accounts
3. **Production**: Always use real backend API
4. **Security**: Never expose admin credentials in production
5. **Role Checks**: Always verify roles on backend, not just frontend

## Troubleshooting

### Issue: Can't access admin dashboard
**Solution**: Ensure you're logged in as admin. Check user role in localStorage.

### Issue: Mock data not working
**Solution**: 
- Check browser console for errors
- Verify `mockData.js` is imported correctly
- Clear localStorage and try again

### Issue: Role not updating
**Solution**:
- Logout and login again
- Clear localStorage
- Check backend user role

## Security Notes

⚠️ **Important**: 
- Frontend role checks are for UI only
- Always verify roles on the backend
- Never trust client-side role information
- Use JWT tokens with role claims
- Implement proper authorization middleware

