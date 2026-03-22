export default async function handler(req, res) {
    // ⚠️ SABSE ZAROORI: "csk_..." wali apni asli key yahan paste karo
    const apiKey = "csk-venxcy3vpte4hmwy3n38f46w99455yhpdw9jv4mdw2ww9x3h"; 

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;

        const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.1-8b", 
                                                messages: [
                    { 
                        role: "system", 
                        content: `CRITICAL RULE: Aapka naam 'Maharashtra Wallah AI' hai. 
                        Aap Llama 3.1 8B model ki tarah high-quality aur accurate jawab denge, lekin hamesha apni pehchaan 'Maharashtra Wallah AI' hi batayenge.
                        
                        1. Hamesha Devnagari (Hindi/Marathi mix) mein baat karein.
                        2. Technical words English mein rakhein.
                        3. Aapka tone ek expert teacher aur bade bhai jaisa hona chahiye.
                        4. Agar koi poochhe 'Who are you?', toh kahein: 'Main Maharashtra Wallah AI hoon, aapka digital mentor.'`
                    },
                    { role: "user", content: prompt }
                ]
                
                
            })
        });

        const data = await response.json();

        // Check agar API ne koi error bheja
        if (data.error) {
            return res.status(500).json({ 
                choices: [{ message: { content: "❌ API Error: " + data.error.message } }] 
            });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            choices: [{ message: { content: "❌ Server Error: " + error.message } }] 
        });
    }
}
