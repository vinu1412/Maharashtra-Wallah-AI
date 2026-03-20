export default async function handler(req, res) {
    // Sirf POST request allow karne ke liye
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful teacher for Maharashtra Board students." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        
        // Agar Groq se error aaye toh
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ error: "Server Error: " + error.message });
    }
                }
