// 1. Splash Screen Timer (2 Second baad app dikhao)
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.display = 'none';
    }, 2000);
});

// 2. Subjects List ko Khulna aur Band karna
function toggleSubjects() {
    const list = document.getElementById('subjects-list');
    const arrow = document.querySelector('.arrow');
    
    if (list.classList.contains('hidden-content')) {
        list.classList.remove('hidden-content');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        list.classList.add('hidden-content');
        arrow.style.transform = 'rotate(0deg)';
    }
}

// 3. Subject select karne par Chapters dikhana
const chaptersData = {
    'Physics': ['Rotational Dynamics', 'Mechanical Properties of Fluids', 'Kinetic Theory of Gases', 'Thermodynamics'],
    'Chemistry': ['Solid State', 'Solutions', 'Ionic Equilibria', 'Chemical Thermodynamics'],
    'Mathematics': ['Mathematical Logic', 'Matrices', 'Trigonometric Functions', 'Pair of Straight Lines'],
    'Biology': ['Reproduction in Lower and Higher Plants', 'Reproduction in Animals', 'Inheritance and Variation']
};

function openSubject(subject) {
    document.getElementById('main-menu').classList.add('hidden-content');
    document.getElementById('chapter-view').classList.remove('hidden-content');
    document.getElementById('selected-subject').innerText = subject;
    
    const listContainer = document.getElementById('chapters-list');
    listContainer.innerHTML = ''; // Purana saaf karo

    chaptersData[subject].forEach(chapter => {
        const div = document.createElement('div');
        div.className = 'sub-item';
        div.innerText = chapter;
        listContainer.appendChild(div);
    });
}

function goBack() {
    document.getElementById('chapter-view').classList.add('hidden-content');
    document.getElementById('main-menu').classList.remove('hidden-content');
}

// 4. AI Assistant Controls (Open/Close)
function openAI() {
    document.getElementById('ai-chat-window').classList.remove('chat-hidden');
}

function closeAI() {
    document.getElementById('ai-chat-window').classList.add('chat-hidden');
}

// 5. Chat Handling (Abhi ke liye basic, baad mein API jodenge)
function handleChat() {
    const input = document.getElementById('user-query');
    const display = document.getElementById('chat-display');
    
    if (input.value.trim() !== "") {
        // User ka message dikhao
        const userMsg = document.createElement('div');
        userMsg.style.cssText = "background: #38bdf8; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; margin-bottom: 10px; align-self: flex-end; font-size: 14px; margin-left: auto; max-width: 80%;";
        userMsg.innerText = input.value;
        display.appendChild(userMsg);
        
        // Bot ka temporary reply
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'bot-msg';
            botMsg.innerText = "Soch raha hoon... (API jodne ke baad main jawab dunga!)";
            display.appendChild(botMsg);
            display.scrollTop = display.scrollHeight;
        }, 500);
    

        input.value = "";
        display.scrollTop = display.scrollHeight;
    }
}

// Camera aur File ke liye placeholder functions
function openCamera() { alert("Camera opening... (Feature coming soon!)"); }
        // 5. Asli AI Chat Handling (Cerebras API ke saath)
async function handleChat() {
    const input = document.getElementById('user-query');
    const display = document.getElementById('chat-display');
    const userText = input.value.trim();
    
    if (userText !== "") {
        // User ka message screen par dikhao
        const userMsg = document.createElement('div');
        userMsg.style.cssText = "background: #38bdf8; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; margin-bottom: 10px; align-self: flex-end; font-size: 14px; margin-left: auto; max-width: 80%;";
        userMsg.innerText = userText;
        display.appendChild(userMsg);
        
        input.value = ""; // Input saaf karo
        display.scrollTop = display.scrollHeight;

        // Bot ka 'Soch raha hoon...' message
        const typingMsg = document.createElement('div');
        typingMsg.className = 'bot-msg';
        typingMsg.innerText = "Searching for answer...";
        display.appendChild(typingMsg);

        try {
            const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer csk-venxcy3vpte4hmwy3n38f46w99455yhpdw9jv4mdw2ww9x3h", // <--- Yahan apni CSK_ wali key dalo
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3.1-8b",
                    messages: [
                        { role: "system", content: "You are Maharashtra Wallah AI, a helpful assistant for Class 12th HSC students. Answer in simple Hinglish." },
                        { role: "user", content: userText }
                    ]
                })
            });

            const data = await response.json();
            const aiReply = data.choices[0].message.content;
            
            // Typing message hatao aur asli jawab dikhao
            display.removeChild(typingMsg);
            const botMsg = document.createElement('div');
            botMsg.className = 'bot-msg';
            botMsg.innerText = aiReply;
            display.appendChild(botMsg);
            
        } catch (error) {
            display.removeChild(typingMsg);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'bot-msg';
            errorMsg.innerText = "Connection error! API key check karo bhai.";
            display.appendChild(errorMsg);
        }
        display.scrollTop = display.scrollHeight;
    }
    }
