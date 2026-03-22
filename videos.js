// 🎥 Maharashtra Wallah AI - Video Database
const videoData = [
    {
        id: "v1",
        title: "HSC Physics: Rotational Dynamics One-Shot",
        subject: "Physics",
        thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        category: "HSC"
    },
    {
        id: "v2",
        title: "SSC Maths: Linear Equations in Two Variables",
        subject: "Maths",
        thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_2/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
        category: "SSC"
    },
    {
        id: "v3",
        title: "HSC Chemistry: Halogen Derivatives Full Chapter",
        subject: "Chemistry",
        thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3",
        category: "HSC"
    }
];

// Function to load videos (Ye script.js mein kaam aayega)
function loadVideos(filter = 'All') {
    const container = document.getElementById('video-grid-container');
    container.innerHTML = ''; 

    const filtered = filter === 'All' ? videoData : videoData.filter(v => v.category === filter);

    filtered.forEach(video => {
        container.innerHTML += `
            <div class="video-card" onclick="playVideo('${video.link}', '${video.title}')">
                <div class="thumb-container">
                    <img src="${video.thumbnail}" alt="Thumbnail">
                    <div class="play-overlay"><i class="fas fa-play"></i></div>
                </div>
                <div class="video-info">
                    <span class="v-badge">${video.subject}</span>
                    <h4>${video.title}</h4>
                    <p>Free Lecture • 2026 Batch</p>
                </div>
            </div>
        `;
    });
          }
              
