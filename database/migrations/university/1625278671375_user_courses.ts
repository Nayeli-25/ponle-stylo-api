import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserCourses extends BaseSchema {
  protected tableName = 'user_courses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id')
      table.integer('course_id').unsigned().references('courses.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
