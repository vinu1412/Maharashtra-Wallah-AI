/* 1. Splash Screen Logic */
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) splash.style.display = 'none';
    }, 2000);
});

/* 2. Navigation Functions */
function toggleSubjects() {
    const list = document.getElementById('subjects-list');
    if(list) list.classList.toggle('hidden-content');
}

function openAIChat() {
    document.getElementById('ai-chat-window').classList.remove('chat-hidden');
}

function closeAIChat() {
    document.getElementById('ai-chat-window').classList.add('chat-hidden');
}

const chaptersData = {
    'Physics': ['Rotational Dynamics', 'Fluids', 'Thermodynamics'],
    'Chemistry': ['Solid State', 'Solutions', 'Ionic Equilibria'],
    'Mathematics': ['Logic', 'Matrices', 'Trig Functions'],
    'Biology': ['Reproduction', 'Inheritance', 'Evolution']
};

function openSubject(subject) {
    document.getElementById('main-menu').classList.add('hidden-content');
    document.getElementById('chapter-view').classList.remove('hidden-content');
    document.getElementById('selected-subject').innerText = subject;
    const list = document.getElementById('chapters-list');
    list.innerHTML = '';
    chaptersData[subject].forEach(ch => {
        const div = document.createElement('div');
        div.className = 'sub-item';
        div.innerText = ch;
        list.appendChild(div);
    });
}

function goBack() {
    document.getElementById('chapter-view').classList.add('hidden-content');
    document.getElementById('main-menu').classList.remove('hidden-content');
}

/* 3. Supabase Database Connection */
const SUPABASE_URL = 'https://etktvpsmgtlyqjntubmz.supabase.co';
const SUPABASE_KEY = 'sb_public_vbUmdfGQqXpUfV1mD_XoZ_U7'; 

// Check if supabase library is loaded
let supabaseClient;
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.error("Supabase library not found! Check index.html line 9.");
}

async function saveChatToDB(userMsg, aiMsg) {
    if (!supabaseClient) return;
    try {
        const { data, error } = await supabaseClient
            .from('Vinod vasave')
            .insert([{ user_query: userMsg, ai_response: aiMsg }]);
        if (error) console.error("DB Save Error:", error.message);
        else console.log("Data saved to Supabase!");
    } catch (e) {
        console.error("Database failed:", e);
    }
}

/* 4. Chat Logic (Cerebras API + Database Call) */
function handleMainChat() {
    const input = document.getElementById('user-query');
    const text = input.value.trim();
    if (text) {
        openAIChat();
        callAI(text);
        input.value = '';
    }
}

function handleChat() {
    const input = document.getElementById('chat-user-query');
    const text = input.value.trim();
    if (text) {
        callAI(text);
        input.value = '';
    }
}

async function callAI(query) {
    const display = document.getElementById('chat-display');

    // Display User Message
    const uDiv = document.createElement('div');
    uDiv.style.cssText = "background:#6366f1; color:white; padding:10px; border-radius:10px; margin-bottom:10px; align-self:flex-end; max-width:80%;";
    uDiv.innerText = query;
    display.appendChild(uDiv);

    // Show Loader
    const loader = document.createElement('div');
    loader.className = 'bot-msg';
    loader.innerText = 'Searching...';
    display.appendChild(loader);
    display.scrollTop = display.scrollHeight;

    try {
        const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer csk-vwnxcy3vptv4hmwy3n38f46w99455yhpdv9jv4mdu2wv9x3n",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.1-8b",
                messages: [
                    { role: "system", content: "You are Maharashtra Wallah AI tutor." },
                    { role: "user", content: query }
                ]
            })
        });

        const data = await res.json();
        display.removeChild(loader);

        if (data.choices && data.choices[0]) {
            const aiReply = data.choices[0].message.content;

            // Display AI Response
            const bDiv = document.createElement('div');
            bDiv.className = 'bot-msg';
            bDiv.innerText = aiReply;
            display.appendChild(bDiv);

            // Save to Database
            saveChatToDB(query, aiReply);
        } else {
            throw new Error("Invalid API Response");
        }

    } catch (e) {
        if(loader.parentNode) display.removeChild(loader);
        const errDiv = document.createElement('div');
        errDiv.innerText = "Error: API Response nahi mil raha. Key check karein.";
        errDiv.style.color = "red";
        display.appendChild(errDiv);
        console.error("AI Error:", e);
    }
    display.scrollTop = display.scrollHeight;
}
