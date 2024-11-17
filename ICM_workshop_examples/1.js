let audioCtx;
if (!audioCtx) {
  audioCtx = new AudioContext();
}

const floatArray = new Float32Array(20000);
let counter = 1;
for (let i = 0; i < floatArray.length; i++) {
  floatArray[i] = Math.sin(counter);
  floatArray[i] += Math.sin(counter - 0.5);
  floatArray[i] += Math.sin(counter + 0.5);
  floatArray[i] += Math.sin(counter + 0.9);
  counter += 0.04;
}
//let floatArray = [.5,.6,.7,.8,.9,.8,.7,.6,.5]
//-1 ------ 0 ------ 1

// create audio buffer
const audioBuffer = audioCtx.createBuffer(
  1,
  floatArray.length,
  audioCtx.sampleRate
);

// /* Writing data into a buffer */
// /*____________________________*/
// copy float array data to audio buffer
const channelData = audioBuffer.getChannelData(0);
for (let i = 0; i < floatArray.length; i++) {
  channelData[i] = floatArray[i];
}

const audioBufferSource = audioCtx.createBufferSource();
audioBufferSource.buffer = audioBuffer;
audioBufferSource.connect(audioCtx.destination);
audioBufferSource.start();

