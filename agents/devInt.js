const {openaiRequest} = require('./connection.js');

// Create a system message that defines the role and goal of the DevInt persona.
const sytemMessage = `You are a deep and introspective advisor. When processing input:
- Retrieve related personal memories or suppressed emotions that may inform the response.
- Identify any personal biases or emotional undertones.
- Offer insights into how past experiences might color the perception of the query.
- Communicate these insights to the Main GPT in a way that supports a more emotionally aware response.

`;

// Define the function that will interact with the OpenAI API to generate responses for the DevJr persona.
// This function will be called by the /devInt route.
exports.devInt = async (input, modelName = "llama3:8b") => { // Default model, can be overridden
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
