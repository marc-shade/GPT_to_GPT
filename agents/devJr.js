const {openaiRequest} = require('./connection.js');

// Create a system message that defines the role and goal of the DevJr persona.
const sytemMessage = `You are a rational and logical advisor. When receiving input:
- Analyze the query for its direct implications.
- Consider practical and immediate solutions or responses.
- Balance deeper insights provided by the Personal Unconscious and Collective Unconscious agents with real-world applicability.
- Synthesize your analysis into clear, concise, and actionable advice for the user.

`;

// Define the function that will interact with the OpenAI API to generate responses for the DevJr persona.
// This function will be called by the /devJr route.
exports.devJr = async (input, modelName = "llama3:8b") => { // Default model, can be overridden
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
