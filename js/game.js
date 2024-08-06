let canvas;
let world;
let keyboard = new Keyboard();
let playSound = true;
let intervalIds = [];
let keydownHandler;
let keyupHandler;

function init() {
  canvas = document.getElementById('canvas');
  setMuteSounds();
  setOnclickEvents();
  console.log('my Character is ', world?.character);
}

function setupKeyListeners() {
  keydownHandler = (event) => {
    switch(event.key) {
      case 'w': keyboard.UP = true; console.log('Up is now true'); break;
      case 'a': keyboard.LEFT = true; console.log('left is now true'); break;
      case 's': keyboard.DOWN = true; console.log('down is now true'); break;
      case 'd': keyboard.RIGHT = true; console.log('right is now true'); break;
      case ' ': keyboard.SPACE = true; console.log('Space is now true'); break;
    }
  };

  keyupHandler = (event) => {
    switch(event.key) {
      case 'w': keyboard.UP = false; console.log('Up is now false'); break;
      case 'a': keyboard.LEFT = false; console.log('left is now false'); break;
      case 's': keyboard.DOWN = false; console.log('down is now false'); break;
      case 'd': keyboard.RIGHT = false; console.log('right is now false'); break;
      case ' ': keyboard.SPACE = false; console.log('Space is now false'); break;
    }
  };

  window.addEventListener('keydown', keydownHandler);
  window.addEventListener('keyup', keyupHandler);
}

function removeKeyListeners() {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler);
  }
  if (keyupHandler) {
    window.removeEventListener('keyup', keyupHandler);
  }
}

function clearCanvas() {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
  }
}

function setMuteSounds() {
  document.getElementById('mute-container').onclick = () => world?.initializeSoundButton();
}

function destroyWorld() {
  if (world) {
    world = null; // Setze die Welt-Instanz auf null
  }
}

function setWorldStart() {
  stopGame(); // Stoppe alle Intervalle
  removeKeyListeners(); // Entferne alte Event-Listener
  clearCanvas(); // Lösche den Canvas-Inhalt
  destroyWorld(); // Zerstöre die alte Welt
  initLevel();
  world = new World(canvas, keyboard); // Erstelle eine neue Welt-Instanz
  setupKeyListeners(); // Setze neue Event-Listener
  SoundManager.unmuteAll();
  document.getElementById('start-screen').classList.add('d-none');
}

function setRestartAfterWin() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  initLevel();
  world = new World(canvas, keyboard);
  setupKeyListeners();
  openWindow('win-screen');
  SoundManager.unmuteAll();
}

function setGameOverStart() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  initLevel();
  world = new World(canvas, keyboard);
  setupKeyListeners();
  SoundManager.unmuteAll();
  document.getElementById('game-over-screen').classList.add('d-none');
}

function backToStartscreen() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  document.getElementById('start-screen').classList.remove('d-none');
  SoundManager.muteBackground();
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  intervalIds = []; // Leere die Liste der Intervalle
}

function pepeDead() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  openWindow('game-over-screen');
  SoundManager.muteBackground();
}

function setOnclickEvents() {
  document.getElementById('play-button-start').onclick = () => setWorldStart(); 
  document.getElementById('restart-button').onclick = () => setWorldStart();
  document.getElementById('restart-button-game-over').onclick = () => setGameOverStart();
  document.getElementById('restart-button-win').onclick = () => setRestartAfterWin();
  document.getElementById('back-button').onclick = () => backToStartscreen();
}

function endBossDead() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  openWindow('win-screen');
  SoundManager.muteBackground();
}