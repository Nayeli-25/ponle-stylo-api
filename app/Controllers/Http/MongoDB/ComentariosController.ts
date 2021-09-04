// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/MongoDB/Comentario'
import Publicacion from 'App/Models/MongoDB/Publicacion'

export default class ComentariosController {

    async index ({params}) {
        if (params.id) {
            const publicacion = await Publicacion.findById(params.id).where({'estatus': 'activo'})
            const comentario = await Comentario.where({'idPublicacion': publicacion!.id, 'estatus': 'activo'})
            return comentario
        }
        const comentarios = await Comentario.find()
        return comentarios
    }
        
    async create ({ request, auth, response }){
        const user = await auth.user
        await Publicacion.aggregate([
            { $addFields: {_id: { $toString: '$_id'} } }
        ])
        const publicacion = await Publicacion.findById(request.input('idPublicacion'))
        if (!!publicacion  == true) {
            const comentario = await Comentario.create({
                estatus: request.input('estatus'),
                comentario: request.input('comentario'),
                idUsuario: user.id,
                idPublicacion: request.input('idPublicacion'),
                fecha: (await this.fecha()).toString()
            })
            return comentario
        }
        return response.abort({
            message: 'Publicación inválida'
        }) 
    }
    
    async update ({params, request, auth, response}){
        const user = await auth.user
        await Publicacion.aggregate([
            { $addFields: {_id: { $toString: '$_id'} } }
        ])
        const publicacion = await Publicacion.findById(request.input('idPublicacion'))
        if (!!publicacion  == true) {
            const comentario = await Comentario.findById(params.id)
            comentario!.estatus = request.input('estatus')
            comentario!.comentario = request.input('comentario')
            comentario!.idUsuario = user.id
            comentario!.idPublicacion = request.input('idPublicacion')
            comentario!.fecha = (await this.fecha()).toString()
        
            await comentario!.save() 
            return comentario
        }
        return response.abort({
            message: 'Publicación inválida'
        }) 
    }
    
    async delete ({ params }) {
        const comentario = await Comentario.findById(params.id)
        await comentario!.delete()
    }

    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }
}
