import mongoose from 'mongoose'

type Comentario = {
  id: string
  estatus: string
  comentario: string
}

const ComentarioSchema = new mongoose.Schema<Comentario>({
  estatus: String,
  comentario: String
})

export default mongoose.model<Comentario>('Comentarios', ComentarioSchema)