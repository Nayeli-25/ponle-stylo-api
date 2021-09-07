import mongoose from 'mongoose'

type Orden = {
  id: string
  idUsuario: string
  fecha: string
  direccion: string
  municipio: string
  estado: string
  codigoPostal: number
  numeroTelefono: number
  idCodDescuento: string
  estatus: string
  stripeId: string
}

const OrdenSchema = new mongoose.Schema<Orden>({
  idUsuario: String,
  fecha: String,
  direccion: String,
  municipio: String,
  estado: String,
  codigoPostal: Number,
  numeroTelefono: Number,
  idCodDescuento: String,
  estatus: String,
  stripeId: String
})

export default mongoose.model<Orden>('Ordenes', OrdenSchema)