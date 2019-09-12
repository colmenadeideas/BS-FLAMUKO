import React, { Component } from 'react'
import Linea from './Linea';
import Estado from './Estado';

class Filtros extends Component {
    state = {  
        toogleLineas: {
            mostrar: false,
            mensaje: "más"
        },
        toogleEstados: {
            mostrar: false,
            mensaje: "más"
        },
        lineas: [],
        estado: ''
    }

    obtenerIdLinea = (idLinea) => {
        if(document.location.pathname === "/") {
            this.props.filtrosLinea(idLinea);
        }
        var linea = this.props.lineas[idLinea - 1].nombre
        var lineas;
        if (this.state.lineas.length === 0) {
            lineas = [...this.state.lineas, linea]
            this.setState({
                lineas
            })
        } else {
            if (this.state.lineas.indexOf(linea) === -1) {
                lineas = [...this.state.lineas, linea]
                this.setState({
                    lineas
                })
            }
        }
    }
    obtenerIdEstado = (idEstado) => {
        if(document.location.pathname === "/") {
            this.props.filtrosEstado(idEstado)
        }
        var estado = this.props.estados[idEstado - 1].nombre
        this.setState({
            estado
        })
    } 
    toogleLineas = () => {
        if (this.state.toogleLineas.mostrar) {
            this.setState({
                toogleLineas: {
                    mostrar: false,
                    mensaje: "más"
                }
            })
        } else {
            this.setState({
                toogleLineas: {
                    mostrar: true,
                    mensaje: "menos"
                }
            })
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
    borrarFiltro = (e) => {
        var borrarLinea = e.currentTarget.value;
        var linea = this.props.lineas.filter(linea => {
            if (linea.nombre === borrarLinea) return linea
        })
        var lineas = [...this.state.lineas];
        var indiceLinea = lineas.indexOf(borrarLinea);
        lineas.splice(indiceLinea, 1)
        this.setState({
            lineas
        })
        if (document.location.pathname === "/") {
            this.props.borrarFiltro(linea[0].id)
        }
    }
    cerrarFiltros = () => {
        document.getElementById('filtros').setAttribute('class', 'filtros slideout col-sm-3 col-lg-2');
        setTimeout(() => {
            document.getElementById('filtros').setAttribute('class', 'filtros col-sm-3 col-lg-2');
            document.getElementById('besign-footer').setAttribute('class', '');
        }, 1000);
    }
    busqueda = () => {
        // filtros/color/string
        // string = linea: 1,2,3&ubicacion:1&presentacion: 1
    }
    render() { 
        return (  
            <div className="col-12">
                <div className="filters-area">
                    <h3>Ubicación</h3>
                    <div id="current-filters-ubicacion" className="current-filters">
                    </div>
                    <ul id="ubicacion" className="filters">
                        {(this.props.estados.slice(0, 4)).map(estado => (
                            <Estado 
                                estado={estado}
                                key={estado.id}
                                idEstado={this.obtenerIdEstado}
                            />
                        ))}
                        <div className="collapse multi-collapse" id="CollapseEstados">
                            {(this.props.estados.slice(4, 24)).map(estado => (
                                <Estado 
                                    estado={estado}
                                    key={estado.id}
                                    idEstado={this.obtenerIdEstado}
                                />
                            ))}
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
                <div className="filters-area">
                    <h3>Línea</h3>
                    <div id="current-filters-linea" className="current-filters">
                        {
                            (this.state.lineas.length > 0)
                            ?   this.state.lineas.map((linea, key) => (
                                    <button type="submit" key={key} className="active-filter" onClick={this.borrarFiltro} value={linea}>{linea}</button>
                                ))
                            :   ""
                        }
                    </div>
                    <ul id="linea" className="filters">
                        {(this.props.lineas.slice(0, 4)).map(linea => (
                            <Linea 
                                linea={linea}
                                key={linea.id}
                                idLinea={this.obtenerIdLinea}
                            />
                        ))}
                        <div className="collapse multi-collapse" id="CollapseLineas">
                            {(this.props.lineas.slice(4, 24)).map(linea => (
                                <Linea 
                                    linea={linea}
                                    key={linea.id}
                                    idLinea={this.obtenerIdLinea}
                                />
                            ))}
                        </div>
                        <a  
                            onClick={this.toogleLineas}
                            className="mostrar"
                            data-toggle="collapse" 
                            href="#CollapseLineas" 
                            role="button" 
                            aria-expanded="false" 
                            aria-controls="CollapseLineas"
                        >
                            Ver {this.state.toogleLineas.mensaje}
                        </a>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Filtros;