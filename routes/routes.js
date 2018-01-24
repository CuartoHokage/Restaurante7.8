var express = require('express');
var router = express.Router();
var passport= require('passport')
var controllers= require('.././controllers');

/* GET home page. */
router.get('/', controllers.homecontroller.index);

//rutas para los productos
router.get('/productos', controllers.productoscontroller.getProductos);
router.get('/juego', controllers.productoscontroller.getJuego);
//ruta para consultar productos especificos
router.get('/productos', controllers.productoscontroller.getBuscarProducto);
router.get('/nuevo', controllers.productoscontroller.getNuevoProducto);
router.post('/crearproducto', controllers.productoscontroller.postNuevoProducto);
router.post('/eliminarproducto', controllers.productoscontroller.eliminarProducto);
router.get('/modificar/:id', controllers.productoscontroller.getModificarProducto);
router.post('/editar', controllers.productoscontroller.postModificarProducto);
// rutas para los usuarios
router.get('/usuarios/registro', controllers.UserController.getRegistrar);
router.post('/usuarios/registro', controllers.UserController.postRegistro);
router.get('/usuarios/inicioSesion', controllers.UserController.getInicioSesion);


router.post('/usuarios/inicioSesion', passport.authenticate('local', {
	successRedirect: '/usuarios/panel',
	failureRedirect: '/usuarios/inicioSesion',
	failureFlash: true
}));

router.get('/usuarios/cerrarSesion', controllers.UserController.getCerrarSesion);
router.get('/usuarios/panel', controllers.UserController.getUserPane);


module.exports = router;
 