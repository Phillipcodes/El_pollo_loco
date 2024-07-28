class SoundManager {
    static sounds = {
        throw: new Audio('./audio/throw_sound.mp3'),
        walk: new Audio('../audio/pepe_walk_sound.mp3'),
        jump: new Audio('../audio/01 JUMP_ESP_SOUND.mp3'),
        hit: new Audio('../audio/01 JUMP_ESP_SOUND v2.mp3'),
        idle: new Audio('../audio/03 ASLEEP_ESP_SOUND V2.mp3') // Idle-Sound hinzufügen
      };


  static getSound(soundName) {
    return this.sounds[soundName];
  }

  static muteAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.muted = true;
    });
  }

  static unmuteAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.muted = false;
    });
  }


}