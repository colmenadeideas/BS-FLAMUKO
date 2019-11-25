import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


class Buscador extends Component {
    state = {
        busqueda: "",
        resultado: Boolean
    }
    handleChange = (e) => {
        var busqueda = e.currentTarget.value
        this.setState({
            busqueda
        })
    }
    handleClick = () => {
        if (this.state.busqueda.length < 3) {
            Swal.fire(
                "La busqueda debe contener al menos 3 letras",
                "",
                "warning"
            );
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.busqueda.length > 2) {
            document.getElementById('submit').click();
            e.currentTarget.reset()
        }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps);
    //     console.log(prevState);
    //     if (nextProps.busqueda !== prevState.busqueda) {
    //         if (nextProps.busqueda) {
    //             return {
    //                 busqueda: '',
    //                 resultado: false
    //             }        
    //         }
    //     }
    // }
    // useEffect() {
    //     console.log(this.props.busqueda)
    //     // if (this.props.busqueda !== this.state.resultado) {
    //         console.log(this.props.busqueda)
    //         this.setState({
    //             resultado: this.props.busqueda
    //         })  
    //         if (this.props.busqueda) {
    //             this.setState({
    //                 busqueda: ''
    //             })            
    //         }
    //     // }
    // }
    render() {
        return (
            <React.Fragment>
                <form id="form-search" className="form-inline" onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.handleChange}  className="form-control valid" placeholder="Buscar por producto o color" />
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick}><i className="fa fa-search"></i> BUSCAR</button>
                </form>
                <Link to={`/latiendadelpintor/${this.state.busqueda}`} id="submit" style={{display: 'none'}}></Link>
            </React.Fragment>
        );
    }
}

export default Buscador;