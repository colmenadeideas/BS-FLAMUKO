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
        // console.log(usuario)
        let url = `http://lab.besign.com.ve/flamuko/html/api/save`
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
                    return false
                }
            })
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
    closeWindow = () => {
        let login = false
        this.props.login(login)
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
                                ?   <div className="check-login">
                                        <form className="row justify-content-center" onSubmit={this.iniciarSesion}>
                                            <h2 className="col-10 col-sm-5 offset-sm-3">Iniciar Sesión</h2>
                                            <div className="close-window col-1 offset-sm-3"><i onClick={this.closeWindow}className="far fa-times-circle"></i></div>
                                            <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} /><div className="w-100"></div>                 
                                            <button type="submit" className="boton-ingresar boton-margin">Ingresar</button>   
                                        </form>
                                        <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Registrarse</button></p>
                                    </div>
                                :   <div className="check-login">
                                        <form className="row justify-content-center" onSubmit={this.registrarUsuario}>
                                            <h2 className="col-10 col-sm-4 offset-sm-4">Regístrate</h2>
                                            <div className="close-window col-1 offset-sm-3"><i onClick={this.closeWindow}className="far fa-times-circle"></i></div>
                                            <input required className="input-form" type="text" placeholder="Nombre" ref={this.nombreRef} /><div className="w-100"></div>                
                                            <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} /><div className="w-100"></div>           
                                            <input required className="input-form" type="number" placeholder="Telefono" ref={this.telefonoRef} /><div className="w-100"></div>   
                                            <button type="submit" className="boton-ingresar">Ingresar</button><div className="w-100"></div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                                                <label className="form-check-label" htmlFor="Check">He leído y acepto los términos y condiciones de uso</label>
                                            </div>
                                        </form>
                                        <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Iniciar Sesión</button></p>
                                    </div>
                }
            </React.Fragment>
        );
    }
}
 
export default Login;