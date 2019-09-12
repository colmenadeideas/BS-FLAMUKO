import React from 'react'
import SingleTienda from './SingleTienda';

const SingleExistencia = (props) => {
    return (  
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            Disponible en:
            <div className="address-area">
                {
                    props.existencia.map((tienda, key) => (
                        <SingleTienda 
                            tienda={tienda}
                            producto={props.producto}
                            key={key}
                        />
                    ))
                }
            </div>
		</div>

    );
}
 
export default SingleExistencia;