import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios'


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
            this.getSugerencias(busqueda)
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
            // console.log(res.data)
            this.setState({
                sugerencias: res.data.slice(0, 9),
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    setBusqueda = (sugerencia) => {
        this.setState({
            busqueda: sugerencia,
            sugerencias: []
        })

    }

    // componentDidUpdate(){
    //     const inputValues = this.inputBusqueda.current.getBoundingClientRect()
    //     this.setState({
    //         inputStyleValues: {
    //             top: inputValues.bottom,
    //             width: inputValues.width,
    //             right: inputValues.x
    //         }
    //     })
    // }
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
                    <input type='text' ref={this.inputBusqueda} onChange={this.handleChange}  className="form-control valid" value={this.state.busqueda} placeholder="Buscar por producto o color" />
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick}><i className="fa fa-search"></i> BUSCAR</button>
                    { this.state.sugerencias.length < 1 ? null : (
                        <div className="sugerencia-box" style={this.state.inputStyleValues}>
                            
                            {this.state.sugerencias.map(sug => (
                                <div key={sug.id} className="sugerencia" onClick={() => this.setBusqueda(sug.term.toLowerCase())}>
                                    <div>{sug.term.toLowerCase()}</div>
                                </div>
                            ))}
                            
                        </div>
                    )}
                </form>
                
                
                <Link to={`/latiendadelpintor/${this.state.busqueda}`} id="submit" style={{display: 'none'}}></Link>
            </React.Fragment>
        );
    }
}

export default Buscador;