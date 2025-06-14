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
        {/* Updated to use a heart symbol with a gradient */}
        <h1 className="app-title">
          <span className="heart-icon">❤️</span> PromptCrafter!
        </h1>
        <p>Your personalized coach for Lovable.dev prompts.</p>

        {!lessonContent && (
          <div className="preferences-section">
            <h2>Tell us about yourself:</h2>
            {/* ... (rest of your preferences form) ... */}
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
      </header>
    </div>
  );
}

export default App;