const fs = require('fs')
const { json } = require('stream/consumers')

fs.writeFile('productos.txt','[]',()=>{
    console.log('escritura exitosa')
})

class Contenedor{

    id = 1

    constructor(productos){
        this.productos = productos
    }
    async getById (objeto) {
        try{
            const newContenido = JSON.parse( await fs.promises.appendFile(this.productos))
            newContenido.push(objeto)
            await fs.promises.writeFile(this.productos, JSON.stringify(newContenido))
            return newContenido
        }catch(error){
            console.log('error al agregar producto', error)
        }
    }
    async save(objeto){
        objeto['id'] = this.id
        this.id++
        const contenido = JSON.parse(await fs.promises.readFile(this.productos))
        contenido.push(objeto)
        await fs.promises.writeFile(this.productos, JSON.stringify(contenido))
    }
    
    async getAll(){
        try{
            const contenidoString = await fs.promises.readFile(this.productos)
            const contenido = JSON.parse(contenidoString)
            return contenido
        }catch(error){
            console.log('Error en getAll', error)
            return[]
        }
    }
}

const mostrarProductos = async()=>{
    const productSave = new Contenedor('productos.txt')
    await productSave.save({title: 'Remera', price: 3000, thumbnail:'url de imagen'})
    console.log(await productSave.getAll())
}
mostrarProductos();

const agregarProductos = async()=>{
    const ProductoAgregado = new Contenedor('productos.txt')
    await ProductoAgregado.save({title:'hola'})
    console.log(await ProductoAgregado.getAll())
}
agregarProductos()

