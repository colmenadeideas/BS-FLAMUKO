import React, { Component } from 'react'
import Producto from './Producto';
import NotFound from './NotFound'

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
        console.log(this.props.productos)
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
    
    render() { 
        const { busqueda } = this.props
        
        if (this.props.productos === undefined | this.props.productos.length === 0) return null;

        const { productos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current productos
        const indexOfLastTodo = currentPage * todosPerPage;
        console.log(indexOfLastTodo)
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage ;
        console.log(indexOfFirstTodo)

        const currentProductos = productos.slice(indexOfFirstTodo, indexOfLastTodo);
  
        const renderTodos = currentProductos.map((producto, index) => {
            return (
                //si no tiene color asociado no se mostrara en la muestra de resultados
                // (producto.color === "" )
                
                //     ?  
                    <div key={producto.id} className="col-lg-4 col-md-6 col-sm-6 col-12"> 
                        <Producto  
                            key={index}
                            producto={producto}                                     
                        />
                    </div>
                    // :   ""
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
                {/* <div className="row productos-indicador align-items-center">
                    <h6>{productos.length} Resultados para <span>"{busqueda.replace('/', '')}"</span></h6>
                    <span className="toogle-button" onClick={this.toogleFiltros}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </span>
                </div>				 */}
                <div className="row product-display productos-display">
                    {renderTodos}
                    {productos.length === 0 || this.props.noResultados ? <NotFound sugerencia={true} /> : null}
                </div>
                {
                    (todosPerPage >= productos.length)
                        ? ""
                        : <nav>
                            <div className="pagination container">
                                {
                                    (currentPage === 1) 
                                        ? <li className="page-item"><button className="page-link" disabled onClick={this.prevPage}>&lsaquo; Pagina Anterior</button></li> 
                                        : <li className="page-item"><button className="page-link" onClick={this.prevPage}>&lsaquo; Pagina Anterior</button></li>
                                }

                                
                                <ul  id="page-numbers" className="pagination numbers">
                                    {renderPageNumbers}

                                </ul>
                                {
                                    (currentPage === pageNumbers.length)
                                        ? <li className="page-item"><button className="page-link" disabled onClick={this.nextPage}>Pagina Siguiente &rsaquo;</button></li>
                                        : <li className="page-item"><button className="page-link" onClick={this.nextPage}>Pagina Siguiente &rsaquo;</button></li>
                                }

                            </div>
                        </nav>
                }
            </React.Fragment>
        );
    }
}
 
export default Productos;