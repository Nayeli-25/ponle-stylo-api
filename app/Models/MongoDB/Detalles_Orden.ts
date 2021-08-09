import mongoose from 'mongoose'

type DetallesOrden = {
  id: string
  idOrden: string
  idPublicacion: string
  cantidadProductos: number
  idCodDescuento: string
  direccion: string
  municipio: string
  estado: string
  codigoPostal: number
  numeroTelefono: number
}

const DetallesOrdenSchema = new mongoose.Schema<DetallesOrden>({
  idOrden: String,
  idPublicacion: String,
  cantidadProductos: Number,
  idCodDescuento: String,
  direccion: String,
  municipio: String,
  estado: String,
  codigoPostal: Number,
  numeroTelefono: Number
})

export default mongoose.model<DetallesOrden>('Detalles_Ordenes', DetallesOrdenSchema)