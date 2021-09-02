// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ModulosUsuario from 'App/Models/MongoDB/ModulosUsuario'

export default class ModulosUsuariosController {

    async index ({params}) {
        if (params.id) {
            const modulo = await ModulosUsuario.findById(params.id)
            return modulo
        }
        const modulos = await ModulosUsuario.find()
        return modulos
    }
        
    async create ({ request }){
        const modulo = await ModulosUsuario.create({
          idCurso: request.input('idCurso'),
          idUsuario: request.input('idUsuario'),
          estatus: request.input('estatus'),
          fecha: (await this.fecha()).toString()
        })
        return modulo
    }
    
    async update ({params, request}){
        const modulo = await ModulosUsuario.findById(params.id)
        modulo!.idCurso = request.input('idCurso')
        modulo!.idUsuario = request.input('idUsuario')
        modulo!.estatus = request.input('estatus')
        modulo!.fecha = (await this.fecha()).toString()
        
        await modulo!.save() 
        return modulo
    
    }
    
    async delete ({ params }) {
        const modulo = await ModulosUsuario.findById(params.id)
        await modulo!.delete()
    }


    async fecha () {
        const datetime = new Date()
        const dateString = (new Date(datetime.getTime() - datetime.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").substr(0, 19)
        return dateString
    }

}
