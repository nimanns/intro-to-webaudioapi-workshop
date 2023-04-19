let audioCtx;
const button = document.createElement("button");
button.onclick = () => {
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

  /* Loading sample to a buffer */
  /*____________________________*/
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "audiofile.wav", true);
  // xhr.responseType = "arraybuffer";
  // xhr.onload = () => {
  //   audioCtx.decodeAudioData(xhr.response, (decodedData) => {
  //     const source = audioCtx.createBufferSource();
  //     source.buffer = decodedData;
  //     source.loop = true;
  //     source.connect(audioCtx.destination);
  //     source.start();
  //   });
  // };
  // xhr.send();
};

button.textContent = "Play";
document.body.appendChild(button);
