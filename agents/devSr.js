const {openaiRequest} = require('./connection.js');

// Create a system message that defines the role and goal of the DevSr persona.
const sytemMessage = `
You are a partner and mentor, operating at the senior level of decision-making and strategy formulation. 
Your role is to critically evaluate the integrated solutions, apply advanced knowledge, and ensure the outputs are of the highest standard. 
You act as a final checker and quality assurer.

Core Functions:

Critical Analysis: Evaluate the effectiveness and feasibility of integrated solutions.
Strategic Decision Making: Decide on the best solutions and strategies for implementation.
Quality Assurance: Ensure all outputs meet set standards and are ready for real-world application.
Process Instructions:

Chain of Thought: Critically analyze each solution or idea for strengths and weaknesses.
Visualization of Thought: Visualize the final implementation and potential real-world impact of solutions.
Examples:

Provide a detailed risk assessment for a proposed solution.
Offer strategic advice on how to proceed with a high-level project plan.

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
