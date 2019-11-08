import React from 'react';
import flamuko from '../img/flamuko-flagloss.png';
import { Link } from 'react-router-dom';

const Producto = (props) => {
    const {nombre, id, color} = props.producto
    console.log(props.producto)
    return (  
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <Link className="card-link" to={`/latiendadelpintor/detail/${id}`}>
                <div className="card result-card" style={{background: color}}>
                    <h4>{nombre}</h4>
                    
                    <div className="btn-link-bottom">Ver detalle</div>								
                    <img src={flamuko} alt={nombre} />
                </div>
            </Link>
        </div>
    );
}
 
export default Producto;