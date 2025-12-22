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
    // Note: The current SDK in this project is using the v1beta API,
    // which does not support some of the newer 1.5 models for generateContent.
    // Use gemini-2.5-flash here, which is available for v1beta in this setup.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    // Optimized prompt for faster generation - explicitly requesting JSON only
    const prompt = `You must respond with ONLY a valid JSON array, no other text, no markdown, no explanations.

Create 10 multiple choice questions about ${category} (${difficulty} level).
${categorySpecificPrompt}

Important guidelines:
1. Questions must be strictly relevant to the specified category
2. For Indian history, focus only on Indian historical events and figures
3. For world history, focus on global historical events
4. Each question should have exactly 4 options
5. The correct answer must be one of the provided options
6. Questions should be clear and unambiguous
7. Difficulty level should match the specified ${difficulty} level

You must respond with ONLY a JSON array. No markdown code blocks, no explanations, no extra text. Just the raw JSON array.

Format: [{"question":"string","options":["option1","option2","option3","option4"],"correctAnswer":"option1"},...]

Example:
[{"question":"What is X?","options":["Option A","Option B","Option C","Option D"],"correctAnswer":"Option A"}]

Respond with ONLY the JSON array, nothing else.`;

    console.log('Sending request to Gemini API...');
    
    // Generate content with optimized parameters
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        // Ask Gemini to respond with pure JSON so we can parse reliably
        responseMimeType: 'application/json',
      }
    });

    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini API');
    console.log('Raw Gemini response text:', text);
    
    let questions;

    // Try multiple parsing strategies
    try {
      // Strategy 1: Try parsing the whole response as JSON first
      questions = JSON.parse(text);
    } catch (primaryParseError) {
      console.warn('Primary JSON.parse failed, attempting extraction strategies...');
      
      // Strategy 2: Remove markdown code blocks if present
      let cleanedText = text.trim();
      
      // Remove markdown code blocks (```json ... ``` or ``` ... ```)
      cleanedText = cleanedText.replace(/^```(?:json)?\s*/gm, '').replace(/```\s*$/gm, '');
      
      // Try parsing cleaned text
      try {
        questions = JSON.parse(cleanedText);
      } catch (secondParseError) {
        // Strategy 3: Extract JSON array using multiple regex patterns
        let jsonMatch = null;
        
        // Try to find JSON array with more flexible matching
        const patterns = [
          /\[\s*\{[\s\S]*?\}\s*(?:,\s*\{[\s\S]*?\}\s*)*\]/,  // Standard array
          /\[[\s\S]*?\]/,  // Any array-like structure
          /\{[\s\S]*"question"[\s\S]*\}/,  // Single object with question field
        ];
        
        for (const pattern of patterns) {
          jsonMatch = cleanedText.match(pattern);
          if (jsonMatch) {
            try {
              questions = JSON.parse(jsonMatch[0]);
              if (Array.isArray(questions) && questions.length > 0) {
                break;
              }
              // If it's a single object, wrap it in an array
              if (typeof questions === 'object' && questions.question) {
                questions = [questions];
                break;
              }
            } catch (e) {
              // Try next pattern
              continue;
            }
          }
        }
        
        if (!jsonMatch || !questions) {
          console.error('All parsing strategies failed. Generated text:', text);
          console.error('Cleaned text:', cleanedText);
          throw new Error('Invalid response format: Could not find JSON array in response');
        }
      }
    }
    
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid response format: Questions array is empty or invalid');
    }

    // Store in cache
    questionCache.set(cacheKey, questions);
    console.log('Successfully generated questions:', questions.length);
    return questions;
  } catch (error) {
    console.error('Error in generateQuestions:', error);

    // Handle overloaded / temporary errors from the API more gracefully
    const rawMessage = error?.message || '';
    const isOverloaded =
      rawMessage.includes('503') ||
      rawMessage.toLowerCase().includes('overloaded') ||
      rawMessage.toLowerCase().includes('try again later');

    if (isOverloaded) {
      throw new Error(
        'The question generator is temporarily overloaded. Please wait a few seconds and try starting the quiz again.'
      );
    }

    throw new Error(`Failed to generate questions: ${rawMessage || 'Unknown error'}`);
  }
} 