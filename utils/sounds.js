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
      laser2: "/../assets/soundEffects/laser2.wav",
      enemy1: "/../assets/soundEffects/enemy1.mp3",
      engine1: "/../assets/soundEffects/engine1e.mp3",
      engine2: "/../assets/soundEffects/engine2.mp3",
      engine3: "/../assets/soundEffects/engine3.mp3",
      engine4: "/../assets/soundEffects/engine4.mp3",
      engine5: "/../assets/soundEffects/engine5.mp3",
      engine6: "/../assets/soundEffects/engine6.mp3",
      ambient1: "/../assets/soundEffects/ambient1.mp3",
      boost: "/../assets/soundEffects/boost.mp3",
      cloakSound: "/../assets/soundEffects/cloakSound.mp3",
      coinSound: "/../assets/soundEffects/coinSound.mp3",
      gemSound: "/../assets/soundEffects/gemSound.mp3",
      healthUp: "/../assets/soundEffects/healthUp.mp3",
      shield2: "/../assets/soundEffects/shield2.mp3",
    };

    // Container for all loaded sounds
    // e.g., { laser: { audio: (AudioEl), isLoaded: true } }
    this.sounds = {};
    this.loadingPromises = [];
    this.defaultVolume = 1.0;
    this.pausedAudios = [];

    // Preload each sound
    Object.keys(this.toLoad).forEach((key) => {
      const audio = new Audio();
      audio.src = this.toLoad[key];
      audio.volume = this.defaultVolume;
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

  getSoundInstance(key) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      const audioClone = this.sounds[key].audio.cloneNode();
      return audioClone;
    } else {
      console.warn(`Sound "${key}" is not loaded or doesn't exist.`);
    }
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
  // stopSound(key) {
  //   if (this.sounds[key] && this.sounds[key].isLoaded) {
  //     this.sounds[key].audio.pause();
  //     this.sounds[key].audio.currentTime = 0;
  //   }
  // }
  stopSound(key, fadeDuration = 300) {
    // Default fade-out over 0.5s
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      const audio = this.sounds[key].audio;
      ("");

      if (audio.paused) return; // Already stopped

      const fadeSteps = 10; // Number of steps in fade-out
      const stepTime = fadeDuration / fadeSteps; // Time per step
      let volumeStep = audio.volume / fadeSteps; // Amount to reduce per step

      let fadeInterval = setInterval(() => {
        if (audio.volume > volumeStep) {
          audio.volume -= volumeStep;
        } else {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0; // Reset position
          clearInterval(fadeInterval);
        }
      }, stepTime);
    }
  }

  // Loop a sound by its key
  loopSound(key, volume = this.defaultVolume) {
    if (this.sounds[key] && this.sounds[key].isLoaded) {
      if (this.sounds[key].audio.paused) {
        this.sounds[key].audio.loop = true;
        this.sounds[key].audio.volume = volume;
        this.sounds[key].audio.play();
      }
    }
  }

  stopAllSounds() {
    Object.values(this.sounds).forEach((sound) => {
      if (!sound.audio.paused) {
        sound.audio.pause();
        this.pausedAudios.push(sound.audio);
      }
    });
    console.log(this.pausedAudios);
  }

  resumePausedSounds() {
    this.pausedAudios.map((audio) => audio.play());
    this.pausedAudios = [];
  }
}

// Create a single instance for the whole game
export const sounds = new Sounds();
