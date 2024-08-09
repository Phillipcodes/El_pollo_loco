    // let thisSound = new Audio('./audio/hover_sound.mp3')
    let currentOpenWindow = null
    let warningDiv;
   let CapslockOn = false
   let fullscreenOn = false


   /**
    * starts hover sound when hovering over the element
    */
   async function hoverSound() {
    try {
      const hoverSound = SoundManager.sounds["hoverSound"];
      if (hoverSound) {
        await hoverSound.play();
      }
    } catch (error) {
      
    }
  }
  
 
  function hoverSoundStop() {
    const hoverSound = SoundManager.sounds["hoverSound"];
    if (hoverSound) {
      hoverSound.pause();
      hoverSound.currentTime = 0;
    }
  }

/**
 * toggle container based on their id 
 * @param {string} id 
 */
function openWindow(id) {
 let window = document.getElementById(id);
 if(currentOpenWindow && currentOpenWindow !== window) {
    currentOpenWindow.classList.add('d-none');
 }
 window.classList.toggle('d-none');
 currentOpenWindow = window.classList.contains('d-none') ? null : window
}

    /**
     * evenlistener for validating the capslock event
     */
    window.addEventListener('keyup', (event) => {
        if (event.getModifierState('CapsLock')) {
            CapslockOn = true
        } else {
            CapslockOn = false
        }
        showCapsLockWarning();
    });


    /**
     * shows a warining when capslock is activated
     */
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
            }}}


    /**
     * sets the browser to fullscreen
     */
   function fullscreen () {
    if (!fullscreenOn) {
        openFullscreen()
        fullscreenOn = true
    } if(fullscreenOn) {
        closeFullscreen()
        fullscreenOn = false
    }
   }


    /**
     * opens fullscreen
     */
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


/**
 * closes fullscreen
 */
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


/**
 *  checks screenSize to display a message to rotate the mobile phone on specifc monitor size
 */
function checkScreenSize() {
    const container = document.getElementById('mobile-warning');
    const displayNoneCanvas = document.getElementById('fullscreen');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxWidth = 720;
    const minHeight = 480; 
    if (width <= maxWidth && height >= minHeight) {
      container.style.display = 'flex';
      displayNoneCanvas.style.display ='none'
    } else {
      container.style.display = 'none';
      displayNoneCanvas.style.display =''
      window.addEventListener('resize', checkScreenSize);
    }
  }
