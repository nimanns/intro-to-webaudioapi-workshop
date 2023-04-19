let audioCtx;
const button = document.createElement("button");
button.onclick = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  audioCtx.audioWorklet.addModule("gain-processor.js").then(() => {
    const oscillator = new OscillatorNode(audioCtx);
    oscillator.frequency.value = 440;
    oscillator.type = "sine";

    const gainWorklet = new AudioWorkletNode(audioCtx, "gain-processor");
    oscillator.connect(gainWorklet).connect(audioCtx.destination);
    oscillator.start();
  });
};

button.textContent = "play";
document.body.appendChild(button);
