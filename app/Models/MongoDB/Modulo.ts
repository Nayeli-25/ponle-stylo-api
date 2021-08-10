import mongoose from 'mongoose'

type Modulo = {
  id: string
  idCurso: string
  nombre: string
  imagen: string
  archivos: [{nombreAlmacenado: string, nombreUsuario : string, tipoArchivo: string, path: string, tamaño: string }]
}

const ModuloSchema = new mongoose.Schema<Modulo>({
  idCurso: String,
  nombre: String,
  imagen: String,
  archivos: [{nombreAlmacenado: String, nombreUsuario: String, tipoArchivo: String, path: String, tamaño: String }]
})

export default mongoose.model<Modulo>('Modulos', ModuloSchema)