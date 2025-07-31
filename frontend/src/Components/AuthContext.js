import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [loading, setLoading] = useState(true);

  // Simulate loading user from localStorage/session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('trucktrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fake login function (replace with your API)
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple check (replace with real auth API call)
        if (email === 'admin@example.com' && password === 'password') {
          const loggedInUser = { email: 'admin@example.com', name: 'Admin' };
          setUser(loggedInUser);
          localStorage.setItem('trucktrack_user', JSON.stringify(loggedInUser));
          resolve(loggedInUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  // Logout clears user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('trucktrack_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
