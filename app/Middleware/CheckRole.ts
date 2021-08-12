import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class CheckRole {
  public async handle({ request, auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.user
    const roles = await user?.related('roles').query()
    var role_names = [String()]

    if (roles){
      for (var i = 0; i < roles!.length; i++) {
        let rol = roles![i] //Este codigo es para sacar los roles del usuario
        let rol2 = rol['$original']
        role_names.push(rol2['name'])
      }
    }else{
      role_names.push('Usuario')
    }

    //const roles = await Database.query().from('roles').select('name').where('id', Database.query().from('role_user').select('role_id').where('role_user.user_id', user!.id))
    if (request.matchesRoute('users.read')) {
      if (!role_names.includes('Course')) return response.unauthorized()
    }

    await next()
  }
}
