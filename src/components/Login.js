import React, { Component } from 'react'
import CheckLogin from './CheckLogin';
import axios from 'axios';

class Login extends Component {
    state = {
        registrado: false
    }
    constructor(props) {
        super(props);
        this.nombreRef = React.createRef();
        this.emailRef = React.createRef();
        this.telefonoRef = React.createRef();
    }
    botonesActive = () => {
        let button = document.querySelectorAll('.call-button')
        for (let i = 0; i < button.length; i++) {
            button[i].classList.add('call-button-active') 
        }
    }
    registrarUsuario = (e) => {
        e.preventDefault();
        const usuario = {
            name: this.nombreRef.current.value,
            username: this.emailRef.current.value,
            phone: this.telefonoRef.current.value, 
            search: this.props.producto
        }
        let login = this.enviarRegistro(usuario)
        if (!login) {
            this.props.login(login)
        }
    }
    enviarRegistro = (usuario) => {
        console.log(usuario)
        // let url = `http://lab.besign.com.ve/flamuko/html/api/save`
        let url = `http://localhost/flamuko/html/api/save`
        axios.post(url, usuario)
            .then(res => {
                console.log(res.data)
                let duracionCookie = 2000000 * 48 * 3600
                let duracionCookie2 = 2 * 48 * 3600
                if (res.data === 'SignUp' || res.data === 'Login') {
                    document.cookie = `sesion=activa; max-age=${duracionCookie};`;
                    document.cookie = `email=${usuario.email}; max-age=${duracionCookie};`;
                    document.cookie = `estado=login; max-age=${duracionCookie2};`;
                    this.botonesActive()
                }
            })
        return false
        // var modal = document.querySelector(".modal");
        // modal.classList.add("hidden");
    }
    login = (estado) => {
        this.props.login(estado)
    }
    toogleSesion = () => {
        if (this.state.registrado === false) {
            this.setState({
                registrado: true
            })
        } else {
            this.setState({
                registrado: false
            })
        }
    }
    iniciarSesion = (e) => {
        e.preventDefault();
        const usuario = {
            username: this.emailRef.current.value,
            search: this.props.producto
        }
        let login = this.enviarRegistro(usuario)
        if (!login) {
            this.props.login(login)
        }
    }

    render() { 
        // console.log(https://api.ipify.org/?format=jsonp&callback=ip); // Obtener IP del cliente
        var sesion = document.cookie.substr(7,7).replace("activa;", "activa");
        var indexEstado = document.cookie.indexOf("estado")
        var indexLogin = indexEstado + 7
        var estado = document.cookie.substr(indexLogin, indexLogin)
        return (  
            <React.Fragment>
                {
                    (sesion === "activa" && estado !== "login") 
                        ?   <CheckLogin 
                                login={this.login}
                            />   
                        :   (this.state.registrado)
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
                                                    <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} /><div className="w-100"></div>                 
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary" onClick={this.iniciarSesion} data-dismiss="modal">Ingresar</button>
                                                <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Registrarse</button></p>
                                            </div>
                                        </div>
                                    </div> 
                            :   <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className="modal-title" id="exampleModalLongTitle">Registrate</h2>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="row justify-content-center">
                                                <input required className="input-form" type="text" placeholder="Nombre" ref={this.nombreRef} /><div className="w-100"></div>
                                                <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} /><div className="w-100"></div>
                                                <input required className="input-form" type="number" placeholder="Telefono" ref={this.telefonoRef} /><div className="w-100"></div>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                                                    <label className="form-check-label" htmlFor="Check">He leído y acepto los términos y condiciones de uso</label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" onClick={this.registrarUsuario} data-dismiss="modal">Ingresar</button>
                                            <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Iniciar Sesión</button></p>
                                        </div>
                                    </div>
                                </div> 
                }
            </React.Fragment>
        );
    }
}
 
export default Login;