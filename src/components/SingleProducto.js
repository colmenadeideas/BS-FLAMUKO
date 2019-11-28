import React, { Component } from 'react';
import axios from 'axios';
import SingleExistencia from './SingleExistencia';
import Cargando from './Cargando';
import FiltrosSingle from './FiltrosSingle';

class SingleProducto extends Component {
    state = {  
        producto: [],
        estados: [],
        existencia: [],
        existenciaFiltrada: [],
        filtrado: false,
        cargando: true
    }
    componentDidMount() {
        this.obtenerProducto()
    }

    obtenerProducto = async () => {
        // let url = `http://lab.besign.com.ve/flamuko/html/api/detail/${this.props.idProducto}`
        let url = `http://localhost/flamuko/html/api/detail/${this.props.idProducto}`
        await axios(url)
            .then(res => {
                this.setState({
                    producto: res.data.producto[0],
                    existencia: res.data.existencia,
                    cargando: false
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
                this.filtrosEstados(estados)
            })
    }
    filtrosEstados = (estados) => {
        let filtrosEstados = this.state.estados
        this.state.existencia.map(tienda => (
            (filtrosEstados.indexOf(tienda.tienda[0].estado) === -1 && tienda.tienda[0].estado !== null)
                ?   filtrosEstados = [...filtrosEstados, tienda.tienda[0].estado]
                :   filtrosEstados
        ))
        let estado = estados.filter(estado => (
            filtrosEstados.indexOf(estado.id) !== -1
        ))
        this.setState({
            estados: estado
        })
    }
    filtrosEstado = (idEstado) => {
        let existenciaFiltrada = this.state.existencia.filter(tienda => (
            (tienda.tienda[0].estado === idEstado && tienda.tienda[0].estado !== null)
        ))
        this.setState({
            existenciaFiltrada,
            filtrado: true
        })
    }
    borrarFiltro = () => {
        this.setState({
            filtrado: false
        })
    }
    showProduct = ( ) => {
        const {cod, nombre, color, presentacion} = this.state.producto
        const pinturas = ['ARM026', 'ARM072', 'ARM81', 'ARM085', 'ARM156', 'ARM582', 'ARM590', 'ARM596', 'FLA18', 'FLA20', 'FLA40', 'FLA70', 'FLA355', 'REG359']

        let envase
        let icon = ''
        switch (presentacion) {
            case '1':
                envase = 'Galón'
                icon = 'galon.png'
                break;
            case '4':
                envase = 'Cuarto'
                icon = 'cuartico.png'
                break;
            case '3':
                envase = 'Cuñete 3 galones'
                icon = 'cunete.png'
                break;
            case '40':
                envase = 'Cuñete 4 galones'
                icon = 'cunete.png'
                break;
            case '5':
                envase = 'Cuñete 5 galones'
                icon = 'cunete.png'
                break;
            case '53':
                envase = 'Tambor'
                break;

            default:
                envase = '' 
                break;
        }
        let pintura = pinturas.filter(nom => (
            cod.indexOf(nom) !== -1
        ))
        if (pintura === "") {
            pintura = "flamuko-flagloss"
        }

        const producto =    <div className="App slide row">
                                <div id="filtros" className="filtros col-sm-3 col-lg-2">
                                    <FiltrosSingle
                                        estados={this.state.estados}
                                        filtrosEstado={this.filtrosEstado}
                                        borrarFiltro={this.borrarFiltro}
                                    />
                                </div>
                                <div className="main col-sm-9 col-lg-10">
                                    <div className="row product-display no-gutters">
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <h4 className="nombre-producto">{nombre}</h4>
                                            <div className="card result-card-detail div-img" style={{background: color}}>					
                                                <img className="img-producto" src={`/latiendadelpintor/img/bote-pintura/${pintura[0]}.png`} alt={nombre}/>
                                            </div>
                                            {
                                                (envase !== '')
                                                    ?   <div className="presentacion presentacion-detail">
                                                            <h4 className="presentacion__title"><b>{envase}</b></h4>
                                                            {icon !== ''
                                                                ?   <div><img src={`/latiendadelpintor/img/${icon}`} className="presentacion__img" alt="icon" /></div>
                                                                :   <div><i className="fas fa-brush"></i></div>
                                                            }
                                                        </div>
                                                    :   ''
                                            }
                                        </div>
                                        {   
                                            (!this.state.filtrado)   
                                                ?   <SingleExistencia   
                                                        existencia={this.state.existencia}
                                                        producto={this.state.producto}
                                                    />
                                                :   <SingleExistencia   
                                                        existencia={this.state.existenciaFiltrada}
                                                        producto={this.state.producto}
                                                    />
                                        }
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