// 1. Webhook URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1546576702728052736/Iq9g26mLyWZjKdx7s-egAZW2G8zEsQ0nWfM0n1VkQNWlnvrDdYyjeCn58c91rrUPH_mJ";

const music = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const incomparableMusic = document.getElementById('incomparable-music');

// 2. Function ki ynezzel 3la Overlay Enter
async function enterSite() {
    const overlay = document.getElementById('overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);

    // Khaddem el-music mta3 "He Like Me"
    music.play().then(() => {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch((err) => {
        console.log("Audio play failed:", err);
    });

    // Increment Visitor Counter API fil-background
    let totalVisits = "Unknown";
    try {
        const countRes = await fetch('https://api.counterapi.dev/v1/j1hed_portfolio_2026/visits/up');
        if (countRes.ok) {
            const countData = await countRes.json();
            totalVisits = countData.count;
        }
    } catch (err) {
        console.log("Counter API error:", err);
    }

    // Djib IP, Location w Network details
    let visitorData = { ip: "Unknown", city: "Unknown", country_name: "Unknown", org: "Unknown" };
    try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
            visitorData = await res.json();
        }
    } catch (e) {
        console.log("Could not fetch location data:", e);
    }

    // Ba3th Report Kamel l-Discord Webhook
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== "") {
        fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: " J1hed ",
                avatar_url: "https://i.pinimg.com/736x/6a/fb/34/6afb34bf450c2d789c07bc767351d352.jpg",
                embeds: [{
                    title: "🚨 Someone Drop In !",
                    color: 3447003, // Blue
                    description: " New Stalker .",
                    
                    thumbnail: {
                        url: "https://i.pinimg.com/736x/d2/bb/be/d2bbbeb3ccb086c98f55190026e58ea1.jpg" 
                    },

                    image: {
                        url: "https://i.pinimg.com/1200x/c2/20/c6/c220c693450bd585bf1a5456821f44b9.jpg"
                    },

                    fields: [
                        { name: "🔢 Total Visits", value: `\`#${totalVisits}\``, inline: false },
                        { name: "🌐 IP Address", value: `\`${visitorData.ip || 'Hidden'}\``, inline: true },
                        { name: "📍 Location", value: `${visitorData.city || 'Unknown'}, ${visitorData.country_name || 'Unknown'}`, inline: true },
                        { name: "📡 Network / ISP", value: visitorData.org || 'Unknown', inline: false },
                        { name: "💻 Device / Browser", value: navigator.userAgent.slice(0, 150), inline: false }
                    ],
                    footer: { text: "J1hed  System" },
                    timestamp: new Date().toISOString()
                }]
            })
        }).catch(err => console.error("Webhook error:", err));
    }
}

// 3. Function mta3 Music Player (He Like Me)
function toggleMusic() {
    if (!incomparableMusic.paused) {
        incomparableMusic.pause();
    }

    if (music.paused) {
        music.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        music.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// 4. Function mta3 Incomparable Song
function playIncomparable() {
    if (!music.paused) {
        music.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    if (incomparableMusic.paused) {
        incomparableMusic.play();
    } else {
        incomparableMusic.pause();
    }
}
