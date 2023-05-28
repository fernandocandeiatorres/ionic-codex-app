import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {v4 as uuidv4} from 'uuid'
import Application  from '@ioc:Adonis/Core/Application'

export default class AuthController {
  private validation= {
    types:["images"],
    size: "20mb"
  }
  public async register({ request, response  }: HttpContextContract) {
    try {
      // Recupera os dados enviados pelo cliente
      const data = request.body()

      const image = request.file('image',this.validation)

      if(image){
        const imageName = uuidv4() + "." + image.extname

        await image.move(Application.tmpPath('uploads'),{
          name: imageName
        })
        data.image = imageName
      }
      // Cria um novo usuário no banco de dados
      const user = await User.create(data)

      return {
        user,
      }
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao criar a conta' })
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const userId = params.id
      const data = request.only(['name', 'email', 'password', 'gender', 'image', 'age'])
  
      const user = await User.findOrFail(userId)
      user.merge(data)
      await user.save()
  
      return user
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar a conta' })
    }
  }
}
