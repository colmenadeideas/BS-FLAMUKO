import React, { useState } from 'react'
import {getCookie} from './Helpers'
import Login from './LoginRefactor';
import {useSelector, useDispatch} from 'react-redux'
import {decodeLocalData} from './Helpers'
import { busquedaSinRegistroAction } from './Actions/sesionActions';

const SingleTienda = (props) => {


    const isLogged            = useSelector(state => state.sesionReducer.isLogged)
    const estado              = useSelector(state => state.sesionReducer.estado)
    const email               = useSelector(state => state.sesionReducer.email)
    const sesion              = useSelector(state => state.sesionReducer.sesion)
    const busquedaSinRegistro = useSelector(state => state.sesionReducer.busquedaSinRegistro)
    

    
    var {valor} = props.tienda
    const {nombre, direccion, telefono /*, telefono1*/} = props.tienda.tienda[0]
    const EXISTENCIA_NIVEL_MEDIO = 15
    const EXISTENCIA_NIVEL_BAJO = 0
    valor = parseInt(valor)
    if (valor > EXISTENCIA_NIVEL_MEDIO) {
        valor = 'high';
    } else if (valor === EXISTENCIA_NIVEL_BAJO) {
        valor = 'low';
    } else {
        valor = 'medium';
    }
    
    
    if (telefono) {
        var codigo = telefono.substr(0, 4)
        var is_cellphone = false

        switch (codigo) {
            case '0412': 
                is_cellphone = true; 
                break;
            case '0414': 
                is_cellphone = true; 
                break;
            case '0424': 
                is_cellphone = true; 
                break;
            case '0416': 
                is_cellphone = true; 
                break;
            case '0426': 
                is_cellphone = true; 
        
                break;
            default:
                break;
        }

    }
    const mensaje = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola,%20quisiera%20saber%20disponibilidad%20de%20este%20producto:%20${props.producto.nombre}`
    const llamar = `tel:${telefono}`
    return (  
        <React.Fragment>
            <div className="col-lg-12 static">
                <h6><div className={`availability ${valor}`}></div> {nombre}</h6>
                {
                    (direccion)
                        ?   <small>
                                <i className="fa fa-map-marker-alt"></i> {direccion}
                                <br/><br/>
                            </small>
                        :   ""
                }
                <div className="text-right">
                {
                    (is_cellphone)
                        ?   (busquedaSinRegistro || isLogged) 
                            ?   <a href={mensaje} target="_blank"  rel="noopener noreferrer" 
                                className={`call-button active`}>
                                <i className="fa fa-whatsapp"></i> Enviar Mensaje
                            </a>
                            :   <button data-toggle="modal" data-target="#modalRegister" 
                                className={`call-button`}><i className="fa fa-whatsapp"></i> Enviar Mensaje</button>
                        :   (busquedaSinRegistro || isLogged)
                            ?   <a href={llamar}  
                                className={`call-button active`}>
                                    <i className="fa fa-phone-volume"></i> <span> Llamar </span> 
                                </a>
                            //:   <button onClick={handleClick} className="call-button"><i className="fa fa-phone-volume"></i> <span> Llamar </span> </button> 
                            :   <button data-toggle="modal" data-target="#modalRegister" 
                                className={`call-button`}><i className="fa fa-phone-volume"></i> <span> Llamar </span> </button> 
                }
                <br/>
                </div>
                <hr/>
            </div>
            {
                <div className="modal fade" id="modalRegister" tabIndex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
                    <Login 
                        producto={props.producto.nombre}
                    />
                </div>
            }
        </React.Fragment>
    );
}
 
export default SingleTienda;