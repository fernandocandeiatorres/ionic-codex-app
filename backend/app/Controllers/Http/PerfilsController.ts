import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Perfil from 'App/Models/Perfil'

import Application from '@ioc:Adonis/Core/Application'

export default class PerfilsController {
    private validationOptions = {
        types: ['image'],
        size: '200mb',
    }

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const email = body.email;

        const perfilExists = await Perfil.findBy('email', email);
        if (perfilExists) {
            return response.status(400).json({
                message: 'Erro ao criar usuário',
              });
        }

        const image = request.file('image', this.validationOptions)

        if (image) {
            const imageName = uuidv4() + '.' + image.extname

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            body.image = imageName
        }

        const perfil = await Perfil.create(body)

        response.status(201)


        return {
            message: 'Perfil criado com sucesso!',
            data: perfil,
        }
    }
    public async index() {
        const perfils = await Perfil.all()

        return {
            data: perfils
        }
    }

    public async show({ params }: HttpContextContract) {
        const perfil = await Perfil.findOrFail(params.id)

        return {
            data: perfil
        }
    }
    public async destroy({ params }: HttpContextContract) {
        const perfil = await Perfil.findOrFail(params.id)

        await perfil.delete()

        return {
            message: 'Momento excluido com sucesso!',
            data: perfil,
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const body = request.body()

        const perfil = await Perfil.findOrFail(params.id)

        perfil.nome = body.nome
        perfil.idade = body.idade
        perfil.genero = body.genero
        perfil.email = body.email
        perfil.senha = body.senha

        if (perfil.image != body.image || !perfil.image) {
            const image = request.file('image', this.validationOptions)
            if (image) {
                const imageName = uuidv4() + '.' + image.extname

                await image.move(Application.tmpPath('uploads'), {
                    name: imageName
                })

                body.image = imageName
            }

        }

        await perfil.save()

        return {
            message: "Perfil atualizado com sucesso!",
            data: perfil,
        }
    }
}
