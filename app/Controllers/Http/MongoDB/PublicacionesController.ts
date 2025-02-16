// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacion from 'App/Models/MongoDB/Publicacion'
import Producto from 'App/Models/MongoDB/Producto'

export default class PublicacionesController {

    async index ({params}) {
        if (params.id) {
            const publicacion = await Publicacion.findById(params.id)
            return publicacion
        }
        const publicaciones = await Publicacion.find()
        return publicaciones
    }
        
    async create ({ request, response }){
        await Producto.aggregate([
            { $addFields: {_id: { $toString: '$_id'} } }
        ])
        const producto = await Producto.findById(request.input('idProducto'))
        if (!!producto  == true) {
            const publicacion = await Publicacion.create({
                idProducto: request.input('idProducto'),
                precio: request.input('precio'),
                descuento: request.input('descuento'),
                calificacion: request.input('calificacion'),
                estatus: request.input('estatus'),
                fecha: (await this.fecha()).toString()
            })
            return publicacion
        }
        return response.abort({
            message: 'Producto inválido'
        }) 
    }
    
    async update ({params, request, response}){
        await Producto.aggregate([
            { $addFields: {_id: { $toString: '$_id'} } }
        ])
        const producto = await Producto.findById(request.input('idProducto'))
        if (!!producto  == true) {
            const publicacion = await Publicacion.findById(params.id)
            publicacion!.idProducto = request.input('idProducto')
            publicacion!.precio = request.input('precio')
            publicacion!.descuento = request.input('descuento')
            publicacion!.calificacion = request.input('calificacion')
            publicacion!.estatus = request.input('estatus')
            publicacion!.fecha = (await this.fecha()).toString()
        
            await publicacion!.save() 
            return publicacion
        }
        return response.abort({
            message: 'Producto inválido'
        }) 
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

    async recientes () {
        const recientes =  await Publicacion.where( { 'estatus': 'activo' } ).sort( {'fecha': -1 } ).limit(15)
        return recientes
    }

    async destacados () {
        const destacados =  await Publicacion.where( { 'estatus': 'activo' } ).sort( {'calificacion': -1 } ).limit(15)
        return destacados
    }
}