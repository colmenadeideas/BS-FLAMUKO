import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CheckLogin from './CheckLogin'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from './Actions/sesionActions'


const Login = (props) => {


    const dispatch = useDispatch()
    const [registrado, setRegistrado]   = useState(false)

    const [data, setData]               = useState({name: "", username: "", phone: "", search: props.producto})
    const [isDataFilled, setDataFilled] = useState({name: false, username: false, phone: false})
    

    const sesion = useSelector(state => state.sesionReducer.sesion)
    const estado = useSelector(state => state.sesionReducer.estado)

    const handleOnChange = (e) => {
        e.preventDefault()
        const type  = e.target.id
        const value = e.target.value
        const isFilled = value !== "" ? true : false

        const newData = { ...data}
        const newDataFilled = {...isDataFilled}
        newData[type] = value
        newDataFilled[type] = isFilled
        setData(newData)
        setDataFilled(newDataFilled)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actions.enviarRegistroAction(data))
    }


    const setAsUnregistered = () => dispatch(actions.busquedaSinRegistroAction())
    return(
        <>
            {
                    (sesion === "activa" && estado !== "login") 
                        ?   <CheckLogin 
                                login={this.login}
                            />   
                        :   (registrado)
                                ?   <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h2 className="modal-title" id="exampleModalLongTitle">Iniciar Sesion</h2>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row justify-content-center">
                                                    <input required className="input-form" type="email" placeholder="Email" minLength={5} ref={this.emailRef} /><div className="w-100"></div>                 
                                                </div>
                                            </div>
                                            {/* <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary" onClick={this.iniciarSesion} data-dismiss="modal">Ingresar</button>
                                                <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Registrarse</button></p>
                                            </div> */}
                                        </div>
                                    </div> 
                            :   <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content login-popup">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h2>¡Nos gustaría mantenernos en contacto! Te invitamos a completar tus datos</h2>
                                            <form className="row justify-content-center">
                                                <input required onChange={handleOnChange} id="name" className="input-form" minLength={5} type="text" placeholder="Nombre" /><div className="w-100"></div>
                                                <input required onChange={handleOnChange} id="username" className="input-form" minLength={5} type="email" placeholder="Tu Correo Electrónico" /><div className="w-100"></div>
                                                <input required onChange={handleOnChange} id="phone" className="input-form" minLength={5} type="number" placeholder="Telefono Móvil" /><div className="w-100"></div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                                                    <label className="form-check-label" htmlFor="Check">
                                                        Estoy de acuerdo con suministrar mis datos y ser contactado<br/> para promociones
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="">
                                                <button type="submit" className="submit-button" 
                                                disabled={!(isDataFilled.name, isDataFilled.username, isDataFilled.phone)} 
                                                onClick={handleSubmit} 
                                                data-dismiss="modal">Enviar Datos</button>
                                            </div>
                                            <div className="">
                                                <p><button onClick={setAsUnregistered} data-dismiss="modal" className="toogle-sesion">No gracias, sólo muéstrame la información</button></p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                }
        </>
    )
}

export default Login