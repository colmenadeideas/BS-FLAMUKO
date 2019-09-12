import React, { Component } from 'react';
import Busqueda from './Busqueda';
import Cargando from './Cargando';
import { isObject, isNull } from 'util';
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
        cargando: true
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
            cargando: true
        })
        let producto = this.state.busqueda
        let url = `http://lab.besign.com.ve/flamuko/html/api/search/all/${producto}`
        axios.get(url)
            .then(res => {
                if(isObject(res.data)){
                    this.setState({
                        productos: res.data.productos,
                        respuesta: true
                    }, () => {
                        this.obtenerLineas()
                    })
                } else if (isNull(res.data)) {
                    this.setState({
                        resultados: {
                            busqueda: this.state.busqueda
                        },
                        respuesta: false,
                        cargando: false
                    })
                }
            })
    }
  
    obtenerLineas = () => {
        let url = `http://lab.besign.com.ve/flamuko/html/api/show/lineas`
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
        let url = `http://lab.besign.com.ve/flamuko/html/api/show/estados`
        axios.get(url)
            .then(res => {
                this.setState({
                    estados: res.data
                })
            })
            .then(() => {
                this.setState({
                    resultados: {
                        productos: this.state.productos,
                        lineas: this.state.lineas,
                        estados: this.state.estados,
                        busqueda: this.state.busqueda,
                        respuesta: this.state.respuesta
                    },
                    cargando: false
                })
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
                            />
                }
            </React.Fragment>
        );
    }
}

export default Home;
