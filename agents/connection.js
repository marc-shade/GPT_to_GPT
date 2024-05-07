const OpenAI = require('openai');
require('dotenv').config();
const api_key = process.env.OPENAI_API_KEY;

// Replace with your local Ollama server URL 
const OLLAMA_API_URL = "http://localhost:11434";  
const OLLAMA_MODEL_NAME = "llama3:8b"; // Replace with your desired model name

const openai = new OpenAI({
    apiKey: api_key,
    baseUrl: OLLAMA_API_URL // Set the base URL to your local Ollama server
});

exports.openaiRequest = async (messages) => {
    if (api_key === null) return null;

    const options = {
        model: OLLAMA_MODEL_NAME, // Use the Ollama model name
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
