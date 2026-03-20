function askAI() {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('aiResponse');

    if (input.trim() === "") {
        responseBox.innerHTML = "⚠️ Bhai, kuch toh likho!";
        responseBox.style.color = "orange";
        return;
    }

    // Abhi ke liye hum "Mock AI" (Simulated) use kar rahe hain
    // Agle step mein hum Gemini API se real answer laayenge!
    responseBox.innerHTML = "🔍 AI soch raha hai... Aapka sawaal: '" + input + "'";
    responseBox.style.color = "#38bdf8";

    setTimeout(() => {
        responseBox.innerHTML = "✅ Aapka answer taiyaar ho raha hai! (API integration coming soon...)";
    }, 2000);
}
