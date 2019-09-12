import React, { Component } from 'react';
import axios from 'axios';
import flamuko from '../img/flamuko-flagloss.png';
import SingleExistencia from './SingleExistencia';
import Filtros from './Filtros';
import Cargando from './Cargando';

class SingleProducto extends Component {
    state = {  
        producto: [],
        lineas: [],
        estados: [],
        existencia: [],
        cargando: true
    }
    componentDidMount() {
        this.obtenerProducto()
    }

    obtenerProducto = async () => {
        let url = `http://lab.besign.com.ve/flamuko/html/api/detail/${this.props.idProducto}`
        await axios(url)
            .then(res => {
                this.setState({
                    producto: res.data.producto[0],
                    existencia: res.data.existencia
                }, () => {
                    this.obtenerLineas()
                })
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
                    estados: res.data,
                    cargando: false
                })
            })
    }
    render() { 
        const {nombre} = this.state.producto
        const producto =    <div className="App slide row">
                                <div id="filtros" className="filtros col-sm-3 col-lg-2">
                                    <Filtros 
                                        lineas={this.state.lineas}
                                        estados={this.state.estados}
                                    />
                                </div>
                                <div className="main col-sm-9 col-lg-10">
                                    <div className="row product-display no-gutters">
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <h4 className="nombre-producto">{nombre}</h4>
                                            <div className="card result-card-detail div-img">					
                                                <img className="img-producto" src={flamuko} alt={nombre}/>
                                            </div>
                                        </div>
                                        <SingleExistencia 
                                            existencia={this.state.existencia}
                                            producto={this.state.producto}
                                        />
                                    </div>
                                </div>
                            </div>
        return (  
            <React.Fragment>
                    {
                        (this.state.cargando)
                            ?   <Cargando />
                            :   producto
                    }
            </React.Fragment>
        );
    }
}
 
export default SingleProducto;