import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response  }: HttpContextContract) {
    try {
      // Recupera os dados enviados pelo cliente
      const data = request.only(['name', 'email', 'password', 'gender', 'image', 'age'])

      // Cria um novo usuário no banco de dados
      const user = await User.create(data)

      return user
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
