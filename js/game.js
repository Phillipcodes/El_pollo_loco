let canvas;
let world;
let keyboard = new Keyboard();
let playSound = true;
let intervalIds = [];
function init() {
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard);
setMuteSounds();



console.log('my Character is ', world.character)
}



window.addEventListener('keydown',(event) => {

   switch(event.key) {
    case 'w': keyboard.UP = true
    console.log('Up is now true')
    break;
    case 'a': keyboard.LEFT = true
    console.log('left is now true')
    break;
    case 's': keyboard.DOWN = true
    console.log('down is now true')
    break;
    case 'd': keyboard.RIGHT = true
    console.log('right is now true')
    break;
    case ' ': keyboard.SPACE = true
    console.log('Space is now true')
    break;
   }
})



window.addEventListener('keyup',(event) => {

    switch(event.key) {
     case 'w': keyboard.UP = false
     console.log('Up is now false')
     break;
     case 'a': keyboard.LEFT = false
     console.log('left is now false')
     break;
     case 's': keyboard.DOWN = false
     console.log('down is now false')
     break;
     case 'd': keyboard.RIGHT = false
     console.log('right is now false')
     break;
     case ' ': keyboard.SPACE = false
     console.log('Space is now false')
     break;
    }
 })

  function setMuteSounds() {
   document.getElementById('mute-container').onclick = () => world.initializeSoundButton();
 }

function setStoppableInterval(fn,time) {
   let id = setInterval(fn,time);
   intervalIds.push(id);
}


function stopGame() {
   intervalIds.forEach(clearInterval)
   
}