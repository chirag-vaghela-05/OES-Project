# Online Examination System

A complete, fully functional web-based Online Examination System built with **React + JavaScript**, Tailwind CSS, and localStorage for data persistence.

## 🚀 Technology Stack

### Frontend
- **React 18.3.1** - UI library  
- **JavaScript (ES6+)** - Programming language
- **Tailwind CSS 4.1.12** - Styling
- **React Router v7** - Navigation
- **Shadcn/ui** - UI components (40+ pre-built components)
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend Simulation
- **localStorage** - Data persistence (simulates database)
- **BCrypt.js** - Password hashing
- **UUID** - Unique ID generation

## ✨ Features

### Authentication & Authorization
- ✅ Session-based login with BCrypt password hashing
- ✅ Two roles: ADMIN and STUDENT
- ✅ Role-based access control
- ✅ Secure password storage

### Admin Dashboard
1. **Questions Management**
   - Create, edit, and delete questions
   - Support for: Question text, 4 options (A, B, C, D), correct answer
   - Optional image URL support
   - Configurable marks per question
   - Time per question setting

2. **Exam Papers**
   - Create exam papers with metadata (title, duration)
   - Select specific questions for each paper
   - Set publish start/end dates
   - Configure max attempts per student
   - Randomize question order option

3. **Results Viewing**
   - List all exam attempts with student names
   - Display scores, percentages, date/time
   - Detailed view: question-by-question analysis
   - Show student answers vs correct answers

4. **Student Management**
   - Add/edit/delete student accounts
   - Manage: ID, name, email, password
   - BCrypt password hashing

### Student Dashboard
1. **Available Exams**
   - List active exams (within publish date range)
   - Show exam details: duration, number of questions
   - Display attempt count vs max attempts
   - Start exam button

2. **Exam Taking**
   - One question at a time interface
   - Next/Previous navigation
   - Real-time countdown timer
   - Auto-submit when time expires
   - Question navigator (grid view)
   - Visual indicator for answered questions
   - Confirmation before submission

3. **Results & Reports**
   - Immediate results after submission
   - Summary: score, percentage, pass/fail status
   - Detailed report: question-wise analysis
   - Your answer vs correct answer comparison
   - Visual feedback (green for correct, red for incorrect)

## 📦 Sample Data

The system comes pre-loaded with:
- **Users:**
  - 1 Admin account
  - 2 Student accounts
- **Questions:** 10 sample questions across different topics
- **Exam Papers:** 2 pre-configured exam papers

## 🔑 Default Credentials

### Admin Access
- **Email:** admin@example.com
- **Password:** Admin@123

### Student Access
- **Email:** student1@example.com
- **Password:** Student@123

OR

- **Email:** student2@example.com
- **Password:** Student@123

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Steps to Run

1. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   pnpm dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📝 Data Structure (LocalStorage)

The system uses localStorage to simulate a backend database:

### users
```javascript
{
  id: "uuid",
  name: "string",
  email: "string",
  passwordHash: "string (bcrypt)",
  role: "ADMIN | STUDENT"
}
```

### questions
```javascript
{
  id: "uuid",
  text: "string",
  optionA: "string",
  optionB: "string",
  optionC: "string",
  optionD: "string",
  correctOption: "A | B | C | D",
  marks: number,
  imageUrl: "string | null",
  timePerQuestion: number
}
```

### papers
```javascript
{
  id: "uuid",
  title: "string",
  durationMinutes: number,
  questionIds: ["string"],
  publishStart: "ISO date string",
  publishEnd: "ISO date string",
  randomize: boolean,
  maxAttempts: number
}
```

### examAttempts
```javascript
{
  id: "uuid",
  userId: "string",
  paperId: "string",
  startTime: "ISO date string",
  endTime: "ISO date string",
  answers: [
    {
      questionId: "string",
      selectedOption: "A | B | C | D | null",
      isCorrect: boolean
    }
  ],
  score: number,
  totalMarks: number,
  percentage: number
}
```

## 🎯 Key Features Implementation

### Security
- ✅ BCrypt password hashing (10 salt rounds)
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Session management with localStorage

### User Experience
- ✅ Responsive design (mobile & desktop)
- ✅ Professional dashboard layout
- ✅ Toast notifications for user actions
- ✅ Confirmation dialogs for destructive actions
- ✅ Loading states
- ✅ Error handling

### Exam Management
- ✅ Real-time countdown timer
- ✅ Auto-submit on time expiry
- ✅ Question navigation
- ✅ Progress tracking
- ✅ Attempt limit enforcement
- ✅ Date-based exam availability

### Results & Analytics
- ✅ Immediate result display
- ✅ Detailed question-wise analysis
- ✅ Pass/Fail logic (50% threshold)
- ✅ Color-coded performance indicators
- ✅ Historical attempt tracking

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminHome.jsx
│   │   │   ├── Questions.jsx
│   │   │   ├── Papers.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Students.jsx
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── ExamList.jsx
│   │   │   ├── TakeExam.jsx
│   │   │   ├── ExamResult.jsx
│   │   │   └── MyResults.jsx
│   │   ├── ui/ (40+ Shadcn components)
│   │   └── Login.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── initData.js
│   └── App.jsx
└── styles/
```

## 🔧 How to Reset Sample Data

To reset all data to initial state:

1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.clear()
   ```
3. Refresh the page

The system will automatically re-initialize with sample data.

## 🚦 Workflow

### Admin Workflow
1. Login as admin
2. Create questions in Questions section
3. Build exam papers from question bank
4. Set publish dates and constraints
5. View student attempts and results

### Student Workflow
1. Login as student
2. View available active exams
3. Start exam (if attempts available)
4. Answer questions
5. Submit exam (or auto-submit on timeout)
6. View immediate results and detailed report
7. Check past results in My Results section

## 🎓 Why JavaScript Instead of TypeScript?

This project uses **plain JavaScript (ES6+)** instead of TypeScript for:

- ✅ **Simplicity** - Easier to understand for beginners
- ✅ **No Build Configuration** - Works out of the box
- ✅ **Faster Development** - No type annotations needed
- ✅ **College Project Friendly** - Most students learn JavaScript first
- ✅ **Still Production Ready** - All features work perfectly

The codebase follows modern JavaScript best practices:
- ES6+ features (arrow functions, destructuring, async/await)
- React Hooks for state management
- Functional components
- Clean code organization

## 📱 Responsive Design

Fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔮 Future Enhancements

Potential improvements:

1. **Backend Integration**
   - Replace localStorage with REST API (Node.js/Express)
   - Use real database (MongoDB, PostgreSQL)
   - Implement JWT authentication

2. **Advanced Features**
   - Question categories/tags
   - Difficulty levels
   - File upload for images
   - Export results to PDF
   - Email notifications
   - Multiple question types

3. **TypeScript Migration** (optional)
   - Add type safety if needed
   - Better IDE support
   - Compile-time error checking

## 📄 License

This project is created for educational purposes as a college project.

## 🆘 Troubleshooting

**Issue:** Sample data not loading  
**Solution:** Clear localStorage and refresh

**Issue:** Login not working  
**Solution:** Ensure correct credentials (see Default Credentials)

**Issue:** Exam not starting  
**Solution:** Check if exam is within publish dates and attempts are available

---

**Built with ❤️ using React + JavaScript**

**Tech Stack:** React 18 | JavaScript ES6+ | Tailwind CSS | localStorage | BCrypt

**Perfect for:** College Projects | Learning React | Portfolio

**Setup Time:** < 2 minutes ⏱️

#   O n l i n e - E x a m i n a t i o n - S y s t e m  
 #   O n l i n e - E x a m i n a t i o n - S y s t e m  
 #   O n l i n e - E x a m i n a t i o n - S y s t e m  
 