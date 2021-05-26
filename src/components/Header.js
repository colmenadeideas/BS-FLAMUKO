import React, { Component } from 'react';
import Buscador from './Buscador';
import TopNavBar from './TopNavBar'
// import {Link} from 'react-router-dom'

class Header extends Component {
    state = {
        pathname: ''
    }
    componentDidMount() {
        this.setState({
            pathname: document.location.pathname
        })
    }
    componentDidUpdate() {
        if (document.location.pathname === this.state.pathname) return null
        this.setState({
            pathname: document.location.pathname
        })
    }
    render() { 
        return (  
            
            <div className='header-box'>   
                <div className='row'>   
                    <div className="col-12 col-sm-12 col-md-3 logo-box">

                        <a href="/latiendadelpintor/">
                            <img className='logo' src="/latiendadelpintor/img/flamuko-logo.png" alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                        </a>
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 form1 d-flex align-items-center form-search-wrapper">
                        {
                            (this.state.pathname !== "/latiendadelpintor" && this.state.pathname !== "/latiendadelpintor/") 
                                ?   <Buscador 
                                        busqueda={this.props.busqueda}
                                    />
                
                                :   <div className="col-12" style={{width:"700px"}}></div>

                        }
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 sesion-box">
                        <TopNavBar email={this.props.email}/>
                    </div>
                </div>
            </div>
            
        );
    }
}
 
export default Header;