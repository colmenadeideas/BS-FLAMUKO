import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Example from './AutocompletePrueba'

class Buscador extends Component {
    
    constructor(props) {
        super(props);
        this.inputBusqueda = React.createRef();
    }

    state = {
        busqueda: "",
        resultado: Boolean,
        sugerencias: [],
        sugerenciaBoxStyle: {}
    }
    handleChange = (e) => {
        var busqueda = e.currentTarget.value
        if(busqueda.length > 2){
            // this.getSugerencias(busqueda)
        } else {
            this.setState({
                sugerencias: []
            })
        }
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


    getSugerencias = (userInput) => {
        const inputReplace1 = userInput.replace(' ', '%20')
        const inputReplace2 = userInput.replace(' ', '%20')
    
        const url = `http://lab.besign.com.ve/flamuko/html/api/autocomplete/all?term=${inputReplace2}`
        axios.get(url)
        .then(res=>{

            console.log(res)
            
            this.setState({
                sugerencias: res.data.slice(0, 9),
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    setBusqueda = (busqueda) => {
        this.setState({
            busqueda: busqueda,
        })

    }

    render() {

        return (
            <React.Fragment>
                <form id="form-search" className="" onSubmit={this.handleSubmit}>
                    <Example setBusqueda={this.setBusqueda} />
                   
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick}><i className="fa fa-search"></i> BUSCAR</button>
                    
                </form>
                
                
                <Link to={`/latiendadelpintor/${this.state.busqueda}`} id="submit" style={{display: 'none'}}></Link>
            </React.Fragment>
        );
    }
}

export default Buscador;