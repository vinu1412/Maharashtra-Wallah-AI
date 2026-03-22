export default async function handler(req, res) {
    // 1. Check API Key
    const apiKey = process.env.CEREBRAS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ 
            choices: [{ message: { content: "❌ Error: Vercel settings mein CEREBRAS_API_KEY nahi mili! Settings check karo." } }] 
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;

        const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.1-8b", 
                messages: [
                    { role: "system", content: "You are a helpful teacher for Maharashtra Board students. Answer clearly in Hindi/English mix." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ 
                choices: [{ message: { content: "❌ API Error: " + data.error.message } }] 
            });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            choices: [{ message: { content: "❌ Server Error: " + error.message } }] 
        });
    }
                        }
            
