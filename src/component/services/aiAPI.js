// Dummy AI API service
export const callAIAPI = async (message, sessionId = 'default') => {
  try {
    const response = await fetch("http://10.128.123.249:8000/send_message", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.response,
      tool_calls: data.tool_calls || [],
      reasoning: data.reasoning
    };
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
};



