const Contenedor = require('./Contenedor.js')
const express = require('express')
const { response } = require('express')
const app = express()
const contenedor = new Contenedor('./productos.txt')
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})
app.get('/', async(req, res) => {
    res.send(`<h1>"holi"</h1>`)
})

app.get('/productos', async(req, res) => {
    res.send(await contenedor.getAll())
})
app.get('/productosRandom', async(req, res) =>{
    res.send(await contenedor.productoRandom())
})

server.on('error', (err) => { console.log(` =====> ERROR: ${err}`)})

