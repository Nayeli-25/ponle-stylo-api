// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/MongoDB/Producto'

export default class ProductosController {
    async index ({params}) {
        if (params.id) {
            const producto = await Producto.findById(params.id)
            return producto
        }
        const productos = await Producto.find()
        return productos
      }
        
    async create ({ request }){
        const producto = await Producto.create({
          producto: request.input('producto'),
          imagen: request.input('imagen'),
          precio: request.input('precio'),
          talla: request.input('talla'),
          color: request.input('color'),
          descripcion: request.input('descripcion'),
          cantidad: request.input('cantidad'),
        })
        return producto
    }
    
    async update ({params, request}){
        const producto = await Producto.findById(params.id)
        producto!.producto = request.input('producto')
        producto!.imagen = request.input('imagen')
        producto!.precio = request.input('precio')
        producto!.talla = request.input('talla')
        producto!.color = request.input('color')
        producto!.descripcion = request.input('descripcion')
        producto!.cantidad = request.input('cantidad')
        
        await producto!.save() 
        return producto
    
    }
    
    async delete ({ params }) {
        const producto = await Producto.findById(params.id)
        await producto!.delete()
    }

}
    
