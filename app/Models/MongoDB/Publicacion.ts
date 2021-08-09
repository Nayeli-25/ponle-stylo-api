import mongoose from 'mongoose'

type Publicacion = {
  id: string
  idProducto: string
  precio: number
  descuento: number
  calificacion: number
  estatus: string
  fecha: string
}

const PublicacionSchema = new mongoose.Schema<Publicacion>({
  idProducto: String,
  precio: Number,
  descuento: Number,
  calificacion: Number,
  estatus: String,
  fecha: String
})

export default mongoose.model<Publicacion>('Publicaciones', PublicacionSchema)