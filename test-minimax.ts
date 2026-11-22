import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const apiKey = process.env.VITE_MINIMAX_API_KEY;

if (!apiKey) {
  console.error('No API key found in .env.local');
  process.exit(1);
}
console.log('API Key length:', apiKey.length);

async function run() {
  console.log('Testing Minimax direct endpoint...');
  try {
    const openai = new OpenAI({
      baseURL: 'https://opencode.ai/zen/v1',
      apiKey: apiKey,
    });
    const response = await openai.models.list();
    const minimaxModels = response.data.filter(m => m.id.toLowerCase().includes('minimax')).map(m => m.id);
    console.log('Available Minimax Models:', minimaxModels.join(', '));
    console.log('All models sample:', response.data.slice(0, 5).map(m => m.id).join(', '));
  } catch (error) {
    console.error('Direct Minimax failed:', error.message);
  }
}

run();
