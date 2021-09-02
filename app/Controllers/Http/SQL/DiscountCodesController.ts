// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import DiscountCode from 'App/Models/SQL/DiscountCode'
import User from 'App/Models/SQL/User'

export default class DiscountCodesController {
  async store({ request, response }) {
    const data = request.only(['email', 'discount', 'code'])

    if (data['email'] && data['discount'] && data['code']) {
      const user = await User.findBy('email', data['email'])

      response.abortIf(!user, {
        message: 'Invalid User'
      })

      if (
        await DiscountCode.create({
          userId: user?.id,
          discount: data['discount'],
          discountCode: data['code'],
        })
      )
        return response.created({
          message: 'Discount Code Created',
        })
    }
    return response.abort({
      message: 'Invalid Request'
    })
  }

  async index({ request, response }) {
    const data = request.body()
    if (!data['code']) {
      const discountCodes = await DiscountCode.all()
      return response.ok({
        data: discountCodes
      })
    }

    try {
      const discountCode = await DiscountCode.findBy('discount_code', data['code'])
      return response.ok({
        discountCode
      })
    } catch (error) {
      return response.abort({
        message: 'Invalid Request'
      })
    }

  }

  async update({request, response}) {
    const data = request.only(['code', 'newCode'])
    if (data['code']) {
      try {
        const discountCodes = await DiscountCode.findByOrFail('discount_code', data['code'])
        discountCodes.discountCode = data['newCode']
        discountCodes.save()
        return response.ok({
          message: 'Updated'
        })
      } catch (error) {
        return response.abort({
          message: 'Invalid Request'
        })
      }


    }
  }

  async delete({request, response}) {

    const data = request.only('code')
    if (data['code']) {
      try {
        const discountCodes = await DiscountCode.findByOrFail('discount_code', data['code'])
        discountCodes.delete()
        return response.ok({
          message: 'Deleted'
        })
      } catch (error) {
        return response.abort({
          message: 'Invalid Request'
        })
      }
    }

  }
}
