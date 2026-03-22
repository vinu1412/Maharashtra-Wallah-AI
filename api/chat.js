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
                        content: `Aap 'Maharashtra Wallah AI' ho, ek expert teacher jo Maharashtra State Board (HSC aur SSC) ke students ko padhate hain. 
                        Aapka kaam hai students ke doubts solve karna ek friendly aur motivating tarike se.
                        
                        Aapke jawab aise hone chahiye:
                        1. **Language:** Mix of Hindi and English (Hinglish). Kuch Marathi words bhi use karo (jaise 'Abhyas kara', 'Bara aahe ka?').
                        2. **Board Focus:** Hamesha Maharashtra Board ke textbooks aur paper pattern ka reference do.
                        3. **Topper Tips:** Batao ki exam mein full marks kaise lane hain (diagrams, point-wise answers).
                        4. **Tone:** Ek bade bhai ya pyare yaar jaisi, hamesha 'Bhai' ya 'Yaar' keh kar bulao.
                        5. **Structure:** Answers ko hamesha points mein likho.`
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
