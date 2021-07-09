import mongoose from 'mongoose'

type Carrito = {
  id: string
  idUsuario: string
  productos: [string]
  cantidad: number
}

const CarritoSchema = new mongoose.Schema<Carrito>({
  idUsuario: String,
  productos: [String],
  cantidad: Number
})

export default mongoose.model<Carrito>('Carritos', CarritoSchema)