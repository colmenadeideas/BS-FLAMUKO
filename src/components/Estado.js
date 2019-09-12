import React from 'react';

const Estado = (props) => {
    const handleClick = () => {
        const idEstado = props.estado.id
        props.idEstado(idEstado)
    }
    return (  
        <li>
            <button onClick={handleClick}>
                {props.estado.nombre}
            </button>
        </li>
    );
}
 
export default Estado;