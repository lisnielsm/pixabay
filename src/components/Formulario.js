import React, { useState } from 'react';

const Formulario = () => {

    const [ termino, guardarTermino ] = useState('');

    const buscarImagenes = e => {
        e.preventDefault();

        // validar 
        if(termino.trim() === '') {  
            return;
        }

        // enviar el termino de busqueda al componente principal
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg mb-3"
                        placeholder="Busca una imagen, ejemplo futbol o cafe"
                        onChange={ e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

        </form>
        );
}
 
export default Formulario;