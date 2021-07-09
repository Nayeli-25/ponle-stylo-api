import mongoose from 'mongoose'

type ComentariosUsuario = {
  idComentario: string
  idUsuario: string
  fecha: string
}

const ComentariosUsuarioSchema = new mongoose.Schema<ComentariosUsuario>({
  idComentario: String,
  idUsuario: String,
  fecha: String
})

export default mongoose.model<ComentariosUsuario>('ComentariosUsuarios', ComentariosUsuarioSchema)