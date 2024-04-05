const express = require("express") //1st-importamos express.js para poder utilizarlo en nuestro proyecto
const cors = require("cors")    //agregamos libreria
const app = express() //2nd-creamos una aplicacion con express.js


app.use(cors())    //deshabilite todos los posibles errores relacionados con cors
app.use(express.json())  //habilite la capacidad de recibir peticiones post que contengan contenido en formato JSON


const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarPokemon(pokemon) {
        this.pokemon = pokemon
    }
}

class Pokemon {
constructor(nombre) {
this.nombre = nombre
     }
}

app.get("/unirse", (req, res) => {  
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)        //3rd-le decimos a expres.js que cuando en la URL raiz reciba una peticion responda "Hola"
})

app.post("/pokemon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.pokemon || ""
    const pokemon = new Pokemon(nombre)
    const jugadorindex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorindex >= 0) {
        jugadores[jugadorindex].asignarPokemon(pokemon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.listen(8080, () => {     //4th-le decimos que escuche continuamente en el puerto 8000 las peticiones de los clientes para que todo el tiempo pueda responderles
    console.log("Servido funcionando")
})