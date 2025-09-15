
import React from 'react';
import './Message.css';
import ReactMarkdown from 'react-markdown';

const Message = ({ message }) => {
  const { content, sender } = message;

  return (
    <div className={`message ${sender}`}>
      <div className={`message-avatar ${sender}-avatar`}>
        {sender === 'user' ? 'Y' : 'AI'}
      </div>
      <div className="message-content">
{message.tool_calls && message.tool_calls.length > 0 && (
  <div className="tool-calls">
    {message.tool_calls.map((toolCall, index) => (
      <div key={index} className="tool-call">
        <div className="tool-header">
          <span className="tool-name">🔧 {toolCall.name}</span>
        </div>
        {Object.keys(toolCall.args).length > 0 && (
          <div className="tool-args">
            <strong>Arguments:</strong>
            <pre>{JSON.stringify(toolCall.args, null, 2)}</pre>
          </div>
        )}
        {toolCall.result && (
          <div className="tool-result">
            <strong>Result:</strong>
            <div className="result-content">{toolCall.result}</div>
          </div>
        )}
      </div>
    ))}
  </div>
)}

{message.reasoning && (
  <div className="reasoning">
    <strong>💭 Reasoning:</strong>
    <div className="reasoning-content">{message.reasoning}</div>
  </div>
)}
        <ReactMarkdown>{content}</ReactMarkdown>

      </div>
    </div>
  );
};

export default Message;
