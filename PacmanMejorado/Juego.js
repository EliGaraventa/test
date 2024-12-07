class Juego {
  constructor(filas, columnas) {
    this.inicio = false;  
    this.jugar = false;  
    this.pierde = false;  
    this.tablero = new Tablero(filas, columnas);
    this.jugador = new Jugador(1, 1, this.tablero);
    this.victoriaPantalla = new VictoriaPantalla();
    this.pantallaPerder = new PantallaPerder(); 
    this.enemigos = [
      new Enemigo(2, 10, this.tablero),
      new Enemigo(10, 3, this.tablero),
      new Enemigo(10, 14, this.tablero)
    ];


    this.tablero.inicializarPuntosYParedes();
    this.tablero.colocarJugador(this.jugador);
    this.tablero.colocarEnemigos(this.enemigos);

    this.puntos = 0; 
    this.vidas = 3;
    this.ganar = false; 
  }

  dibujar() {
    if (this.ganar) {
      console.log("¡Has ganado!");
      this.victoriaPantalla.dibujar();  
      this.victoriaPantalla.verificarBotones(); 
      return; 
    }


    this.tablero.dibujar();

    
    for (let i = 0; i < this.enemigos.length; i++) {
      this.enemigos[i].mover();
    }

    
    this.verificarPuntos();

    
    this.verificarVictoria();

    
    if (this.ganar) {

      new VictoriaPantalla().dibujar();
    }
    if (this.vidas <= 0) {
      this.pantallaPerder.dibujar(); 
      this.pantallaPerder.verificarBotones(); 
      return; 
    }
    this.verificarColisionJugadorEnemigo();
    this.dibujarContadorVidas();
  }

  verificarColisionJugadorEnemigo() {
    for (let i = 0; i < this.enemigos.length; i++) {
      if (this.jugador.fila === this.enemigos[i].fila && this.jugador.columna === this.enemigos[i].columna) {
        console.log("¡Colisión con enemigo! Reiniciando juego...");
        this.reiniciarJuego();
        this.perderVida();
      }
    }
  }

  perderVida() {
    this.vidas--; 
    if (this.vidas <= 0) {
      this.pantallaPerder.dibujar(); 
    } else {
      this.reiniciarJuego(); 
    }
  }

  reiniciarJuego() {
    console.log("Reiniciando...");

    
    this.puntos = 0;

   
    this.tablero.inicializarPuntosYParedes();

    
    this.jugador.fila = 1;
    this.jugador.columna = 1;

   
    this.tablero.colocarJugador(this.jugador);

   
    this.tablero.colocarEnemigos(this.enemigos);
  }

  dibujarContadorVidas() {
    fill(255); 
    textSize(24); 
    textAlign(LEFT, TOP); 
    text("Vidas: " + this.vidas, 10, 10); 
  }

  moverJugador(direccion) {
    if (!this.ganar) { 
      this.jugador.mover(direccion);
    }
  }
  verificarPuntos() {
    
    for (let fila = 0; fila < this.tablero.filas; fila++) {
      for (let columna = 0; columna < this.tablero.columnas; columna++) {
        if (this.tablero.celdas[fila][columna].tipo === "punto" && this.tablero.celdas[fila][columna].fila === this.jugador.fila && this.tablero.celdas[fila][columna].columna === this.jugador.columna) {
          this.tablero.celdas[fila][columna].tipo = "vacia"; 
          this.puntos++; 
          console.log("Puntos: " + this.puntos); 
        }
      }
    }
  }
  verificarVictoria() {
    let hayPuntos = false;

   
    for (let fila = 0; fila < this.tablero.filas; fila++) {
      for (let columna = 0; columna < this.tablero.columnas; columna++) {
        if (this.tablero.celdas[fila][columna].tipo === "punto") {
          hayPuntos = true; 
        }
      }
    }

    
    if (!hayPuntos) {
      this.ganar = true;

      
      this.inicio = false;
      this.pierde = false;

      
    }
  }
}
