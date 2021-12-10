window.addEventListener("load", iniciar);

function iniciar() {
    document.getElementById("1").addEventListener("click", play);
    document.getElementById("2").addEventListener("click", play);
    document.getElementById("3").addEventListener("click", play);
    document.getElementById("play").addEventListener("click", pagina);
}

function play(e) {
    var tablero1 = document.getElementById("1");
    var tablero2 = document.getElementById("2");
    var tablero3 = document.getElementById("3");
    var tablero = e.target;
    var id = tablero.id;
    sessionStorage.setItem("tableros", id);
    if (id == 3) {
        document.getElementById("1").style.opacity = "1";
        document.getElementById("2").style.opacity = "1";
        document.getElementById("3").style.opacity = "0.6";
    } else if (id == 2) {
        document.getElementById("1").style.opacity = "1";
        document.getElementById("2").style.opacity = "0.6";
        document.getElementById("3").style.opacity = "1";
    } else {
        document.getElementById("1").style.opacity = "0.6";
        document.getElementById("2").style.opacity = "1";
        document.getElementById("3").style.opacity = "1";
    }
}

function pagina() {
    window.open("Menu.html", "_self");
}