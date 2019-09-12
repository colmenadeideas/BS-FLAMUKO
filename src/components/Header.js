import React, { Component } from 'react';
import Buscador from './Buscador';
import flamuko from '../img/flamuko-logo.png';

class Header extends Component {
    state = {
        pathname: document.location.pathname
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
            <div className='row slide'>   
                <div className="col-12 col-sm-12 col-md-3">
                    <img className='logo' src={flamuko} alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                </div>
                <div className="col-12 col-sm-12 col-md-9 form1 d-flex align-items-center">
                    {
                        (this.state.pathname !== "/") 
                            ?   <Buscador />
                            :   ""
                    }
                </div>
            </div>
        );
    }
}
 
export default Header;