const video = document.getElementById("video");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const progressBar = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play & Pause Video
function toggleVideoPlayStatus() {
  if (video.paused) {
    video.play();
    return;
  }
  video.pause();
}

// Update Play/Pause icon
function updatePlayIcon() {
  if (video.paused) {
    playButton.innerHTML = "<i class='fa fa-play fa-2x'></i>";
    return;
  }
  playButton.innerHTML = "<i class='fa fa-pause fa-2x'></i>";
}

// Update progress bar position on timeupdate event on video element
// This method complements progressBarSeekHandler
function videoTimeUpdateHandler() {
  progressBar.value = (video.currentTime / video.duration) * 100;

  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timestamp.innerText = `${minutes}:${seconds}`;
}

// Set video current time based on progressbar seek position
// This method complements videoTimeUpdateHandler
function progressBarSeekHandler() {
  video.currentTime = (+progressBar.value * video.duration) / 100;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event Listeners
video.addEventListener("click", toggleVideoPlayStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", videoTimeUpdateHandler);

playButton.addEventListener("click", toggleVideoPlayStatus);
stopButton.addEventListener("click", stopVideo);
progressBar.addEventListener("input", progressBarSeekHandler);
