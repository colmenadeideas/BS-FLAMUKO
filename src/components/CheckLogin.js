import React, { Component } from 'react';

class CheckLogin extends Component {
    aceptarLogin = () => {
        var duracionCookie2 = 2 * 48 * 3600
        document.cookie = `estado=login; max-age=${duracionCookie2};`;
        let button = document.querySelectorAll('.call-button')
        for (let i = 0; i < button.length; i++) {
            button[i].classList.add('call-button-active') 
        }
        var login = false
        this.props.login(login)
    }
    negarLogin = () => {
        if (document.cookie !== "") {
            var la_cookie = document.cookie.split("; ")
            var fecha_fin = new Date()
            fecha_fin.setDate(fecha_fin.getDate()-1)
            for (var i=0; i<la_cookie.length; i++) {
                var mi_cookie = la_cookie[i].split("=")[0]
                document.cookie = mi_cookie + "=;expires=" + fecha_fin.toGMTString()
            }
        }
        var login = true
        this.props.login(login)
    }
    botonesDisabled = () => {
        let button = document.querySelectorAll('.call-button')
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('call-button-active') 
        }
    }
    render() { 
        var email = document.cookie.substr(21, 21).replace("; estado=", "")
        // console.log(document.cookie)
        this.botonesDisabled();
        return (  
            <div className="check-login">
                <h2>Confirme su cuenta</h2>
                <p>¿Este es su correo?</p>
                <h3>{email}</h3>
                <button onClick={this.aceptarLogin} className="btn btn-success boton-check">Si</button>
                <button onClick={this.negarLogin} className="btn btn-danger boton-check">No</button>
            </div>
        );
    }
}
 
export default CheckLogin;