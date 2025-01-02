class Sounds {
  constructor() {
    // Define all sounds to preload
    this.toLoad = {
      projectileSound: "/../assets/soundEffects/shooting-sound.mp3",
      projectileSound2: "/../assets/soundEffects/shooting-sound2.wav",
      projectileSound3: "/../assets/soundEffects/shooting-sound3.wav",
      explosion1: "/../assets/soundEffects/explosion1.wav",
      explosion2: "/../assets/soundEffects/explosion2.wav",
    };

    // Container for all loaded sounds
    // e.g., { laser: { audio: (AudioEl), isLoaded: true } }
    this.sounds = {};
    this.loadingPromises = [];

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
  playSound(key) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      //   this.sounds[key].audio.currentTime = 0; // Reset to the start
      //   this.sounds[key].audio.play();

      // Clone the audio element for simultaneous playback
      const audioClone = this.sounds[key].audio.cloneNode();
      audioClone.play();
    } else {
      console.warn(`Sound "${key}" is not loaded or doesn't exist.`);
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
