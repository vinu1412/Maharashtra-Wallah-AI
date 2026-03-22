// ======================================================
// 🎯 MAHARASHTRA WALLAH AI - MASTER ENGINE (V1.0)
// ======================================================

// 1. Element Selectors (Saare zaroori buttons aur boxes)
const inputArea = document.getElementById('userInput');
const askButton = document.getElementById('askBtn');
const responseDisplay = document.getElementById('aiResponse');
const videoBox = document.getElementById('videoContainer');
const youtubeFrame = document.getElementById('videoPlayer');

// ======================================================
// 🧠 SECTION A: AI CHAT LOGIC (The Brain)
// ======================================================
async function askAI() {
    const swal = inputArea.value.trim();

    // Khali input check
    if (!swal) {
        responseDisplay.innerHTML = "⚠️ <span style='color: #ffcc00;'>Bhai, kuch toh likho! Question kahan hai?</span>";
        return;
    }

    // Loading State (Bache ko lage ki AI soch raha hai)
    responseDisplay.innerHTML = "🚀 <span style='color: #38bdf8;'>Maharashtra Wallah AI Soch raha hai...</span>";
    
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: swal })
        });

        const result = await data = await response.json();

        if (data.choices && data.choices[0]) {
            const jawab = data.choices[0].message.content;
            
            // Text Formatting (New lines ko handle karne ke liye)
            responseDisplay.innerHTML = `<strong>✨ Maharashtra Wallah AI:</strong><br><br>${jawab.replace(/\n/g, "<br>")}`;
            
            // Auto-Scroll (Jawab aate hi screen niche move hogi)
            responseDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            responseDisplay.innerHTML = "❌ <span style='color: #ff4d4d;'>AI thoda thak gaya hai. Please refresh karke try karo!</span>";
        }
    } catch (bhul) {
        console.error("Error:", bhul);
        responseDisplay.innerHTML = "❌ <span style='color: #ff4d4d;'>Connection Failed! Internet ya Vercel check karo bhai.</span>";
    }
}

// ======================================================
// 📺 SECTION B: VIDEO PLAYER LOGIC (Education Hub)
// ======================================================
function dikhaoVideo(id) {
    // YouTube Short ya Video ko Embed link mein badalna
    youtubeFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    
    // Player ko stylish tarike se dikhana
    videoBox.style.display = "block";
    videoBox.style.animation = "fadeIn 0.5s ease-in-out";
    
    // Video par focus lana
    videoBox.scrollIntoView({ behavior: 'smooth' });
}

function bandKaroVideo() {
    youtubeFrame.src = ""; // Video stop karne ke liye
    videoBox.style.display = "none";
}

// ======================================================
// ⚡ SECTION C: SMART FEATURES (UX/UI)
// ======================================================

// 1. Enter Key Support (Bina button dabaye message bhejo)
inputArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Nayi line prevent karega
        askAI();
    }
});

// 2. Clear Input after sending (Optional - use if needed)
// askButton.addEventListener('click', () => { setTimeout(() => { inputArea.value = ""; }, 100); });

console.log("✅ Maharashtra Wallah AI Engine Loaded Successfully!");
            
