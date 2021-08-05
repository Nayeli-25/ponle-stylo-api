import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  //===================================AUTH==============================================
  Route.group(() => {
    Route.post('register', 'SQL/UsersController.create')  ////<===== Valida informacion y crea un usuario no verificado
    Route.post('login', 'SQL/AuthController.login')
    Route.delete('logout', 'SQL/AuthController.logout').middleware('auth')
  }).prefix('/auth')
  //=====================================================================================

  //=============================MODULO CONTRASEÑA OLVIDADA===============================
  Route.group(() => {
    Route.post('forgot-password', 'SQL/AuthController.forgotPassword')  //<===== Genera un codigo y envia correo con el mismo
    Route.post('confirmCode', 'SQL/AuthController.confirmCode')         //<===== Confirma que el codigo sea correcto y genera un token
  }).prefix('/password-reset')
  //======================================================================================

  //===================================USUARIOS===========================================
  Route.group(() => {
    Route.get('read/:id?', 'SQL/UsersController.read')
    Route.get('foto/:id', 'SQL/UsersController.getfoto')

    Route.group(() => {
      Route.put('update', 'SQL/UsersController.update')     //<===== Actualiza la informacion de un usuario, excepto la contraseña
      Route.delete('delete/:email?', 'SQL/UsersController.delete')    //<===== Elimina un usuario
      Route.put('password-update', 'SQL/UsersController.updatePassword')   //<===== Actualiza la contraseña del usuario
    }).middleware('auth')

  }).prefix('/users')
  //======================================================================================


  Route.post('send', 'SQL/AuthController.sendVerificationEmail')
  Route.get('confirmEmail/:token', 'SQL/AuthController.confirmEmail')









  //EMAIL CONFIRMATION
  Route.get('confirmation/:token', 'SQL/AuthController.confirmEmail')

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
}).prefix('api')
