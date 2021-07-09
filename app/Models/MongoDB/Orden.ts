import mongoose from 'mongoose'

type Orden = {
  id: string
  idUsuario: string
  fecha: string
}

const OrdenSchema = new mongoose.Schema<Orden>({
  idUsuario: String,
  fecha: String
})

export default mongoose.model<Orden>('Ordenes', OrdenSchema)