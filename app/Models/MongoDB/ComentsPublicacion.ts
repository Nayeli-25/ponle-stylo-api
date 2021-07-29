import mongoose from 'mongoose'

type ComentariosPublicacion = {
  idComentario: string
  idPublicacion: string
  fecha: string
}

const ComentariosPublicacionSchema = new mongoose.Schema<ComentariosPublicacion>({
  idComentario: String,
  idPublicacion: String,
  fecha: String
})

export default mongoose.model<ComentariosPublicacion>('Comentarios_Publicaciones', ComentariosPublicacionSchema)