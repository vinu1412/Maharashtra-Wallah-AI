async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');

    if (!input) return;
    responseBox.innerHTML = "🔍 AI Soch raha hai...";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input })
        });

        const data = await response.json();
        responseBox.innerHTML = data.choices[0].message.content;
    } catch (error) {
        responseBox.innerHTML = "❌ Error: Vercel settings mein API Key check karo!";
    }
}
