const music = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');

function enterSite() {
    const overlay = document.getElementById('overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);

    // Play music on enter
    music.play().then(() => {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch((err) => {
        console.log("Audio play failed:", err);
    });
}

function toggleMusic() {
    if (music.paused) {
        music.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        music.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}
