const OpenAI = require('openai');
require('dotenv').config();
const api_key = process.env.OPENAI_API_KEY;

// Replace with your local Ollama server URL 
const OLLAMA_API_URL = "http://localhost:11434";  

const openai = new OpenAI({
    apiKey: api_key,
    baseUrl: OLLAMA_API_URL // Set the base URL to your local Ollama server
});

// Function to handle OpenAI requests with specific model settings for each agent
exports.openaiRequest = async (messages, modelName) => {
    if (api_key === null) return null;

    const options = {
        model: modelName, // Use the provided model name for this request
        messages: messages,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
    };

    try {
        const completion = await openai.chat.completions.create(options);
        return completion;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Model not found. Please check the model name and availability.");
        } else {
            console.error("Error during Ollama request:", error);
        }
        return null;
    }
};
