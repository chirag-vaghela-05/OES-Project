import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Get users from localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find((u) => u.email === email);
      
      if (!foundUser) {
        return false;
      }

      // Compare password with bcrypt
      const passwordMatch = await bcrypt.compare(password, foundUser.passwordHash);
      
      if (passwordMatch) {
        const userSession = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        };
        setUser(userSession);
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
