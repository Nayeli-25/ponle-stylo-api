// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Size from 'App/Models/SQL/Size'

export default class SizesController {
  async store({ request, response }) {
    const data = request.only('name')

    if (data['name']) {
      if (await Size.create(data)) return response.created({
        message: 'Created'
      })
      return response.abort({
        message: 'Invalid Data'
      })
    }

    return response.abort({
      message: 'Invalid Data'
    })
  }

  async index() {
    const categories = await Size.all()
    return categories
  }

  async update({ request, response }) {
    const data = request.only(['name','newName'])

    if (data['name']) {
      const cat = await Size.findByOrFail('name', data['name'])

      try {
        cat.name = data['newName']
        await cat.save()
        return response.ok({
          message: 'Updated'
        })
      } catch (error) {
        return response.abort({
          message: 'Invalid Data'
        })
      }

    }
    return response.abort({
      message: 'Invalid Data'
    })
  }

  async delete({ request,response }) {
    const data = request.only('name')
    if (data['name']) {
      const category = await Size.findByOrFail('name', data['name'])
      await category.delete()
      return response.ok({
        message: 'Deleted'
      })
    }
    return response.abort({
      message: 'Invalid Data'
    })
  }
}
