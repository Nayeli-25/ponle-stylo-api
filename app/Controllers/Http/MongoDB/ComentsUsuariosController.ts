// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ComentariosUsuario from 'App/Models/MongoDB/ComentsUsuario'

export default class ComentsUsuariosController {

    async index ({params}) {
        if (params.id) {
            const comentario = await ComentariosUsuario.findById(params.id)
            return comentario
        }
        const comentarios = await ComentariosUsuario.find()
        return comentarios
    }
        
    async create ({ request }){
        const comentario = await ComentariosUsuario.create({
          idComentario: request.input('idComentario'),
          idUsuario: request.input('idUsuario'),
          fecha: (await this.fecha()).toString()

        })
        return comentario
    }
    
    async update ({params, request}){
        const comentario = await ComentariosUsuario.findById(params.id)
        comentario!.idComentario = request.input('idComentario')
        comentario!.idUsuario = request.input('idUsuario')
        comentario!.fecha = (await this.fecha()).toString()
        
        await comentario!.save() 
        return comentario
    
    }
    
    async delete ({ params }) {
        const comentario = await ComentariosUsuario.findById(params.id)
        await comentario!.delete()
    }


    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }

}
