//home controller

module.exports={// esta linea importa todo lo de adentro cuando se en otro archivo a esta funcion
	//funciones del controlador
	index: function(req, res, next){
		res.render('index', {
			title: 'Restaurant 7.8 con el auténtico sabor Manabita',
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	}
}