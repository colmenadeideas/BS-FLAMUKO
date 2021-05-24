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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                <span>Enviar Mensaje</span>
                                
                            </a>
                            :   <button data-toggle="modal" data-target="#modalRegister" 
                                className={`call-button`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    <span>Enviar Mensaje</span>
                                </button>
                        :   (busquedaSinRegistro || isLogged)
                            ?   <a href={llamar}  
                                    className={`call-button active`}>
                                    
                                        <span> Llamar </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                        </svg>
                                
                                </a>
                            
                            :   <button data-toggle="modal" data-target="#modalRegister" 
                                className={`call-button`}>
                                    <div className="icon">
                                        <span> Llamar </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                        </svg>
                                        

                                    </div>
                                </button> 
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