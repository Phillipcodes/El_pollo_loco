let canvas;
let world;
let keyboard = new Keyboard();
let playSound = true;
let intervalIds = [];
let keydownHandler;
let keyupHandler;
win_sound = SoundManager.getSound('winSound',0.3)
game_over_sound = SoundManager.getSound('gameOverSound',0.3)


function init() {
  canvas = document.getElementById('canvas');
  setMuteSounds();
  setOnclickEvents();
  checkScreenSize();
  keyboard.setUpBtnEvents();
  
  
}


/**
 * removes key listerners
 */
function removeKeyListeners() {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler);
  }
  if (keyupHandler) {
    window.removeEventListener('keyup', keyupHandler);
  }
}


/**
 * cleares the canvas 
 */
function clearCanvas() {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
  }
}


/**
 * sets a onclick to an element to mute sound base onclick
 */
function setMuteSounds() {
  document.getElementById('mute-container').onclick = () => world?.initializeSoundButton();
}



/**
 * destroyes the world so no objects are running in the background when starting a new world
 */
function destroyWorld() {
  if (world) {
    world = null; 
  }
}


/**
 * Initializes and starts a new game world.
 * This function performs the following actions:
 * - Stops any ongoing game intervals.
 * - Removes old key event listeners.
 * - Clears the canvas content.
 * - Destroys the current world state.
 * - Initializes a new game level.
 * - Resets the keyboard state.
 * - Creates a new instance of the `World` class with the current `canvas` and `keyboard`.
 * - Sets up new key event listeners.
 * - Hides the start screen by adding the 'd-none' class.
 * - Removes the border styling from the fullscreen button.
 *
 */
function setWorldStart() {
  stopGame(); 
  muteAllSounds();
  removeKeyListeners(); 
  clearCanvas();
  destroyWorld(); 
  resetKeyboardState();
  initLevel();
  world = new World(canvas, keyboard);
  SoundManager.checkAndToggleSound()
  keyboard.setupKeyListeners();
  handleSetWorldScreens();
  
}

 function handleSetWorldScreens() {
  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('fullscreen').classList.remove('border-styling')
  document.getElementById('button-line-up').classList.add('d-none')
  document.getElementById('back-button').classList.remove('d-none')
 
 }

/**
 * sets the world when restart
 */
function setRestartAfterWin() {
  stopGame();
  muteAllSounds();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  resetKeyboardState();
  initLevel();
  world = new World(canvas, keyboard);
  keyboard.setupKeyListeners();
  openWindow('win-screen');
  SoundManager.checkAndToggleSound()

  
 
}


/**
 * sets the world when restart
 */
function setGameOverStart() {
  stopGame();
  muteAllSounds();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  resetKeyboardState();
  initLevel();
  world = new World(canvas, keyboard);
  keyboard.setupKeyListeners();
  document.getElementById('game-over-screen').classList.add('d-none');
  SoundManager.checkAndToggleSound()
  
}



/**
 * brings the user back to the start screen
 */
function backToStartscreen() {
  stopGame();
  muteAllSounds();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  resetKeyboardState();
  handleScreensForBacktoStart();

 
}


function handleScreensForBacktoStart() {
  document.getElementById('start-screen').classList.remove('d-none');
  document.getElementById('fullscreen').classList.add('border-styling');
  document.getElementById('button-line-up').classList.remove('d-none');
  document.getElementById('game-over-screen').classList.add('d-none');
  document.getElementById('back-button').classList.add('d-none');
  document.getElementById('win-screen').classList.add('d-none');

}

/**
 * Creates a stoppable interval that repeatedly executes a function at specified time intervals.
 * The interval ID is stored so that it can be stopped later if needed.
 *
 * @param {Function} fn - The function to be executed repeatedly at the specified intervals.
 * @param {number} time - The time interval (in milliseconds) between each execution of the function.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * stops the game and stops all intervals and clears the interval array
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
  intervalIds = []; // Leere die Liste der Intervalle
  
}

 function muteAllSounds() {
  SoundManager.muteAllStopGame();
}


/**
 * when pepe diess set the world back to a clear one
 */
function pepeDead() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  resetKeyboardState();
  openWindow('game-over-screen');
  game_over_sound.play();
  
  
}


/**
 * sum up function to start all events in once
 */
function setOnclickEvents() {
  document.getElementById('play-button-start').onclick = () => setWorldStart();
  document.getElementById('restart-button-game-over').onclick = () => setGameOverStart();
  document.getElementById('restart-button-win').onclick = () => setRestartAfterWin();
  document.getElementById('back-button').onclick = () => backToStartscreen();
}


/**
 * creates a new world when the endboss dies 
 */
function endBossDead() {
  stopGame();
  removeKeyListeners();
  clearCanvas();
  destroyWorld();
  openWindow('win-screen');
  win_sound.play();
}


/**
 * resets the keyboard variables to have a fresh start when start a new world
 */
function resetKeyboardState() {
  keyboard.UP = false;
  keyboard.LEFT = false;
  keyboard.DOWN = false;
  keyboard.RIGHT = false;
  keyboard.SPACE = false;
}