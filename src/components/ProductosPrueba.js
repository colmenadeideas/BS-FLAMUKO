import React, { Component } from 'react'
import Producto from './Producto';
import {borrarFiltro} from './Actions/filtroActions'
import { borrarPresentacionFiltro, borrarEstadoFiltro, borrarLineaFiltro} from './Actions/filtroActions'
import {connect} from 'react-redux'


class Productos extends Component {
    state = {  
        productos: this.props.productos,
        currentPage: 1,
        todosPerPage: Number,
        screenWidth: Number
    }

    componentDidMount() {
        if (window.outerWidth === this.state.screenWidth) return null
        this.screenSize();
    }

    componentDidUpdate() {
        if (this.state.productos === this.props.productos) return null
        this.setState({
            productos: this.props.productos
        })
    }

    handleClick = (e) => {
        const idBefore = this.state.currentPage
        document.getElementById(idBefore).setAttribute('class', 'page-link')
        this.setState({
            currentPage: Number(e.target.id)
        });
        const idAfter = e.target.id
        document.querySelector('#header').scrollIntoView(true);
        document.getElementById(idAfter).setAttribute('class', 'page-link active-page')
    }

    prevPage = () => {
        const page = this.state.currentPage
        document.getElementById(page).setAttribute('class', 'page-link')
        this.setState({
            currentPage: page - 1
        });
        const idAfter = page - 1
        document.querySelector('#header').scrollIntoView(true);
        document.getElementById(idAfter).setAttribute('class', 'page-link active-page')
    }

    nextPage = () => {
        var page = this.state.currentPage
        document.getElementById(page).setAttribute('class', 'page-link')
        this.setState({
            currentPage: page + 1
        });
        const idAfter = page + 1
        document.querySelector('#header').scrollIntoView(true);
        document.getElementById(idAfter).setAttribute('class', 'page-link active-page')
    }

    screenSize = () => {
        if(window.outerWidth >= 992) {
            this.setState({
                todosPerPage: 27,
                screenWidth: window.outerWidth
            })
        } if (window.outerWidth >= 768 && window.outerWidth <= 991) {
            this.setState({
                todosPerPage: 18,
                screenWidth: window.outerWidth
            })
        } if (window.outerWidth >= 576 && window.outerWidth <= 767) {
            this.setState({
                todosPerPage: 9,
                screenWidth: window.outerWidth
            })
        } if (window.outerWidth >= 0 && window.outerWidth <= 575) {
            this.setState({
                todosPerPage: 9,
                screenWidth: window.outerWidth
            })
        }
    }   
    toogleFiltros = () => {
        document.getElementById('filtros').setAttribute('class', 'filtros slidein col-sm-3 col-lg-2');
        document.getElementById('besign-footer').setAttribute('class', 'none');
    }
    render() { 
        const { busqueda } = this.props
        
        if (this.props.productos === undefined | this.props.productos.length === 0) return null;

        const { productos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current productos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage ;
        const currentProductos = productos.slice(indexOfFirstTodo, indexOfLastTodo + 1);
  
        const renderTodos = currentProductos.map((producto, index) => {
            return (
                //si no tiene color asociado no se mostrara en la muestra de resultados
                (producto.color !== "" )
                
                    ?  
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12"> 
                        <Producto  
                            key={index}
                            producto={producto}                                     
                        />
                    </div>
                    :   ""
            );
        });
  
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(productos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }
  
        const renderPageNumbers = pageNumbers.map(number => {
          return(
            <li
                key={number}
                className="page-item"
            >
                <button className="page-link" id={number} onClick={this.handleClick}> 
                    {number}
                </button>
            </li>
          );
        });
        return (  
            <React.Fragment>
                <div className="row border-bottom resul1 align-items-center">
                    <h6>{productos.length} resultados para <span>"{busqueda.replace('/', '')}"</span></h6>

                    {this.props.presentacion !== "" ? 
                        <button type="submit" className="active-filter" 
                        onClick={() => this.props.borrarPresentacionFiltro()} 
                        value={this.props.presentacionFiltro}>{this.props.presentacionFiltro}</button>
                    
                    :
                    null
                    }

                    {this.props.estado !== "" ? 
                        <button type="submit" className="active-filter" 
                        onClick={() => this.props.borrarEstadoFiltro()} 
                        value={this.props.estadoFiltro}>{this.props.estadoFiltro}</button>
                    
                    :
                    null
                    }

                    {this.props.linea !== "" ? 
                        <button type="submit" className="active-filter" 
                        onClick={() => this.props.borrarLineaFiltro()} 
                        value={this.props.lineaFiltro}>{this.props.lineaFiltro}</button>
                    
                    :
                    null
                    }
                    
                    <span className="toogle-button" onClick={this.toogleFiltros}>Aplicar Filtros  <i className="fas fa-bars"></i></span>
                </div>				
                <div className="row product-display">
                    {renderTodos}
                </div>
                {
                    (todosPerPage >= productos.length)
                        ? ""
                        : <nav>
                            <ul id="page-numbers" className="pagination">
                                {
                                    (currentPage === 1) 
                                        ? <li className="page-item"><button className="page-link" disabled onClick={this.prevPage}>&lsaquo; Pagina Anterior</button></li> 
                                        : <li className="page-item"><button className="page-link" onClick={this.prevPage}>&lsaquo; Pagina Anterior</button></li>
                                }
                                {renderPageNumbers}
                                {
                                    (currentPage === pageNumbers.length)
                                        ? <li className="page-item"><button className="page-link" disabled onClick={this.nextPage}>Pagina Siguiente &rsaquo;</button></li>
                                        : <li className="page-item"><button className="page-link" onClick={this.nextPage}>Pagina Siguiente &rsaquo;</button></li>
                                }

                            </ul>
                        </nav>
                }
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        lineaFiltro: state.lineaFiltro,
        presentacionFiltro: state.presentacionFiltro,
        estadoFiltro: state.estadoFiltro
    }
}


const mapDispatchToProps = () => {
    return {
        borrarPresentacionFiltro,
        borrarEstadoFiltro,
        borrarLineaFiltro,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(Productos);
// export default Productos;