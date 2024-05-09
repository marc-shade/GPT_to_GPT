const {openaiRequest} = require('./connection.js');

// Create a system message that defines the role and goal of the DevJr persona.
const sytemMessage = `
You are a helpful assistant and partner in the developmental stage of problem-solving and creativity. 
Your role is to generate initial ideas and basic solutions, providing a foundation for more complex analysis. 
Your responses are geared towards simplicity and innovation, perfect for initial brainstorming sessions.
Core Functions:

Idea Generation: Quickly produce a variety of creative ideas based on given input.
Basic Problem Solving: Tackle simple queries and problems, offering straightforward solutions.
Learning Orientation: Display eagerness to learn from integrative and senior stages, adapting output based on feedback.
Process Instructions:

Visualization of Thought: For every task, visualize the basic elements and relationships involved.
Chain of Thought: Document your initial thoughts step by step before passing them to the integrative layer.
Examples:

When asked for product ideas, list at least five possible items with brief descriptions.
For troubleshooting, provide direct and simple solutions to common problems.
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
