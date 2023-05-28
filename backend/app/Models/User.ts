import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public gender: string

  @column()
  public image: string | null

  @column()
  public age: number

  @column()
  public rememberMeToken: string | null

  @beforeSave()
  public static async hashPassword(user: User){
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}