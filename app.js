/**
 * TIC TAC TOE
 */

let turno = true;

let tablero = document.getElementsByClassName('casilla');

let contadorX = document.getElementById("contadorX");
contadorX.textContent = 0;

let contadorO = document.getElementById("contadorO");
contadorO.textContent = 0;

let buttonReset = document.getElementById("button-reset");
buttonReset.setAttribute('onclick', 'Reset()');

let mostrarTurnoX = document.getElementById("mostrarTurnoX");
let mostrarTurnoO = document.getElementById("mostrarTurnoO");

let div_mostrarTurnoX = document.getElementById("temporizadorX");
let div_mostrarTurnoO = document.getElementById("temporizadorO");

let temporizadorX = document.getElementById("temporizadorX");
let temporizadorO = document.getElementById("temporizadorO");

let intervalX = setInterval(timerX, 1000);
let intervalO = setInterval(timerO, 1000);

const tiempo = 5;

let contadorFichas = 0;

let tiempoX = tiempo;
let tiempoO = tiempo;

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//Todas las combinaciones reales:
// const combinacionGanadora = [
//     [0, 1, 2], // primera fila
//     [3, 4, 5], // segunda fila
//     [6, 7, 8], // tercera fila
//     [0, 3, 6], // primera columna
//     [1, 4, 7], // segunda columna
//     [2, 5, 8], // tercera columna
//     [0, 4, 8], // diagonal izquierda a derecha
//     [2, 4, 6], // diagonal derecha a izquierda
// ];

stopTimerX();
stopTimerO();
iniciar();

/**
 * Con esta función Reseteamos el juego entero
 * Reseteamos el tiempo de turno
 * Reseteamos las puntuaciones
 * @param NO
 * @return NO
 */

function Reset() {
    tiempoX = tiempo;
    tiempoO = tiempo;
    turno = true;
    contadorX.textContent = 0;
    contadorO.textContent = 0;
    resetearTablero();
    stopTimerX();
    stopTimerO();
}

/**
 * Aquí creamos la funcion del temporizador, para que vaya restando 1 cada segundo, y si comprueba que 
 * es menor que 0 le suma un punto al turno contrario, resetea el tablero y para el temporizador 
 * @param NO
 * @return NO
 */

function timerX() {
    temporizadorX.innerHTML = tiempoX--;
    if (tiempoX < 0) {
        alert("Se le acabó el tiempo a las X, gana las O ");
        contadorO.textContent = parseInt(contadorO.textContent) + 1;


        resetearTablero();
        stopTimerX();
        MOSTRARTURNO(turno)

        turno = !turno;

        // intervalO = setInterval(timerO, 1000);
        //MOSTRARTURNO(turno);

    }
}

/**
 * Funcion para hacer un clear interval
 * @param NO
 * @return NO
 */

function stopTimerX() {
    clearInterval(intervalX);
    tiempoX = tiempo;
    temporizadorX.innerHTML = tiempoX;
}

function timerO() {
    temporizadorO.innerHTML = tiempoO--;
    if (tiempoO < 0) {
        alert("Se le acabó el tiempo a las O, gana las X");
        contadorX.textContent = parseInt(contadorX.textContent) + 1;
        resetearTablero();
        stopTimerO();
        MOSTRARTURNO(turno)

        turno = !turno;


        // intervalX = setInterval(timerX, 1000);
        //MOSTRARTURNO(turno);

    }
}

function stopTimerO() {
    clearInterval(intervalO);
    tiempoO = tiempo;
    temporizadorO.innerHTML = tiempoO;
}

/**
 * Funcion para inicializar el juego, dando los atributos necesarios
 * @param NO
 * @return NO
 */

function iniciar() {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].setAttribute('onclick', `pintaConsola(${i})`);
        tablero[i].setAttribute('id', `hover`);
        tablero[i].textContent = '';
    }
}

/**
 * Con esta función pintamos X o O según corresponda. 
 * Cambimamos de turno aquí
 * Comprobamos si hay ganador con su función
 * Comprobamos si el tablero está lleno para vaciarlo
 * El parametro es numero, que es la posicion de la casilla que estamos clickando
 * @param Number numero
 * @return NO
 */

function pintaConsola(numero) {

    MOSTRARTURNO(turno);
    if (turno) {
        tablero[numero].textContent = 'X';
    }
    else {

        tablero[numero].textContent = 'O';
    }
    contadorFichas++;

    tablero[numero].removeAttribute('onclick');
    tablero[numero].removeAttribute('id', `hover`);
    GANADOR();
    if (contadorFichas == 9) {

        resetearTablero();
    }
    turno = !turno;
}


/**
 * Funcion para comprobar si hay un ganador, comprobando en que casillas están las fichas y viendo si coinciden 
 * con la combinacion ganadora 
 * @param NO
 * @return NO
 */

function GANADOR() {
    let actualX = [];
    let actualO = [];
    // Recorrer las casillas para ver su contenido
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i].innerHTML == 'O') {
            actualO.push(i);
        }
        else if (tablero[i].innerHTML == 'X') {
            actualX.push(i);
        }
    }

    for (let i = 0; i < combinacionGanadora.length; i++) {
        if (actualX.includes(combinacionGanadora[i][0]) && actualX.includes(combinacionGanadora[i][1]) && actualX.includes(combinacionGanadora[i][2])) {

            tablero[combinacionGanadora[i][0]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][1]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][2]].style.backgroundColor = "green";

            setTimeout(function () {

                tablero[combinacionGanadora[i][0]].removeAttribute('style');
                tablero[combinacionGanadora[i][1]].removeAttribute('style');
                tablero[combinacionGanadora[i][2]].removeAttribute('style');

                alert('GANAN LAS X');
            }, 1500);
            contadorX.textContent = parseInt(contadorX.textContent) + 1;
            resetearTablero();
        }
    }

    for (let i = 0; i < combinacionGanadora.length; i++) {
        if (actualO.includes(combinacionGanadora[i][0]) && actualO.includes(combinacionGanadora[i][1]) && actualO.includes(combinacionGanadora[i][2])) {
            console.log(combinacionGanadora[i][0]);
            tablero[combinacionGanadora[i][0]].style.backgroundColor = "green";

            tablero[combinacionGanadora[i][1]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][2]].style.backgroundColor = "green";

            setTimeout(function () {

                tablero[combinacionGanadora[i][0]].removeAttribute('style');
                tablero[combinacionGanadora[i][1]].removeAttribute('style');
                tablero[combinacionGanadora[i][2]].removeAttribute('style');

                alert('GANAN LAS O');
            }, 1500);
            contadorO.textContent = parseInt(contadorO.textContent) + 1;
            resetearTablero();
        }
    }
}

/**
 * Funcion para resetear el tablero, dando los atributos necesarios
 * @param NO
 * @return NO
 */

function resetearTablero() {
    for (let j = 0; j < tablero.length; j++) {
        tablero[j].setAttribute('onclick', `pintaConsola(${j})`);
        tablero[j].setAttribute('id', `hover`);

        tablero[j].textContent = '';

        contadorFichas = 0;
    }
}

/**
 * Con esta función cambiamos el temporizador de cada turno, para que se reste el que corresponde y le aparezca
 * la animación
 * @param Boolean turno
 * @return NO
 */

function MOSTRARTURNO(turno) {
    if (turno) {

        // mostrarTurno.textContent = "Turno O";
        div_mostrarTurnoX.style.backgroundColor = '#cbf7ed00';

        div_mostrarTurnoO.setAttribute('id', `tiempo`);
        div_mostrarTurnoX.removeAttribute('id', `tiempo`);

        div_mostrarTurnoO.style.backgroundColor = '#ff1d58';

        intervalO = setInterval(timerO, 1000);
        stopTimerX();
    }
    else {

        div_mostrarTurnoO.style.backgroundColor = '#cbf7ed00';

        div_mostrarTurnoX.style.backgroundColor = '#ff1d58';

        div_mostrarTurnoX.setAttribute('id', `tiempo`);
        div_mostrarTurnoO.removeAttribute('id', `tiempo`);

        intervalX = setInterval(timerX, 1000);
        stopTimerO();
    }
}