async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');
    
    // Yahan apni Groq API Key dalo (Check karne ke liye)
    const apiKey = "YAHAN_APNI_GROQ_KEY_DALO"; 

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
                model: "llama-3.3-70b-versatile", // Yeh super fast model hai
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant for Maharashtra State Board students. Answer in Hindi/English mix. Be helpful and motivating."
                    },
                    {
                        role: "user",
                        content: input
                    }
                ]
            })
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content;
        responseBox.innerHTML = `<strong>AI:</strong> ${aiText}`;
        responseBox.style.color = "white";

    } catch (error) {
        responseBox.innerHTML = "❌ Error: API limit ya key check karo!";
        console.error(error);
    }
                                     }
