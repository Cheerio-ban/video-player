const player = document.querySelector('.player');
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("forward-btn");
const prevBtn = document.getElementById("backward-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector('.player-speed');
const fullScreenBtn = document.querySelector(".fullscreen");


// looping over videos in the folder
const videos = ['i', 'j', "m", "aa", 'ac', "e", 's',"ab", "c", "v", "d", "g", "o", 'p', 'h', 'x', "n", 'b', 'kek', "t", "a", "w", "k", "electrics", 'q']

// keep track of videos
let videoIndex = 0;

// Initially load song into DOM
loadVideo(videos[videoIndex]);


function loadVideo(videod) {
    video.src = `videos/${videod}.mp4`;
}

function nextVideo() {
    videoIndex++;

    if (videoIndex > videos.length - 1){
        videoIndex = 0
    }
    loadVideo(videos[videoIndex]);

    togglePlay();
}

function prevVideo() {
    videoIndex--;

    if (videoIndex < 0) {
        videoIndex = videos.length -1;
    }

    loadVideo(videos[videoIndex]);

    togglePlay();
}

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.title = 'Pause';
    }else {
        video.pause();
        showPlayIcon();
    }
}




// Progress Bar ---------------------------------- //

// calculate display time format
const displayTime = (time) => {
    const minutes = Math.floor(time/ 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}


// Updates the progress bar as video plays
function updateProgress() {
    // console.log('currentTime', video.currentTime, 'duration', video.duration)
    progressBar.style.width = `${(video.currentTime/video.duration) * 100}%`;
    currentTime.textContent =  `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;


//Volume Bar
const changeVolume = (e) => {
    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // Change icon depending volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up') 
    }else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVolume = volume;
}

const toggleMute = () => {
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        lastIcon = volumeIcon.className;
        volumeIcon.className = '';
        volumeIcon.classList.add('fas' ,'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add(`fas`, 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}



// Change Playback Speed -------------------- //

const changeSpeed = () => {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
  }

let fullscreen = false;

// Toggle Fullscreen
const toggleFullscreen = () => {
    if (!fullscreen) {
        openFullscreen(player);
    }else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

// Event Listeners
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullScreenBtn.addEventListener('click', toggleFullscreen);
// On video End, loop to the first video
video.addEventListener('ended', nextVideo);
