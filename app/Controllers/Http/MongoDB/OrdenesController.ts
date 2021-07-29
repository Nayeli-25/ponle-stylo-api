// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orden from 'App/Models/MongoDB/Orden'

export default class OrdenesController {

    async index ({params}) {
        if (params.id) {
            const orden = await Orden.findById(params.id)
            return orden
        }
        const ordenes = await Orden.find()
        return ordenes
    }
        
    async create ({ request }){
        const orden = await Orden.create({
          idUsuario: request.input('idUsuario'),
          fecha: (await this.fecha()).toString()
        })
        return orden
    }
    
    async update ({params, request}){
        const orden = await Orden.findById(params.id)
        orden!.idUsuario = request.input('idUsuario')
        orden!.fecha = (await this.fecha()).toString()
        
        await orden!.save() 
        return orden
    
    }
    
    async delete ({ params }) {
        const orden = await Orden.findById(params.id)
        await orden!.delete()
    }


    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }
}
