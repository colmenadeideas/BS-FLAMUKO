import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getCookie} from './Helpers'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBell, faInbox, faBars } from '@fortawesome/free-solid-svg-icons'


class TopNavBar extends Component {
  
    state = {
      email: ''
    }

    componentDidMount(){
        const email = getCookie('email')
        this.setState({
          email: email
        })
    }
    
    signOut = (e) => {
        e.preventDefault()  
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "estado=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "sesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.reload()
    }
  
    render () {
        const user = this.state.email

        return(
            <div className="indicador-sesion">
                {user !== '' ?
                  <>
                    <p className="">Estás buscando como {user}</p>
                    <button className="logout-button" onClick={this.signOut}>¿No eres tú? Haz click aquí</button>
                  </>
                 : 
                  <p className="">¡Bienvenido!</p>

                 }
                
            </div>
          // <nav className="navbar navbar-expand-md navbar-dark lighten-1">
          //   <a className="navbar-brand" href="#">Hola, {user}</a>
          //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
          //     aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
          //       {/* <FontAwesomeIcon icon={faBars} size="1x"/> */}
          //   </button>
          //   <div className="collapse navbar-collapse" id="navbarSupportedContent-555">



          //     <ul className="navbar-nav ml-auto nav-flex-icons">
                
          //       <li className="nav-item avatar dropdown">
                  
          //         <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
          //           aria-haspopup="true" aria-expanded="false">
          //           <div className="username-text"></div>
          //         </a>
          //         <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
          //           aria-labelledby="navbarDropdownMenuLink-55">
          //           <button className="dropdown-item" onClick={this.signOut}>Cerrar Sesión</button>
          //         </div>
          //       </li>
          //     </ul>
          //   </div>
          // </nav>
        )
    }
}

export default TopNavBar;