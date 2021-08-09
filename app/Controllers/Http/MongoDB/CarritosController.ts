// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Carrito from 'App/Models/MongoDB/Carrito'
import User from 'App/Models/SQL/User'

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

    async productosUsuario ({ auth, params }) {
        //const user = await auth.getUser()
        const user = await User.find(params.email)
        const carrito = await Carrito.where({'idUsuario': user?.id})

        for(let i in carrito) {
            return carrito[i].productos
        }
    }
}
