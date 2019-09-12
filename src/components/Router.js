import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import SingleProducto from './SingleProducto';
import Header from './Header';
import Footer from './Footer';
import Principal from './Principal';

class Router extends Component {
    render() { 
        return (  
            <BrowserRouter>
                <React.Fragment>
                    <div id="header">
                        <Header />
                    </div>
                    <Switch>
                        <Route exact path="/latiendadelpintor" component={Principal} />
                        <Route exact path="/latiendadelpintor/:nombreProducto" render={(props) => {
                            var nombreProducto = props.location.pathname.replace('/latiendadelpintor/', '')
                            return ( 
                                <React.Fragment>
                                    <Home 
                                        busqueda={nombreProducto}                    
                                    />
                                </React.Fragment>
                            )
                        }} />
                        <Route exact path="/latiendadelpintor/detail/:idProducto" render={(props) => {
                            const idProducto = props.location.pathname.replace('/latiendadelpintor/detail/', '')
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