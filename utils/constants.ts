// App Constants
export const APP_NAME = 'SnapCar';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_ENDPOINTS = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.snapcar.app',
  UPLOAD: '/upload',
  POSTS: '/posts',
  USERS: '/users',
  COMMUNITIES: '/communities',
} as const;

// UI Constants
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#32D74B',
  ACCENT: '#FF3B30',
  WARNING: '#FF9500',
  SUCCESS: '#32D74B',
  ERROR: '#FF3B30',
  BACKGROUND: '#000000',
  SURFACE: '#1C1C1E',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#8E8E93',
  PREMIUM: '#FFD700',
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
} as const;

export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 28,
} as const;

// Feature Flags
export const FEATURES = {
  PREMIUM_ENABLED: true,
  CAMERA_FILTERS: true,
  COMMUNITIES: true,
  MESSAGING: true,
} as const;

// Validation Rules
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  CAPTION_MAX_LENGTH: 500,
  BIO_MAX_LENGTH: 150,
} as const;