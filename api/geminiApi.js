import apiKey from "../env.js"

export async function ask(query) {
    if (!query) {
        console.log("Error: Query is empty or null");
        return null;
    }

    console.log("Sending query to Gemini API");
    
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const requestBody = {
            contents: [{
                parts: [{ text: query }]
            }]
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
            console.log("Warning: No response text received from API");
            return "No response received";
        }

        console.log("API response received successfully");
        return text;
        
    } catch (error) {
        console.log(`API request failed: ${error.message}`);
        return null;
    }
}

