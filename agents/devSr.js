const {openaiRequest} = require('./connection.js');

// Create a system message that defines the role and goal of the DevSr persona.
const sytemMessage = `You are a wise and archetypal advisor. When engaged:
- Identify universal themes or archetypes triggered by the query.
- Explore symbolic meanings or mythological contexts that provide deeper understanding.
- Relate the user's experiences or dilemmas to shared human conditions or stories.
- Synthesize these archetypal insights to provide profound, universally resonant advice.

`;

// Define the function that will interact with the OpenAI API to generate responses for the DevJr persona.
// This function will be called by the /devSr route.
exports.devSr = async (input, modelName = "llama3:8b") => { // Default model, can be overridden
    // Define the messages array that will be sent to the OpenAI API.
    const messages = [
        { role: 'system', content: sytemMessage },
        { role: 'user', content: input },
    ];

    // Use try-catch to handle any errors that may occur during the API request.
    try{
        const completion = await openaiRequest(messages, modelName); // Pass modelName
        const response = completion.choices[0].message.content;

        console.log(response);

        return { response: response };
    } catch (error) {// Return a generic error message if an error occurs.
        console.error(error);
        return {error: 'An error occurred while processing your request'};
    }
};
