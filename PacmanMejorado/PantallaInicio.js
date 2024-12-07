class PantallaInicio {
  constructor() {
    
    this.botonIniciar = new Boton(width / 2 - 100, 300, 200, 50, "Iniciar Juego"); 
    this.botonCreditos = new Boton(width / 2 - 225, 375, 450, 50, "Mantene apretado para ver los créditos"); 
  }

  
  dibujar() {
    background(0); 

    fill(255); 
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Bienvenido al Juego", width / 2, 100); 

   
    textSize(20); 
    text("Debes reunir los suficientes nombres en la", width / 2, 150); 
    text("Death Note para que Ryuk no se aburra de ti, ¡Apurate!", width / 2, 180); 


   
    this.botonIniciar.dibujar();
    this.botonCreditos.dibujar();
  }

  
  verificarBotones() {
    if (this.botonIniciar.esPresionado()) {
      console.log("Iniciar juego"); 
      juego.jugar = true;
      
    }

    if (this.botonCreditos.esPresionado()) {
      background(0); 

      fill(255); 
      textSize(20); 
      textAlign(CENTER, CENTER);

     
      text("Juego programado por Eliana Garaventa y Tobias Cisneros", width / 2, 100);

      
      this.botonIniciar.dibujar();
      this.botonCreditos.dibujar();
    }
  }
}
