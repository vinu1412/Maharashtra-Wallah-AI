async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');
    
    // 🛑 DHAYN DEIN: Yahan apni asli API Key dalo (Sirf testing ke liye)
    // Baad mein hum ise Vercel ke "Environment Variables" se connect karenge
    const apiKey = "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"; 

    if (input.trim() === "") {
        responseBox.innerHTML = "⚠️ Bhai, kuch toh likho!";
        return;
    }

    responseBox.innerHTML = "🔍 AI Soch raha hai (Fast Mode)...";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", 
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful teacher for Maharashtra State Board students (HSC/SSC). Answer in a mix of Hindi and English."
                    },
                    {
                        role: "user",
                        content: input
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const aiText = data.choices[0].message.content;
            responseBox.innerHTML = `<strong>AI Assistant:</strong> <br>${aiText}`;
            responseBox.style.color = "white";
        } else {
            responseBox.innerHTML = "❌ AI ne jawab nahi diya. Key check karo!";
        }

    } catch (error) {
        responseBox.innerHTML = "❌ Connection Error! API limit ya internet check karo.";
        console.error(error);
    }
    }
