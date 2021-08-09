// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Mail from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/SQL/User'

export default class AuthController {
  async login({ request, auth, response }) {
    const email = request.input('email')
    const password = request.input('password')
    //if (await this.checkVerification(email)){
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
      })
      return token
    } catch (error) {
      return response.badRequest(error)
    }
    //}else{
    // return response.abort('Email Not verified', 403)
    //}
  }

  async logout({ auth }) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
  async forgotPassword({ request  }){

    let email = request.only('email')
    const user = await User.findByOrFail('email', email['email'])
    let newCode = await this.generateResetCode(1000, 9999)
    user.resetCode = newCode
    await user.save()
    const html = await View.render('mails/reset_password', {
      code: user.resetCode
    })

    await Mail.use('ses').send((message) => {
      message
        .from('angelj.dtv@gmail.com')
        .to('angeldtvv@gmail.com')
        .subject('Solicitud de cambio de contraseña')
        .html(html)
    })


  }

  async confirmCode({ request, auth }) {
    let data = request.only(['email', 'reset_code'])

    const user = await User.findByOrFail('email', data['email'])

    if(user.resetCode === data['reset_code']){
      const token = await auth.use('api').generate(user, {
        expiresIn: '30mins'
      })
      return token
    }else{
      return ['Invalid Code', 401]
    }
  }

  async checkVerification(email) {
    const user = await User.findBy('email', email)
    if (user?.isVerified == false) {
      return false
    } else {
      return true
    }
  }

  async confirmEmail({ params, response }) {
    const user = await User.findByOrFail('confirmation_token', params.token)

    user.confirmationToken = ''
    user.isVerified = true

    await user?.save()
    response.redirect().toPath('https://www.facebook.com/')
  }

  async generateResetCode(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

}
