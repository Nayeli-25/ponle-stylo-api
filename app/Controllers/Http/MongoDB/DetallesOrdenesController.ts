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
          idCodDescuento: request.input('idCodDescuento'),
          direccion: request.input('direccion'),
          municipio: request.input('municipio'),
          estado: request.input('estado'),
          codigoPostal: request.input('codigoPostal'),
          numeroTelefono: request.input('numeroTelefono')
        })
        return orden
    }
    
    async update ({params, request}){
        const orden = await DetallesOrden.findById(params.id)
        orden!.idOrden = request.input('idOrden')
        orden!.idProducto = request.input('idProducto')
        orden!.cantidadProductos = request.input('cantidadProductos')
        orden!.idCodDescuento = request.input('idCodDescuento')
        orden!.direccion = request.input('direccion')
        orden!.municipio = request.input('municipio')
        orden!.estado = request.input('estado')
        orden!.codigoPostal = request.input('codigoPostal')
        orden!.numeroTelefono = request.input('numeroTelefono')
        
        await orden!.save() 
        return orden
    
    }
    
    async delete ({ params }) {
        const orden = await DetallesOrden.findById(params.id)
        await orden!.delete()
    }

    async numeroArticulos ({ params }) {
            const ordenes = await DetallesOrden.aggregate([
                { $addFields: {
                        idOrden: { $toObjectId: "$idOrden" }
                    }
                }, 
                { $lookup: {
                    from: 'ordenes',
                    localField: 'idOrden',
                    foreignField: '_id',
                    as: 'Orden'
                    }
                }, 
                { $group: {
                    _id: '$idOrden',
                    NumeroArticulos: { $sum: '$cantidadProductos' }
                    }
                }
            ])

            for(let i in ordenes) {
                if (ordenes[i]._id == params.id)
                    return ordenes[i].NumeroArticulos
          }
    }
}
