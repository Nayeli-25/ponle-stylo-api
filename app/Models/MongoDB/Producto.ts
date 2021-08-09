import mongoose from 'mongoose'

type Producto = {
  id: string
  producto: string
  imagenes: [string]
  talla: [string]
  color: [string]
  descripcion: [string]
  cantidad: number
}

const ProductoSchema = new mongoose.Schema<Producto>({
  producto: String,
  imagenes: [String],
  talla: [String],
  color: [String],
  descripcion: [String],
  cantidad: Number
})

export default mongoose.model<Producto>('Productos', ProductoSchema)