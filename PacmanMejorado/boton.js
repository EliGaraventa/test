class Boton {
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
  }

  
  dibujar() {
    fill(100, 150, 255); 
    rect(this.x, this.y, this.ancho, this.alto, 10); 

    fill(255); 
    textSize(24); 
    textAlign(CENTER, CENTER); 
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2); 
  }

  
  esPresionado() {
    let mouseXDentro = mouseX > this.x && mouseX < this.x + this.ancho;
    let mouseYDentro = mouseY > this.y && mouseY < this.y + this.alto;
    return mouseXDentro && mouseYDentro && mouseIsPressed; 
  }
}
