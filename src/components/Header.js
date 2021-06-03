import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import TopNavBar from './TopNavBar'
import {Link} from 'react-router-dom'

const  Header = (props) => {

    

    const [pathname, setPathname] = useState('')
    
    useEffect(()=>{
        const newPathname = document.location.pathname
        setPathname(newPathname)
    }, [])
    
    useEffect(()=>{
        if(document.location.pathname === pathname) return null
        const newPathname = document.location.pathname
        setPathname(newPathname)
    }, [document.location.pathname])
    
    
    // componentDidUpdate() {
    //     console.log(document.location.pathname)
    //     console.log(this.state.pathname)
    //     if (document.location.pathname === this.state.pathname) return null
    //     this.setState({
    //         pathname: document.location.pathname
    //     })
    // }
    
    return (  
        
        <div className='header-box'>   
            <div className='row'>   
                <div className="col-12 col-sm-12 col-md-3 logo-box">

                    <Link to="/latiendadelpintor/">
                        <img className='logo' src="/latiendadelpintor/img/flamuko-logo.png" alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                    </Link>
                </div>
                <div className="col-12 col-sm-12 col-md-5 form1 d-flex align-items-center form-search-wrapper">
                    {
                        // (pathname !== "/latiendadelpintor" && pathname !== "/latiendadelpintor/") 
                        (props.fromHome === false)
                            ?   <Buscador 
                                    busqueda={props.busqueda}
                                />
            
                            :   <div className="col-12" style={{width:"700px"}}></div>

                    }
                </div>
                <div className="col-12 col-sm-12 col-md-4 sesion-box">
                    <TopNavBar email={props.email}/>
                </div>
            </div>
        </div>
        
    );
    
}
 
export default Header;