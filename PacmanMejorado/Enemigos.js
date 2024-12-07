class Enemigo {
  constructor(fila, columna, tablero) {
    this.fila = fila;
    this.columna = columna;
    this.tablero = tablero;
    this.direccion = null;  
    this.contadorMovimiento = 0; 
    this.intervaloMovimiento = 30; 
  }

  mover() {
    this.contadorMovimiento++;

    if (this.contadorMovimiento >= this.intervaloMovimiento) {
      
      this.contadorMovimiento = 0;

      let direccionAleatoria = floor(random(1, 5)); 

      
      if (direccionAleatoria === 1) {
        this.direccion = "izquierda";
      } else if (direccionAleatoria === 2) {
        this.direccion = "derecha";
      } else if (direccionAleatoria === 3) {
        this.direccion = "arriba";
      } else if (direccionAleatoria === 4) {
        this.direccion = "abajo";
      }

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

     
      let celdaDestino = this.tablero.celdas[nuevaFila][nuevaColumna];

     
      if (celdaDestino.tipo !== "pared") {
        
        this.tablero.moverEnemigo(this.fila, this.columna, nuevaFila, nuevaColumna);
        
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
      }
    }
  }
}
