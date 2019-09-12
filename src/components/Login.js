import React, { Component } from 'react'
import CheckLogin from './CheckLogin';

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
    registrarUsuario = (e) => {
        e.preventDefault();
        const usuario = {
            nombre: this.nombreRef.current.value,
            email: this.emailRef.current.value,
            telefono: this.telefonoRef.current.value, 
            busqueda: this.props.producto
        }
        this.enviarRegistro(usuario)
        var duracionCookie = 48 * 3600
        document.cookie = `sesion=activa; max-age=${duracionCookie};`;
        document.cookie = `email=${this.emailRef.current.value}; max-age=${duracionCookie};`;
        document.cookie = `estado=login; max-age=10;`;
        var login = false
        this.props.login(login)
    }
    enviarRegistro = (usuario) => {
        console.log(usuario)
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
            email: this.emailRef.current.value,
            busqueda: this.props.producto
        }
        console.log(usuario)
        var duracionCookie = 48 * 3600
        var cookieSesion = 7200
        document.cookie = `sesion=activa; max-age=${duracionCookie};`;
        document.cookie = `email=${this.emailRef.current.value}; max-age=${duracionCookie};`;
        document.cookie = `estado=login; max-age=${cookieSesion};`;
        var login = false
        this.props.login(login)
    }
    closeWindow = () => {
        var login = false
        this.props.login(login)
    }
    render() { 
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
                                            <h2 className="col-10 col-sm-4 offset-sm-4">Iniciar Sesión</h2>
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