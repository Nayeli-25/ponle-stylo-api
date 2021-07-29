import mongoose from 'mongoose'

type ModulosUsuario = {
  id: string
  idCurso: string
  idUsuario: string
  estatus: string
  fecha: string
}

const ModulosUsuarioSchema = new mongoose.Schema<ModulosUsuario>({
  idCurso: String,
  idUsuario: String,
  estatus: String,
  fecha: String
})

export default mongoose.model<ModulosUsuario>('Modulos_Usuarios', ModulosUsuarioSchema)