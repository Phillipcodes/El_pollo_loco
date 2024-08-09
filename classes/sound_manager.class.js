/**
 * @class
 */
class SoundManager {
  static sounds = {
    throw: new Audio("./audio/throw_sound.mp3"),
    walk: new Audio("./audio/pepe_walk_sound.mp3"),
    jump: new Audio("./audio/01 JUMP_ESP_SOUND.mp3"),
    hit: new Audio("./audio/01 HURT_ESP_SOUND.mp3"),
    idle: new Audio("./audio/03 ASLEEP_ESP_SOUND_V2.mp3"),
    collect: new Audio("./audio/collect.mp3"),
    pepeFull: new Audio("./audio/02 HOT SAUCE_ESP_SOUND.mp3"), // Idle-Sound hinzufügen
    chickenDead: new Audio("./audio/jumpOnHead.mp3"),
    endBossScream: new Audio("./audio/chickenboss_scream.mp3"),
    backgroundMusic: new Audio("./audio/background_music.mp3"),
    winSound: new Audio("./audio/win.mp3"),
    gameOverSound: new Audio("./audio/game_over.mp3"),
    hoverSound: new Audio("./audio/hover_sound.mp3")
    
  };


  /**
   * Retrieves a sound object by its name and sets its volume.
   *
   * @param {string} soundName - The name of the sound to retrieve.
   * @param {number} [volume=1.0] - The volume level to set for the sound. Default is 1.0.
   * @returns {Object|null} The sound object if found, or `null` if the sound is not found.
   */
  static getSound(soundName, volume = 1.0) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.volume = volume; 
      return sound;
    } else {
      return null;
    }
  }


  /**
   * mutes all sounds
   */
  static muteAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.muted = true;
    });
    localStorage.setItem('soundsMuted', 'true');
    
  }

/**
 * checks local storage if sound already muted to fit the current state 
 */
  static checkAndToggleSound() {
    const soundsMuted = localStorage.getItem('soundsMuted');
    console.log('Current soundsMuted value:', soundsMuted);
    if (soundsMuted === 'true' || soundsMuted === 'true-false') {
      this.unmuteAllAtZero();
    } else {
      this.muteAllZero();
    }
  }
  

/**
 * unmutes the sound and the bg sound to start playing at 0 again
 */
static unmuteAllAtZero() {
  let bgsound = this.sounds.backgroundMusic
  Object.values(this.sounds).forEach((sound) => {
    sound.muted = false;
    bgsound.currentTime = 0
  });
  localStorage.setItem('soundsMuted', 'false')
}

/**
 * mutes the sound and the bg sound to start playing at 0 again
 */
static muteAllZero() {
  let bgsound = this.sounds.backgroundMusic
  Object.values(this.sounds).forEach((sound) => {
    sound.muted = true;
    bgsound.currentTime = 0
  });
  localStorage.setItem('soundsMuted', 'true')
}


  /**
   * unmutes all sounds
   */
  static unmuteAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.muted = false;
    });
    localStorage.setItem('soundsMuted', 'false');
  }


  /**
   * Mutes all sounds except for the specified sound.
   * @param {string} exemptSoundName - The name of the sound to exclude from muting.
   */
  static muteAllExcept(exemptSoundName) {
    const soundsMuted = localStorage.getItem('soundsMuted');
    Object.entries(this.sounds).forEach(([name, sound]) => {
      if (name !== exemptSoundName) {
        sound.muted = true;
      }
    });
    localStorage.setItem('soundsMuted', 'true')
    if(soundsMuted ==='true') {
      localStorage.setItem('soundsMuted', 'true-false')
    }
    
  }


  /**
   * Mutes all sounds except for the hover sound.
   */
  static muteAllStopGame() {
    this.muteAllExcept('hoverSound'); // Mutet alle Sounds außer 'hoverSound'
  }
}
