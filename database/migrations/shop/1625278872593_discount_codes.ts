import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DiscountCodes extends BaseSchema {
  protected tableName = 'discount_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('users.id').onDelete('CASCADE')
      table.integer('discount')
      table.string('discount_code')

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
