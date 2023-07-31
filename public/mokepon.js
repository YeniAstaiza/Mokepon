
const sectionSelecionarAtaque =document.getElementById("seleccionar__ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton__mascota")
const botonReniciar = document.getElementById("boton__reiniciar")
sectionReiniciar.style.display = 'none'
const sectionSelecionarMascota =document.getElementById("seleccionar__mascota")

const spanMascotaJugador = document.getElementById("mascota__jugador") 

const spanMascotaEnemigo = document.getElementById("mascota__enemigo")

const spanVidasJugador = document.getElementById("vidas__jugador")
const spanVidasEnemigo = document.getElementById("vidas__enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataques__jugador")
const ataquesEnemigo = document.getElementById("ataques__enemigo")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")

const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver__mapa")
const mapa = document.getElementById("mapa")


let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigo = []
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge 
let inputCapipego 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjetos
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3 
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground =new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = 0){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
         )
    }
}

let hipodoge = new Mokepon ("Hipodoge", "./assets/mokepon_hipodoge.png", 5, "./assets/hipodoge.png")

let capipego = new Mokepon ("Capipego", "./assets/mokepon_capipepo.png", 5, "./assets/capipepo.png")

let ratigueya = new Mokepon ("Ratigueya", "./assets/mokepon_ratigueya.png", 5, "./assets/ratigueya.png")


const HIPODOGE_ATAQUES = [
    {nombre: "💦", id: "boton__agua"},
    {nombre: "💦", id: "boton__agua"},
    {nombre: "💦", id: "boton__agua"},
    {nombre: "🔥", id: "boton__fuego"},
    {nombre: "🌿", id: "boton__tierra"}
]

const CAPIPEGO_ATAQUES = [
    {nombre: "🌿", id: "boton__tierra"},
    {nombre: "🌿", id: "boton__tierra"},
    {nombre: "🌿", id: "boton__tierra"},
    {nombre: "💦", id: "boton__agua"},
    {nombre: "🔥", id: "boton__fuego"}, 
]

const RATIGUEYA_ATAQUES = [
    {nombre: "🔥", id: "boton__fuego"},
    {nombre: "🔥", id: "boton__fuego"},
    {nombre: "🔥", id: "boton__fuego"},
    {nombre: "💦", id: "boton__agua"},
    {nombre: "🌿", id: "boton__tierra"}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipego.ataques.push(...CAPIPEGO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge, capipego, ratigueya)

function iniciarJuego() {
    
        sectionSelecionarAtaque.style.display = "none"
        sectionVerMapa.style.display = 'none'
        mokepones.forEach((mokepon) => {
             opcionDeMokepones = `
                <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta__mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
            `;
            contenedorTarjetas.innerHTML += opcionDeMokepones

            inputHipodoge = document.getElementById("Hipodoge")
            inputCapipego = document.getElementById("Capipego")
            inputRatigueya = document.getElementById("Ratigueya")
        });

        botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
        
        botonReniciar.addEventListener("click", reiniciarJuego)
        unirseAlJuego()
    }

    function unirseAlJuego() {
        fetch("http://192.168.1.11:8080/unirse")
        .then( (res) => {
            if (res.ok){
                res.text()
                .then((respuesta) =>{
                    console.log(respuesta);
                    jugadorId = respuesta
                })
            }
        })
    }
function seleccionarMascotaJugador() {
    if ( inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if ( inputCapipego.checked){
        spanMascotaJugador.innerHTML = inputCapipego.id
        mascotaJugador = inputCapipego.id
    } else if ( inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("selecciona una mascota")
        return
    }
    sectionSelecionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()   
};

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} 
        class="boton__ataque BAtaque" >${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })
        botonFuego = document.getElementById("boton__fuego")
        botonAgua = document.getElementById("boton__agua")
        botonTierra = document.getElementById("boton__tierra")
        botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💦"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador,length === 5) {
                enviarAtaques()
            }
            
        })
    })
    
}

function enviarAtaques() {
    console.log('Enviar ataques', ataqueJugador);

    fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques() {
    console.log('OBTENER ATAQUES');
    
    fetch(`http://192.168.1.11:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


/*function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}*/

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function combate() {
    clearInterval(intervalo)
    console.log('COMBATE');
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas();
}

   function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("ESTO FUE UN EMPATE 🤼")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES! Ganaste 😎")
    } else{
        crearMensajeFinal("Lo siento, perdiste 😵")
    }
   }
   


function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = "block"
}
           
function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    
    mascotaJugadorObjetos.x = mascotaJugadorObjetos.x + mascotaJugadorObjetos.velocidadX
    mascotaJugadorObjetos.y = mascotaJugadorObjetos.y + mascotaJugadorObjetos.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjetos.pintarMokepon()

    enviarPosicion(mascotaJugadorObjetos.x, mascotaJugadorObjetos.y)

    mokeponesEnemigo.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
       .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    mokeponesEnemigo = enemigos.map(function (enemigo) {
                        console.log({enemigo});
                        
                        let mokeponEnemigo = null
                        if (enemigo.mokepon != undefined) {
                        
                        const mokeponNombre = enemigo.mokepon.nombre ||""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                        } else if (mokeponNombre === "Capipego") {
                            mokeponEnemigo = new Mokepon('Capipego', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0

                        return mokeponEnemigo
                    }
                    })
                })
        }
    })
}


function moverDerecha() {
    mascotaJugadorObjetos.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjetos.velocidadX = -5
}

function moverAbajo() {
   mascotaJugadorObjetos.velocidadY = 5
}

function moverArriba() {
   mascotaJugadorObjetos.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjetos.velocidadX = 0
    mascotaJugadorObjetos.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;

         case "ArrowLeft":
            moverIzquierda()
            break;
    
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mascotaJugadorObjetos = obtenerObjetoMascota(mascotaJugador)

    console.log(mascotaJugadorObjetos, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

        window.addEventListener("keydown", sePresionoUnaTecla)

        window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones [i].nombre){
             return mokepones[i]
        }
         
     }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota= 
    mascotaJugadorObjetos.y
    const abajoMascota= 
    mascotaJugadorObjetos.y + mascotaJugadorObjetos.alto
    const derechaMascota= 
    mascotaJugadorObjetos.x + mascotaJugadorObjetos.ancho
    const izquierdaMascota= 
    mascotaJugadorObjetos.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detectó una colision");

    enemigoId = enemigo.id
    sectionSelecionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
    window.addEventListener("load", iniciarJuego)

