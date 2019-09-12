import React from 'react';

const Linea = (props) => {
    const handleClick = () => {
        const idLinea = props.linea.id
        props.idLinea(idLinea)
    }
    const nombre = props.linea.nombre;
    return (  
        <li>
            <button onClick={handleClick}>
                {nombre}    
            </button>
        </li>
    );
}
 
export default Linea;