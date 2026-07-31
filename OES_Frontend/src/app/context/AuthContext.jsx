import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

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

    const response = await axios.post(
      "http://localhost:8080/admin/login",
      {
        email,
        password,
      }
    );

    const userSession = response.data;

    setUser(userSession);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(userSession)
    );

    return userSession;

  } catch (error) {

    console.error(error);

    return null;

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
