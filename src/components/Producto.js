import React from 'react';
import { Link } from 'react-router-dom';

const Producto = (props) => {
    const pinturas = ['ARM026', 'ARM072', 'ARM81', 'ARM085', 'ARM156', 'ARM582', 'ARM590', 'ARM596', 'FLA18', 'FLA20', 'FLA40', 'FLA70', 'FLA355', 'REG359']
    const {cod, nombre, id, color, presentacion} = props.producto
    // console.log(presentacion)
    let envase
    let icon = ''
    switch (presentacion) {
        case '1':
            envase = 'Galón'
            icon = 'galon.png'
            break;
        case '4':
            envase = 'Cuarto'
            icon = 'cuartico.png'
            break;
        case '3':
            envase = 'Cuñete 3 galones'
            icon = 'cunete.png'
            break;
        case '40':
            envase = 'Cuñete 4 galones'
            icon = 'cunete.png'
            break;
        case '5':
            envase = 'Cuñete 5 galones'
            icon = 'cunete.png'
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
        pintura = "flauko-flaloss"
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
                                    <h4 className="presentacion__title"><b>{envase}</b></h4>
                                    {icon !== ''
                                        ?   <div><img src={`/latiendadelpintor/img/${icon}`} className="presentacion__img" alt="icon" /></div>
                                        :   <div><i className="fas fa-brush"></i></div>
                                    }
                                </div>	
                            :   <div className="btn-link-bottom">Ver Detalle</div>	
                    }
                    {/* comparo el codigo para seleccionar la imagen que se mostrara */}
                    <img src={`/latiendadelpintor/img/bote-pintura/${pintura[0]}.png`} className="result-card__img" alt={nombre} />
                </div>
            </Link>
        </div>
    );
}
 
export default Producto;