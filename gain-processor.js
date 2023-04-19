class GainProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.counter = 0;
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    const gain = Math.abs(Math.sin(this.counter));
    this.counter += 0.01;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      for (let i = 0; i < inputChannel.length; i++) {
        outputChannel[i] = inputChannel[i] * gain;
      }
    }
    return true;
  }
}

registerProcessor("gain-processor", GainProcessor);
