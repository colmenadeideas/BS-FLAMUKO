import React, { Component } from 'react'
import Login from './Login';

class SingleTienda extends Component {
    state = {  
        login: false, 
        estado: "",
        email: "",
        sesion: ""
    }
    componentDidMount() {
        this.obtenerCookies()
    }
    componentDidUpdate() {
        this.obtenerCookies()
    }
    obtenerCookies = () => {
        var cookies = [];
        var la_cookie = document.cookie.split("; ")
        for (var i=0; i<la_cookie.length; i++) {
            var mi_cookie = la_cookie[i].split("=")[1]
            cookies.push(mi_cookie)
        }
        if (cookies[2] !== this.state.estado) {
            this.setState({
                sesion: cookies[0],
                email: cookies[1],
                estado: cookies[2]
            })
        }
    }
    handleClick = () => {
        if (this.state.sesion === "activa" && this.state.estado === "login") {
            this.setState({
                login: false
            })
            this.busquedaEnSesion()
        } else {
            this.setState({
                login: true
            })
        }
    }
    login = (estado) => {
        this.setState({
            login: estado
        })
    }
    busquedaEnSesion = () => {
        var busqueda = {
            email: this.state.email,
            busqueda: this.props.producto.nombre
        }
        console.log(busqueda)
    }
    render() { 
        const {valor} = this.props.tienda
        const {nombre, direccion, telefono, telefono1} = this.props.tienda.tienda[0]
        // switch (true) {
        //     case valor > EXISTENCIA_NIVEL_MEDIO:
        //         valor = 'high';
        //         break;
        //     case valor < EXISTENCIA_NIVEL_BAJO:
        //         valor = 'low';
        //         break;
            
        //     default:
        //         valor = 'medium';
        //         break;
        // }
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
        const mensaje = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola,%20quisiera%20saber%20disponibilidad%20de%20este%20producto:%20${this.props.producto.nombre}`
        const llamar = `tel:${telefono}`
        return (  
            <React.Fragment>
                <div className="col-lg-12 static">
                    <h6><div className={`availability ${valor}`}></div> {nombre} {valor}</h6>
                    <small>
                        <i className="fa fa-map-marker-alt"></i> {direccion}
                        <br/><br/>
                    </small>
                    <div className="text-right">
                    {
                        (is_cellphone)
                            ?   (this.state.sesion === "activa" && this.state.estado === "login") 
                                ?   <a href={mensaje} onClick={this.handleClick} target="_blank"  rel="noopener noreferrer" className="call-button"><i className="fa fa-whatsapp"></i> Enviar Mensaje</a>
                                :   <button onClick={this.handleClick} target="_blank" rel="noopener noreferrer" className="call-button"><i className="fa fa-whatsapp"></i> Enviar Mensaje</button>
                            :   (this.state.sesion === "activa" && this.state.estado === "login")
                                ?   <a href={llamar} onClick={this.handleClick} className="call-button"><i className="fa fa-phone-volume"></i> <span> Llamar </span> </a>
                                :   <button onClick={this.handleClick} className="call-button"><i className="fa fa-phone-volume"></i> <span> Llamar </span> </button> 
                    }
                    <br/>
                    </div>
                    <hr/>
                </div>
                {
                    (this.state.login && this.state.estado !== "login")
                        ?   <div className="login-form">
                                <Login 
                                    producto={this.props.producto.nombre}
                                    login={this.login}
                                />
                            </div>
                        :   ""
                }
            </React.Fragment>
        );
    }
}
 
export default SingleTienda;