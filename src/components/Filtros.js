import React, { Component } from 'react'
import Linea from './Linea';
import Estado from './Estado';
import Presentacion from './Presentacion';
import {setEstadoFiltro, setPresentacionFiltro, setLineaFiltro, borrarPresentacionFiltro, borrarEstadoFiltro, borrarLineaFiltro} from './Actions/filtroActions'
import { connect } from 'react-redux'

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
        tooglePresentaciones: {
            mostrar: false,
            mensaje: "más"
        },
        linea: [],
        lineas: [],
        estado: '',
        estados: [],
        presentaciones: [],
        presentacion: ''
    }

    componentDidMount() {
        const { lineas, estados, presentacion, filtros } = this.props
        this.setState({
            lineas,
            estados,
            presentaciones: presentacion
        })
        if (filtros) {
            this.setState({
                estado: filtros.estado,
                linea: filtros.lineas
            })
        }
    }

    obtenerIdLinea = (idLinea) => {
        if (!document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosLinea(idLinea);   
        }
        var linea = this.state.lineas.filter(linea => (
            linea.id === idLinea
        ))
        if (this.state.linea.indexOf(linea[0].nombre) === -1) {
            let lineas = [...this.state.linea, linea[0].nombre]
            this.setState({
                linea: lineas
            })  
        }
    }

    obtenerIdPresentacion = (idPresentacion) => {
        
        if(!document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosPresentacion(idPresentacion)
        }

        let presentacion = this.state.presentaciones.find(presentacion => (
            presentacion.id === idPresentacion
        ))

        if (this.state.presentacion !== presentacion) {
            this.setState({
                // presentaciones: presentaciones,
                presentacion: presentacion.nombre
            })  
        }
    }

    obtenerIdEstado = (idEstado) => {
        if(!document.location.pathname.includes("/latiendadelpintor/detail")) {
            this.props.filtrosEstado(idEstado)
        }
        let estado = this.state.estados.filter(estado => (
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
    tooglePresentaciones = () => {
        if (this.state.tooglePresentaciones.mostrar) {
            this.setState({
                tooglePresentaciones: {
                    mostrar: false,
                    mensaje: "más"
                }
            })
        } else {
            this.setState({
                tooglePresentaciones: {
                    mostrar: true,
                    mensaje: "menos"
                }
            })
        }
    }
    borrarFiltro = (e) => {
        let borrarLinea = e.currentTarget.value;
        let filtro
        if (borrarLinea === this.state.estado) {
            this.setState({
                estado: ''
            })
            if (!document.location.pathname.includes("/latiendadelpintor/detail")) {
                filtro = {
                    estado: borrarLinea
                }
                this.props.borrarFiltro(filtro)
            }
        } else if (borrarLinea === this.state.presentacion) {
            this.setState({
                presentacion: ''
            })
            if (!document.location.pathname.includes("/latiendadelpintor/detail")) {
                filtro = {
                    presentacion: borrarLinea
                }
                this.props.borrarFiltro(filtro)
            }
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
                filtro = {
                    lineas: linea[0].id
                }
                this.props.borrarFiltro(filtro)
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
        // console.log(this.state.presentaciones)
        var lineas =    <React.Fragment>
                            <div className="collapse multi-collapse" id="CollapseLineas">
                                {
                                    (this.state.lineas.slice(4, 24)).map(linea => (
                                        <Linea 
                                            linea={linea}
                                            key={linea.id}
                                            idLinea={this.obtenerIdLinea}
                                        />
                                    ))
                                }
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
                        </React.Fragment>
        var presentaciones =    <React.Fragment>
                                    <div className="collapse multi-collapse" id="CollapsePresentaciones">
                                        {
                                            (this.state.presentaciones.slice(4, 24)).map(presentacion => (
                                                <Presentacion 
                                                    presentacion={presentacion}
                                                    key={presentacion.id}
                                                    name={'Crsitiam probando'}
                                                    obtenerIdPresentacion={this.obtenerIdPresentacion}
                                                />
                                            ))
                                        }
                                    </div>
                                    <a  
                                        onClick={this.tooglePresentaciones}
                                        className="mostrar"
                                        data-toggle="collapse" 
                                        href="#CollapsePresentaciones" 
                                        role="button" 
                                        aria-expanded="false" 
                                        aria-controls="CollapsePresentaciones"
                                    >
                                        Ver {this.state.tooglePresentaciones.mensaje}
                                    </a>
                                </React.Fragment>
        return (  
            <div>
                <div className="filters-area filtro-ubicacion">
                    <div className="close-filtros">
                        <button onClick={this.cerrarFiltros} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                        </button>
                    </div>
                    <button className="done-button" onClick={this.cerrarFiltros}>Aplicar filtros</button>

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
                        {   
                            (this.state.lineas.length <= 4)
                                ?   this.state.lineas.map(linea => (
                                        <Linea 
                                            linea={linea}
                                            key={linea.id}
                                            idLinea={this.obtenerIdLinea}
                                        />
                                    ))
                                :   (this.state.lineas.slice(0, 4)).map(linea => (
                                        <Linea 
                                            linea={linea}
                                            key={linea.id}
                                            idLinea={this.obtenerIdLinea}
                                        />
                                    ))
                        }
                        {
                            (this.state.lineas.length >= 5) 
                                ?   lineas
                                :   ''
                        }
                    </ul>
                </div>
                <div className="filters-area">
                <h3>Presentación</h3>
                    <div id="current-filters-presentacion" className="current-filters">
                        {
                            (this.state.presentacion.length > 0)
                            ?   <button type="submit" className="active-filter" onClick={this.borrarFiltro} value={this.state.presentacion}>{this.state.presentacion}</button>
                            :   ""
                        }
                    </div>
                    <ul id="presentacion" className="filters">
                        {   
                            (this.state.presentaciones.length <= 4)
                                ?   this.state.presentaciones.map(presentacion => (
                                        <Presentacion 
                                            presentacion={presentacion}
                                            key={presentacion.id}
                                            obtenerIdPresentacion={this.obtenerIdPresentacion}
                                        />
                                    ))
                                :   (this.state.presentaciones.slice(0, 4)).map(presentacion => (
                                        <Presentacion 
                                            presentacion={presentacion}
                                            key={presentacion.id}
                                            obtenerIdPresentacion={this.obtenerIdPresentacion}
                                        />
                                    ))
                        }
                        {
                            (this.state.presentaciones.length >= 5) 
                                ?   presentaciones
                                :   ''
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

// export default Filtros;
function mapStateToProps(state){
    return {
        lineaFiltro: state.lineaFiltro,
        presentacionFiltro: state.presentacionFiltro,
        estadoFiltro: state.estadoFiltro
    }
}


function mapDispatchToProps(){
    return {
        borrarLineaFiltro,
        borrarEstadoFiltro,
        borrarPresentacionFiltro,
        setEstadoFiltro,
        setPresentacionFiltro,
        setLineaFiltro
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Filtros)