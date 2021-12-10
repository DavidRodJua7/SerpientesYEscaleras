window.addEventListener("load", iniciar);

function iniciar() {
    document.getElementById("2").addEventListener("click", mostrar);
    document.getElementById("3").addEventListener("click", mostrar);
    document.getElementById("4").addEventListener("click", mostrar);
    document.getElementById("play").addEventListener("click", play);
}

//hace que al pulsar el numero de jugadores aparezcan las cajitas para que pongan su nombre
function mostrar(e) {
    var caja1 = document.getElementById("caja1");
    var caja2 = document.getElementById("caja2");
    var caja3 = document.getElementById("caja3");
    var caja4 = document.getElementById("caja4");
    var caja = e.target;
    var id = caja.id;
    sessionStorage.setItem('jugadores', id); //guarda el numero de jugadores
    if (id == 4) {
        caja1.style.display = "inline-block";
        caja2.style.display = "inline-block";
        caja3.style.display = "inline-block";
        caja4.style.display = "inline-block";
        document.getElementById("2").style.opacity = "1";
        document.getElementById("3").style.opacity = "1";
        document.getElementById("4").style.opacity = "0.6";
    } else if (id == 3) {
        caja1.style.display = "inline-block";
        caja2.style.display = "inline-block";
        caja3.style.display = "inline-block";
        caja4.style.display = "none"; // cambio para que no se queden 4 cajas si luego elegimos 3 jugadores o 2
        document.getElementById("2").style.opacity = "1";
        document.getElementById("3").style.opacity = "0.6";
        document.getElementById("4").style.opacity = "1";
    } else {
        caja1.style.display = "inline-block";
        caja2.style.display = "inline-block";
        caja3.style.display = "none";
        caja4.style.display = "none";
        document.getElementById("2").style.opacity = "0.6";
        document.getElementById("3").style.opacity = "1";
        document.getElementById("4").style.opacity = "1";
    }

}
function play() {
    var nombre_1 = document.getElementById("nombre1").value;
    sessionStorage.setItem('nombre1', nombre_1);
    var nombre_2 = document.getElementById("nombre2").value;
    sessionStorage.setItem('nombre2', nombre_2);
    var nombre_3 = document.getElementById("nombre3").value;
    sessionStorage.setItem('nombre3', nombre_3);
    var nombre_4 = document.getElementById("nombre4").value;
    sessionStorage.setItem('nombre4', nombre_4);
    window.open("Juego.html", "_self");
}