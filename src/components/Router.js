import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import SingleProducto from './SingleProducto';
import Header from './Header';
import Footer from './Footer';
import Principal from './Principal';

class Router extends Component {
    state = {
        pathname: '',
        filtros: {
            lineas: [],
            estado: ''
        },
        busqueda: Boolean
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
    render() { 
        return (  
            <BrowserRouter>
                <React.Fragment>
                    <div id="header">
                        <Header 
                            pathname={this.state.pathname}
                            busqueda={this.state.busqueda}
                        />
                    </div>
                    <Switch>
                        <Route exact path="/latiendadelpintor" render={() => (
                            <Principal
                                busqueda={this.state.busqueda}
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
                                />
                            )
                        }} />
                    </Switch>
                    <Footer />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
 
export default Router;