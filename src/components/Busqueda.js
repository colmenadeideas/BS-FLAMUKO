import React, { Component } from 'react'
// import Productos from './Productos';
// import Filtros from './Filtros';
import Productos from './Productos';
import Filtros from './Filtros';
import Cargando from './Cargando';
import NotFound from './NotFound'

class Busqueda extends Component {
  state = {  
    linea: [],
    estado: "",
    presentacion: "",
    filtros: true,
    filtroLinea: "",
    filtroPresentacion:"",
    filtroEstado:""
  }

  setFilter = ( value) => {
    this.setState({
      value
    })

  }

  filtrosLinea = (nuevalinea) => {
    var linea;
    if (this.state.linea.indexOf(nuevalinea) === -1) {
      linea = [...this.state.linea, nuevalinea]
      this.props.linea(linea)
      this.setState({
        linea,
        filtros: true
      })
    }
  } 

  filtrosEstado = (idEstado) => {
    const busqueda = {
      lineas: this.state.linea,
      presentacion: this.state.presentacion,
      estado: idEstado
    }
    this.props.idEstado(busqueda)
    this.props.estado(idEstado)
  }

  filtrosPresentacion = (presentacion) => {
    this.setState({
      presentacion
    })
  }

  borrarFiltro = (borrarFiltros) => {
    // var contador = 0;
    if (borrarFiltros.lineas) {
      var filtrosActuales = [...this.state.linea]
      var filtrosNuevos = filtrosActuales.filter(filtro => (filtro !== borrarFiltros.lineas))
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
    } else if (borrarFiltros.estado) {
      this.props.borrarEstado(borrarFiltros.estado)
    } else if (borrarFiltros.presentacion) {
      this.setState({
        presentacion: ""
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

  toogleFiltros = () => {
    document.getElementById('filtros').setAttribute('class', 'filtros slidein col-sm-3 col-lg-2');
    document.getElementById('besign-footer').setAttribute('class', 'none');
  }

  render() { 
    const { productos, lineas, estados, busqueda, presentacion } = this.props.resultados
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
    if (this.state.presentacion.length > 0) {
      console.log(resultado)
      let filtro = resultado
      resultado = filtro.filter(producto => (
        producto.presentacion === this.state.presentacion
      ))
      console.log(resultado)
    }


    
    const noResultados =  <NotFound sugerencia={true} />
    const resultados =  <div className="container-fluid slide">
                          <div className="row">
                            <div id="filtros" className="filtros col-sm-3 col-lg-2">
                                <Filtros 
                                  lineas={lineas}
                                  estados={estados}
                                  presentacion={presentacion}
                                  filtrosLinea={this.filtrosLinea}
                                  filtrosEstado={this.filtrosEstado}
                                  filtrosPresentacion={this.filtrosPresentacion}
                                  borrarFiltro={this.borrarFiltro}
                                />
                            </div>
                            <div className="main col-12 col-sm-9 col-lg-10">
                              <div className="row productos-indicador align-items-center">
                                  <h6>{productos.length} Resultados para <span>"{busqueda.replace('/', '')}"</span></h6>
                                  <span className="toogle-button" onClick={this.toogleFiltros}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                      </svg>
                                  </span>
                                  {/* {
                                      (this.state.estado.length > 0)
                                      ?   <button type="submit" className="active-filter" onClick={this.borrarFiltro} value={this.state.estado}>{this.state.estado}</button>
                                      :   null
                                  }
                                  {
                                      (this.state.presentacion.length > 0)
                                      ?   <button type="submit" className="active-filter" onClick={this.borrarFiltro} value={this.state.presentacion}>{this.state.presentacion}</button>
                                      :   null
                                  }
                                  {(this.state.linea.length > 0)
                                      ?   this.state.linea.map((linea, key) => (
                                              <button type="submit" key={key} className="active-filter" onClick={this.borrarFiltro} value={linea}>{linea}</button>
                                          ))
                                      :   null} */}
                              </div>	
                              {
                                (this.props.cargando) 
                                  ? <Cargando />
                                  : (this.props.filtrado)
                                      ? noResultados
                                      : <Productos 
                                          productos={resultado}
                                          busqueda={busqueda}
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