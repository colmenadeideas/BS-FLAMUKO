import React from 'react'
import {useParams} from 'react-router-dom'


const NotFound = () => {

    const parameters = useParams()
    const result = parameters.idProducto ? 'este producto' : 'esta pagina'
    return(
        <div className="container not-found-page">
            <div className="">
                <div className="not-found-content">
                    <h2>Ups! No pudimos encontrar {result}</h2>
                    <span>Error 404</span>
                    <img className='not-found-img' src="/latiendadelpintor/img/flamuko-logo.png" alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                </div>
            </div>
        </div>
    )
}

export default NotFound