import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public file: string

  @column()
  public discount: bigint

  @column()
  public price: bigint

  @column()
  public description: string

  @column()
  public name: string

  @column()
  public type: string

  @column.date()
  public start_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
