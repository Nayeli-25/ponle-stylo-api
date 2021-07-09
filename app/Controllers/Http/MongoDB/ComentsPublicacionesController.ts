// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ComentariosPublicacion from 'App/Models/MongoDB/ComentsPublicacion'

export default class ComentsPublicacionesController {

    async index ({params}) {
        if (params.id) {
            const comentario = await ComentariosPublicacion.findById(params.id)
            return comentario
        }
        const comentarios = await ComentariosPublicacion.find()
        return comentarios
    }
        
    async create ({ request }){
        const comentario = await ComentariosPublicacion.create({
          idComentario: request.input('idComentario'),
          idPublicacion: request.input('idPublicacion'),
          fecha: (await this.fecha()).toString()

        })
        return comentario
    }
    
    async update ({params, request}){
        const comentario = await ComentariosPublicacion.findById(params.id)
        comentario!.idComentario = request.input('idComentario')
        comentario!.idPublicacion = request.input('idPublicacion')
        comentario!.fecha = (await this.fecha()).toString()
        
        await comentario!.save() 
        return comentario
    
    }
    
    async delete ({ params }) {
        const comentario = await ComentariosPublicacion.findById(params.id)
        await comentario!.delete()
    }


    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }

}
