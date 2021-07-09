import mongoose from 'mongoose'

type Producto = {
  id: string
  producto: string
  imagen: [string]
  precio: number
  talla: [string]
  color: [string]
  descripcion: [string]
  cantidad: number
}

const ProductoSchema = new mongoose.Schema<Producto>({
  producto: String,
  imagen: [String],
  precio: Number,
  talla: [String],
  color: [String],
  descripcion: [String],
  cantidad: Number,
})

export default mongoose.model<Producto>('Productos', ProductoSchema)