import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('No API key found in .env.local');
  process.exit(1);
}

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log('Testing Gemini API...');
    const result = await model.generateContent('Say hello! Just one word.');
    console.log('Response:', result.response.text());
    console.log('Gemini service is working perfectly!');
  } catch (error) {
    console.error('Error connecting to Gemini API:', error);
  }
}

run();
