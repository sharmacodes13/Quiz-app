// Replace this with your actual Gemini API key from https://makersuite.google.com/app/apike // Paste your API key here (it will look something like 'AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q')

// API Configuration
export const API_CONFIG = {
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

// Get API key from environment variable
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API key
if (!GEMINI_API_KEY) {
  console.error('Gemini API key is missing. Please check:');
  console.error('1. Your .env file exists in the project root');
  console.error('2. The .env file contains: VITE_GEMINI_API_KEY=your_api_key');
  console.error('3. You have restarted the development server after creating the .env file');
  console.error('Current environment variables:', import.meta.env);
}

export { GEMINI_API_KEY }; 