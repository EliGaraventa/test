let juego; // Única variable global
let jugadorImg, paredImg, puntoImg, enemigoImg; // Imágenes del jugador, pared y puntos

class Juego {
  constructor(filas, columnas) {
    this.tablero = new Tablero(filas, columnas);
    this.jugador = new Jugador(1, 1, this.tablero);
    this.enemigos = [
      new Enemigo(2, 10, this.tablero),
      new Enemigo(10, 3, this.tablero),
      new Enemigo(10, 14, this.tablero)
    ];
    this.tablero.inicializarPuntosYParedes();
    this.tablero.colocarJugador(this.jugador);
    this.tablero.colocarEnemigos(this.enemigos);
    
    this.puntos = 0; // Inicializa el contador de puntos
    this.juegoTerminado = false; // Bandera para saber si el juego terminó
  }

 dibujar() {
    if (this.juegoTerminado) {
      console.log("El juego ha terminado, reiniciando...");
      return; // Detener la ejecución si el juego ha terminado
    }

    this.tablero.dibujar();
    
    // Mover enemigos usando un ciclo clásico for
    for (let i = 0; i < this.enemigos.length; i++) {
      this.enemigos[i].mover();
    }

    // Verifica si el jugador ha recogido un punto
    this.verificarPuntos();
    
    // Verifica si ya no hay puntos en el tablero para mostrar la pantalla de victoria
    this.verificarVictoria();
    
    // Si el juego terminó, dibuja la pantalla de victoria
    if (this.juegoTerminado) {
      let victoriaPantalla = new PantallaVictoria();
      victoriaPantalla.dibujar();
    }
     this.verificarColisionJugadorEnemigo();
  }
  
  verificarColisionJugadorEnemigo() {
    for (let i = 0; i < this.enemigos.length; i++) {
      if (this.jugador.fila === this.enemigos[i].fila && this.jugador.columna === this.enemigos[i].columna) {
        console.log("¡Colisión con enemigo! Reiniciando juego...");
        this.reiniciarJuego();  // Reiniciar el juego
      }
    }
  }
  
  reiniciarJuego() {
    console.log("Reiniciando el juego...");

    this.juegoTerminado = false;  // Resetear estado de juego terminado
    this.puntos = 0;  // Resetear puntos

    // Reiniciar las posiciones del jugador
    this.jugador.fila = this.posicionesIniciales.jugador.fila;
    this.jugador.columna = this.posicionesIniciales.jugador.columna;

    // Reiniciar las posiciones de los enemigos
    for (let i = 0; i < this.enemigos.length; i++) {
      this.enemigos[i].fila = this.posicionesIniciales.enemigos[i].fila;
      this.enemigos[i].columna = this.posicionesIniciales.enemigos[i].columna;
    }

    // Volver a colocar el jugador y los enemigos en el tablero
    this.tablero.colocarJugador(this.jugador);
    this.tablero.colocarEnemigos(this.enemigos);
  }

 moverJugador(direccion) {
    if (!this.juegoTerminado) { // Solo mueve al jugador si el juego no terminó
      this.jugador.mover(direccion);
    }
  }
  verificarPuntos() {
    // Verifica si el jugador ha recogido un punto
    for (let fila = 0; fila < this.tablero.filas; fila++) {
      for (let columna = 0; columna < this.tablero.columnas; columna++) {
        if (this.tablero.celdas[fila][columna].tipo === "punto" && this.tablero.celdas[fila][columna].fila === this.jugador.fila && this.tablero.celdas[fila][columna].columna === this.jugador.columna) {
          this.tablero.celdas[fila][columna].tipo = "vacia"; // Eliminar el punto
          this.puntos++; // Aumentar el contador de puntos
          console.log("Puntos: " + this.puntos); // Mostrar puntos en consola
        }
      }
    }
}
  verificarVictoria() {
    let hayPuntos = false;

    // Recorrer todas las celdas del tablero para verificar si quedan puntos
    for (let fila = 0; fila < this.tablero.filas; fila++) {
      for (let columna = 0; columna < this.tablero.columnas; columna++) {
        if (this.tablero.celdas[fila][columna].tipo === "punto") {
          hayPuntos = true; // Si se encuentra un punto, hayPuntos se pone en true
        }
      }
    }
  
    // Si no hay puntos, el juego termina y muestra la pantalla de victoria
    if (!hayPuntos) {
      this.juegoTerminado = true;
    }
  }
}

class PantallaPerder {
  dibujar() {
    // Dibujar fondo negro
    background(255,0,0);
    
    // Texto de victoria en blanco
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("¡Perdiste!", width / 2, height / 2);
  }
}



class PantallaVictoria {
  dibujar() {
    // Dibujar fondo negro
    background(0);
    
    // Texto de victoria en blanco
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("¡Victoria!", width / 2, height / 2);
  }
}

class Enemigo {
  constructor(fila, columna, tablero) {
    this.fila = fila;
    this.columna = columna;
    this.tablero = tablero;
    this.direccion = null;  // Dirección aleatoria
    this.contadorMovimiento = 0; // Contador de tiempo
    this.intervaloMovimiento = 30; // Intervalo en cuadros (puedes ajustarlo)
  }

  mover() {
    this.contadorMovimiento++;

    if (this.contadorMovimiento >= this.intervaloMovimiento) {
      // Resetea el contador y cambia de dirección
      this.contadorMovimiento = 0;

      let direccionAleatoria = floor(random(1, 5)); // 1: izquierda, 2: derecha, 3: arriba, 4: abajo

      // Determinar el movimiento basado en la dirección aleatoria
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

      // Calcula la nueva posición basada en la dirección
      if (this.direccion === "izquierda") {
        nuevaColumna = max(this.columna - 1, 0);
      } else if (this.direccion === "derecha") {
        nuevaColumna = min(this.columna + 1, this.tablero.columnas - 1);
      } else if (this.direccion === "arriba") {
        nuevaFila = max(this.fila - 1, 0);
      } else if (this.direccion === "abajo") {
        nuevaFila = min(this.fila + 1, this.tablero.filas - 1);
      }

      // Verificar si la celda destino está libre o contiene un "punto"
      let celdaDestino = this.tablero.celdas[nuevaFila][nuevaColumna];

      // Si la celda no es una "pared", movemos al enemigo
      if (celdaDestino.tipo !== "pared") {
        // Si la celda es un "punto", simplemente mueve al enemigo sin cambiar el tipo
        this.tablero.moverEnemigo(this.fila, this.columna, nuevaFila, nuevaColumna);
        // Actualiza la posición del enemigo
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
      }
    }
  }
}







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
    [6, 1], [6, 2], [6, 3], // Paredes verticales en fila 6
    [8, 2], [9, 2], [9, 3], // Paredes horizontales en fila 8 y 9
    [9, 5], [8, 5], // Paredes en fila 8 y 9, columnas 5
    [9, 7], [9, 8], [9, 9], [9, 10], // Paredes horizontales en fila 9, columnas 7 a 10
    [8, 8], [8, 9], [8, 10], // Paredes horizontales en fila 8, columnas 8 a 10
    [7, 8], [6, 8], // Paredes en fila 7 y 6, columna 8
    [9, 12], [10, 12], [9, 13], // Paredes verticales en columna 12 y 13
    [7, 12], [7, 13], [6, 12], [6, 13], [6, 11], [6, 10], // Paredes en fila 6 y 7
    [5, 13], [4, 13], // Paredes en columna 13
    [2, 14], [2, 12], [1, 12], // Paredes en fila 2 y 1
    [3, 10], [3, 9], [4, 11], [4, 10], [4, 9], // Paredes en fila 3 y 4
    [2, 6], [2, 7], [3, 7], [4, 7], // Paredes en columna 6 a 7
    [2, 4], [1, 4] // Paredes en fila 2 y 1, columna 4
  ];

  // Asignamos las paredes internas a partir de la lista de coordenadas
  for (let i = 0; i < paredes.length; i++) {
    let fila = paredes[i][0];
    let columna = paredes[i][1];
    this.celdas[fila][columna].tipo = "pared";
  }

  // Asignar el tipo "punto" a todas las celdas que no son "pared" y no son "punto"
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
  // Si la celda anterior era un punto antes de ser ocupada por el enemigo, restaurarla
  if (this.celdas[filaAnterior][columnaAnterior].tipo === "enemigo") {
    this.celdas[filaAnterior][columnaAnterior].tipo = "punto";
  }

  // Al mover el enemigo, verifica si la celda destino era un "punto"
  let tipoDestino = this.celdas[nuevaFila][nuevaColumna].tipo;
  if (tipoDestino === "punto") {
    this.celdas[filaAnterior][columnaAnterior].tipo = "punto";
  } else {
    this.celdas[filaAnterior][columnaAnterior].tipo = "vacia";
  }

  // Establecer la celda destino como "enemigo"
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

class Celda {
  constructor(fila, columna, tipo) {
    this.fila = fila;
    this.columna = columna;
    this.tipo = tipo; // Puede ser: "vacia", "punto", "pared", "jugador", "enemigo"
  }

  dibujar(ancho, alto) {
    if (this.tipo === "vacia") {
      fill(0); // Fondo vacío
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


function preload() {
  // Cargar las imágenes
  jugadorImg = loadImage("assets/Jugador.png");
  paredImg = loadImage("assets/pared.png");
  puntoImg = loadImage("assets/puntos.png");
  enemigoImg = loadImage('assets/enemigo.png');
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego(12, 16); // Inicializar el juego con un tablero de 10x10
}

function draw() {
  background(0);
  juego.dibujar();
  juego.jugador.mover();  // Mover al jugador de forma continua
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
}
