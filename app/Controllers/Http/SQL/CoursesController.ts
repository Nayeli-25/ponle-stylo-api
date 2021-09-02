// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Course from 'App/Models/SQL/Course'
import Application from '@ioc:Adonis/Core/Application'
const fs = require('fs')

export default class CoursesController {
  async store({ request, response }) {
    const file = request.file('file')
    const fileName = file ? `${cuid()}.${file.extname}` : null
    if (!fileName) {
      return response.abort({
        message: 'Invalid Credentials',
      })
    }
    await file.move(Application.tmpPath('courses_files'), {
      name: fileName,
    })

    const data = request.body()

    try {
      await Course.create({
        file: fileName,
        name: data['name'],
        discount: data['discount'],
        price: data['price'],
        description: data['description'],
        type: data['type'],
        start_date: data['start_date']
      })
      return response.created({
        message: 'Course created',
      })
    } catch (error) {
      return response.abort({
        message: 'Invalid Credentials',
      })
    }
  }

  async index({ params, response }) {
    const data = params.id ? params.id : null

    if (!data) {
      return response.ok(await Course.all())
    }
    try {
      const course = Course.findOrFail(data)
      return response.ok(course)
    } catch (error) {
      return response.abort({
        message: 'Bad Request',
      })
    }
  }

  async update({ params, request, response }) {
    const data = params.id ? params.id : null
    if (!data) {
      return response.abort({
        message: 'Bad Request',
      })
    }
    const course = await Course.firstOrFail(params.id)

    const json = request.body()
    if (request.file('file')) {
      const file = request.file('file')
      const fileName = Application.tmpPath('courses_files/' + course.file)
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })
      const newFile = `${cuid()}.${file.extname}`
      await file.move(Application.tmpPath('courses_files'), {
        name: newFile,
      })
      course.file = newFile
    }
    course.name = json['name'] ? json['name'] : course.name
    course.discount = json['discount'] ? json['discount'] : course.discount
    course.price = json['price'] ? json['price'] : course.price
    course.description = json['description'] ? json['description'] : course.description
    course.type = json['type'] ? json['type'] : course.type
    course.start_date = json['start_date'] ? json['start_date'] : course.start_date
    await course.save()
  }

  async delete({ params, response }) {
    const data = params.id ? params.id : null

    if (!data) {
      return response.abort({
        message: 'Bad Request',
      })
    }
    const course = Course.findOrFail(data)
    ;(await course).delete()
  }
}
