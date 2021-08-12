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

  async delete({request}){

    const data = request.only('name')

    if (data){
      const role = await Role.findByOrFail('name', data)

      await role.delete()
      return [200, 'deleted']
    }
    return [404, 'Not role found']

  }

  async assignRole({request}){
    const data = request.only(['email', 'role'])
    const user = await User.findByOrFail('email', data['email'])
    const role = await Role.findByOrFail('name', data['role'])
    if(!this.checkRole(user, role)) return [400, 'Dup Entry']
    await user.related('roles').save(role)
  }

  async checkRole(user, role){
    var role_names = [String()]
    const roles = await user?.related('roles').query()
    if (roles){
      for (var i = 0; i < roles!.length; i++) {
        let rol = roles![i] //Este codigo es para sacar los roles del usuario
        let rol2 = rol['$original']
        role_names.push(rol2['name'])
      }
      if(!role_names.includes(role)) return false
      return true
    }
    return false
  }

}
