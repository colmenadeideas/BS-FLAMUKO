import React, {useEffect} from 'react'
import SingleTienda from './SingleTiendaRefactor';
import {useDispatch, useSelector} from 'react-redux'
import {setProductoAction} from './Actions/productoActions'

const SingleExistencia = (props) => {

    // const dispatch = useDispatch()
    // console.log(props.producto)
    // // const producto = useSelector(state => state.productoReducer.producto)

    // useEffect(()=>{
    //     const setProducto = () => dispatch(setProductoAction(props.producto))
    //     setProducto()
    // }, [])

    return (  
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 lista-existencia">
            <span className="texto-existencia">Encuentra este producto en:</span> 
            <div className="address-area">
                {
                    props.existencia.map((tienda, key) => {
                        
                        return(
                        <SingleTienda 
                            tienda={tienda}
                            producto={props.producto}
                            key={key}
                        />
                    )})
                }
            </div>
		</div>

    );
}
 
export default SingleExistencia;