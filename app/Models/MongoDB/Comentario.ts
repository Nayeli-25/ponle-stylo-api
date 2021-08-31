import mongoose from 'mongoose'

type Comentario = {
  id: string
  estatus: string
  comentario: string
  idUsuario: string
  idPublicacion: string
  fecha: string
}

const ComentarioSchema = new mongoose.Schema<Comentario>({
  estatus: String,
  comentario: String,
  idUsuario: String,
  idPublicacion: String,
  fecha: String
})

export default mongoose.model<Comentario>('Comentarios', ComentarioSchema)