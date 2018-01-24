var mysql= require('mysql');
var dateFormat= require('dateformat')
module.exports={
	getProductos: function(req,res,next){
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();

		var productos= null;

		db.query('Select * from productos', function(err, rows, fields){
			if(err) throw err;
			productos= rows;
			db.end();
			res.render('productos/productos', {productos: productos});
		});
	},
	getJuego: function(req,res,next){
		res.render('index2');
	},
	//metodo para buscar especifico
	getBuscarProducto:function(req, res,next){
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var productos=null;
		var Descripcion= req.body.Buscar;
		db.query('select * from productos where Descripcion = ?', Descripcion, function(err, rows, fields){
			if(err)throw err;
			productos= rows;
			db.end();
			res.render('productos/productos', {productos: productos});
		});

	},
	///////////////////////
	getNuevoProducto: function(req, res, next){
		return res.render('productos/nuevoProducto');
	},
	postNuevoProducto: function(req, res, next){
		var fechaActual= new Date();
		var fecha= dateFormat(fechaActual, 'yyyy-mm-dd h:MM:ss');
		var producto= {
			Descripcion: req.body.Nombre,
			Precio: req.body.Precio,
			FechaCreacion: fecha

		};
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		db.query('insert into productos set ?', producto, function(err, rows, fields){
			if(err) throw err;
			db.end();
		});
		//redeniza la vista en la carpeta productos el archivo nuevoProductos
		
		res.render('productos/nuevoProducto');
	},
	eliminarProducto: function(req, res, next){
		var id= req.body.id;

		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var respuesta= {res: false};
		db.query('delete from productos where idProductos= ?', id, function(err,rows,fields){
			if(err)throw err;
			db.end();
			respuesta.res= true;
			res.json(respuesta);
		});
	},

	getModificarProducto: function(req, res, next){
		var id = req.params.id;
		console.log(id);
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var productos= null;
		db.query=('SELECT * FROM productos WHERE idProductos= ?', id, function(err, rows, fields){
			if (err) throw err;
			productos= rows;
			db.end();	
			//res.render('productos/modificar', {productos: productos});
		});
	},
	postModificarProducto : function(req, res, next){
		var producto= {
			Descripcion: req.body.Nombre,
			Precio: req.body.Precio
		};
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		db.query('UPDATE productos SET ? WHERE ?', [producto, {idProductos: req.body.idProductos}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});
		res.redirect('/productos')

	}


}