import React from 'react';

const Presentacion = (props) => {
    const handleClick = () => {
        const idPresentacion = props.presentacion.id
        props.idPresentacion(idPresentacion)
    }
    return (  
        <li>
            <button onClick={handleClick}>
                {props.presentacion.nombre}
            </button>
        </li>
    );
}
 
export default Presentacion;