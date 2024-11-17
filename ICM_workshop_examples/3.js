let audioCtx;
if (!audioCtx) {
  audioCtx = new AudioContext();
}

const floatArray = new Float32Array(20000);

for (let i = 0; i < floatArray.length; i++) {
  // Generate random noise between -1 and 1
  floatArray[i] = Math.random() * 2 - 1; 
  // Random value between -1 and 1
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
