// promptcrafter-backend/index.js

// Load environment variables (like your Google API Key) from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// Import the Google Generative AI SDK
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// --- Google Gemini Setup ---
// Access your API key from .env file
const API_KEY = process.env.GOOGLE_API_KEY;

// Check if API key is present
if (!API_KEY) {
    console.error("ERROR: GOOGLE_API_KEY is not set in your .env file!");
    process.exit(1); // Exit the process if no API key
}

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Choose the model to use. 'gemini-1.5-flash' is a good balance of speed and capability for this task.
// 'gemini-1.5-pro' is more powerful but might be slower and cost more.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// --- End Google Gemini Setup ---


// Basic route to confirm backend is running
app.get('/', (req, res) => {
    res.send('PromptCrafter Backend is running and ready for AI!');
});

// Endpoint for generating personalized lessons using AI
app.post('/api/generate-lesson', async (req, res) => {
    const { userKnowledge, learningStyle, goal, previousFeedback } = req.body;

    if (!userKnowledge || !learningStyle || !goal) {
        return res.status(400).json({ error: 'Missing required user preferences.' });
    }

    try {
        // Construct the prompt for the AI based on user preferences
        let fullPrompt = `You are a highly knowledgeable and empathetic AI tutor specialized in teaching users how to effectively use Lovable.dev through prompts.
        Your goal is to provide a hyper-personalized lesson or challenge.

        User's Knowledge Level: ${userKnowledge}
        User's Preferred Learning Style: ${learningStyle}
        User's Current Goal/Mood: ${goal}
        `;

        if (previousFeedback) {
            fullPrompt += `\nUser's previous feedback: "${previousFeedback}". Please adjust your next response based on this feedback.`;
        }

        fullPrompt += `\n\nBased on these details, please provide a concise, engaging, and actionable lesson or challenge for using Lovable.dev. Focus on one specific aspect (e.g., creating a one-page website, a portfolio, creative projects, or iterating on existing prompts).

        Your response should be structured clearly, providing:
        1. A brief, personalized introduction.
        2. A concrete, ready-to-use example prompt for Lovable.dev.
        3. A short explanation of *why* this prompt is effective and the concepts behind it.
        4. A clear "Next Step" or "Improvement Idea" to encourage further interaction.

        Please ensure all generated content is in English.`;

        // Make the AI generation request
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Send the AI-generated text back to the frontend
        res.json({ message: 'Lesson generated successfully!', lessonContent: text });

    } catch (error) {
        console.error('Error calling Google Gemini API:', error.response ? JSON.stringify(error.response.candidates) : error.message);
        res.status(500).json({ error: 'Failed to generate lesson with AI. Please check your API key and try again.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server started on http://localhost:${port}`);
});