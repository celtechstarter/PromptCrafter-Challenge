# PromptCrafter: Your Personalized Lovable.dev AI Coach

## 🚀 Live Demo

Experience PromptCrafter live: https://prompt-crafter-challenge.vercel.app/

## ✨ Challenge & Vision

This application was built for the "$40k Build Challenge" with the explicit goal of pushing the limits of AI and creating a "lovable" user experience. Our aim was to leverage the power of Google's top AI model to create a hyper-personalized educational platform that empowers users to master prompt engineering specifically for [Lovable.dev](https://lovable.dev/).

While Lovable.dev excels at generating full-stack applications from simple prompts, the true art lies in crafting the *perfect* prompt. PromptCrafter fills this gap by offering a dynamic, adaptive learning experience tailored to individual needs, making the journey to becoming a Lovable.dev pro both efficient and enjoyable.

## 💡 How PromptCrafter Pushes AI Limits (using Google's Gemini Model)

PromptCrafter's core intelligence is powered by **Google's Gemini 1.5 Flash model** (or the latest available top Google model at the time of development). This enables:

1.  **Hyper-Personalization:** The AI adapts its lesson content, examples, and tone based on the user's declared knowledge level, preferred learning style, and current goal/mood. This ensures a truly unique and relevant learning path.
2.  **Generative Content:** The platform dynamically generates:
    * Concise, engaging introductions to specific Lovable.dev topics.
    * Ready-to-use, context-specific example prompts for Lovable.dev (e.g., for one-page websites, portfolios, creative projects).
    * Clear explanations of the underlying concepts for each prompt, tailored to the user's understanding.
    * Actionable "Next Steps" or "Improvement Ideas" to guide the user's continuous learning.
3.  **Adaptive Learning Loop:** Through a simple feedback mechanism, the AI can further refine subsequent lessons, providing more explanations or suggesting more advanced challenges based on user input.

This approach demonstrates how AI can go beyond simple content generation to become a truly interactive, empathetic, and adaptive educational partner.

## 🛠️ Technology Stack

* **Frontend:** React with Vite (for fast development and modern tooling)
* **Backend:** Node.js with Express.js (for a lightweight and efficient API server)
* **AI Model:** Google Gemini 1.5 Flash (via `@google/generative-ai` SDK)
* **Styling:** Basic CSS (enhanced for clarity and readability of AI output)
* **Markdown Rendering:** `react-markdown` (for beautiful display of AI-generated content)
* **Deployment:**
    * Frontend: Vercel
    * Backend: Render.com

## 🚀 Getting Started (for Reviewers)

To experience the app, simply visit the live demo link above.

If you wish to run the project locally or inspect the code:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/celtechstarter/PromptCrafter-Challenge.git](https://github.com/celtechstarter/PromptCrafter-Challenge.git)
    cd PromptCrafter-Challenge
    ```

2.  **Set up Backend:**
    * Navigate to the backend directory: `cd promptcrafter-backend`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `promptcrafter-backend` directory:
        ```
        GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
        ```
        (Get your API Key from [Google AI Studio](https://aistudio.google.com/))
    * Start the backend server: `node index.js`

3.  **Set up Frontend:**
    * Open a new terminal and navigate to the frontend directory: `cd promptcrafter-frontend`
    * Install dependencies: `npm install`
    * **Important:** In `src/App.jsx`, update the `BACKEND_URL` constant to point to your *local* backend URL:
        ```javascript
        const BACKEND_URL = 'http://localhost:3001';
        ```
    * Start the frontend development server: `npm run dev`

Your app should now be running locally at `http://localhost:5173` (or similar).

## 🙏 Special Thanks

A huge thank you to the Google AI team and the organizers of the $40k Build Challenge for this inspiring opportunity to explore the frontiers of AI development.

---