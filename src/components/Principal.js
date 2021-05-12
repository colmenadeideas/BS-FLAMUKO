import React, { Component } from 'react'
import Buscador from './Buscador';
import {hexToHSL} from './styleFunctions'

class Principal extends Component {
    render() { 

        const color = hexToHSL('#0000FF')
        return (  
            <div className="col-12 principal slide">
                <h2>Busca tu producto o color</h2>
                <Buscador 
                    busqueda={this.props.busqueda}
                />
                
            </div>
        );
    }
}
 
export default Principal;