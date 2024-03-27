const seleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById ('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataques-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let pokemones = []//los corchetes cuadrados son para ir metiendo cada uno de los valores que me interesen. En este caso van a ser cada uno de los objetos que ya construimos.
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePokemones
let inputStaryu
let inputCubone
let inputCharmander
let mascotaJugador
let ataquesPokemon
let ataquesPokemonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones =[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3 
let ataques
let lienzo = mapa.getContext("2d")
let intervalo 

class Pokemon{
        constructor(nombre, foto, vida){
                this.nombre = nombre
                this.foto = foto
                this.vida = vida
                this.ataques = []
                this.x = 20
                this.y = 30
                this.ancho = 80
                this.alto = 80
                this.mapaFoto = new Image()
                this.mapaFoto.src = foto
                this.veolcidadX = 0 
                this.veolcidadY = 0
        }
}

let staryu = new Pokemon('Staryu'/* nombre */, 'staryu.png'/* foto */, 5/* vida */)
let cubone = new Pokemon('Cubone', 'cubone.png', 5)
let charmander = new Pokemon('Charmander', 'charmander.png', 5)
pokemones.push(staryu,cubone,charmander) //esto es un arreglo(array)

//push espara empujar o inyectar informacion.
staryu.ataques.push(
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '🔥', id: 'boton-fuego'},
        {   nombre: '🌱', id: 'boton-tierra'},
) 
cubone.ataques.push(
        {nombre: '🌱', id: 'boton-tierra'},
        {nombre: '🌱', id: 'boton-tierra'},
        {nombre: '🌱', id: 'boton-tierra'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '💧', id: 'boton-agua'},
)
charmander.ataques.push(
        {nombre: '🔥', id: 'boton-fuego'},
        {   nombre: '🔥', id: 'boton-fuego'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '🌱', id: 'boton-tierra'},
)
function iniciarJuego(){  
        seleccionarAtaque.style.display = 'none'
        sectionVerMapa.style.display = 'none'
        

        pokemones.forEach((pokemon) => {   //por cada 'pokemon' que existe dentro de nuestro arreglo de 'pokemones' haz lo siguiente..
        opcionDePokemones = ` 
        <input type="radio" name="mascota" id=${pokemon.nombre} />
                <label class="tarjeta-de-pokemon" for=${pokemon.nombre}>
                        <p style="font-size: 20px;">${pokemon.nombre}</p>
                        <img src=${pokemon.foto} alt=${pokemon.nombre}>
                </label> `
        contenedorTarjetas.innerHTML += opcionDePokemones

        inputStaryu = document.getElementById('Staryu')
        inputCubone = document.getElementById('Cubone')
        inputCharmander = document.getElementById('Charmander')
        })

        sectionReiniciar.style.display = 'none'
        botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

        botonReiniciar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador() {
        seleccionarMascota.style.display = 'none'
        //seleccionarAtaque.style.display = 'flex'  
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
       

        if (inputStaryu.checked) {
                spanMascotaJugador.innerHTML = inputStaryu.id
                mascotaJugador = inputStaryu.id
        } else if (inputCubone.checked) {
                spanMascotaJugador.innerHTML = inputCubone.id
                mascotaJugador = inputCubone.id
        } else if (inputCharmander.checked) {
                spanMascotaJugador.innerHTML = inputCharmander.id
                mascotaJugador = inputCharmander.id
        } else {
                alert('tienes que seleccionar una mascota')
        }
        extraerAtaques(mascotaJugador) 
        seleccionarMascotaEnemigo()
}
function extraerAtaques(mascotaJugador){
        let ataques
                for (let i = 0; i < pokemones.length; i++) {
                if (mascotaJugador === pokemones[i].nombre) {
                        ataques = pokemones[i].ataques
                }
        }
        mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
        ataques.forEach((ataque) => {
        ataquesPokemon = `<button id= ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesPokemon
        })

        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')

    //console.log(botones)

}
function secuenciaAtaque() {
        botones.forEach((boton) => {
        boton.addEventListener('click',(e) =>{      // la "e" indica el evento mismo
        if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
        } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
        } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
        }
                ataqueAleatorioEnemigo()
                })
        })
}

function seleccionarMascotaEnemigo() {
        let mascotaAleatoria = aleatorio(0, pokemones.length -1)

        spanMascotaEnemigo.innerHTML = pokemones[mascotaAleatoria].nombre
        ataquesPokemonEnemigo = pokemones[mascotaAleatoria].ataques
        secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
        let ataqueAleatorio = aleatorio(0,ataquesPokemonEnemigo.length -1)
        if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
        } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
        } else {
        ataqueEnemigo.push('TIERRA')
        }
        console.log(ataqueEnemigo)
        iniciarPelea()
}
function iniciarPelea() {
        if (ataqueJugador.length === 5) {
        combate()
        }
}

function indexAmbosOponentes(jugador, enemigo) {
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

        for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
                indexAmbosOponentes(index, index)
                crearMensaje("EMPATE")
                
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
                indexAmbosOponentes(index, index)
                crearMensaje('GANASTE')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
                indexAmbosOponentes(index, index)
                crearMensaje('GANASTE')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
                indexAmbosOponentes(index,index)
                crearMensaje('GANASTE')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
        } else {
                indexAmbosOponentes(index, index)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        }

        revisarVidas()
}        
function revisarVidas() {
        if (victoriasJugador === victoriasEnemigo) {
                crearMensajeFinal("esto fue un empate")
        } else if(victoriasJugador > victoriasEnemigo) {
                crearMensajeFinal("GANASTE! :D")
        } else {
                crearMensajeFinal("lo siento, perdiste :(")
        }
} 
function crearMensaje(resultado) {
        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')
        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
        ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
        sectionMensajes.innerHTML  = resultadoFinal
        sectionReiniciar.style.display = 'flex'
}
function reiniciarJuego() {
        location.reload()
}
function aleatorio(min, max) {
        return Math.floor(Math.random()*(max - min + 1)+min)    
}
function pintarPersonaje() {
        charmander.x = charmander.x + charmander.veolcidadX
        charmander.y = charmander.y + charmander.veolcidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(
                charmander.mapaFoto,
                charmander.x,
                charmander.y,
                charmander.ancho,
                charmander.alto
        )
}

function moverDerecha() {
        charmander.veolcidadX = 5
        pintarPersonaje()
}
function moverIzquierda() {
        charmander.veolcidadX = - 5
}
function moverAbajo() {
        charmander.veolcidadY = 5
}
function moverArriba() {
        charmander.veolcidadY = - 5
}
function detenerMovimiento() {
        charmander.veolcidadX = 0
        charmander.veolcidadY = 0
}
function sePresionoUnaTecla(event) {
        switch (event.key) {
                case 'ArrowUp' :
                        moverArriba()
                        break;
                case 'ArrowDown' :
                        moverAbajo()
                        break;
                case 'ArrowLeft' :
                        moverIzquierda()
                        break;
                case 'ArrowRight' :
                        moverDerecha()
                        break;
                default:
                        break;
        }
}

function iniciarMapa() {
        intervalo = setInterval(pintarPersonaje, 50)
        
        window.addEventListener("keydown", sePresionoUnaTecla)
        window.addEventListener("keyup", detenerMovimiento)
}
window.addEventListener('load', iniciarJuego)