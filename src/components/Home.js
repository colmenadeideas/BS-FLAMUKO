import React, { Component } from 'react';
import Busqueda from './Busqueda';
import Cargando from './Cargando';
import axios from 'axios';


class Home extends Component {
    state = {
        busqueda: "",
        productos: [],
        lineas: [],
        estados: [],
        respuesta: Boolean,
        resultados: {
            productos: [],
            lineas: [],
            estados: [],
            busqueda: "",
            respuesta: Boolean
        },
        cargando: true,
        filtrado: false,
        cargandoFiltrado: false,
        filtros: {
            lineas: [],
            estado: ''
        }
    }
    componentDidMount() {
        this.obtenerBusqueda()
    }
    componentDidUpdate() {
        if (this.props.busqueda === this.state.busqueda) return null
        this.obtenerBusqueda()
    }
    obtenerBusqueda = () => {
        var busqueda = this.props.busqueda
        this.setState({
            busqueda: busqueda.toLowerCase()
        }, () => {
            this.obtenerResultados()
        })
    }

    obtenerResultados = () => {
        if (this.state.resultados.busqueda === this.state.busqueda) return null
        this.setState({
            cargando: true,
            filtrado: false,
            cargandoFiltrado: false
        })
        let producto = this.state.busqueda
        let url = `http://lab.besign.com.ve/flamuko/html/api/search/all/${producto.replace(' ', '-')}`
        // let url = `http://localhost/flamuko/html/api/search/all/${producto.replace(' ', '-')}`
        // console.log(url)
        axios.get(url)
            .then(res => {
                console.log(res.data)
                if (res.data.productos) {
                    this.setState({
                        productos: res.data.productos,
                        respuesta: true
                    }, () => {
                        this.obtenerLineas()
                    })
                    this.props.resultado(true)
                } else {
                    this.setState({
                        resultados: {
                            busqueda: this.state.busqueda
                        },
                        respuesta: false,
                        cargando: false
                    })
                    this.props.resultado(false)
                }
            })
    }
  
    obtenerLineas = () => {
        // let url = `http://lab.besign.com.ve/flamuko/html/api/show/lineas`
        let url = `http://localhost/flamuko/html/api/show/lineas`
        axios.get(url)
            .then(res => {
                this.setState({
                    lineas: res.data
                }, () => {
                    this.obtenerEstados()
                })
            })
    }

    obtenerEstados = () => {
        // let url = `http://lab.besign.com.ve/flamuko/html/api/show/estados`
        let url = `http://localhost/flamuko/html/api/show/estados`
        axios.get(url)
            .then(res => {
                let estados = res.data.sort((a, b) => {
                    if (a.nombre > b.nombre) {
                        return 1;
                    }
                    if (a.nombre < b.nombre) {
                        return -1;
                    }
                    return 0;
                });
                this.setState({
                    estados
                })
            })
            .then(() => {
                this.setState({
                    resultados: {
                        productos: this.state.productos,
                        lineas: this.state.lineas,
                        estados: this.state.estados,
                        busqueda: this.state.busqueda,
                        respuesta: this.state.respuesta,
                        presentacion: [
                            { id: "1", nombre: "Galón" },
                            { id: "4", nombre: "Cuarto" },
                            { id: "3", nombre: "Cuñete 3 galones" },
                            { id: "5", nombre: "Cuñete 5 galones" },
                            { id: "40", nombre: "Cuñete 4 galones" },
                            { id: "53", nombre: "Tambor" }
                        ]
                    }
                })
                this.obtenerLineasPresentacion()
            })
    }
    obtenerLineasPresentacion = () => {
        let lineasExistentes = []
        let presentacionesExistentes = []
        for(let i = 0; i < this.state.productos.length; i++) {
            let producto = this.state.productos[i]
            if (lineasExistentes.indexOf(producto.linea) === -1 && producto.linea !== null) {
                lineasExistentes = [...lineasExistentes, producto.linea]
            }
            if (presentacionesExistentes.indexOf(producto.presentacion) === -1 && producto.presentacion !== null) {
                presentacionesExistentes = [...presentacionesExistentes, producto.presentacion]
            }
        }
        let presentacion = this.state.resultados.presentacion.filter(presen => (
            presentacionesExistentes.indexOf(presen.id) !== -1
        ))
        let lineas = this.state.lineas.filter(linea => (
            lineasExistentes.indexOf(linea.id) !== -1
        ))
        let resultados = this.state.resultados
        resultados.lineas = lineas
        resultados.presentacion = presentacion
        this.setState({
            resultados,
            cargando: false
        })
    }
    obtenerBusquedaFiltrada = (busqueda) => {
        // console.log(busqueda)
        let lineas = 0
        if (busqueda.lineas.length > 0) {
            busqueda.lineas.map(linea => (
                (lineas)
                    ?   lineas = lineas + "," + linea
                    :   lineas = linea
            ))
        }
        let color = this.state.busqueda.replace('/', '') 
        // let url = `http://lab.besign.com.ve/flamuko/html/api/search/filtros/${color}/lineas:${lineas}-ubicacion:${busqueda.estado}`
        let url = `http://localhost/flamuko/html/api/search/filtros/${color}/lineas:${lineas}-ubicacion:${busqueda.estado}`
        this.setState({
            cargandoFiltrado: true
        })
        axios.get(url)
            .then(res => {
                console.log(res.data)
                let resultados = this.state.resultados
                resultados.productos = res.data
                this.setState({
                    resultados,
                    cargandoFiltrado: false
                })
                if (res.data.length === 0) {
                    this.setState({
                        filtrado: true
                    })
                }
            })
    }
    filtrosLinea = (linea) => {
        let lineas = []
        let filtros = this.state.filtros
        let nombresFiltros = this.state.lineas.filter(filtro => (
            linea.indexOf(filtro.id) !== -1
        ))
        nombresFiltros.map(filtro => (
            lineas = [...lineas, filtro.nombre]
        ))
        filtros.lineas = lineas
        this.setState({
            filtros
        })
    }
    filtrosEstado = (estado) => {
        let estados = []
        let filtros = this.state.filtros
        let nombresFiltros = this.state.estados.filter(filtro => (
            filtro.id === estado
        ))
        nombresFiltros.map(filtro => (
            estados = [...estados, filtro.nombre]
        ))
        filtros.estado = estados
        this.setState({
            filtros
        })
    }
    borrarEstado = estado => {
        let resultados = this.state.resultados
        resultados.productos = this.state.productos
        this.setState({
            resultados,
            filtrado: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    (this.state.cargando)
                        ?   <Cargando />
                        :   <Busqueda
                                busqueda={this.obtenerBusqueda} 
                                resultados={this.state.resultados}  
                                respuesta={this.state.respuesta}  
                                idEstado={this.obtenerBusquedaFiltrada}
                                filtrado={this.state.filtrado}
                                cargando={this.state.cargandoFiltrado}
                                linea={this.filtrosLinea}
                                estado={this.filtrosEstado}
                                presentacion={this.filtrosPresentacion}
                                borrarEstado={this.borrarEstado}
                            />
                }
            </React.Fragment>
        );
    }
}

export default Home;
