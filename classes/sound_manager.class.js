class SoundManager {
    static sounds = {
        throw: new Audio('./audio/throw_sound.mp3'),
        walk: new Audio('./audio/pepe_walk_sound.mp3'),
        jump: new Audio('./audio/01 JUMP_ESP_SOUND.mp3'),
        hit: new Audio('./audio/01 HURT_ESP_SOUND.mp3'),
        idle: new Audio('./audio/03 ASLEEP_ESP_SOUND_V2.mp3'),
        collect: new Audio('./audio/collect.mp3'),
        pepeFull: new Audio('./audio/02 HOT SAUCE_ESP_SOUND.mp3'), // Idle-Sound hinzufügen
        chickenDead: new Audio ('./audio/jumpOnHead.mp3'),
        endBossScream: new Audio ('./audio/chickenboss_scream.mp3')
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


  static playSoundFromTime(soundName, startTimeInSeconds = 0) {
    const sound = this.getSound(soundName);
    if (sound) {
      sound.currentTime = startTimeInSeconds; // Setzt den Startzeitpunkt
      sound.play().catch(error => {
        console.error(`Fehler beim Abspielen des Sounds '${soundName}':`, error);
      });
    } else {
      console.error(`Sound '${soundName}' nicht gefunden.`);
    }
  }


}