const express = require("express") //1st-importamos express.js para poder utilizarlo en nuestro proyecto

const app = express() //2nd-creamos una aplicacion con express.js

app.get("/",(req, res) =>{  
    res.send("Hola")        //3rd-le decimos a expres.js que cuando en la URL raiz reciba una peticion responda "Hola"
})

app.listen(8000, () => {     //4th-le decimos que escuche continuamente en el puerto 8000 las peticiones de los clientes para que todo el tiempo pueda responderles
    console.log("Servido funcionando")
})