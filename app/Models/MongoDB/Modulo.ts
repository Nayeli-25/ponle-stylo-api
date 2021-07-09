import mongoose from 'mongoose'

type Modulo = {
  id: string
  idCurso: string
  nombre: string
  imagen: [string]
  archivo: [{nombre : string, tipoArchivo: string, path: string, tamaño: string }]
}

const ModuloSchema = new mongoose.Schema<Modulo>({
  idCurso: String,
  nombre: String,
  imagen: [String],
  archivo: [{nombre : String, tipoArchivo: String, path: String, tamaño: String }]
})

export default mongoose.model<Modulo>('Modulos', ModuloSchema)