class Jugador {
  constructor(fila, columna, tablero) {
    this.fila = fila;
    this.columna = columna;
    this.tablero = tablero;
    this.direccion = null;
    this.velocidad = 9;
    this.contadorMovimientos = 0;
  }

  mover() {
    if (this.direccion) {
      this.contadorMovimientos++;

      if (this.contadorMovimientos >= this.velocidad) {
        this.contadorMovimientos = 0;

        let nuevaFila = this.fila;
        let nuevaColumna = this.columna;

        if (this.direccion === "izquierda") {
          nuevaColumna = max(this.columna - 1, 0);
        } else if (this.direccion === "derecha") {
          nuevaColumna = min(this.columna + 1, this.tablero.columnas - 1);
        } else if (this.direccion === "arriba") {
          nuevaFila = max(this.fila - 1, 0);
        } else if (this.direccion === "abajo") {
          nuevaFila = min(this.fila + 1, this.tablero.filas - 1);
        }

        if (this.tablero.celdas[nuevaFila][nuevaColumna].tipo !== "pared") {
          if (this.tablero.celdas[nuevaFila][nuevaColumna].tipo === "punto") {
            console.log("Punto recogido!");
          }
          this.tablero.moverJugador(this.fila, this.columna, nuevaFila, nuevaColumna);
          this.fila = nuevaFila;
          this.columna = nuevaColumna;
        } else {
          this.direccion = null;
        }
      }
    }
  }

  cambiarDireccion(direccion) {
    this.direccion = direccion;
  }
}
