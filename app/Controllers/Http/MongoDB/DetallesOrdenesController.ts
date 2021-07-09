// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetallesOrden from 'App/Models/MongoDB/Detalles_Orden'

export default class DetallesOrdenesController {

    async index ({params}) {
        if (params.id) {
            const orden = await DetallesOrden.findById(params.id)
            return orden
        }
        const ordenes = await DetallesOrden.find()
        return ordenes
    }
        
    async create ({ request }){
        const orden = await DetallesOrden.create({
          idOrden: request.input('idOrden'),
          idProducto: request.input('idProducto'),
          cantidadProductos: request.input('cantidadProductos'),
          idCodDescuento: request.input('idCodDescuento')
        })
        return orden
    }
    
    async update ({params, request}){
        const orden = await DetallesOrden.findById(params.id)
        orden!.idOrden = request.input('idOrden')
        orden!.idProducto = request.input('idProducto')
        orden!.cantidadProductos = request.input('cantidadProductos')
        orden!.idCodDescuento = request.input('idCodDescuento')
        
        await orden!.save() 
        return orden
    
    }
    
    async delete ({ params }) {
        const orden = await DetallesOrden.findById(params.id)
        await orden!.delete()
    }
}
