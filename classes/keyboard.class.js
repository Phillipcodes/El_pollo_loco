/**
 * @class
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;


  /**
   * sets keylisterns to use  W A S D for movement
   */
  setupKeyListeners() {
    keydownHandler = (event) => {
      switch (event.key) {
        case "w":
          keyboard.UP = true;
          break;
        case "a":
          keyboard.LEFT = true;
          break;
        case "s":
          keyboard.DOWN = true;
          break;
        case "d":
          keyboard.RIGHT = true;
          break;
        case " ":
          keyboard.SPACE = true;
          break;
      }
    };


    keyupHandler = (event) => {
      switch (event.key) {
        case "w":
          keyboard.UP = false;
          break;
        case "a":
          keyboard.LEFT = false;
          break;
        case "s":
          keyboard.DOWN = false;
          break;
        case "d":
          keyboard.RIGHT = false;
          break;
        case " ":
          keyboard.SPACE = false;
          break;
      }
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
  }


  /**
   * set event for buttons for the mobile version
   */
  setUpBtnEvents() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
    document.getElementById("btn-up").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });
    document.getElementById("btn-up").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });
    document.getElementById("btn-space").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("btn-space").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }
}
