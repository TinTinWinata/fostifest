export class Audio {
  static instance;
  static MUSIC_VILLAGE;

  constructor() {
    this.audios = [];
    this.setListener();
    this.volume = 0;
    this.addAllAudio();
    this.volumeRange = $('#volumeRange');
    this.setVolume(this.getValueFromRange());
  }

  getElement(id, asset) {
    return `<audio id="${id}" src="${asset}"></audio>`;
  }

  addElement(el) {
    $('#root-audio').append(el);
  }

  addAllAudio() {
    this.addAudio(Audio.MUSIC_VILLAGE, '../../../assets/music/village.mp3');
  }

  addAudio(index, asset) {
    const element = `audio-${index}`;
    this.addElement(this.getElement(element, asset));
    this.audios[index] = document.getElementById(element);
  }

  stopAllAudio() {
    this.audios.forEach((audio) => {
      audio.pause();
    });
  }

  setVolume(vol) {
    this.volume = vol;
    this.audios.forEach((audio) => {
      audio.volume = vol;
    });
  }

  static getInstance = () => {
    if (this.instance == null) {
      this.instance = new MyAudio();
    }
    return this.instance;
  };

  play(state, loop = true) {
    this.audios[state].currentTime = 0;
    this.audios[state].play();
    this.audios[state].volume = this.getValueFromRange();
    this.audios[state].loop = loop;
  }
}
