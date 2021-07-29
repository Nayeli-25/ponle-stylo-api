// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Carrito from 'App/Models/MongoDB/Carrito'

export default class CarritosController {

    async index ({params}) {
        if (params.id) {
            const carrito = await Carrito.findById(params.id)
            return carrito
        }
        const carritos = await Carrito.find()
        return carritos
    }
        
    async create ({ request }){
        const carrito = await Carrito.create({
          idUsuario: request.input('idUsuario'),
          productos: request.input('productos')
        })
        return carrito
    }
    
    async update ({params, request}){
        const carrito = await Carrito.findById(params.id)
        carrito!.idUsuario = request.input('idUsuario')
        carrito!.productos = request.input('productos')
        
        await carrito!.save() 
        return carrito
    
    }
    
    async delete ({ params }) {
        const carrito = await Carrito.findById(params.id)
        await carrito!.delete()
    }
}
