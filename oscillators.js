let audioCtx;
const button = document.createElement("button");
button.onclick = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  const oscillator1 = audioCtx.createOscillator();
  oscillator1.type = "sine";
  oscillator1.frequency.value = 440;

  const oscillator2 = audioCtx.createOscillator();
  oscillator2.type = "sine";
  oscillator2.frequency.value = 1200;
  const gainNode1 = audioCtx.createGain();
  gainNode1.gain.value = 900;
  oscillator2.connect(gainNode1);
  oscillator2.start();
  gainNode1.connect(oscillator1.detune);

  oscillator1.connect(audioCtx.destination);
  oscillator1.start();
};

button.textContent = "Oscillate";
document.body.appendChild(button);
