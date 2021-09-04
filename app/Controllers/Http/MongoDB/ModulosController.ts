// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Modulo from 'App/Models/MongoDB/Modulo'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import ModuleValidator from 'App/Validators/ModuleValidator'

export default class ModulosController {

    async index ({params}) {
      if (params.id)
        return await Modulo.findById(params.id)
      return await Modulo.find()
    }
        
    async create ({ request, response }){
        const Image = request.file('imagen')
        await request.validate(new ModuleValidator(Image))

        if (!Image) {
          return response.abort('Not file')
        }

        const imageName = `${cuid()}.${Image.extname}`
        await Image.move(Application.tmpPath('modules_photos'), {
          name: imageName
        })

        const Files = request.files('archivos')
        await request.validate(new ModuleValidator(Files))

        if (!Files) {
          return response.abort('Not file')
        }

        let files: [{nombreAlmacenado: string, nombreUsuario: string, tipoArchivo: string, path: string, tamaño: string }] = [{nombreAlmacenado: '0', nombreUsuario:'0', tipoArchivo:'0', path:'0', tamaño:'0'}]
        
        for (let file of Files) {
          const fileName = `${cuid()}.${file.extname}`
          await file.move(Application.tmpPath('modules_files'), {
            name: fileName
          })
          files.push({nombreAlmacenado: fileName, nombreUsuario: file.clientName, tipoArchivo: file.extname, path: file.filePath, tamaño: file.size/1000 + ' KB'})
        }
        files.shift()
          
        const modulo = await Modulo.create({
          idCurso: request.input('idCurso'),
          nombre: request.input('nombre'),
          imagen: imageName,
          archivos: files
        })
        return modulo
      }
    
    async update ({params, request}){
      const modulo = await Modulo.findById(params.id)
      modulo!.idCurso = request.input('idCurso')
      modulo!.nombre = request.input('nombre')
        
      return await modulo!.save() 
    }
    
    async delete ({ params }) {
        const modulo = await Modulo.findById(params.id)
        await modulo!.delete()
    }

    async updateImage ({params, request, response}){
      const Image = request.file('imagen')
      await request.validate(new ModuleValidator(Image))
      
      if (!Image) {
        return response.abort('Not file')
      }

      const imageName = `${cuid()}.${Image.extname}`
      await Image.move(Application.tmpPath('modules_photos'), {
        name: imageName
      })

      const modulo = await Modulo.findById(params.id)
      modulo!.imagen = imageName
          
      return await modulo!.save() 
    
    }

    async addFile ({ params, request, response }) {
      const Files = request.files('archivos')
      await request.validate(new ModuleValidator(Files))
      
      if (!Files) {
        return response.abort('Not file')
      }
        
      const modulo = await Modulo.findById(params.id)
      const files = modulo!.archivos

      for (let file of Files) {
        const fileName = `${cuid()}.${file.extname}`
        await file.move(Application.tmpPath('modules_files'), {
          name: fileName
        })
        files.push({nombreAlmacenado: fileName, nombreUsuario: file.clientName, tipoArchivo: file.extname, path: file.filePath, tamaño: file.size/1000 + ' KB'})
      }

      modulo!.archivos = files
      return await modulo!.save() 
    }

    async updateFile ({params, request, response}){
      const File = request.file('archivos')
      await request.validate(new ModuleValidator(File))

      if (!File) {
        return response.abort('Not file')
      }

      const fileName = `${cuid()}.${File.extname}`
      await File.move(Application.tmpPath('modules_files'), {
          name: fileName
      })
      
      const modulo = await Modulo.findById(params.id)
      const files = modulo!.archivos

      for(let i in files) {
          if (i == params.indice) {
            for (let file of File) {
              files[i] = {nombreAlmacenado: fileName, nombreUsuario: file.clientName, tipoArchivo: file.extname, path: file.filePath, tamaño: file.size/1000 + ' KB'}
            }
          }
          modulo!.archivos = files
      }
      return await modulo!.save() 
    }

    async deleteFile ({params}){
      const modulo = await Modulo.findById(params.id)
      const files = modulo!.archivos

      for(let i in files) {
          if (i == params.indice)
            files.splice(parseInt(i), 1)
          modulo!.archivos = files
      }
      return await modulo!.save() 
    }
}

