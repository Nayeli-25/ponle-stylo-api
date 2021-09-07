// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DetallesOrden from 'App/Models/MongoDB/Detalles_Orden'
import DiscountCode from 'App/Models/SQL/DiscountCode'
import Orden from 'App/Models/MongoDB/Orden'

//const Parser = require('expr-eval').Parser

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
        })
        return orden
    }

    async update ({params, request}) {
        const orden = await DetallesOrden.findById(params.id)
        orden!.idOrden = request.input('idOrden')
        orden!.idPublicacion = request.input('idPublicacion')
        orden!.cantidadProductos = request.input('cantidadProductos')

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

    async total ({ params, response }) {
        const detallesOrden = await DetallesOrden.aggregate([
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
                costoProductoConDescuento: {$subtract: ['$productos.precio', {$multiply: [{$multiply:['$productos.descuento', 0.01]},'$productos.precio']}]}
              }
            },
            { $addFields: {
                costoProductos: {$multiply: ['$costoProductoConDescuento', '$cantidadProductos']}
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

        const orden = await Orden.where({'idOrden': params.id})
        for(let i in detallesOrden) { 
          if (detallesOrden[i]._id == params.id) {
            let total = detallesOrden[i].subtotal
            //////////////////// Total con IVA ///////////////////////
            //let total = detallesOrden[i].subtotal + (detallesOrden[i].subtotal*0.16)
            //////////////////////////////////////////////////////////
            
            if (orden[0].idCodDescuento) {       
              const codigo = await DiscountCode.find(orden[0].idCodDescuento) 
              if (!!codigo == true)
                total = total - (total * (codigo!.discount * 0.01))
              else { 
                return response.abort({
                message: 'Código inválido'
                }) 
              }
            }
            /////////////////////////// Total + costo de envío ///////////////////////////////
            /*if (total < 300) {
              const region = await Region.where({'codigoPostal': orden[0].codigoPostal})
              total = total + region[0].costoEnvio
            }*/
            ///////////////////////////////////////////////////////////////////////////////////
            return total.toFixed(2)
          } 
        }
    }

    async ordenesSinEntregar() {
        return await DetallesOrden.where({'estatus': { $in : ['En preparación','En camino']}}).sort('estatus')
  }
}
