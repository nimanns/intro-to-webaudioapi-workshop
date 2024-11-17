let audioCtx;
if (!audioCtx) {
  audioCtx = new AudioContext();
}

const floatArray = new Float32Array(20000);
let counter = 1;
const frequency = 440; // Frequency of the square wave (in Hz)
const sampleRate = audioCtx.sampleRate;
const period = sampleRate / frequency; // Number of samples per period

for (let i = 0; i < floatArray.length; i++) {
  // Create a square wave by alternating between 1 and -1
  if (Math.floor(counter % period) < period / 2) {
    floatArray[i] = 1;
  } else {
    floatArray[i] = -1;
  }
  counter++;
}

// Create audio buffer
const audioBuffer = audioCtx.createBuffer(
  1,
  floatArray.length,
  audioCtx.sampleRate
);

// Writing data into a buffer
const channelData = audioBuffer.getChannelData(0);
for (let i = 0; i < floatArray.length; i++) {
  channelData[i] = floatArray[i];
}

const audioBufferSource = audioCtx.createBufferSource();
audioBufferSource.buffer = audioBuffer;
audioBufferSource.connect(audioCtx.destination);
audioBufferSource.start();

