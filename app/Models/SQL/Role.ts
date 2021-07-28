import User from './User'
import { BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => User)
  public user: ManyToMany<typeof User>

}
