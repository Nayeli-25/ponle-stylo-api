import mongoose from 'mongoose'

type DetallesOrden = {
  id: string
  idOrden: string
  idProducto: string
  cantidadProductos: number
  idCodDescuento: string
}

const DetallesOrdenSchema = new mongoose.Schema<DetallesOrden>({
  idOrden: String,
  idProducto: String,
  cantidadProductos: Number,
  idCodDescuento: String
})

export default mongoose.model<DetallesOrden>('DetallesOrdenes', DetallesOrdenSchema)