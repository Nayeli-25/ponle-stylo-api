import mongoose from 'mongoose'

type DetallesOrden = {
  id: string
  idOrden: string
  idPublicacion: string
  cantidadProductos: number
}

const DetallesOrdenSchema = new mongoose.Schema<DetallesOrden>({
  idOrden: String,
  idPublicacion: String,
  cantidadProductos: Number
})

export default mongoose.model<DetallesOrden>('Detalles_Ordenes', DetallesOrdenSchema)