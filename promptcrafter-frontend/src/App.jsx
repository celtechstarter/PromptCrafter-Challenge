// promptcrafter-frontend/src/App.jsx

import React, { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';

function App() {
  const [userKnowledge, setUserKnowledge] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [goal, setGoal] = useState('');
  const [previousFeedback, setPreviousFeedback] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Backend URL - THIS IS YOUR LIVE RENDER.COM BACKEND URL!
  const BACKEND_URL = 'https://promptcrafter-backend-api.onrender.com'; 

  const generateLesson = async () => {
    if (!userKnowledge || !learningStyle || !goal) {
      setMessage('Please fill in all preferences before generating a lesson.');
      return;
    }

    setLoading(true);
    setMessage('Generating your personalized lesson...');
    setLessonContent('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userKnowledge, learningStyle, goal, previousFeedback }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Lesson generated successfully!');
        setLessonContent(data.lessonContent);
        setPreviousFeedback('');
      } else {
        setMessage(`Error: ${data.error || 'Failed to generate lesson.'}`);
        console.error('Backend error:', data);
      }
    } catch (error) {
      setMessage(`Error connecting to backend: ${error.message}`);
      console.error('Frontend Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (feedbackType) => {
    const feedbackText = feedbackType === 'helpful' ? 'The lesson was helpful and clear.' : 'I need more explanation or different examples.';
    setPreviousFeedback(feedbackText);
    setMessage('Thanks for your feedback! Generating new content...');
    await generateLesson();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">
          <span className="heart-icon">❤️</span> PromptCrafter!
        </h1>
        <p className="app-tagline">Your personalized coach for Lovable.dev prompts.</p>

        {/* NEW: Prominent GitHub link with icon */}
        <div className="github-link-container">
          <a href="https://github.com/celtechstarter/PromptCrafter-Challenge" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" className="github-icon">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07.01 1.93.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path>
            </svg>
            View Source Code on GitHub
          </a>
        </div>
      </header>

      {!lessonContent && (
        <div className="preferences-section">
          <h2>Tell us about yourself:</h2>
          <div className="input-group">
            <label htmlFor="knowledge">Your Lovable.dev Knowledge Level:</label>
            <select id="knowledge" value={userKnowledge} onChange={(e) => setUserKnowledge(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="Beginner">Beginner (New to Lovable.dev)</option>
              <option value="Intermediate">Intermediate (Basic understanding)</option>
              <option value="Advanced">Advanced (Want to optimize prompts)</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="style">Your Preferred Learning Style:</label>
            <select id="style" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="Examples">Through practical examples</option>
              <option value="Explanations">Through detailed explanations</option>
              <option value="Interactive">Through interactive exercises/challenges</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="goal">Your Current Goal/Mood:</label>
            <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="Build a one-page website quickly">Build a one-page website quickly</option>
              <option value="Create a professional portfolio">Create a professional portfolio</option>
              <option value="Explore creative ideas">Explore creative ideas</option>
              <option value="Overcome a prompting challenge">Overcome a prompting challenge</option>
            </select>
          </div>

          <button onClick={generateLesson} disabled={loading || !userKnowledge || !learningStyle || !goal}>
            {loading ? 'Generating...' : 'Generate My First Lesson'}
          </button>
        </div>
      )}

      {message && <p className="status-message">{message}</p>}

      {lessonContent && (
        <div className="lesson-output">
          <h2>Your Personalized Lesson:</h2>
          <div className="markdown-content">
            <ReactMarkdown>{lessonContent}</ReactMarkdown>
          </div>

          <div className="feedback-section">
            <h3>Was this helpful?</h3>
            <button onClick={() => submitFeedback('helpful')} disabled={loading}>Yes, it was helpful!</button>
            <button onClick={() => submitFeedback('needs_more')} disabled={loading}>No, I need more help.</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;