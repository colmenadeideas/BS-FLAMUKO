import React from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

const NotFound = () => {

    const parameters = useParams()
    const result = parameters.idProducto ? 'este producto' : 'esta pagina'
    return(
        <div className="container not-found-page">
            <div className="">
                <div className="not-found-content">
                    <img className='not-found-img' src="/latiendadelpintor/img/not-found-image.png" alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                    <h2>Vaya, tu búsqueda no produjo resultados</h2>
                    <Link to="/latiendadelpintor"><span>Intenta realizar una nueva búsqueda</span></Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound