// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/SQL/Category'

export default class CategoriesController {
  async store({ request, response }) {
    const data = request.only(['name', 'gender'])

    if (data['name'] && data['gender']) {
      if (await Category.create(data)) return response.created({
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
    const categories = await Category.all()
    return categories
  }

  async update({ request, response }) {
    const data = request.only(['name', 'newGender', 'newName'])

    if (data['name']) {
      const cat = await Category.findByOrFail('name', data['name'])
      if (data['gender']) {
        cat.name = data['newName']
        cat.gender = data['gender']

        await cat.save()
        return response.created({
          message: 'Updated'
        })
      }
      cat.name = data['newName']
      await cat.save()
      return response.created({
        message: 'Updated'
      })
    }
    return response.abort({
      message: 'Invalid Data'
    })
  }

  async delete({request,response}){
    const data = request.only('name')
    if(data['name']){
      const category = await Category.findByOrFail('name', data['name'])
      await category.delete()
      return response.created({
        message: 'Updated'
      })
    }
    return response.abort({
      message: 'Invalid Data'
    })
  }
}
