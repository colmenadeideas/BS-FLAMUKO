import React from 'react';
import { Link } from 'react-router-dom';

const Producto = (props) => {
    const pinturas = ['ARM-026', 'ARM-072', 'ARM-81', 'ARM-085', 'ARM-156', 'ARM-582', 'ARM-590', 'ARM-596', 'FLA-18', 'FLA-20', 'FLA-40', 'FLA-70', 'FLA-355', 'REG-359']
    const {cod, nombre, id, color} = props.producto

    let pintura = pinturas.filter(nom => (
        cod.indexOf(nom) !== -1
    ))
    if (pintura === "") {
        pintura = "flamuko-flagloss"
    }

    return (  
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <Link className="card-link" to={`/latiendadelpintor/detail/${id}`}>
                <div className="card result-card" style={{background: color}}>
                    <h4>{nombre}</h4>
                    
                    <div className="btn-link-bottom">Ver detalle</div>	
                    {/* comparo el codigo para seleccionar la imagen que se mostrara */}
                    <img src={`/latiendadelpintor/img/bote-pintura/${pintura[0]}.png`} alt={nombre} />
                </div>
            </Link>
        </div>
    );
}
 
export default Producto;