const words = ["yese", "cant", "hack", "the", "mcginley", "pace"];
let currentIndex = 0;

function playNextWord(keyIndex) {
    const word = words[currentIndex];
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    fetch(`sounds/${word}.mp3`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
  
        // Pitch adjustment using playbackRate
        source.playbackRate.value = getPitchMultiplier(keyIndex);
  
        source.connect(audioContext.destination);
        source.start(0);
      });
  
    currentIndex = (currentIndex + 1) % words.length;
  }

function getPitchMultiplier(keyIndex) {
  // Slight pitch changes per key
  const pitchMap = [0.9, 0.95, 1.0, 1.05, 1.1, 1.15];
  return pitchMap[keyIndex] || 1.0;
}

// Promo song controls
const promoAudio = new Audio('sounds/mcginley_pace_song.mp3');

function playPromo() {
  promoAudio.play();
}

function pausePromo() {
  promoAudio.pause();
}
