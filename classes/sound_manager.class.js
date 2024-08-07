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
   * mutes background music
   */
  static muteBackground() {
    const bgSound = this.sounds["backgroundMusic"];
    if (bgSound) {
      bgSound.muted = true;
    }
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
 * checks the localstorage if sound was muted before
 */
  static applyMuteState() {
    // Retrieve mute state from local storage
    const muteState = localStorage.getItem('soundsMuted');

    // Apply the mute state to all sounds
    if (muteState === 'true') {
        this.muteAll();
    } else {
        this.unmuteAll();
    }
}

}
