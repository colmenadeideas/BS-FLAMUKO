import * as actions from './ActionTypes'
import axios from 'axios'


export function obtenerProductoAction(idProducto){

    return async (dispatch) => {

        dispatch(obtenerProductoInit())
                
        try {
            let url = `http://lab.besign.com.ve/flamuko/html/api/detail/${idProducto}`
            
            const res = await axios.get(url)
            console.log(res.data)
            dispatch(obtenerProductoSuccess(res.data))

        } catch (error) {
            console.log(error)
            dispatch(obtenerProductoError())
        }
    
    }
}


const obtenerProductoInit = () => ({
    type: actions.OBTENER_PRODUCTO_INIT,
    payload: true
})

export const obtenerProductoSuccess = (data) => ({
    type: actions.OBTENER_PRODUCTO_SUCCESS,
    payload: data
})

const obtenerProductoError = () => ({
    type: actions.OBTENER_PRODUCTO_ERROR,
    payload: true
})



export const setProductoAction = (producto) => ({
    type:actions.SET_PRODUCTO,
    payload: producto
})
