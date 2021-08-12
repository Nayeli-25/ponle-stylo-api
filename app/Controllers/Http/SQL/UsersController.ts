//import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/SQL/User'
import AuthController from './AuthController'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import { uid } from 'rand-token'
import Mail from '@ioc:Adonis/Addons/Mail'
import ProfilePhotoValidator from 'App/Validators/ProfilePhotoValidator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
const fs = require('fs')

export default class UsersController {
  async create({ request, response }) {
    const Image = request.file('profile_photo')

    await request.validate(new ProfilePhotoValidator(Image))

    const fileName = Image ? `${cuid()}.${Image.extname}` : null

    if (fileName) {
      await Image.move(Application.tmpPath('profile_photos'), {
        name: fileName,
      })
    }

    let data = request.only(['name', 'lastname', 'email', 'password', 'password_confirmation'])
    await request.validate(new CreateUserValidator(data))
    const token = uid(40)
    let auth = new AuthController()
    let code = await auth.generateResetCode(1000, 9999)

    let userData = {
      name: data['name'],
      lastname: data['lastname'],
      email: data['email'],
      password: data['password'],
      profilePhoto: fileName,
      resetCode: code,
      isVerified: false,
      confirmationToken: token,
    }

    try {
      await User.create(userData)
      this.sendVerificationEmail(token)
      return response.created(data['email'])
    } catch (error) {
      return response.abort(error)
    }
  }

  async read({ request }) {
    const data = request.body()
    //cambio

  }

  async updatePassword({request, auth}){
    const data = request.only(['password', 'password_confirmation'])
    const user = await auth.user

    if(data['password'] != data['password_confirmation']){
      return ['Invalid password', 400]
    }

    user.password = data['password']
    await user.save()
  }

  async update({ auth, request, response }) {
    const user = auth.user
    const data = request.all()
    if (data['name']) {
      user.name = data['name']
      await user.save()
    } else if (data['lastname']) {
      user.lastname = data['lastname']
      await user.save()
    } else if (request.file('profile_photo')) {
      if (!user.profilePhoto) {
        console.log('no tiene imagen')

        const Image = request.file('profile_photo')
        if (!Image) {
          return response.abort('Not file')
        }
        await request.validate(new ProfilePhotoValidator(Image))
        const fileName = `${cuid()}.${Image.extname}`
        await Image.move(Application.tmpPath('profile_photos'), {
          name: fileName,
        })
        user.profilePhoto = fileName
        user.save()
        return response.created()
      } else {
        console.log('Si tiene imagen')
        const fileName = Application.tmpPath('profile_photos/' + user.profilePhoto)

        const Image = request.file('profile_photo')
        if (!Image) {
          return response.abort('Not file')
        }
        await request.validate(new ProfilePhotoValidator(Image))
        fs.unlink(fileName, (err) => {
          if (err) {
            console.error(err)
            return
          }

          //file removed
        })
        //file removed
        const file = `${cuid()}.${Image.extname}`
        await Image.move(Application.tmpPath('profile_photos'), {
          name: file,
        })
        user.profilePhoto = file
        user.save()
      }
    }
  }

  async delete({ params, auth }) {
    if (!params.email) {
      const user = auth.user
      await user.delete()
      return ['User Deleted', 201]
    }

    const user = await User.findByOrFail('email', params.email)
    try {
      await user.delete()
      return ['User Deleted', 201]
    } catch (error) {
      return ['Couldnt delete this user', 404]
    }


  }

  public async getfoto({ params, response }) {
    const user = await User.find(params.id)
    const filePath = Application.tmpPath('profile_photos/' + user?.profilePhoto)
    response.download(filePath)
  }

  public async sendVerificationEmail(token) {
    await Mail.use('ses').send((message) => {
      message
        .from('angelj.dtv@gmail.com')
        .to('nayeliesquivelluna@gmail.com')
        .subject('Verificar Email')
        .text(
          'Accede al siguiente link para verificar tu email: http://127.0.0.1:3333/confirmEmail/' +
            token
        )
    })
  }
}
