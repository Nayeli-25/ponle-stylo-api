// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Modulo from 'App/Models/MongoDB/Modulo'

export default class ModulosController {

    async index ({params}) {
        if (params.id) {
            const modulo = await Modulo.findById(params.id)
            return modulo
        }
        const modulos = await Modulo.find()
        return modulos
    }
        
    async create ({ request }){
        const modulo = await Modulo.create({
          idCurso: request.input('idCurso'),
          nombre: request.input('nombre'),
          imagen: request.input('imagen'),
          archivo: request.input('archivo')
        })
        return modulo
    }
    
    async update ({params, request}){
        const modulo = await Modulo.findById(params.id)
        modulo!.idCurso = request.input('idCurso')
        modulo!.nombre = request.input('nombre')
        modulo!.imagen = request.input('imagen')
        modulo!.archivo = request.input('archivo')
        
        await modulo!.save() 
        return modulo
    
    }
    
    async delete ({ params }) {
        const modulo = await Modulo.findById(params.id)
        await modulo!.delete()
    }
}
