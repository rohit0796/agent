import React from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
//   const quickActions = [
//     { text: "Ask me anything", emoji: "💬" },
//     { text: "Tell me a joke", emoji: "😄" },
//     { text: "Help me brainstorm", emoji: "💡" },
//     { text: "Explain a concept", emoji: "📚" }
//   ];

  return (
    <div className="welcome-message">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="ai-logo">🤖</div>
          <h3>Welcome to Autometa Assistant</h3>
        </div>
        {/*         
        <div className="quick-actions">
          <h4>Quick suggestions:</h4>
          <div className="action-buttons">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="action-button"
                onClick={() => {
                  // This would trigger sending the message
                  // You can pass this up to parent component
                  console.log('Quick action:', action.text);
                }}
              >
                <span className="action-emoji">{action.emoji}</span>
                <span className="action-text">{action.text}</span>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WelcomeMessage;
