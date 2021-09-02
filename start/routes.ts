import Route from '@ioc:Adonis/Core/Route'


//===================REGISTRO==========================
Route.post('registro', 'SQL/UsersController.create')
Route.get('foto/:id', 'SQL/UsersController.getfoto')
Route.get('read/:id?', 'SQL/UsersController.read')
Route.post('send', 'SQL/AuthController.sendVerificationEmail')
Route.get('confirmEmail/:token', 'SQL/AuthController.confirmEmail')

//LOGIN Y LOGOUT
Route.post('login', 'SQL/AuthController.login')
Route.post('logout', 'SQL/AuthController.logout')

//EMAIL CONFIRMATION
Route.get('confirmation/:token', 'SQL/AuthController.confirmEmail')

Route.group(() => {
  Route.post('role/create', 'SQL/RolesController.create')
  //===================================AUTH==============================================
  Route.group(() => {
    Route.post('register', 'SQL/UsersController.create')  ////<===== Valida informacion y crea un usuario no verificado
    Route.post('login', 'SQL/AuthController.login')
    Route.delete('logout', 'SQL/AuthController.logout').middleware('auth')
  }).prefix('auth')
  //=====================================================================================

  //=============================MODULO CONTRASEÑA OLVIDADA===============================
  Route.group(() => {
    Route.post('forgot-password', 'SQL/AuthController.forgotPassword')  //<===== Genera un codigo y envia correo con el mismo
    Route.post('confirmCode', 'SQL/AuthController.confirmCode')         //<===== Confirma que el codigo sea correcto y genera un token
  }).prefix('/password-reset')
  //======================================================================================

  //===================================USUARIOS===========================================
  Route.group(() => {
    Route.post('read/:id?', 'SQL/UsersController.read').middleware(['auth']).as('read')
    Route.get('foto/:id', 'SQL/UsersController.getfoto').as('foto')

    Route.group(() => {
      Route.put('update', 'SQL/UsersController.update').as('update')    //<===== Actualiza la informacion de un usuario, excepto la contraseña
      Route.delete('delete/:email?', 'SQL/UsersController.delete').as('delete')   //<===== Elimina un usuario
      Route.put('password-update', 'SQL/UsersController.updatePassword').as('passwordUpdate')   //<===== Actualiza la contraseña del usuario
    }).middleware('auth')

  }).prefix('/users').as('users')
  //======================================================================================

  Route.group(() => {
    Route.post('create','SQL/DiscountCodesController.store').as('createDiscount')
    Route.get('index/:code?','SQL/DiscountCodesController.index').as('indexDiscount')
    Route.put('update','SQL/DiscountCodesController.update').as('updateDiscount')
    Route.delete('delete','SQL/DiscountCodesController.delete').as('deleteDiscount')
  }).prefix('/discount-codes').as('discountCode')

  Route.group(() => {
    Route.post('create','SQL/SizesController.store').as('createSize')
    Route.get('index/:name?','SQL/SizesController.index').as('indexSize')
    Route.put('update','SQL/SizesController.update').as('updateSize')
    Route.delete('delete','SQL/SizesController.delete').as('deleteSize')
  }).prefix('/sizes').as('sizes')

  Route.group(() => {
    Route.post('create','SQL/CategoriesController.store').as('createCategory')
    Route.get('index/:name?','SQL/CategoriesController.index').as('indexCategory')
    Route.put('update','SQL/CategoriesController.update').as('updateCategory')
    Route.delete('delete','SQL/CategoriesController.delete').as('deleteCategory')
  }).prefix('/categories').as('categories')

  Route.post('send', 'SQL/AuthController.sendVerificationEmail')
  Route.get('confirmEmail/:token', 'SQL/AuthController.confirmEmail')
  Route.put('assign', 'SQL/RolesController.assignRole')

  //EMAIL CONFIRMATION
  Route.get('confirmation/:token', 'SQL/AuthController.confirmEmail')

  Route.group(() => {
    //Carritos
    Route.get('carrito/:id?', 'MongoDB/CarritosController.index')
    Route.post('carrito', 'MongoDB/CarritosController.create')
    Route.put('carrito/:id', 'MongoDB/CarritosController.update')
    Route.delete('carrito/:id', 'MongoDB/CarritosController.delete')
    Route.get('carritoUsuario', 'MongoDB/CarritosController.carritoUsuario')

    //Comentarios
    Route.get('comentario/:id?', 'MongoDB/ComentariosController.index')
    Route.post('comentario', 'MongoDB/ComentariosController.create')
    Route.put('comentario/:id', 'MongoDB/ComentariosController.update')
    Route.delete('comentario/:id', 'MongoDB/ComentariosController.delete')

    //Detalles Órdenes
    Route.get('detallesorden/:id?', 'MongoDB/DetallesOrdenesController.index')
    Route.post('detallesorden', 'MongoDB/DetallesOrdenesController.create')
    Route.put('detallesorden/:id', 'MongoDB/DetallesOrdenesController.update')
    Route.delete('detallesorden/:id', 'MongoDB/DetallesOrdenesController.delete')
    Route.get('numarticulos/:id', 'MongoDB/DetallesOrdenesController.numeroArticulos')
    Route.get('total/:id', 'MongoDB/DetallesOrdenesController.total')

    //Módulos
    Route.get('modulo/:id?', 'MongoDB/ModulosController.index')
    Route.post('modulo', 'MongoDB/ModulosController.create')
    Route.put('modulo/:id', 'MongoDB/ModulosController.update')
    Route.delete('modulo/:id', 'MongoDB/ModulosController.delete')
    Route.put('imgmodulo/:id', 'MongoDB/ModulosController.updateImage')
    Route.post('archivo/:id', 'MongoDB/ModulosController.addFile')
    Route.put('archivo/:id/:indice', 'MongoDB/ModulosController.updateFile')
    Route.delete('archivo/:id/:indice', 'MongoDB/ModulosController.deleteFile')

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
    Route.post('imgproducto/:id', 'MongoDB/ProductosController.addImage')
    Route.put('imgproducto/:id/:indice', 'MongoDB/ProductosController.updateImage')
    Route.delete('imgproducto/:id/:indice', 'MongoDB/ProductosController.deleteImage')

    //Publicaciones
    Route.get('publicacion/:id?', 'MongoDB/PublicacionesController.index')
    Route.post('publicacion', 'MongoDB/PublicacionesController.create')
    Route.put('publicacion/:id', 'MongoDB/PublicacionesController.update')
    Route.delete('publicacion/:id', 'MongoDB/PublicacionesController.delete')
    Route.get('recientes', 'MongoDB/PublicacionesController.recientes')
    Route.get('destacados', 'MongoDB/PublicacionesController.destacados')
  }).middleware('auth')
}).prefix('api')

Route.post('prueba/:id?', 'SQL/CoursesController.update')
Route.post('prueba', 'SQL/DiscountCodesController.create')

