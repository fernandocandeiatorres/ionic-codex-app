import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken';
import Application  from '@ioc:Adonis/Core/Application'

export default class AuthController{
  private validation= {
    types:["images"],
    size: "20mb"
  }
  public async register({ request, response  }: HttpContextContract) {
    try {
      // Recupera os dados enviados pelo cliente
      const data = request.body()
      data.todos = ""
      data.completos = ""

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
      const data = request.only(['name', 'email', 'password', 'gender', 'image', 'age', 'todos', 'completos', 'todos', 'completos'])
  
      const user = await User.findOrFail(userId)
      await user.merge(data)
      await user.save()
  
      return user
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar a conta' })
    }
  }
  public async login({ request }: HttpContextContract) {
    const { email, password } = request.all()
  
    const user = await User.findBy('email', email)
    if (!user) {
      return {
        success: false,
        message: 'Usuário não encontrado.',
      }
    }
  
    const passwordValid = await Hash.verify(user.password, password)
    if (!passwordValid) {
      return {
        success: false,
        message: 'Senha incorreta.',
      }
    }
  
    const token = jwt.sign({ email, id: user.id }, 'your-secret-key')
    
    return {
      token,
      id: user.id,
    }
  }
  public async getUserById({ params, response }: HttpContextContract) {
    try {
      const { id } = params;
  
      // Busca o usuário pelo ID
      const user = await User.find(id);
      if (!user) {
        return response.status(404).json({
          success: false,
          message: 'Usuário não encontrado.',
        });
      }
  
      return response.json({
        success: true,
        user: {
          email: user.email,
          name: user.name,
          age: user.age,
          gender: user.gender,
          image: user.image,
          todos: user.todos,
          completos: user.completos
        },
      });
      
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário.',
        error: error
      });
    }
  }
  
  
}
