//Variables
var contadorTurno = 1; //contador para los turnos
var numJugadores = sessionStorage.getItem("jugadores"); //cojo el número de jugadores almacenado en el sessionStorage
var nombre1 = sessionStorage.getItem("nombre1"); //cojo los nombres de los jugadores 
var nombre2 = sessionStorage.getItem("nombre2"); 
var nombre3 = sessionStorage.getItem("nombre3"); 
var nombre4 = sessionStorage.getItem("nombre4"); 
var mute = true; //para controlar el audio

window.addEventListener("load", iniciar);

//Función que muestra las fichas, crea el tablero, establece el turno de los jugadores por primera vez y escucha el click del dado
function iniciar() {
    crearTablero();
    mostrarFichas();
    cambiarTurno();
    document.getElementById("dado").addEventListener("click", dadoRandom);
    document.getElementsByClassName("botonAjustes")[0].addEventListener("click", menuDesplegable);

}

//Función que genera un número aleatorio
function generarNumero() {
    return Math.floor(Math.random() * 6 + 1);
}

//Muestra el gif de los dados moviendose
function agitar() { 
    document.getElementById("dado").innerHTML = "<img src='Imagenes/dados.gif'; width='150px'; height='150px';/>";
}

//Función que genera la imagen del dado según el número aleatorio
function generarImagenDado(e) {
    if (e == 1) {
        // document.getElementById("fotoDado").src = "";
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado1.png'; width='150px'; height='150px';/>";
    } else if (e == 2) {
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado2.png'; width='150px'; height='150px';/>";
    } else if (e == 3) {
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado3.png'; width='150px'; height='150px';/>";
    } else if (e == 4) {
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado4.png'; width='150px'; height='150px';/>";
    } else if (e == 5) {
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado5.png'; width='150px'; height='150px';/>";
    } else {
        document.getElementById("dado").innerHTML = "<img src='Imagenes/Dado6.png'; width='150px'; height='150px';/>";
    }
}

//Función que incrementa el turno de la partida en 1 o resetea al turno del primer jugador
function incrementarTurno() {
    if (contadorTurno == numJugadores) {
        contadorTurno = 1;
    } else {
        contadorTurno++;
    }
    setTimeout(function () {
        cambiarTurno()
    }, 500); //retraso en la llamada al cambio de turno para que vaya después del condicional
}

//Función mostrarFichas que hace que se muestren tantas fichas como números de jugadores haya
function mostrarFichas() {
    if (numJugadores == 2) {
        document.getElementById("ficha3").style.display = "none";
        document.getElementById("ficha4").style.display = "none";
    } else if (numJugadores == 3) {
        document.getElementById("ficha4").style.display = "none";
    }
}

//Función turno que hace que en la caja se muestre el texto del turno a quien le toca
function cambiarTurno() {
    if (contadorTurno == 1) {
        document.getElementById("turno").innerHTML = "Turno de <br>" + nombre1;
    } else if (contadorTurno == 2) {
        document.getElementById("turno").innerHTML = "Turno de <br>" + nombre2;
    } else if (contadorTurno == 3) {
        document.getElementById("turno").innerHTML = "Turno de <br>" + nombre3;
    } else if (contadorTurno == 4) {
        document.getElementById("turno").innerHTML = "Turno de <br>" + nombre4;
    }
}

function moverFichaRebote() {
    var idficha = "ficha" + contadorTurno; //Aquí según incrementa el contador incrementa la ficha que cogemos
    var ficha = document.getElementById(idficha);
    var cont = ficha.parentElement; //el padre de la ficha
    if (cont.id == "fichas") {
        var cajadestino = document.getElementById(1);
        cajadestino.appendChild(ficha);
        ficha.classList = "fichamodificada";
    } else {
        var numerocaja = cont.id;
        var id = Number(numerocaja) + Number(1);
        var destino = document.getElementById(id);
        destino.appendChild(ficha);
        ficha.classList = "fichamodificada";
    }
}

//Función que cambia el turno, genera el número aleatorio, genera el dado y mueve la ficha de uno en uno hasta el número del dado.
function dadoRandom() {
    agitar();
    var numero = generarNumero();
    var idficha = "ficha" + contadorTurno;
    var ficha = document.getElementById(idficha);
    var cont = Number(ficha.parentElement.id); //el padre, id de la casilla donde esta
    var tablero = document.getElementById("tablero").className;
    var casillastablero;

    if (tablero == "tablero1") {
        casillastablero = 100;
    } else if (tablero == "tablero2") {
        casillastablero = 64;
    } else {
        casillastablero = 36;
    }
    var resta = casillastablero - cont; //casillas totales de tablero - el id de la casilla en la que esta
    var vuelve = numero - resta; //avanza hasta el resta y vuelve guarda las casillas que sobrarian

    //con un if hay que ver las casillas que quedan
    if (numero > resta) {
        console.log(resta);
        setTimeout(() => {
            generarImagenDado(numero);
            if (numero == 6) {
                for (let index = 0; index < resta; index++) {
                    setTimeout(function timer() {
                        moverFichaRebote();
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            } else {
                for (let index = 0; index < resta; index++) {
                    setTimeout(function timer() {
                        moverFichaRebote();
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            }
        }, 1000);
        setTimeout(() => {
            console.log(vuelve);
            if (numero == 6) {
                for (let index = 0; index < vuelve; index++) {
                    setTimeout(function timer() {
                        moverFichaParaAtras();
                        if (index == vuelve - 1) {
                            setTimeout(function timer2() {
                                escalerasyserpientes();
                            }, 00);
                        }
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            } else {
                for (let index = 0; index < vuelve; index++) {
                    setTimeout(function timer() {
                        moverFichaParaAtras();
                        if (index == vuelve - 1) {
                            setTimeout(function timer() {
                                incrementarTurno();
                            }, 1000);
                            setTimeout(function timer() {
                                escalerasyserpientes();
                            }, 100);
                        }
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            }
        }, 2700);
    } else {
        //si quedan mas de 5 casillas se mete aqui
        setTimeout(() => {
            generarImagenDado(numero);
            //desde aqui llamamos a la funcion moverFicha
            if (numero == 6) {
                for (let index = 0; index < numero; index++) {
                    setTimeout(function timer() {
                        moverFicha();
                        if (index == numero - 1) {
                            setTimeout(function timer2() {
                                escalerasyserpientes();
                            }, 100);
                        }
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            } else {
                for (let index = 0; index < numero; index++) {
                    setTimeout(function timer() {
                        moverFicha();
                        if (index == numero - 1) {
                            setTimeout(function timer() {
                                incrementarTurno();
                            }, 200);
                            setTimeout(function timer() {
                                escalerasyserpientes();
                            }, 100);
                        }
                    }, index * 500); //retraso para que no se haga la transición demasiado rápida.
                }
            }
        }, 1000);
    }
}

//Función que mueve la ficha correspondiente 1 casilla.
function moverFicha() {
    var idficha = "ficha" + contadorTurno; //Aquí según incrementa el contador incrementa la ficha que cogemos
    var numCasillas = parseInt(document.getElementsByClassName("casilla").length);
    var ficha = document.getElementById(idficha);
    var cont = ficha.parentElement; //el padre de la ficha
    var ganar;
    if (contadorTurno == 1) {
        ganar = nombre1;
    } else if (contadorTurno == 2) {
        ganar = nombre2;
    } else if (contadorTurno == 3) {
        ganar = nombre3;
    } else if (contadorTurno == 4) {
        ganar = nombre4;
    }
    if (cont.id == "fichas") {
        var cajadestino = document.getElementById(1);
        cajadestino.appendChild(ficha);
        ficha.classList = "fichamodificada";
    } else {
        var numerocaja = cont.id;
        var id = Number(numerocaja) + Number(1);
        var destino = document.getElementById(id);
        destino.appendChild(ficha);
        ficha.classList = "fichamodificada";
        setTimeout(() => {
            if (destino.id == numCasillas) {
                ganador(ganar);
            }
        }, 1000);
    }
}
//recibe el nombre del ganador
function ganador(e) {
    var cajaganador = document.getElementById("ganador");
    cajaganador.style.display = "";
    var dado = document.getElementById("dado");
    dado.removeEventListener("click", dadoRandom);
    cajaganador.className = "ganador";
    cajaganador.textContent = "Enhorabuena " + e + ". Has ganado";
    document.getElementById("fiesta").style.display = "";
}

function moverFichaParaAtras() {
    var idficha = "ficha" + contadorTurno; //Aquí según incrementa el contador incrementa la ficha que cogemos
    var ficha = document.getElementById(idficha);
    var cont = ficha.parentElement; //el padre de la ficha
    var numerocaja = cont.id;
    var id = Number(numerocaja) - Number(1);
    var destino = document.getElementById(id);
    destino.appendChild(ficha);
    ficha.classList = "fichamodificada";
}

//Función que hace que se mueva la ficha si cae en serpiente o en escalera dependiendo también del tablero escogido
function escalerasyserpientes() {
    var idficha = "ficha" + contadorTurno;
    var ficha = document.getElementById(idficha);
    var padre = (parseInt(ficha.parentElement.id));
    var tablero = document.getElementById("tablero").className;
    if (tablero == "tablero1") {
        switch (padre) {
            //Escaleras
            case 6:
                document.getElementById(27).appendChild(ficha);
                break;
            case 23:
                document.getElementById(82).appendChild(ficha);
                break;
            case 34:
                document.getElementById(77).appendChild(ficha);
                break;
            case 66:
                document.getElementById(96).appendChild(ficha);
                break;
            case 68:
                document.getElementById(89).appendChild(ficha);
                break;
                //Serpientes
            case 25:
                document.getElementById(3).appendChild(ficha);
                break;
            case 45:
                document.getElementById(21).appendChild(ficha);
                break;
            case 48:
                document.getElementById(12).appendChild(ficha);
                break;
            case 78:
                document.getElementById(42).appendChild(ficha);
                break;
            case 87:
                document.getElementById(46).appendChild(ficha);
                break;
            case 94:
                document.getElementById(57).appendChild(ficha);
                break;
        }
    } else if (tablero == "tablero2") {
        switch (padre) {

            //Escaleras
            case 6:
                document.getElementById(40).appendChild(ficha);
                break;
            case 15:
                document.getElementById(32).appendChild(ficha);
                break;
            case 19:
                document.getElementById(36).appendChild(ficha);
                break;
            case 28:
                document.getElementById(62).appendChild(ficha);
                break;
                //Serpientes
            case 21:
                document.getElementById(3).appendChild(ficha);
                break;
            case 44:
                document.getElementById(24).appendChild(ficha);
                break;
            case 49:
                document.getElementById(31).appendChild(ficha);
                break;
            case 58:
                document.getElementById(37).appendChild(ficha);
                break;
        }
    } else {
        switch (padre) {
            //Escaleras
            case 4:
                document.getElementById(14).appendChild(ficha);
                break;
            case 8:
                document.getElementById(19).appendChild(ficha);
                break;
            case 27:
                document.getElementById(33).appendChild(ficha);
                break;
                //Serpientes
            case 16:
                document.getElementById(5).appendChild(ficha);
                break;
            case 26:
                document.getElementById(13).appendChild(ficha);
                break;
            case 31:
                document.getElementById(21).appendChild(ficha);
                break;
        }
    }
}

//Función que crea distintos tableros.
function crearTablero() {
    var mitablero = document.getElementById("tablero");
    var tableros = sessionStorage.getItem("tableros");
    var numeros;
    var num;
    //Decimos cuántas casillas tiene cada tablero
    if (tableros == 1) {
        numeros = 100;
        mitablero.setAttribute("class", "tablero1");
        num = 10;
    } else if (tableros == 2) {
        numeros = 64;
        mitablero.setAttribute("class", "tablero2");
        num = 8;
    } else {
        numeros = 36;
        mitablero.setAttribute("class", "tablero3");
        num = 6;
    }
    //Creamos las casillas
    for (var i = num; i > 0; i--) {
        var fila = document.createElement("div");
        if (i % 2 == 0) {
            fila.className = "derecho";
        } else {
            fila.className = "reves";
        }
        mitablero.appendChild(fila);
        for (var j = 0; j < num; j++) {
            var caja = document.createElement("div");
            caja.setAttribute("id", numeros);
            caja.className = "casilla"; // le meto la clase casilla al div para poder contarlas luego
            caja.innerHTML = numeros;
            numeros = numeros - 1;
            fila.appendChild(caja);
        }
    }
    //OTRA MANERA DE HACERLO
    // var tablero = document.getElementById("tablero");
    // texto = "";
    // num = 91;
    // for (let i = 0; i < 10; i++) {
    //     if (i % 2 == 0) {
    //         texto += "<div class='reves'>";
    //         for (let j = 0; j < 10; j++) {
    //             texto += "<div id='" + num + "'>" + num + "</div>";
    //             num++;
    //         }
    //         texto += "</div>";
    //         num -= 20;
    //     } else {
    //         texto += "<div class='derecho'>";
    //         for (let j = 0; j < 10; j++) {
    //             texto += "<div id='" + num + "'>" + num + "</div>";
    //             num++;
    //         }
    //         texto += "</div>";
    //         num -= 20;
    //     }
    // }
    // tablero.innerHTML = texto;

}
//togle(): Quita la clase si ya existe, de lo contrario, la agrega a la colección.
//esta función lo que hace es crear una lista, y le asigna una clase
function menuDesplegable() {
    document.getElementById("crearClase").classList.toggle("ver");
}

// Si el usuario pulsa cualquier parte de la página, inicia la canción
window.onclick = function (e) {
    autoPlay();
    if (!e.target.matches('.botonAjustes')) {
        var lista = document.getElementsByClassName("lista");
        for (let i = 0; i < lista.length; i++) {
            var abrirLista = lista[i];
            if (abrirLista.classList.contains("ver")) {
                abrirLista.classList.remove("ver");
            }
        }
    }
}

function autoPlay() {
    document.getElementById('audio').play();
}

//le quita y le pone el sonido al audio
function quitarSonido() { 
    if (mute) {
        document.getElementById("audio").muted = true;
        document.getElementsByClassName("boton")[0].innerHTML = "<img src='./Imagenes/MenuDesplegable/Mute2.png'; width='50px'; height='50px';/>";
        mute = false;
    } else {
        document.getElementById("audio").muted = false;
        document.getElementsByClassName("boton")[0].innerHTML = "<img src='./Imagenes/MenuDesplegable/Play2.png'; width='50px'; height='50px';/>";
        mute = true;
    }
    return mute;
}

//te lleva dirextamente a la pagina principal
function exit() { 
    window.open("SerpientesYEscaleras.html", "_self");
}

//reinicia el juego
function reiniciar() { 
    location.reload();
}