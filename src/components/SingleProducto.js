import React, { Component } from 'react';
import axios from 'axios';
//import flamuko from '../img/flamuko-flagloss.png';
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
    showProduct = ( ) => {
        const {cod, nombre} = this.state.producto
        const pinturas = ['ARM-026', 'ARM-072', 'ARM-81', 'ARM-085', 'ARM-156', 'ARM-582', 'ARM-590', 'ARM-596', 'FLA-18', 'FLA-20', 'FLA-70', 'REG-359']
        console.log(cod);

        let pintura = pinturas.filter(nom => (
            cod.indexOf(nom) !== -1
        ))
        if (pintura === "") {
            pintura = "flamuko-flagloss"
        }

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
                                                <img className="img-producto" src={require("../img/bote-pintura/"+pintura+".png")} alt={nombre}/>
                                            </div>
                                        </div>
                                        <SingleExistencia 
                                            existencia={this.state.existencia}
                                            producto={this.state.producto}
                                        />
                                    </div>
                                </div>
                            </div>
        return producto
    }

    render() { 

        
        
        return (  
            <React.Fragment>
                    {
                        (this.state.cargando)
                            ?   <Cargando />
                            :   this.showProduct()
                    }
            </React.Fragment>
        );
    }
}
 
export default SingleProducto;