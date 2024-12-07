class Tablero {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.anchoCelda = width / columnas;
    this.altoCelda = height / filas;
    this.celdas = [];

    // Crear la matriz de celdas
    for (let fila = 0; fila < filas; fila++) {
      this.celdas[fila] = [];
      for (let columna = 0; columna < columnas; columna++) {
        this.celdas[fila][columna] = new Celda(fila, columna, "vacia");
      }
    }
  }

  inicializarPuntosYParedes() {
    // Crear las paredes en los bordes
    for (let columna = 0; columna < this.columnas; columna++) {
      this.celdas[0][columna].tipo = "pared"; // Pared superior
      this.celdas[this.filas - 1][columna].tipo = "pared"; // Pared inferior
    }

    for (let fila = 0; fila < this.filas; fila++) {
      this.celdas[fila][0].tipo = "pared"; // Pared izquierda
      this.celdas[fila][this.columnas - 1].tipo = "pared"; // Pared derecha
    }

    // Paredes internas utilizando ciclos `for`
    // Primera sección de paredes internas
    for (let fila = 2; fila <= 4; fila++) {
      this.celdas[fila][2].tipo = "pared"; // Pared vertical en columna 2
    }

    for (let columna = 4; columna <= 6; columna++) {
      this.celdas[4][columna].tipo = "pared"; // Pared horizontal en fila 4, columnas 4 a 6
    }

    for (let fila = 5; fila <= 6; fila++) {
      this.celdas[fila][5].tipo = "pared"; // Pared vertical en columna 5
    }

    // Sección de paredes adicionales
    let paredes = [
      [6, 1], [6, 2], [6, 3], 
      [8, 2], [9, 2], [9, 3], 
      [9, 5], [8, 5], 
      [9, 7], [9, 8], [9, 9], [9, 10], 
      [8, 8], [8, 9], [8, 10], 
      [7, 8], [6, 8], 
      [9, 12], [10, 12], [9, 13], 
      [7, 12], [7, 13], [6, 12], [6, 13], [6, 11], [6, 10], 
      [5, 13], [4, 13], 
      [2, 14], [2, 12], [1, 12], 
      [3, 10], [3, 9], [4, 11], [4, 10], [4, 9], 
      [2, 6], [2, 7], [3, 7], [4, 7], 
      [2, 4], [1, 4] 
    ];

    
    for (let i = 0; i < paredes.length; i++) {
      let fila = paredes[i][0];
      let columna = paredes[i][1];
      this.celdas[fila][columna].tipo = "pared";
    }

    
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        if (this.celdas[fila][columna].tipo === "vacia") {
          this.celdas[fila][columna].tipo = "punto";
        }
      }
    }
  }


  colocarJugador(jugador) {
    this.celdas[jugador.fila][jugador.columna].tipo = "jugador";
  }

  colocarEnemigos(enemigos) {
    for (let i = 0; i < enemigos.length; i++) {
      this.celdas[enemigos[i].fila][enemigos[i].columna].tipo = "enemigo";
    }
  }

  moverJugador(filaAnterior, columnaAnterior, nuevaFila, nuevaColumna) {
    this.celdas[filaAnterior][columnaAnterior].tipo = "vacia";
    this.celdas[nuevaFila][nuevaColumna].tipo = "jugador";
  }

  moverEnemigo(filaAnterior, columnaAnterior, nuevaFila, nuevaColumna) {
    
    if (this.celdas[filaAnterior][columnaAnterior].tipo === "enemigo") {
      this.celdas[filaAnterior][columnaAnterior].tipo = "punto";
    }

   
    let tipoDestino = this.celdas[nuevaFila][nuevaColumna].tipo;
    if (tipoDestino === "punto") {
      this.celdas[filaAnterior][columnaAnterior].tipo = "punto";
    } else {
      this.celdas[filaAnterior][columnaAnterior].tipo = "vacia";
    }

    
    this.celdas[nuevaFila][nuevaColumna].tipo = "enemigo";
  }


  dibujar() {
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        this.celdas[fila][columna].dibujar(this.anchoCelda, this.altoCelda);
      }
    }
  }
}
