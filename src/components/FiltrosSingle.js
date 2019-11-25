import React, { Component } from 'react';
import Estado from './Estado';

class FiltrosSingle extends Component {
    state = {  
        estado: '',
        toogleEstados: {
            mostrar: false,
            mensaje: "más"
        }
    }
    toogleEstados = () => {
        if (this.state.toogleEstados.mostrar) {
            this.setState({
                toogleEstados: {
                    mostrar: false,
                    mensaje: "más"
                }
            })
        } else {
            this.setState({
                toogleEstados: {
                    mostrar: true,
                    mensaje: "menos"
                }
            })
        }
    }
    render() { 
        return (  
            <div className="col-12">
                <div className="filters-area">
                    <h3>Ubicación</h3>
                    <div id="current-filters-ubicacion" className="current-filters">
                        {
                            (this.state.estado.length > 0)
                            ?   <button type="submit" className="active-filter" onClick={this.borrarFiltro} value={this.state.estado}>{this.state.estado}</button>
                            :   ""
                        }
                    </div>
                    <ul id="ubicacion" className="filters">
                        {/* {(this.props.estados.slice(0, 4)).map(estado => (
                            <Estado 
                                estado={estado}
                                key={estado.id}
                                idEstado={this.obtenerIdEstado}
                            />
                        ))} */}
                        <div className="collapse multi-collapse" id="CollapseEstados">
                            {/* {(this.props.estados.slice(4, 24)).map(estado => (
                                <Estado 
                                    estado={estado}
                                    key={estado.id}
                                    idEstado={this.obtenerIdEstado}
                                />
                            ))} */}
                        </div>
                        <a  
                            onClick={this.toogleEstados}
                            className="mostrar"
                            data-toggle="collapse" 
                            href="#CollapseEstados" 
                            role="button" 
                            aria-expanded="false" 
                            aria-controls="CollapseEstados"
                        >
                            Ver {this.state.toogleEstados.mensaje}
                        </a>
                    </ul>
                    <button className="done-button" onClick={this.cerrarFiltros}>Listo</button>
                </div>
            </div>
        );
    }
}
 
export default FiltrosSingle;