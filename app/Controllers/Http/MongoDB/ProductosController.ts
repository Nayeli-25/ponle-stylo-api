// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/MongoDB/Producto'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import ProfilePhotoValidator from 'App/Validators/ProfilePhotoValidator'

export default class ProductosController {
    async index ({params}) {
        if (params.id)
            return await Producto.findById(params.id)
        return await Producto.find()
    }
        
    async create ({ request, response }){
        const Images = request.files('imagenes')
        await request.validate(new ProfilePhotoValidator(Images))
        
        if (!Images) {
          return response.abort('Not file')
        }

        let files: string[] = ['0']
        
        for (let image of Images) {
          const fileName = `${cuid()}.${image.extname}`
          await image.move(Application.tmpPath('products_photos'), {
            name: fileName
          })
          files.push(fileName)
        }
        files.shift()

        const producto = await Producto.create({
            producto: request.input('producto'),
            imagenes: files,
            talla: request.input('talla'),
            color: request.input('color'),
            descripcion: request.input('descripcion'),
            cantidad: request.input('cantidad'),
        })
        return producto
    }
    
    async update ({params, request}){

      const producto = await Producto.findById(params.id)
      producto!.producto = request.input('producto')
      producto!.talla = request.input('talla')
      producto!.color = request.input('color')
      producto!.descripcion = request.input('descripcion')
      producto!.cantidad = request.input('cantidad')
        
      return await producto!.save() 
    
    }
    
    async delete ({ params }) {
        const producto = await Producto.findById(params.id)
        await producto!.delete()
    }

    async addImage ({ params, request, response }) {
      const Images = request.files('imagenes')
      await request.validate(new ProfilePhotoValidator(Images))
      
      if (!Images) {
        return response.abort('Not file')
      }
        
      const producto = await Producto.findById(params.id)
      const files = producto!.imagenes

      for (let image of Images) {
        const fileName = `${cuid()}.${image.extname}`
        await image.move(Application.tmpPath('products_photos'), {
          name: fileName
        })
        files.push(fileName)
      }

      producto!.imagenes = files
      return await producto!.save() 
    }

    async updateImage ({params, request, response}){
      const Image = request.file('imagenes')
      await request.validate(new ProfilePhotoValidator(Image))

      if (!Image) {
        return response.abort('Not file')
      }

      const fileName = `${cuid()}.${Image.extname}`
      await Image.move(Application.tmpPath('products_photos'), {
          name: fileName
        })
      
      const producto = await Producto.findById(params.id)
      const files = producto!.imagenes
      for(let i in files) {
          if (i == params.indice)
            files[i] = fileName
          producto!.imagenes = files
      }
      return await producto!.save() 
    }

    async deleteImage ({params}){

      const producto = await Producto.findById(params.id)
      const files = producto!.imagenes
      for(let i in files) {
          if (i == params.indice)
            files.splice(parseInt(i), 1)
          producto!.imagenes = files
      }
      return await producto!.save() 
    }
}
    
