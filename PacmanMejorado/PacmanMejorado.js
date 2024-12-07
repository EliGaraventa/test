let juego; 
let musicaIniciada = false;
let sound;
let jugadorImg, paredImg, puntoImg, enemigoImg; 

function preload() {
  
  sound = loadSound('assets/jugar.mp3');
  
  jugadorImg = loadImage("assets/Jugador.png");
  paredImg = loadImage("assets/pared.png");
  puntoImg = loadImage("assets/puntos.png");
  enemigoImg = loadImage('assets/enemigo.png');
}

function setup() {
  createCanvas(640, 480);
  pantallaInicio = new PantallaInicio();
  juego = new Juego(12, 16);
  jugador = new Jugador(0, 0);
}

function draw() {
  background(0);
  if (juego.jugar) {
    juego.dibujar(); 
  } else {
    let pantallaInicio = new PantallaInicio();
    pantallaInicio.dibujar();
    pantallaInicio.verificarBotones(); 
  }
  juego.jugador.mover();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    juego.jugador.cambiarDireccion("izquierda");
  }
  if (keyCode === RIGHT_ARROW) {
    juego.jugador.cambiarDireccion("derecha");
  }
  if (keyCode === UP_ARROW) {
    juego.jugador.cambiarDireccion("arriba");
  }
  if (keyCode === DOWN_ARROW) {
    juego.jugador.cambiarDireccion("abajo");
  }
  if (!musicaIniciada) {
    sound.loop();
    musicaIniciada = true;
  }
}
