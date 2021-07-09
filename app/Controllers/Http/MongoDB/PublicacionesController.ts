// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacion from 'App/Models/MongoDB/Publicacion'

export default class PublicacionesController {

    async index ({params}) {
        if (params.id) {
            const publicacion = await Publicacion.findById(params.id)
            return publicacion
        }
        const publicaciones = await Publicacion.find()
        return publicaciones
    }
        
    async create ({ request }){
        const publicacion = await Publicacion.create({
          idProducto: request.input('idProducto'),
          descuento: request.input('descuento'),
          calificacion: request.input('calificacion'),
          estatus: request.input('estatus'),
          fecha: (await this.fecha()).toString()

        })
        return publicacion
    }
    
    async update ({params, request}){
        const publicacion = await Publicacion.findById(params.id)
        publicacion!.idProducto = request.input('idProducto')
        publicacion!.descuento = request.input('descuento')
        publicacion!.calificacion = request.input('calificacion')
        publicacion!.estatus = request.input('estatus')
        publicacion!.fecha = (await this.fecha()).toString()
        
        await publicacion!.save() 
        return publicacion
    
    }
    
    async delete ({ params }) {
        const publicacion = await Publicacion.findById(params.id)
        await publicacion!.delete()
    }


    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }
}
