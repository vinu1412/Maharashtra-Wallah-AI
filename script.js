/* 1. Splash & Navigation */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
    }, 2000);
});

function toggleSubjects() {
    document.getElementById('subjects-list').classList.toggle('hidden-content');
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

/* 2. Supabase Setup (Database) */
const SUPABASE_URL = 'https://etktvpsmgtlyqjntubmz.supabase.co';
const SUPABASE_KEY = 'sb_public_vbUmdfGQqXpUfV1mD_XoZ_U7'; // आपकी Public Key
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function saveChatToDB(userMsg, aiMsg) {
    const { data, error } = await supabaseClient
        .from('Vinod vasave') // आपकी टेबल का नाम
        .insert([{ user_query: userMsg, ai_response: aiMsg }]);

    if (error) console.error("Database Save Error:", error);
    else console.log("Data successfully saved to Supabase!");
}

/* 3. Chat Logic (Cerebras AI + Supabase) */
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

    // User message display
    const uDiv = document.createElement('div');
    uDiv.style.cssText = "background:#6366f1; color:white; padding: 10px; border-radius:10px; margin-bottom:10px; align-self:flex-end;";
    uDiv.innerText = query;
    display.appendChild(uDiv);

    // Loading indicator
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

        const aiReply = data.choices[0].message.content;

        // AI message display
        const bDiv = document.createElement('div');
        bDiv.className = 'bot-msg';
        bDiv.innerText = aiReply;
        display.appendChild(bDiv);
        
        // --- DATABASE SAVE START ---
        saveChatToDB(query, aiReply);
        // --- DATABASE SAVE END ---

    } catch (e) {
        display.removeChild(loader);
        alert("API Error! Key check karo bhai.");
    }
    display.scrollTop = display.scrollHeight;
        }
