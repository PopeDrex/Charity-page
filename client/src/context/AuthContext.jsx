import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('detourCharityUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      // This would normally connect to your backend API
      // Mocking authentication for demonstration purposes
      const mockUser = {
        id: '12345',
        name: 'Demo User',
        email: email,
        role: 'user'
      };
      
      // Store user in localStorage
      localStorage.setItem('detourCharityUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  // Register function
  const register = async (name, email, password) => {
    try {
      // This would normally connect to your backend API
      // Mocking registration for demonstration purposes
      const mockUser = {
        id: '12345',
        name: name,
        email: email,
        role: 'user'
      };
      
      // Store user in localStorage
      localStorage.setItem('detourCharityUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('detourCharityUser');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
