import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken';
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
  public async login({ request }: HttpContextContract){
    const { email, password } = request.all()

      // Verifica se o usuário existe no banco de dados
      const user = await User.findBy('email', email)
      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado.',
        }
      }

      // Verifica se a senha fornecida é válida
      const passwordValid = await Hash.verify(user.password, password)
      if (!passwordValid) {
        return {
          success: false,
          message: 'Senha incorreta.',
        }
      }
      const token = jwt.sign(email, password);
      
      return {
        token,
      }
  }
  public async dadosUsuario({ auth, response }: HttpContextContract) {
    try {
      // Obtém o usuário autenticado a partir do token
      const user = auth.user!
      // Retorna os dados do usuário
      return response.json({
        email: user.email,
        age: user.age,
        name: user.name,
        gender: user.gender,
        image: user.image,
      })
    } catch (error) {
      // Trata os erros da requisição
      return response.status(500).json({
        message: 'Erro ao obter os dados do usuário',
      })
    }
  }
}
