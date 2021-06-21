import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import LoginFormik from './LoginRefactorNew';
import {initialValues, validate} from './utilFunctions'
import * as actions from '../Actions/sesionActions'
import CheckLogin from '../CheckLogin'
import Modal from 'react-bootstrap/Modal'


const Login = (props) => {
    const dispatch = useDispatch()
    const [registrado, setRegistrado]   = useState(false)
    // const [show, setShow] = useState(false)

    const handleClose = () => dispatch(actions.handleOnShowLogin(false))

    const sesion = useSelector(state => state.sesionReducer.sesion)
    const estado = useSelector(state => state.sesionReducer.estado)
    const showLogin = useSelector(state => state.sesionReducer.showLogin)

    const handleSubmit = (data) => {
        const username = data.username
        const name = data.name
        const phone = data.phone
        
        const userData = {
            username,
            name,
            phone
        }

        
        actions.localSesionAction(userData)
        console.log(userData)
        if(props.producto !== ""){
            dispatch(actions.enviarRegistroAction(userData))
        } else {
            
            dispatch(actions.registroSuccess(data.username))
        }
        handleClose()


    }

    const setAsUnregistered = () => {
        dispatch(actions.busquedaSinRegistroAction())
        handleClose()
    }

    return (

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
                            :   
                            
                            <Modal 
                                show={showLogin} 
                                onHide={handleClose}
                                aria-labelledby="contained-modal-title-vcenter"
                                // centered
                                dialogClassName="login-popup"
                                
                                backdropClassName="no-bg"
                                >
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>
                                    <LoginFormik 
                                        validate={validate} 
                                        initialValues={initialValues}
                                        handleClose={handleClose}
                                        handleSubmit={handleSubmit} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="close-modal-wrapper">
                                        <p><button onClick={setAsUnregistered} data-dismiss="modal" className="toogle-sesion">No gracias, sólo muéstrame la información</button></p>    
                                    </div>
                                </Modal.Footer>
                                
                            </Modal>
                                // <div className="modal-dialog modal-dialog-centered" role="document">
                                //     <div className="modal-content login-popup">
                                //         <div className="modal-header">
                                //             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                //             <span aria-hidden="true">&times;</span>
                                //             </button>
                                //         </div>
                                        
                                            
                                //         <div className="modal-footer">
                                            
                                //         </div>
                                //     </div>
                                // </div> 
                }
        </>
        
    );
}

export default Login;