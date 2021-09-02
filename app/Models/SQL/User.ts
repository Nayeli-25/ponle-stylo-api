import { DateTime } from 'luxon'
import Role from 'App/Models/SQL/Role'
import DiscountCode from './DiscountCode'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasOne,
  hasOne,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profilePhoto: string | null

  @column()
  public phoneNumber: bigint

  @column.date()
  public birthday: DateTime

  @hasOne(() => DiscountCode)
  public discount: HasOne<typeof DiscountCode>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Course)
  public courses: ManyToMany<typeof Course>

  @column()
  public rememberMeToken?: string

  @column()
  public isVerified?: boolean

  @column()
  public confirmationToken?: string

  @column()
  public resetCode?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
