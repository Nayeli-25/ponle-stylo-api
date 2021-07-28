// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/SQL/User"




export default class AuthController {

  async login({request, auth, response}){
    const email = request.input('email')
    const password = request.input('password')
    if (await this.checkVerification(email)){
      try {
        const token = await auth.use('api').attempt(email, password, {
          expiresIn: '30mins'
        })
        return token
      } catch (error) {
        return response.badRequest(error)
      }
    }else{
      return response.abort('Email Not verified', 403)
    }

  }

  async logout({ auth }){

    await auth.use('api').revoke()
    return{
      revoked: true
    }

  }

  async checkVerification(email){
    const user = await User.findBy('email', email)
    if (user?.isVerified == false){
      return false
    }else{
      return true
    }
  }

  async confirmEmail({ params }){

    const user = await User.findByOrFail('confirmation_token', params.token)


    user.confirmationToken = ''
    user.isVerified = true

    await user?.save()
  }




}
