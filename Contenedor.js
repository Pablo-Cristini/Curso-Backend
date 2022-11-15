const fs = require('fs');

class Contenedor {

    constructor(ruta){
        this.ruta = ruta;
    }

    async save(object){
        const listado = await this.getAll()

        if(listado.length > 0 && listado.some((el) => el.title === object.title)){
            console.log("El producto ya existe")
        }

        let nuevoId

        if(listado.length == 0){
            nuevoId = 1
        }else{
            nuevoId = listado[listado.length - 1].id + 1
        }

        const nuevoObjetoConId = {...object, id: nuevoId}

        listado.push(nuevoObjetoConId)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2))
            return nuevoId
        } catch (error) {
            throw new Error(`hubo un error al guardar un nuevo objeto ${error}`)
        }
    }

    async getAll(){
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        try {
            const listado = await this.getAll()
            return listado.find(item => item.id === id)
        } catch (error) {
            
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
        
        }
    }

    async deleteById(id) {
        const listado = await this.getAll()
        const nuevoListado = listado.filter(item => item.id != id)
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null, 2))
        } catch (error) {
        
        }
    }

    async productoRandom() {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            const parseData = JSON.parse(data)
            return parseData[Math.floor(Math.random() * (parseData.length))]
        } catch (error) {
            return []
        }
    }

}
module.exports = Contenedor;

getAll = () => {
    fs.readdir('./productos.txt', (error, productos) => {
        if(error) {
            console.log("no hay productos")
        }
        else {
            console.log(productos)
        }
    })
}
