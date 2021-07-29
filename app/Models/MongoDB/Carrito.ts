import mongoose from 'mongoose'

type Carrito = {
  id: string
  idUsuario: string
  productos: [{idProducto : string, cantidad: number }]
}

const CarritoSchema = new mongoose.Schema<Carrito>({
  idUsuario: String,
  productos: [{idProducto : String, cantidad: Number }]
})

export default mongoose.model<Carrito>('Carritos', CarritoSchema)