import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { API_ENDPOINTS } from '../services/endpoints';
import { useUI } from './UIContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useUI();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        if (storedToken === 'demo_token') {
            setUser({
                id: 1,
                name: 'Demo Patient',
                email: 'patient@example.com',
                role: 'patient'
            });
            setIsAuthenticated(true);
        } else {
            try {
              // Verify token and get user data
              // Assuming /user endpoint exists or similar
              // For now, we might just trust the token exists until 401
              // But ideally we fetch user profile
              const response = await api.get('/user');
              setUser(response.data);
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Auth initialization failed', error);
              logout();
            }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const loginDemo = async () => {
      const mockUser = {
          id: 1,
          name: 'Demo Patient',
          email: 'patient@example.com',
          role: 'patient'
      };
      const mockToken = 'demo_token';

      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      addToast('success', 'Logged in as Demo User');
      return true;
  };

  const login = async (email, password, clinic_code = null) => {
  try {
    const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      email,
      password,
      clinic_code: clinic_code === null ? null : clinic_code,
    });

    const { token: newToken, user: userData } = response.data;

    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);

    addToast('success', 'Logged in successfully');

    return { success: true };
  } catch (error) {
    console.error('Login failed', error);

    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
      errors: error.response?.data?.errors,
    };
  }
};


  const logout = useCallback(async () => {
    try {
      // INTEGRATION: Use the correct endpoint from endpoints.js
      // await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('activeClinicId');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      addToast('info', 'Logged out');
    }
  }, [addToast]);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    loginDemo,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
