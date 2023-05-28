/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Helpers from '@adonisjs/core/build/standalone';

Route.post('/api/register', 'AuthController.register')
Route.patch('/api/users/:id', 'AuthController.update')
Route.post('/api/login', 'AuthController.login')
Route.get('/api/users/:id', 'AuthController.getUserById')
Route.get('/images/:filename', async ({ response, params }) => {
  const filename = params.filename;
  return response.download(Helpers.tmpPath(`uploads/${filename}`));
});

Route.get('/api/', async () => {
  return { hello: 'world' }
})
