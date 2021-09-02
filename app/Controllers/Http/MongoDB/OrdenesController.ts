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
        
    async create ({ auth }){
        const user = await auth.user
        const orden = await Orden.create({
          idUsuario: user.id,
          fecha: (await this.fecha()).toString()
        })
        return orden
    }
    
    async update ({ params, auth }){
        const user = await auth.user
        const orden = await Orden.findById(params.id)
        orden!.idUsuario = user.id
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
