import React, { Component } from 'react'
import Productos from './Productos';
import Filtros from './Filtros';
import Cargando from './Cargando';

class Busqueda extends Component {
  state = {  
    linea: [],
    estado: "",
    filtros: true
  }

  filtrosLinea = (nuevalinea) => {
    var linea;
    if (this.state.linea.indexOf(nuevalinea) === -1) {
      linea = [...this.state.linea, nuevalinea]
      this.setState({
        linea,
        filtros: true
      })
    }
  } 

  
  filtrosEstado = (idEstado) => {
    const busqueda = {
      lineas: this.state.linea,
      estado: idEstado
    }
    this.props.idEstado(busqueda)
    this.setState({
      estado: idEstado
    })  
  }
  borrarFiltro = (borrarFiltros) => {
    // var contador = 0;
    var filtrosActuales = [...this.state.linea]
    var filtrosNuevos = filtrosActuales.filter(filtro => (filtro !== borrarFiltros))
    this.setState({
      linea: filtrosNuevos
    })
    if (filtrosNuevos.some(Number)) {
      this.setState({
        filtros: true
      })
    } else {
      this.setState({
        filtros: false
      })
    }
    // if (nuevosFiltros.length === 1) {
    //   this.setState({
    //     linea: nuevosFiltros,
    //     filtros: false
    //   })
    // } else {
    // this.setState({
    //   linea: nuevosFiltros,
    //   filtros: true
    // })
    // }
    // if (contador === 0 && nuevosFiltros.length === 1) {
    //   contador++;
    // }
  }
  render() { 
    const { productos, lineas, estados, busqueda } = this.props.resultados
    let filtradoLinea = [];
    // let filtradoEstado = [];
    let resultado = [];
    // if (this.state.estado && this.state.linea.length === 0) {
    //     filtradoEstado.push(productos.filter(producto => (
    //         producto.estado.indexOf(this.state.estado) !== -1
    //     )))
    //     filtradoEstado.map(filtro => (
    //         resultado = resultado.concat(filtro)
    //     ))
    // } else if (this.state.estado && this.state.linea.length > 0) {
    //       resultado = resultado.filter(filtro => (
    //             filtro.estado.indexOf(this.state.estado) !== -1
    //       ))
    // } else if (!(this.state.estado) && this.state.linea.length > 0) {
    //     this.state.linea.map(linea => (
    //         filtradoLinea.push(productos.filter(producto => (
    //             producto.linea.indexOf(linea) !== -1
    //         )))
    //     ))
    //     filtradoLinea.map(filtro => (
    //         resultado = resultado.concat(filtro)
    //     ))
    // } else {
    //     resultado = productos
    // }

    if (this.state.linea.length > 0) {
      this.state.linea.map(linea => (
          filtradoLinea.push(productos.filter(producto => (
              producto.linea.indexOf(linea) !== -1
          )))
      ))
      filtradoLinea.map(filtro => (
          resultado = resultado.concat(filtro)
      ))
    } else {
      resultado = productos
    }

    if(!this.state.filtros) {
      resultado = productos;
    }

    const noResultados =  <h1 className="slide">No se encontraron resultados</h1>
    const resultados =  <div className="container-fluid slide">
                          <div className="row">
                            <div id="filtros" className="filtros col-sm-3 col-lg-2">
                                <Filtros 
                                  lineas={lineas}
                                  estados={estados}
                                  filtrosLinea={this.filtrosLinea}
                                  filtrosEstado={this.filtrosEstado}
                                  borrarFiltro={this.borrarFiltro}
                                />
                            </div>
                            <div className="main col-12 col-sm-9 col-lg-10">
                              {
                                (this.props.cargando) 
                                  ? <Cargando />
                                  : (this.props.filtrado)
                                    ? noResultados
                                    : <Productos 
                                        productos={resultado}
                                        busqueda={busqueda}
                                        linea={this.state.linea}
                                        estado={this.state.estado}
                                        filtrado={this.props.filtrado}
                                      />
                              }
                            </div>
                          </div>
                        </div>

    return (  
      <React.Fragment>
        {(this.props.respuesta) ? resultados : noResultados}
      </React.Fragment>
    );
  }
}
 
export default Busqueda;