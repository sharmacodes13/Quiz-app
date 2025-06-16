import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Cache for storing generated questions
const questionCache = new Map();

// Generate a cache key based on category and difficulty
const getCacheKey = (category, difficulty) => `${category}-${difficulty}`;

export async function generateQuestions(category, difficulty) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your .env file');
  }

  try {
    // Check cache first
    const cacheKey = getCacheKey(category, difficulty);
    if (questionCache.has(cacheKey)) {
      console.log('Retrieving questions from cache');
      return questionCache.get(cacheKey);
    }

    console.log('Generating questions for:', { category, difficulty });
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // More specific prompt based on category
    let categorySpecificPrompt = '';
    switch (category) {
      case 'indian-history':
        categorySpecificPrompt = 'Focus specifically on Indian history, including ancient, medieval, and modern periods. Include questions about Indian rulers, dynasties, freedom movement, and cultural heritage.';
        break;
      case 'world-history':
        categorySpecificPrompt = 'Focus on global historical events, major world civilizations, important historical figures, and significant world events.';
        break;
      case 'science':
        categorySpecificPrompt = 'Focus on scientific concepts, discoveries, and principles across physics, chemistry, and biology.';
        break;
      case 'technology':
        categorySpecificPrompt = 'Focus on computer science, programming, digital technology, and technological innovations.';
        break;
      case 'geography':
        categorySpecificPrompt = 'Focus on physical geography, countries, capitals, landmarks, and geographical features.';
        break;
      default:
        categorySpecificPrompt = `Focus specifically on ${category} related topics.`;
    }

    // Optimized prompt for faster generation
    const prompt = `Create 10 multiple choice questions about ${category} (${difficulty} level).
    ${categorySpecificPrompt}
    
    Important guidelines:
    1. Questions must be strictly relevant to the specified category
    2. For Indian history, focus only on Indian historical events and figures
    3. For world history, focus on global historical events
    4. Each question should have exactly 4 options
    5. The correct answer must be one of the provided options
    6. Questions should be clear and unambiguous
    7. Difficulty level should match the specified ${difficulty} level
    
    Format: JSON array with objects containing:
    - question: string
    - options: array of 4 strings
    - correctAnswer: string (must match one of the options exactly)
    
    Example format:
    [{"question":"What is X?","options":["A","B","C","D"],"correctAnswer":"A"}]
    
    Keep questions concise and ensure correctAnswer exactly matches one option.`;

    console.log('Sending request to Gemini API...');
    
    // Generate content with optimized parameters
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini API');
    
    // Extract the JSON array from the response
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      console.error('Generated text:', text);
      throw new Error('Invalid response format: Could not find JSON array in response');
    }

    const questions = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid response format: Questions array is empty or invalid');
    }

    // Store in cache
    questionCache.set(cacheKey, questions);
    console.log('Successfully generated questions:', questions.length);
    return questions;
  } catch (error) {
    console.error('Error in generateQuestions:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
} 