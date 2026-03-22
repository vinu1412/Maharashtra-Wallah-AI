// ==========================================
// 1. AI CHAT LOGIC (Cerebras API Connection)
// ==========================================
async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');

    if (input.trim() === "") {
        responseBox.innerHTML = "⚠️ Bhai, kuch toh likho! Sawal kahan hai?";
        return;
    }

    // Loading state dikhao
    responseBox.innerHTML = "🚀 Maharashtra Wallah AI Soch raha hai...";
    responseBox.style.color = "white";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            const aiText = data.choices[0].message.content;
            // Response format karna aur scroll karna
            responseBox.innerHTML = `<strong>Maharashtra Wallah AI:</strong> <br><br>${aiText.replace(/\n/g, "<br>")}`;
            responseBox.scrollIntoView({ behavior: 'smooth' });
        } else {
            responseBox.innerHTML = "❌ Error: AI respond nahi kar raha. Key check karo!";
        }
    } catch (error) {
        console.error("Error:", error);
        responseBox.innerHTML = "❌ Connection Failed! Internet check karo bhai.";
    }
}

// ==========================================
// 2. VIDEO PLAYER LOGIC (For Subject Buttons)
// ==========================================
function dikhaoVideo(videoId) {
    const container = document.getElementById('videoContainer');
    const player = document.getElementById('videoPlayer');
    
    // YouTube link set karna
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    container.style.display = "block"; // Video dikhao
    container.scrollIntoView({ behavior: 'smooth' });
}

function bandKaroVideo() {
    const container = document.getElementById('videoContainer');
    const player = document.getElementById('videoPlayer');
    
    player.src = ""; // Video band karna
    container.style.display = "none"; // Player chhupana
}

// ==========================================
// 3. KEYBOARD LOGIC (Enter Key Support)
// ==========================================
document.getElementById('userInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askAI();
    }
});
        
