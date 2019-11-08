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
        linea: [],
        lineas: [],
        estado: '',
        estados: []
    }

    componentDidMount() {
        const { lineas, estados } = this.props
        this.setState({
            lineas,
            estados
        })
    }

    obtenerIdLinea = (idLinea) => {
        if (!document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosLinea(idLinea);   
        }
        var linea = this.state.lineas.filter(linea => (
            linea.id === idLinea
        ))
        console.log(linea[0].nombre)
        // console.log(this.state.lineas)
        if (this.state.linea.indexOf(linea[0].nombre) === -1) {
            let lineas = [...this.state.linea, linea[0].nombre]
            this.setState({
                linea: lineas
            })  
        }
    }
    obtenerIdEstado = (idEstado) => {
        if(!document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosEstado(idEstado)
        }
        var estado = this.state.estados.filter(estado => (
            estado.id === idEstado
        ))
        this.setState({
            estado: estado[0].nombre
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
        if (borrarLinea === this.state.estado) {
            this.setState({
                estado: ''
            })
        } else {
            var linea = this.state.lineas.filter(linea => (
                linea.nombre === borrarLinea
            ))
            var lineas = [...this.state.linea];
            var indiceLinea = lineas.indexOf(borrarLinea);
            lineas.splice(indiceLinea, 1)
            this.setState({
                linea: lineas
            })
            if (!document.location.pathname.includes("/latiendadelpintor/detail")) {
                this.props.borrarFiltro(linea[0].id)
            }
        }
    }
    cerrarFiltros = () => {
        document.getElementById('filtros').setAttribute('class', 'filtros slideout col-sm-3 col-lg-2');
        setTimeout(() => {
            document.getElementById('filtros').setAttribute('class', 'filtros col-sm-3 col-lg-2');
            document.getElementById('besign-footer').setAttribute('class', '');
        }, 1000);
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
                            (this.state.linea.length > 0)
                            ?   this.state.linea.map((linea, key) => (
                                    <button type="submit" key={key} className="active-filter" onClick={this.borrarFiltro} value={linea}>{linea}</button>
                                ))
                            :   ""
                        }
                    </div>
                    <ul id="linea" className="filters">
                        {(this.state.lineas.slice(0, 4)).map(linea => (
                            <Linea 
                                linea={linea}
                                key={linea.id}
                                idLinea={this.obtenerIdLinea}
                            />
                        ))}
                        <div className="collapse multi-collapse" id="CollapseLineas">
                            {(this.state.lineas.slice(4, 24)).map(linea => (
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