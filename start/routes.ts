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

Route.get('/', async () => {
  return { hello: 'world' }
})

//Carritos
Route.get('carrito/:id?', 'MongoDB/CarritosController.index')
Route.post('carrito', 'MongoDB/CarritosController.create')
Route.put('carrito/:id', 'MongoDB/CarritosController.update')
Route.delete('carrito/:id', 'MongoDB/CarritosController.delete')

//Comentarios
Route.get('comentario/:id?', 'MongoDB/ComentariosController.index')
Route.post('comentario', 'MongoDB/ComentariosController.create')
Route.put('comentario/:id', 'MongoDB/ComentariosController.update')
Route.delete('comentario/:id', 'MongoDB/ComentariosController.delete')

//Comentarios Publicaciones
Route.get('comentspubli/:id?', 'MongoDB/ComentsPublicacionesController.index')
Route.post('comentspubli', 'MongoDB/ComentsPublicacionesController.create')
Route.put('comentspubli/:id', 'MongoDB/ComentsPublicacionesController.update')
Route.delete('comentspubli/:id', 'MongoDB/ComentsPublicacionesController.delete')

//Comentarios Usuarios
Route.get('comentsusuario/:id?', 'MongoDB/ComentsUsuariosController.index')
Route.post('comentsusuario', 'MongoDB/ComentsUsuariosController.create')
Route.put('comentsusuario/:id', 'MongoDB/ComentsUsuariosController.update')
Route.delete('comentsusuario/:id', 'MongoDB/ComentsUsuariosController.delete')

//Detalles Órdenes
Route.get('detallesorden/:id?', 'MongoDB/DetallesOrdenesController.index')
Route.post('detallesorden', 'MongoDB/DetallesOrdenesController.create')
Route.put('detallesorden/:id', 'MongoDB/DetallesOrdenesController.update')
Route.delete('detallesorden/:id', 'MongoDB/DetallesOrdenesController.delete')

//Módulos
Route.get('modulo/:id?', 'MongoDB/ModulosController.index')
Route.post('modulo', 'MongoDB/ModulosController.create')
Route.put('modulo/:id', 'MongoDB/ModulosController.update')
Route.delete('modulo/:id', 'MongoDB/ModulosController.delete')

//Módulos Usuarios
Route.get('modulosusuario/:id?', 'MongoDB/ModulosUsuariosController.index')
Route.post('modulosusuario/', 'MongoDB/ModulosUsuariosController.create')
Route.put('modulosusuario/:id', 'MongoDB/ModulosUsuariosController.update')
Route.delete('modulosusuario/:id', 'MongoDB/ModulosUsuariosController.delete')

//Órdenes
Route.get('orden/:id?', 'MongoDB/OrdenesController.index')
Route.post('orden/', 'MongoDB/OrdenesController.create')
Route.put('orden/:id', 'MongoDB/OrdenesController.update')
Route.delete('orden/:id', 'MongoDB/OrdenesController.delete')

//Productos
Route.get('producto/:id?', 'MongoDB/ProductosController.index')
Route.post('producto', 'MongoDB/ProductosController.create')
Route.put('producto/:id', 'MongoDB/ProductosController.update')
Route.delete('producto/:id', 'MongoDB/ProductosController.delete')

//Publicaciones
Route.get('publicacion/:id?', 'MongoDB/PublicacionesController.index')
Route.post('publicacion', 'MongoDB/PublicacionesController.create')
Route.put('publicacion/:id', 'MongoDB/PublicacionesController.update')
Route.delete('publicacion/:id', 'MongoDB/PublicacionesController.delete')