import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from './Actions/productoActions'
import axios from 'axios';
import SingleExistencia from './SingleExistencia';
import Cargando from './Cargando';
import FiltrosSingle from './FiltrosSingle';
import LeyendaExitencia from './leyendaExistencia';
import NotFound from './NotFound';

const SingleProducto = (props) => {
    
    const dispatch = useDispatch()
    const [estados, setEstados] = useState([])
    const [isFiltrado, setIsFIltrado] = useState(false)
    const [existenciaFiltrada, setExistenciaFiltrada] = useState([])

    
    useEffect(()=>{
        const obtenerProducto = ()=> dispatch(actions.obtenerProductoAction(props.idProducto))
        obtenerProducto()
        obtenerEstados()
    }, [])


    const productoObj   = useSelector(state => state.productoReducer.producto)
    const existencia    = useSelector(state => state.productoReducer.existencia)
    const errorAlCargar = useSelector(state => state.productoReducer.errorAlCargar)
    const cargando      = useSelector(state => state.productoReducer.cargando)
    
    const obtenerEstados = () => {
         let url = `http://lab.besign.com.ve/flamuko/html/api/show/estados`
        //let url = `http://localhost/flamuko/html/api/show/estados`
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
                filtrosEstados(estados)
            })
    }

    const filtrosEstados = (estados) => {
        let filtrosEstados = estados
        existencia.map(tienda => (
            (filtrosEstados.indexOf(tienda.tienda[0].estado) === -1 && tienda.tienda[0].estado !== null)
                ?   filtrosEstados = [...filtrosEstados, tienda.tienda[0].estado]
                :   filtrosEstados
        ))
        let newEstados = estados.filter(estado => (
            filtrosEstados.indexOf(estado.id) !== -1
        ))
        // this.setState({
        //     estados: estado
        // })
        setEstados(newEstados)
    }
    const filtrosEstado = (idEstado) => {
        let existenciaFiltrada = existencia.filter(tienda => (
            (tienda.tienda[0].estado === idEstado && tienda.tienda[0].estado !== null)
        ))
        setExistenciaFiltrada(existenciaFiltrada)
        setIsFIltrado(true)
        // this.setState({
        //     existenciaFiltrada,
        //     filtrado: true
        // })
    }

    const borrarFiltro = () => {
        setIsFIltrado(false)
    }

    const goBack = () => {
        window.history.back();
    }

    console.log(productoObj)
    console.table(existencia)


    const showProduct = ( ) => {
        if(!productoObj.nombre) return
        const {cod, nombre, color, presentacion} = productoObj
        const pinturas = ['ARM026', 'ARM072', 'ARM81', 'ARM085', 'ARM156', 'ARM582', 'ARM590', 'ARM596', 'FLA18', 'FLA20', 'FLA40', 'FLA70', 'FLA355', 'REG359']

        let envase;
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
                                        estados={estados}
                                        filtrosEstado={filtrosEstado}
                                        borrarFiltro={borrarFiltro}
                                    />
                                </div>
                                
                                <div className="main col-sm-9 col-lg-10">
                                    <div className="row product-display no-gutters">
                                        
                                        <div className="container-fluid top-box">
                                            <div className="row">
                                                <div className="col-md-2 back">
                                                    <button onClick={goBack}>{`< Volver al listado`}</button>
                                                </div>
                                                <div className="col-md-10 leyenda-wrapper">
                                                    <LeyendaExitencia/>
                                                </div>
                                                
                                            </div>
                                        </div>
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
                                            (!isFiltrado)   
                                                ?   <SingleExistencia   
                                                        existencia={existencia}
                                                        producto={productoObj}
                                                    />
                                                :   <SingleExistencia   
                                                        existencia={existenciaFiltrada}
                                                        producto={productoObj}
                                                    />
                                        }
                                    </div>
                                </div>
                            </div>
        return producto
    }
    
    return(
        <>
            <div className="container">
                {errorAlCargar ? <NotFound sugerencia={false} /> : null}
                {cargando && !errorAlCargar ? <Cargando />: null}
                {productoObj.nombre !== undefined? showProduct(): null}
            </div>
        </>
    )
}

export default SingleProducto