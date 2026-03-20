async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');

    // 1. Check agar input khali hai
    if (input.trim() === "") {
        responseBox.innerHTML = "⚠️ Bhai, kuch toh likho! Question kahan hai?";
        responseBox.style.color = "#ffcc00"; // Warning color
        return;
    }

    // 2. Loading state dikhao
    responseBox.innerHTML = "🚀 Cerebras Engine Soch raha hai...";
    responseBox.style.color = "white";

    try {
        // 3. Vercel Backend (api/chat.js) ko call karo
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: input })
        });

        const data = await response.json();

        // 4. Check karo agar backend se sahi response aaya
        if (data.choices && data.choices[0]) {
            const aiText = data.choices[0].message.content;
            
            // Format response (Nayi line handle karne ke liye)
            responseBox.innerHTML = `<strong>Maharashtra Wallah AI:</strong> <br><br>${aiText.replace(/\n/g, "<br>")}`;
        } else {
            // Agar API key ya server mein dikat ho
            responseBox.innerHTML = "❌ Error: AI respond nahi kar raha. Vercel Settings mein Cerebras Key check karo!";
            responseBox.style.color = "#ff4d4d";
        }

    } catch (error) {
        // 5. Network ya Connection error handle karo
        console.error("Error:", error);
        responseBox.innerHTML = "❌ Connection Failed! Ek baar internet ya Vercel Logs check karo.";
        responseBox.style.color = "#ff4d4d";
    }
    }
