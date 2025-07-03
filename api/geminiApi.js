import apiKey from "../env.js"

export async function ask(query) {

    if (!query) {
console.log("query is null")

        return
    }

    console.log("sending query to gemini api")
    try {
        const response = await askGemini(query)
        console.log(response.text);
        return response
    }
    catch (error) {
        console.log("api requested failed: " + error)
        return "api request failed"
    }
}

async function askGemini(query) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const body = {
        contents: [
            {
                parts: [{ text: query}],
            }
        ]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return text
}

