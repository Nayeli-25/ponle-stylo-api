// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from "App/Models/SQL/Role"
import User from "App/Models/SQL/User"

export default class RolesController {

  //Create roles
  async create({request, response}){

    const data = request.only('name')
    let roleData = {
      name: data['name']
    }

    try {
      await Role.create(roleData)
      return response.created()
    } catch (error) {
      return response.abort(error)
    }
  }

  async assignRole({request}){
    const data = request.only(['email', 'role'])

    const user = await User.findByOrFail('email', data['email'])

    const role = await Role.findByOrFail('name', data['role'])

    const rolUs = await user.related('roles').save(role)
  }

}
