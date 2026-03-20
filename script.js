export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { prompt } = req.body;
        const apiKey = process.env.CEREBRAS_API_KEY;

        const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.1-8b", // Cerebras ka fast model
                messages: [
                    { role: "system", content: "You are a helpful teacher for Maharashtra Board students." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ error: "Cerebras Error: " + error.message });
    }
    }
    
