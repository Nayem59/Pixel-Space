class Sounds {
  constructor() {
    // Define all sounds to preload
    this.toLoad = {
      projectileSound: "/../assets/soundEffects/shooting-sound.mp3",
      projectileSound2: "/../assets/soundEffects/shooting-sound2.wav",
      projectileSound3: "/../assets/soundEffects/shooting-sound3.wav",
      projectileSound4: "/../assets/soundEffects/shooting-sound4.mp3",
      projectileSound5: "/../assets/soundEffects/shooting-sound5.wav",
      projectileSound6: "/../assets/soundEffects/shooting-sound6.mp3",
      projectileSound7: "/../assets/soundEffects/shooting-sound7.mp3",
      projectileSound8: "/../assets/soundEffects/shooting-sound8.mp3",
      explosion1: "/../assets/soundEffects/explosion1.wav",
      explosion2: "/../assets/soundEffects/explosion2.wav",
      explosion3: "/../assets/soundEffects/explosion3.mp3",
      explosion4: "/../assets/soundEffects/explosion4.mp3",
      explosion5: "/../assets/soundEffects/explosion5.mp3",
      explosion6: "/../assets/soundEffects/explosion6.mp3",
      explosion7: "/../assets/soundEffects/explosion7.wav",
      explosion8: "/../assets/soundEffects/explosion8.wav",
      explosion9: "/../assets/soundEffects/explosion9.wav",
      laser: "/../assets/soundEffects/laser.mp3",
    };

    // Container for all loaded sounds
    // e.g., { laser: { audio: (AudioEl), isLoaded: true } }
    this.sounds = {};
    this.loadingPromises = [];
    this.defaultVolume = 1.0;

    // Preload each sound
    Object.keys(this.toLoad).forEach((key) => {
      const audio = new Audio();
      audio.src = this.toLoad[key];
      this.sounds[key] = { audio: audio, isLoaded: false };

      const promise = new Promise((resolve) => {
        audio.oncanplaythrough = () => {
          this.sounds[key].isLoaded = true;
          resolve();
        };
      });

      this.loadingPromises.push(promise);
    });
  }

  loadAll() {
    return Promise.all(this.loadingPromises);
  }

  // Play a sound by its key
  playSound(key, volume = this.defaultVolume) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      //   this.sounds[key].audio.currentTime = 0; // Reset to the start
      //   this.sounds[key].audio.play();

      // Clone the audio element for simultaneous playback
      const audioClone = this.sounds[key].audio.cloneNode();
      audioClone.volume = volume;
      audioClone.play();
    } else {
      console.warn(`Sound "${key}" is not loaded or doesn't exist.`);
    }
  }

  setDefaultVolume(volume) {
    if (volume >= 0 && volume <= 1) {
      this.defaultVolume = volume;
      // Update all preloaded audio elements
      Object.values(this.sounds).forEach((sound) => {
        sound.audio.volume = volume;
      });
    } else {
      console.error("Volume must be between 0.0 and 1.0.");
    }
  }

  // Stop a sound by its key
  stopSound(key) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      this.sounds[key].audio.pause();
      this.sounds[key].audio.currentTime = 0;
    }
  }

  // Loop a sound by its key
  loopSound(key) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      this.sounds[key].audio.loop = true;
      this.sounds[key].audio.play();
    }
  }
}

// Create a single instance for the whole game
export const sounds = new Sounds();
