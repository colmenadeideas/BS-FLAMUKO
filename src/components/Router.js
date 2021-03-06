import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import SingleProducto from './SingleProducto';
import Header from './Header';
import Footer from './Footer';
import Principal from './Principal';
import NotFound from './NotFound'

class Router extends Component {
    state = {
        pathname: '',
        filtros: {
            lineas: [],
            estado: ''
        },
        email: "",
        fromHome: false,
        busqueda: Boolean
    }
    componentDidMount(){
        this.loginSesion()
    }

    componentDidUpdate(){
        console.log('Actualizando...')
        this.loginSesion()
    }
    pathname = (e) => {
        if (e !== this.state.pathname) {
            this.setState({
                pathname: e
            })
        }  
    }
    busqueda = e => {
        this.setState({
            busqueda: e        
        })
    }

    loginSesion = () => {
        const data  = JSON.parse(localStorage.getItem('LTP_sesion'))
        const email = data ? data.user : ""
        if(email === this.state.email) return
        this.setState({
            email: email
        })
    }

    setFromHome = (value) => {
        this.setState({
            fromHome: value
        })
    }
    render() { 

        console.log(this.state.pathname)
        return (  
            <BrowserRouter>
                <React.Fragment>
                    <div className="" id="header">
                        <Header
                            
                            email={this.state.email} 
                            pathname={this.state.pathname}
                            busqueda={this.state.busqueda}
                            fromHome={this.state.fromHome}
                        />
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/latiendadelpintor" render={() => (
                                <Principal
                                    busqueda={this.state.busqueda}
                                    setFromHome={this.setFromHome}
                                />
                            )} />
                            <Route exact path="/latiendadelpintor/:nombreProducto" render={(props) => {
                                var nombreProducto = props.location.pathname.replace('/latiendadelpintor/', '')
                                this.pathname(document.location.pathname)
                                return ( 
                                    <React.Fragment>
                                        <Home 
                                            busqueda={nombreProducto}    
                                            resultado={this.busqueda}  
                                            setFromHome={this.setFromHome}

                                        />
                                    </React.Fragment>
                                )
                            }} />
                            <Route exact path="/latiendadelpintor/detail/:idProducto" render={(props) => {
                                const idProducto = props.location.pathname.replace('/latiendadelpintor/detail/', '')
                                this.pathname(document.location.pathname)
                                return (
                                    <SingleProducto 
                                        idProducto={idProducto}
                                        pathname={this.state.pathname}
                                        setFromHome={this.setFromHome}

                                    />
                                )
                            }} />
                            
                            <Route component ={NotFound}  />

                        </Switch>
                    </div>
                    
                    <Footer />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
 
export default Router;