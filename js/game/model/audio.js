export class AudioData {
  static instance = null; // Static variable to hold the single instance of AudioData.
  static MUSIC_VILLAGE;

  constructor() {
    this.audios = []; // Array to hold audio elements.
    this.volume = 0; // The volume for all audio elements.
    this.addAllAudio(); // Initialize and add audio elements to the DOM.
  }

  // Utility function to generate an HTML audio element with a specified ID and asset source.
  getElement(id, asset) {
    return `<audio id="${id}" src="${asset}"></audio>`;
  }

  // Utility function to add an HTML audio element to the DOM.
  addElement(el) {
    const element = document.createElement('div');
    element.innerHTML = el;

    const audioDiv = document.getElementById('root-audio'); // Assumes there's an element with the ID 'root-audio' in your HTML.
    audioDiv.appendChild(element);
  }

  // Initializes the audio elements by adding the default audio.
  addAllAudio() {
    this.addAudio(Audio.MUSIC_VILLAGE, '../../../assets/music/village.mp3');
  }

  // Adds a specific audio element to the DOM and stores it in the 'audios' array.
  addAudio(index, asset) {
    const element = `audio-${index}`;
    this.addElement(this.getElement(element, asset));
    this.audios[index] = document.getElementById(element);
  }

  // Stops playback of all audio elements.
  stopAllAudio() {
    this.audios.forEach((audio) => {
      audio.pause();
    });
  }

  // Sets the volume for all audio elements and updates the 'volume' property.
  setVolume(vol) {
    this.volume = vol;
    this.audios.forEach((audio) => {
      audio.volume = vol;
    });
  }

  // Static method to get a single instance of AudioData.
  static getInstance = () => {
    if (this.instance == null) {
      this.instance = new AudioData();
    }
    return this.instance;
  };

  // Plays a specified audio element with optional looping.
  play(state, loop = true) {
    this.audios[state].currentTime = 0; // Resets the playback time to the beginning.
    this.audios[state].play(); // Starts playback.
    this.audios[state].loop = loop; // Sets looping if specified.
  }
}
