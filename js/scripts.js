    let thisSound = new Audio('../audio/hover_sound.mp3 ')
    let currentOpenWindow = null
    let warningDiv;
   let CapslockOn = false
   let fullscreenOn = false
   async function hoverSound() {
    try {
        await thisSound.play();
    } catch (error) {
    
    }
}

function hoverSoundStop() {
    thisSound.pause();
    thisSound.currentTime = 0;
}


function openWindow(id) {
 let window = document.getElementById(id);
 if(currentOpenWindow && currentOpenWindow !== window) {
    currentOpenWindow.classList.add('d-none');
 }
 window.classList.toggle('d-none');
 currentOpenWindow = window.classList.contains('d-none') ? null : window
}


    window.addEventListener('keyup', (event) => {
        // Überprüfen, ob Caps Lock aktiviert ist
        if (event.getModifierState('CapsLock')) {
            console.log('Caps Lock ist aktiviert.');
            CapslockOn = true
           
        } else {
            console.log('Caps Lock ist nicht aktiviert.');
            CapslockOn = false
           
        }
        showCapsLockWarning();
    });


    function showCapsLockWarning() {
        const body = document.body;
        const fullscreen = body.querySelector('#fullscreen'); 
        let warningDiv = body.querySelector('#capsLockWarning');
    
        if (CapslockOn) {
            if (!warningDiv) {
                warningDiv = document.createElement('div');
                warningDiv.id = 'capsLockWarning'; 
                warningDiv.textContent = 'Caps Lock is activated!';
                if (fullscreen) {
                    body.insertBefore(warningDiv, fullscreen);
       
                }
            }
        } else {
            if (warningDiv) {
        
                warningDiv.remove();
            }
        }
    }

   function fullscreen () {
    if (!fullscreenOn) {
        openFullscreen()
        fullscreenOn = true
    } if(fullscreenOn) {
        closeFullscreen()
        fullscreenOn = false
    }
   }

  function openFullscreen() {
    let elem = document.getElementById('fullscreen');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.fullscreenElement) { // Überprüfe, ob das Dokument im Vollbildmodus ist
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}