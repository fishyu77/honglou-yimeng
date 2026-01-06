(function() {
    // 1. Create Audio Element
    const audio = new Audio();
    audio.src = "https://music.163.com/song/media/outer/url?id=2617067789.mp3";
    audio.loop = true;
    audio.preload = "auto";
    
    // Check storage for playback state and time
    let isPlaying = sessionStorage.getItem('music_playing');
    if (isPlaying === null) {
        isPlaying = true;
    } else {
        isPlaying = isPlaying === 'true';
    }
    
    const currentTime = parseFloat(sessionStorage.getItem('music_time') || 0);
    
    if (currentTime > 0) {
        audio.currentTime = currentTime;
    }

    // 2. Create Music Control Button
    const btn = document.createElement('div');
    btn.id = 'music-control-btn';
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        </svg>
    `;
    
    // 3. Style the Button (Injected CSS)
    const style = document.createElement('style');
    style.textContent = `
        #music-control-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10000;
            transition: all 0.3s ease;
            color: #8E0000;
        }
        #music-control-btn:hover {
            transform: scale(1.1);
            background: #fff;
        }
        #music-control-btn svg {
            transition: transform 1s linear;
        }
        #music-control-btn.playing svg {
            animation: spin 3s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    
    // 4. Play/Pause Logic
    function togglePlay() {
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }

    function playAudio() {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.classList.add('playing');
                sessionStorage.setItem('music_playing', 'true');
            }).catch(error => {
                console.log("Playback failed:", error);
                btn.classList.remove('playing');
            });
        }
    }

    function pauseAudio() {
        audio.pause();
        btn.classList.remove('playing');
        sessionStorage.setItem('music_playing', 'false');
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });

    // 5. Append Elements
    // Use requestAnimationFrame or listen for body availability if script is in head
    function initUI() {
        if (document.body) {
            document.head.appendChild(style);
            document.body.appendChild(btn);
        } else {
            window.addEventListener('DOMContentLoaded', initUI);
        }
    }
    initUI();

    // 6. Handle Persistence & Smooth Navigation
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('music_time', audio.currentTime);
    });

    // Intercept links for smoother transition
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor && anchor.href && anchor.target !== '_blank' && !anchor.getAttribute('download')) {
            const url = new URL(anchor.href);
            // Only intercept internal links
            if (url.origin === window.location.origin) {
                // Check if it's just a hash change
                if (url.pathname === window.location.pathname && url.hash !== window.location.hash) {
                    return; // Let default hash navigation happen
                }
                
                e.preventDefault();
                // Save time immediately
                sessionStorage.setItem('music_time', audio.currentTime);
                
                // Small delay to ensure storage is written (optional, but safer)
                // And maybe fade out?
                // For now, just navigate immediately to minimize gap
                window.location.href = anchor.href;
            }
        }
    });

    // 7. Attempt Autoplay Strategy
    if (isPlaying) {
        // Try to play immediately
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.classList.add('playing');
            }).catch(() => {
                console.log("Autoplay blocked. Waiting for interaction.");
                const startOnInteraction = () => {
                    playAudio();
                    document.removeEventListener('click', startOnInteraction);
                };
                document.addEventListener('click', startOnInteraction);
            });
        }
    }
})();
