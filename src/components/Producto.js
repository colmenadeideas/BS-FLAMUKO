import React from 'react';
import { Link } from 'react-router-dom';

const Producto = (props) => {
    const pinturas = ['ARM-026', 'ARM-072', 'ARM-81', 'ARM-085', 'ARM-156', 'ARM-582', 'ARM-590', 'ARM-596', 'FLA-18', 'FLA-20', 'FLA-40', 'FLA-70', 'FLA-355', 'REG-359']
    const {cod, nombre, id, color, presentacion} = props.producto
    // console.log(presentacion)
    let envase
    switch (presentacion) {
        case '1':
            envase = 'Galón'
            break;
        case '4':
            envase = 'Cuarto'
            break;
        case '3':
            envase = 'Cuñete 3 galones'
            break;
        case '40':
            envase = 'Cuñete 4 galones'
            break;
        case '5':
            envase = 'Cuñete 5 galones'
            break;
        case '53':
            envase = 'Tambor'
            break;

        default:
            envase = ''
            break;
    }
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
                    {/* <div className="presentacion">
                        <div></div>
                        <h4>{envase}</h4>
                    </div> */}
                    {
                        (envase !== '')
                            ?   <div className="btn-link-bottom presentacion">
                                    <div><i className="fas fa-brush"></i></div>
                                    <h4>{envase}</h4>
                                </div>	
                            :   <div className="btn-link-bottom">Ver Detalle</div>	
                    }
                    {/* comparo el codigo para seleccionar la imagen que se mostrara */}
                    <img src={`/latiendadelpintor/img/bote-pintura/${pintura[0]}.png`} alt={nombre} />
                </div>
            </Link>
        </div>
    );
}
 
export default Producto;