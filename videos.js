// 🎥 Maharashtra Wallah AI - Actual Video Database 2026
const videoData = [
    {
        id: "hsc_phy_1",
        title: "HSC Physics: Rotational Dynamics One-Shot 🚀",
        subject: "Physics",
        thumbnail: "https://img.youtube.com/vi/b9_u_O-yZ-A/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/b9_u_O-yZ-A",
        category: "HSC"
    },
    {
        id: "hsc_chem_1",
        title: "HSC Chemistry: Halogen Derivatives Full Concept 🧪",
        subject: "Chemistry",
        thumbnail: "https://img.youtube.com/vi/W_6pI8C3vIs/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/W_6pI8C3vIs",
        category: "HSC"
    },
    {
        id: "ssc_math_1",
        title: "SSC Algebra: Linear Equations (Part 1) 📊",
        subject: "Maths",
        thumbnail: "https://img.youtube.com/vi/7v4j698v-W0/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/7v4j698v-W0",
        category: "SSC"
    },
    {
        id: "ssc_mar_1",
        title: "SSC Marathi: Complete Grammar Revision 🚩",
        subject: "Marathi",
        thumbnail: "https://img.youtube.com/vi/y3XG0v_tH9k/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/y3XG0v_tH9k",
        category: "SSC"
    }
];

// 🚀 Logic to Load Videos on Screen
function loadVideos(filter = 'All') {
    const container = document.getElementById('video-grid-container');
    if(!container) return; // Error check

    container.innerHTML = ''; // Pehle khali karo

    const filteredData = filter === 'All' ? videoData : videoData.filter(v => v.category === filter);

    filteredData.forEach(video => {
        container.innerHTML += `
            <div class="video-card" onclick="playVideo('${video.link}', '${video.title}')" style="background: #1e293b; border-radius: 15px; overflow: hidden; cursor: pointer; transition: 0.3s; border: 1px solid rgba(56, 189, 248, 0.1);">
                <div class="thumb-wrapper" style="position: relative;">
                    <img src="${video.thumbnail}" style="width: 100%; display: block;">
                    <div class="overlay-play" style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s;">
                        <i class="fas fa-play" style="color: white; font-size: 30px;"></i>
                    </div>
                </div>
                <div class="v-details" style="padding: 15px;">
                    <span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 10px; padding: 3px 8px; border-radius: 4px; font-weight: 700;">${video.subject}</span>
                    <h4 style="color: white; font-size: 15px; margin-top: 8px;">${video.title}</h4>
                </div>
            </div>
        `;
    });
}

// Hover effect (CSS se handle hota hai par JS se check kar rahe hain)
document.addEventListener('mouseover', (e) => {
    if(e.target.closest('.video-card')) {
        e.target.closest('.video-card').querySelector('.overlay-play').style.opacity = '1';
    }
});
document.addEventListener('mouseout', (e) => {
    if(e.target.closest('.video-card')) {
        e.target.closest('.video-card').querySelector('.overlay-play').style.opacity = '0';
    }
});

// Load everything on Start
window.onload = () => {
    loadVideos('All');
};
    
