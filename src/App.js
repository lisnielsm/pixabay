import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

	const [ busqueda, guardarBusqueda ] = useState('');
	const [ imagenes, guardarImagenes ] = useState([]);
	const [ paginaactual, guardarPaginaActual ] = useState(1);
	const [ totalpaginas, guardarTotalPaginas ] = useState(1);

	useEffect(() => {

		const consultarAPI = async () => {
			if(busqueda === '') return;
	
			const imagenesPorPagina = 10;
			const key = '23285616-ff4f5d54a60f8fd4f3ace68c7';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			guardarImagenes(resultado.hits);

			// calcular el total de paginas
			const totalImagenesPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina); 
			guardarTotalPaginas(totalImagenesPaginas);

			// mover la pantalla hacia arriba
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({behavior: 'smooth'});
		};
		consultarAPI();
	}, [busqueda, paginaactual]);

	// definir la pagina anterior
	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaactual - 1;

		if(nuevaPaginaActual === 0) return;

		guardarPaginaActual(nuevaPaginaActual);
	}

	// definir la pagina siguiente
	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaactual + 1;

		if(nuevaPaginaActual > totalpaginas) return;

		guardarPaginaActual(nuevaPaginaActual);
	}

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de Imágenes</p>

				<Formulario
					guardarBusqueda={guardarBusqueda}
				/>
			</div>

			<div className="row justify-content-center">
				<ListadoImagenes 
					imagenes={imagenes}
				/>

				{ (paginaactual === 1) ? null :
					(<button 
						type="button"
						className="btn btn-info mr-1 mb-5"
						onClick={paginaAnterior}
					>&laquo; Anterior</button>) 
				}

				{ (paginaactual === totalpaginas) ? null :
					(<button 
						type="button"
						className="btn btn-info mb-5"
						onClick={paginaSiguiente}
					>Siguiente &raquo;</button>)
				}
			</div>

		</div>
	);
}

export default App;
