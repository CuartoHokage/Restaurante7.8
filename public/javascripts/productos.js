$(function(){
	$('#tabla_productos #btn-eliminar').click(function(e){
		e.preventDefault();
		var elemento= $(this);
		var id= elemento.parent().parent().find('#idProducto').text();
		var confirmar = confirm('¿Esta seguro que quiere eliminar este plato?')
		if (confirmar) {
			$.ajax({
				url: '/eliminarproducto',
				method: 'post',
				data: {id: id}, 
				success: function(res){
					if(res.res){
						elemento.parent().parent().remove();
					}
				}
			});
		}
		
	});
	$('#consultaDatos #btn-modificar').click(function(e){
		e.preventDefault();
		var elemento= $(this);
		var id= elemento.parent().parent().find('#idProducto').text();
		$.ajax({
			url: '/editar',
			method: 'post'
			data: {id: id}, 
				success: function(res){
					if(res.res){
						elemento.parent().parent().remove();
					}
				}
		});
	});
});

function doSearch()
		{
			var tableReg = document.getElementById('tabla_productos');
			var searchText = document.getElementById('Buscar').value.toLowerCase();
			var cellsOfRow="";
			var found=false;
			var compareWith="";
 
			// Recorremos todas las filas con contenido de la tabla
			for (var i = 1; i < tableReg.rows.length; i++)
			{
				cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
				found = false;
				// Recorremos todas las celdas
				for (var j = 0; j < cellsOfRow.length && !found; j++)
				{
					compareWith = cellsOfRow[j].innerHTML.toLowerCase();
					// Buscamos el texto en el contenido de la celda
					if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
					{
						found = true;
					}
				}
				if(found)
				{
					tableReg.rows[i].style.display = '';
				} else {
					// si no ha encontrado ninguna coincidencia, esconde la
					// fila de la tabla
					tableReg.rows[i].style.display = 'none';
				}
			}
		}