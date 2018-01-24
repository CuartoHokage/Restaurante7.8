var mysql= require('mysql');
var bcrypt= require('bcryptjs');
var dateFormat= require('dateformat');
module.exports={
	getRegistrar: function(req, res, next){
		return res.render('usuarios/signup');
	},
	postRegistro: function(req, res,next){
		var salt= bcrypt.genSaltSync(10);
		var password= bcrypt.hashSync(req.body.password, salt);
		var fechaActual= new Date();
		var fecha= dateFormat(fechaActual, 'yyyy-mm-dd h:MM:ss');
		var user= {
			email:req.body.email,// clave: valor 
			nombres:req.body.Nombre,// campo en la base de datos: name del input que se llama del body
			password: password,
			telefono:req.body.telefono,
			direccion:req.body.direccion,
			cargo:req.body.cargo,
			cedula:req.body.cedula,
			Fecha:fecha
		};
		var config= require('.././database/config');
		var db =mysql.createConnection(config);

		db.connect();
		db.query('INSERT INTO usuarios SET ?', user, function(err,row, fields){
			if(err) throw err;
			db.end();
		});
		//req.flash('info', 'Se a registrado correctamente, inicie su sesión')
		return res.redirect('/usuarios/inicioSesion');
	},
	getInicioSesion: function(req, res, next){
		return res.render('usuarios/inicioSesion');
	},

	getCerrarSesion: function(req, res, next){
		req.logout();
		res.redirect('/usuarios/inicioSesion');
	},
	getUserPane: function(req, res, next){
		res.render('usuarios/pane', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	}

}