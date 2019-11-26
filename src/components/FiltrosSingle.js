import React, { Component } from 'react';
import Estado from './Estado';

class FiltrosSingle extends Component {
    state = {  
        estado: '',
        estados: [],
        toogleEstados: {
            mostrar: false,
            mensaje: "más"
        }
    }
    componentDidMount() {
        this.setState({
            estados: this.props.estados
        })
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
    obtenerIdEstado = (idEstado) => {
        if(document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosEstado(idEstado)
        }
        let estado = this.props.estados.filter(estado => (
            estado.id === idEstado
        ))
        this.setState({
            estado: estado[0].nombre
        })
    } 
    borrarFiltro = (e) => {
        this.setState({
            estado: ''
        })
        if (document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.borrarFiltro(e.currentTarget.value)
        }
    }
    render() { 
        var estados =   <React.Fragment>
                            <div className="collapse multi-collapse" id="CollapseEstados">
                                {
                                    (this.props.estados.slice(4, 24)).map(estado => (
                                        <Estado 
                                            estado={estado}
                                            key={estado.id}
                                            idEstado={this.obtenerIdEstado}
                                        />
                                    ))
                                }
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
                        </React.Fragment>
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
                        {   
                            (this.props.estados.length <= 4)
                                ?   this.props.estados.map(estado => (
                                        <Estado 
                                            estado={estado}
                                            key={estado.id}
                                            idEstado={this.obtenerIdEstado}
                                        />
                                    ))
                                :   (this.props.estados.slice(0, 4)).map(estado => (
                                        <Estado 
                                            estado={estado}
                                            key={estado.id}
                                            idEstado={this.obtenerIdEstado}
                                        />
                                    ))
                        }
                        {
                            (this.props.estados.length >= 5) 
                                ?   estados
                                :   ''
                        }
                    </ul>
                    <button className="done-button" onClick={this.cerrarFiltros}>Listo</button>
                </div>
            </div>
        );
    }
}
 
export default FiltrosSingle;