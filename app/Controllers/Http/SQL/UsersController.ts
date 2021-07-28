
//import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/SQL/User'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import { uid } from 'rand-token';
import Mail from '@ioc:Adonis/Addons/Mail'


export default class UsersController {

  public async create({request, response}){

    const Image = request.file('profile_photo', {
      size: '2mb',
      extnames: ['jpg', 'png'],
    })
    if (!Image) {
      return response.abort('Not file')
    }
    const fileName = `${cuid()}.${Image.extname}`
    await Image.move(Application.tmpPath('profile_photos'), {
      name: fileName,
    })

    let data= request.only(['name', 'lastname', 'email', 'password'])
    const token = uid(40);

    let userData = {
      name: data['name'],
      lastname: data['lastname'],
      email: data['email'],
      password: data['password'],
      profilePhoto: fileName,
      isVerified: false,
      confirmationToken: token,
    }

    try {
      await User.create(userData)
      this.sendVerificationEmail(token)

      return response.created()
    } catch (error) {
      return response.abort(error)
    }

  }

  async read({ params }){
    if(!params.id){
      return User.all()
    }else{
      return User.find(params.id)
    }
  }

  async update({ }){




  }

  public async getfoto({params, response}){
      const user = await User.find(params.id)
      const filePath = Application.tmpPath('profile_photos/' + user?.profilePhoto)
      response.download(filePath)
  }

  public async sendVerificationEmail(token){

    await Mail.use('ses').send((message) => {
      message
      .from('angelj.dtv@gmail.com')
      .to('nayeliesquivelluna')
      .subject('Verificar Email')
      .text('Accede al siguiente link para verificar tu email: http://127.0.0.1:3333/confirmEmail/'+token)

    })
  }
}
