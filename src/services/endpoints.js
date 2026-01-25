/**
 * Centralized API Endpoints
 * 
 * This file contains all the API endpoints used in the application.
 * Update the paths here when the Laravel backend API routes are finalized.
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Public/Landing Data (No Auth Required)
  PUBLIC: {
    DOCTORS: '/public/doctors',
    DOCTOR_DETAILS: (id) => `/public/doctors/${id}`,
    SERVICES: '/public/services',
    CLINICS: '/public/clinics',
    CLINIC_DETAILS: (id) => `/public/clinics/${id}`,
    PACKAGES: '/public/packages',
    FAQ: '/public/faq',
  },

  // Patient Portal (Auth Required)
  PATIENT: {
    // Dashboard
    DASHBOARD_STATS: '/patient/dashboard/stats',

    // Profile
    PROFILE: '/patient/profile',
    UPDATE_PROFILE: '/patient/profile/update',
    CHANGE_PASSWORD: '/patient/profile/change-password',

    // Appointments
    APPOINTMENTS: '/patient/appointments', // GET list
    APPOINTMENT_DETAILS: (id) => `/patient/appointments/${id}`,
    BOOK_APPOINTMENT: '/patient/appointments', // POST
    CANCEL_APPOINTMENT: (id) => `/patient/appointments/${id}/cancel`, // POST/PUT

    // Medical Records (Read Only)
    MEDICAL_HISTORY: '/patient/medical-history',
    PRESCRIPTIONS: '/patient/prescriptions',
    PRESCRIPTION_DETAILS: (id) => `/patient/prescriptions/${id}`,
    LAB_RESULTS: '/patient/lab-results',
    LAB_RESULT_DOWNLOAD: (id) => `/patient/lab-results/${id}/download`,
    VITALS: '/patient/vitals',
    
    // Clinic Context
    AVAILABLE_CLINICS: '/patient/clinics', // Clinics the patient is registered with or can switch to
  },
};

export default API_ENDPOINTS;
