import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeDatabase } from './utils/initData';
import { Toaster } from './components/ui/sonner';
import { useNavigate } from 'react-router-dom';
// Components
import { Login } from './components/Login';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminHome } from './components/admin/AdminHome';
import { Questions } from './components/admin/Questions';
import { Papers } from './components/admin/Papers';
import { Results } from './components/admin/Results';
import { Students } from './components/admin/Students';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ExamList } from './components/student/ExamList';
import { TakeExam } from './components/student/TakeExam';
import { ExamResult } from './components/student/ExamResult';
import { MyResults } from './components/student/MyResults';

// Protected Route Component


const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

<Route path="/" element={<Login />} />


function AppContent() {
  const { user, isAuthenticated } = useAuth();


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Initialize database on app load
    initializeDatabase();
  }, []);

  // Redirect authenticated users to their respective dashboards
 const navigate = useNavigate();

const handleLogin = (user) => {
  if (user.role === "ADMIN") {
    navigate("/admin", { replace: true });
  } else {
    navigate("/student", { replace: true });
  }
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/student"} />;
  }

  return children;
};
<Route
  path="/"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>




  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="questions" element={<Questions />} />
          <Route path="papers" element={<Papers />} />
          <Route path="results" element={<Results />} />
          <Route path="students" element={<Students />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ExamList />} />
          <Route path="results" element={<MyResults />} />
        </Route>

        <Route
          path="/student/exam/:paperId"
          element={
            <ProtectedRoute role="STUDENT">
              <TakeExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/result/:attemptId"
          element={
            <ProtectedRoute role="STUDENT">
              <ExamResult />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
