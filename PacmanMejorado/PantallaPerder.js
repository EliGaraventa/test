class PantallaPerder {
  constructor() {
    this.botonVolverAInicio = new Boton(200, 400, 200, 50, "Volver a jugar");
  }

  dibujar() {
    background(0);  

    fill(255);  
    textSize(48);
    textAlign(CENTER, CENTER);
    text("¡Derrota!", width / 2, height / 2);  

    this.botonVolverAInicio.dibujar();  
  }

  verificarBotones() {
    if (this.botonVolverAInicio.esPresionado()) {
      console.log("Es hoy");
      juego.reiniciarJuego();
      juego.vidas = 3;
      juego.pierde = false;
    }
  }
}
