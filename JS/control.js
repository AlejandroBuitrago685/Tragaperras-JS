let listaImagenes = ["dollar", "aubergine", "banana", "carrots", "cherries", "lemon", "orange", "peach", "potato", "tomato"];
let nMonedas = document.getElementById("monedasActual");
let historial = document.getElementById("historial");
let dinero = 0;


function comprobarMonedas() {

    if (dinero > 0) {
        return true;
    }

    else return false;

}

function añadirMonedas() {
    let inputMonedas = document.getElementById("campoMonedas").value;
    let inputButton = document.getElementById("addButton");

    if (!inputMonedas) alert("Debe introducir una cantidad válida.");
    else {
        dinero = Number(inputMonedas);
        nMonedas.innerHTML = dinero;
        addHistorial("Has introducido " + Number(inputMonedas) + " monedas.");

        inputButton.setAttribute("disabled", "true");
        document.getElementById("campoMonedas").setAttribute("disabled", "true");
        document.getElementById("campoMonedas").value = 0;
    }

}


function girar() {
    let slot1 = document.getElementById("imagen1");
    let slot2 = document.getElementById("imagen2");
    let slot3 = document.getElementById("imagen3");
    let slots = [slot1, slot2, slot3];
    let resultado = [];

    slots.forEach(slot => {
        let random = Math.floor(Math.random() * (10 - 0) + 0);
        let imageResult = listaImagenes[random];
        slot.src = "./img/" + imageResult + ".png";
        resultado.push(imageResult);
    });

    verificarResultado(resultado);
}

function verificarResultado(resultado) {

    let dollars = 0;
    let aubergine = 0;
    let banana = 0;
    let carrots = 0;
    let cherries = 0;
    let lemon = 0;
    let orange = 0;
    let peach = 0;
    let potato = 0;
    let tomato = 0;


    resultado.forEach(element => {
        if (element == "dollar") {
            ++dollars;
        }
        else if (element == "aubergine") {
            ++aubergine;
        }
        else if (element == "banana") {
            ++banana;
        }
        else if (element == "carrots") {
            ++carrots;
        }
        else if (element == "cherries") {
            ++cherries;
        }
        else if (element == "lemon") {
            ++lemon;
        }
        else if (element == "orange") {
            ++orange;
        }
        else if (element == "peach") {
            ++peach;
        }
        else if (element == "potato") {
            ++potato;
        }
        else if (element == "tomato") {
            ++tomato;
        }
    });

    let results = [dollars, aubergine, banana, carrots, cherries, lemon, orange, peach, potato, tomato];
    let ganancias = 0;
    let textoGanancia = "";
    let check = false;

    results.forEach(function (element, i) {
        if (element != 0) {
            if (i == 0) {
                if (element == 1) {
                    let hayIguales = false;
                    for (let i = 1; i < results.length; i++) {
                        if (results[i] == 2) {
                            hayIguales = true;
                        }
                    }
                    if (!hayIguales) {
                        textoGanancia = "UNA MONEDA, ganas 1 moneda.";
                        ganancias = ganancias + 1;
                    }
                    else {
                        if (!check) {
                            textoGanancia = "HAY UNA MONEDA Y DOS IGUALES, ganas 3 monedas.";
                            ganancias = ganancias + 3;
                            check = true;
                        }
                    }

                }
                else if (element == 2) {
                    textoGanancia = "DOS MONEDAS, ganas 4 monedas.";
                    ganancias = ganancias + 4;
                }
                else if (element == 3) {
                    textoGanancia = "TRES MONEDAS, ganas 10 monedas.";
                    ganancias = ganancias + 10;
                }
            }
            else {
                if (element == 2) {

                    if (results[0] == 1) {
                        if (!check) {
                            textoGanancia = "HAY UNA MONEDA Y DOS IGUALES, ganas 3 monedas.";
                            ganancias = ganancias + 3;
                            check = true;
                        }
                    }
                    else {
                        textoGanancia = "DOS IGUALES, ganas 2 monedas.";
                        ganancias = ganancias + 2;
                    }

                }
                else if (element == 3) {
                    textoGanancia = "TRES IGUALES, ganas 5 monedas.";
                    ganancias = ganancias + 5;
                }
            }
        }

    });

    if (ganancias != 0) {
        console.log(ganancias);
        addHistorial(textoGanancia);
        actualizarMonedas(ganancias);
    }
    else {
        addHistorial("Gastas una moneda.");
    }

}

function addHistorial(textoGanancia) {
    let fila = document.createElement("li");
    fila.innerHTML = textoGanancia;
    historial.appendChild(fila);
}

function animacionPalancaDown() {

    if (comprobarMonedas()) {
        let palanca = document.getElementById("palanca");
        palanca.src = "./img/palancaDOWN.png";
    }

    else alert("Monedas insuficientes.");

}

function animacionPalancaUp() {

    if (comprobarMonedas()) {
        let palanca = document.getElementById("palanca");
        palanca.src = "./img/palancaUP.png";
        actualizarMonedas(-1);
        girar();
    }

}

function actualizarMonedas(cantidad) {
    dinero = dinero + cantidad;
    nMonedas.innerHTML = dinero;
}

function salir() {
    let monedas = document.getElementById('monedasActual');
    let nMonedas = monedas.innerHTML;
    let inputButton = document.getElementById("addButton");
    dinero = 0;

    let confirmation = confirm("¿Está seguro de que quiere terminar la partida?")

    if(confirmation){
        if (Number(nMonedas) > 0) {
            alert("¡Felicidades!\n" + "Has conseguido un total de " + nMonedas + " monedas.");
            addHistorial("Has retirado " + nMonedas + " monedas.");
        }
    
        else{
            alert("Lo sentimos...\n" + "Esta vez no has conseguido ninguna moneda.");
            addHistorial("Has retirado " + nMonedas + " monedas.");
        } 
    
    
        document.getElementById("campoMonedas").value = Number(nMonedas);
        inputButton.removeAttribute("disabled");
        document.getElementById("campoMonedas").removeAttribute("disabled");
        document.getElementById("monedasActual").innerHTML = 0;
    }
 
}
