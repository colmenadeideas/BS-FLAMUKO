import * as actions from './ActionTypes'
import axios from 'axios'

export const setPresentacionFiltro = (presentacion) => ({
    type:actions.SET_PRESENTACION_FILTRO,
    payload: presentacion
})

export const setEstadoFiltro = (presentacion) => ({
    type:actions.SET_ESTADO_FILTRO,
    payload: presentacion
})

export const setLineaFiltro = (presentacion) => ({
    type:actions.SET_LINEA_FILTRO,
    payload: presentacion
})


export const borrarPresentacionFiltro = () => ({
    type:actions.SET_PRESENTACION_FILTRO,
    payload: ""
})

export const borrarEstadoFiltro = () => ({
    type:actions.SET_ESTADO_FILTRO,
    payload: ""
})

export const borrarLineaFiltro = () => ({
    type:actions.SET_LINEA_FILTRO,
    payload: ""
})