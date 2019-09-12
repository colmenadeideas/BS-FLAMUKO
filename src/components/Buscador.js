import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Buscador extends Component {
    state = {
        busqueda: "#"
    }
    handleChange = (e) => {
        if (this.state.busqueda.length > 2) {
            document.getElementById('submit').setAttribute('href', `/${e.currentTarget.value}`)
        }
        var busqueda = `/${e.currentTarget.value}`
        this.setState({
            busqueda
        })
    }
    handleClick = () => {
        if (this.state.busqueda < 4) {
            Swal.fire(
                "La busqueda debe contener al menos 3 letras",
                "",
                "warning"
            );
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        e.currentTarget.reset()
    }
    componentDidUpdate() {
        if (this.state.busqueda === window.location.pathname) {
            this.setState({
                busqueda: "#"
            })
        } else {
            return null
        }
    }
    render() {
        // var pathname = document.location.pathname.substr(0, 7);
        // console.log(pathname)
        // if (pathname === "/detail") {
        //     this.resetState()
        // }
        return (
            <React.Fragment>
                <form id="form-search" className="form-inline" onSubmit={this.handleSubmit}>
                    <Link to={this.state.busqueda} id="submit" type="submit">
                        <input type='text' onChange={this.handleChange}  className="form-control valid" placeholder="Buscar por producto o color" />
                        <button type="submit" className="btn btn-primary" onClick={this.handleClick}><i className="fa fa-search"></i> BUSCAR</button>
                    </Link>
                </form>
            </React.Fragment>
        );
    }
}

export default Buscador;