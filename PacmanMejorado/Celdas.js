class Celda {
  constructor(fila, columna, tipo) {
    this.fila = fila;
    this.columna = columna;
    this.tipo = tipo; 
  }

  dibujar(ancho, alto) {
    if (this.tipo === "vacia") {
      fill(0); 
      noStroke();
      rect(this.columna * ancho, this.fila * alto, ancho, alto);
    } else if (this.tipo === "punto") {
      image(puntoImg, this.columna * ancho + ancho / 4, this.fila * alto + alto / 4, ancho / 2, alto / 2);
    } else if (this.tipo === "pared") {
      image(paredImg, this.columna * ancho, this.fila * alto, ancho, alto);
    } else if (this.tipo === "jugador") {
      image(jugadorImg, this.columna * ancho, this.fila * alto, ancho, alto);
    } else if (this.tipo === "enemigo") {
      image(enemigoImg, this.columna * ancho, this.fila * alto, ancho, alto);
    }
  }
}
