let canvas;
let world;


function init() {
canvas = document.getElementById('canvas');
world = new World(canvas);


console.log('my Character is ', world.character)
}





document.addEventListener('keydown', function(event) {
    // Überprüfe den Wert von event.key
    switch(event.key) {
        case 'w': // Wenn event.key 'w' ist
            console.log('W key pressed'); // Ausgabe: W key pressed
            break; // Beende die aktuelle case-Anweisung
        case 'a': // Wenn event.key 'a' ist
            console.log('A key pressed'); // Ausgabe: A key pressed
            break;
        case 's': // Wenn event.key 's' ist
            console.log('S key pressed'); // Ausgabe: S key pressed
            break;
        case 'd': // Wenn event.key 'd' ist
            console.log('D key pressed'); // Ausgabe: D key pressed
            break;
        default: // Für alle anderen Tasten
            // Optional: Handle andere Tasten
            break;
    }})