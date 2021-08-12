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

    if (Image) await request.validate(new ProfilePhotoValidator(Image))

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
      return response.abort({
        message: 'Invalid Credentials',
      })
    }
  }

  async read({ request, response }) {
    const data = request.only('email')
    if (data['email']) {
      try {
        const user = await User.findByOrFail('email', data['email'])
        return response.ok({
          data: user
        })

      } catch (error) {
        return response.badRequest({
          message: error
        })
      }
    }
    const user = await User.all()
    return response.ok({
      data: user
    })
  }

  async updatePassword({ request, auth }) {
    const data = request.only(['password', 'password_confirmation'])
    const user = await auth.user

    if (data['password'] != data['password_confirmation']) {
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
      if (data['lastname'] || request.file('profile_photo')) {
        if (request.file('profile_photo')) {
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
            if (data['lastname']) user.lastname = data['lastname']
            await user.save()
            return response.created({
              message: 'Updated',
            })
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

            const file = `${cuid()}.${Image.extname}`
            await Image.move(Application.tmpPath('profile_photos'), {
              name: file,
            })
            user.profilePhoto = file
            if (data['lastname']) user.lastname = data['lastname']
            await user.save()
            return response.created({
              message: 'Updated',
            })
          }
        }
        user.lastname = data['lastname']
        await user.save()
        return response.created({
          message: 'Updated',
        })
      }
      await user.save()
      return response.created({
        message: 'Updated',
      })
    }
    return response.abort({
      message: 'Invalid Data',
    })
  }

  async delete({ params, auth, response }) {
    if (!params.email) {
      const user = auth.user
      await user.delete()
      return response.ok({
        message: 'User Deleted'
      })

    }
    const user = await User.findByOrFail('email', params.email)
    console.log(user)
    try {
      await user.delete()
      return response.ok({
        message: 'User Deleted'
      })
    } catch (error) {
      return response.badRequest({
        message: error
      })
    }
  }

  public async getfoto({ params, response }) {
    const user = await User.find(params.id)
    var filePath
    if (!user?.profilePhoto) {
      filePath = Application.tmpPath('profile_photos/default/user.png')
      return response.download(filePath)
    }
    filePath = Application.tmpPath('profile_photos/' + user?.profilePhoto)
    response.download(filePath)
  }

  public async sendVerificationEmail(token) {
    await Mail.use('ses').send((message) => {
      message
        .from('angelj.dtv@gmail.com')
        .to('angeldtvv@gmail.com')
        .subject('Verificar Email')
        .text(
          'Accede al siguiente link para verificar tu email: http://127.0.0.1:3333/confirmEmail/' +
            token
        )
    })
  }
}
