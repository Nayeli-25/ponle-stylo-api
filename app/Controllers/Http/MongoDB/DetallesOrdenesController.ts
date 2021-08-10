// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetallesOrden from 'App/Models/MongoDB/Detalles_Orden'
import DiscountCode from 'App/Models/SQL/DiscountCode'

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
          idPublicacion: request.input('idPublicacion'),
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
    
    async update ({params, request}) {
        const orden = await DetallesOrden.findById(params.id)
        orden!.idOrden = request.input('idOrden')
        orden!.idPublicacion = request.input('idPublicacion')
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

    async total ({ params }) {
        const monto = await DetallesOrden.aggregate([
            { $addFields: {
                idPublicacion: { $toObjectId: "$idPublicacion" }
              }
            }, 
            { $lookup: {
                from: 'publicaciones',
                localField: 'idPublicacion',
                foreignField: '_id',
                as: 'productos'
              }
            }, 
            { $unwind: {
                path: '$productos',
                preserveNullAndEmptyArrays: false
              }
            }, 
            { $addFields: {
                costoProducto: {$subtract: ['$productos.precio', {$multiply: [{$multiply:['$productos.descuento', 0.01]},'$productos.precio']}]}
              }
            }, 
            { $addFields: {
                costoProductos: {$multiply: ['$costoProducto', '$cantidadProductos']}
              }
            }, 
            { $group: {
                _id: '$idOrden',
                subtotal: {
                  $sum: '$costoProductos'
                }
              }
            }
        ])
        let idCodigo = await DetallesOrden.where('idCodDescuento', params.codigo)

        for(let i in monto) {  
          if (monto[i]._id == params.id) {
            if (idCodigo) {        
              const codigo = await DiscountCode.find(params.codigo)  
              const total = monto[i].subtotal - (monto[i].subtotal * (codigo!.discount * 0.01))
              return total.toFixed(2)
            }
            return monto[i].subtotal
          } 
        }
    }
}
