// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/MongoDB/Comentario'

export default class ComentariosController {

    async index ({params}) {
        if (params.id) {
            const comentario = await Comentario.findById(params.id)
            return comentario
        }
        const comentarios = await Comentario.find()
        return comentarios
    }
        
    async create ({ request }){
        const comentario = await Comentario.create({
          estatus: request.input('estatus'),
          comentario: request.input('comentario'),
        })
        return comentario
    }
    
    async update ({params, request}){
        const comentario = await Comentario.findById(params.id)
        comentario!.estatus = request.input('estatus')
        comentario!.comentario = request.input('comentario')
        
        await comentario!.save() 
        return comentario
    
    }
    
    async delete ({ params }) {
        const comentario = await Comentario.findById(params.id)
        await comentario!.delete()
    }

}
