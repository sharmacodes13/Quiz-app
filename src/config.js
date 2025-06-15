// Replace this with your actual Gemini API key from https://makersuite.google.com/app/apike // Paste your API key here (it will look something like 'AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q')

// API Configuration
export const API_CONFIG = {
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

// Get API key from environment variable
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API key
if (!GEMINI_API_KEY) {
  console.error('Gemini API key is not configured. Please check:');
  console.error('1. For local development:');
  console.error('   - Create a .env file in the project root');
  console.error('   - Add: VITE_GEMINI_API_KEY=your_api_key');
  console.error('   - Restart the development server');
  console.error('2. For production:');
  console.error('   - Add VITE_GEMINI_API_KEY to your hosting platform\'s environment variables');
  console.error('   - Redeploy your application');
  console.error('Get your API key from: https://makersuite.google.com/app/apikey');
}

export { GEMINI_API_KEY }; 