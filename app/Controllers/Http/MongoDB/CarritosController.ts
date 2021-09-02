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
        
    async create ({ request, auth }){
        const user = await auth.user
        const carrito = await Carrito.create({
          idUsuario: user.id,
          productos: request.input('productos')
        })
        return carrito
    }
    
    async update ({params, request, auth}){
        const user = await auth.user
        const carrito = await Carrito.findById(params.id)
        carrito!.idUsuario = user.id
        carrito!.productos = request.input('productos')
        
        await carrito!.save() 
        return carrito
    
    }
    
    async delete ({ params }) {
        const carrito = await Carrito.findById(params.id)
        await carrito!.delete()
    }

    async carritoUsuario ({ auth }) {
        const user = await auth.user
        const carrito = await Carrito.where({'idUsuario': user!.id})

        for(let i in carrito) {
            return carrito[i].productos
        }
    }
}
