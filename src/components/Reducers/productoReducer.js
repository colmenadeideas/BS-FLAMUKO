import * as actions from '../Actions/ActionTypes'

const initialState = {
    producto: {},
    // producto: [],
    estados: [],
    existencia: [],
    existenciaFiltrada: [],
    filtrado: false,
    cargando: false,
    errorAlCargar:false,
}

export default function productoReducer(state=initialState, action){
    switch(action.type){
        case actions.SET_PRODUCTO:
            return {...state,                
                producto:action.payload
            }

        case actions.OBTENER_PRODUCTO_INIT:
            return {...state,                
                errorAlCargar:false,
                cargando:true

            }

        case actions.OBTENER_PRODUCTO_SUCCESS:
            return {...state,         
                cargando:false,       
                producto:action.payload.producto[0],
                existencia:action.payload.existencia
            }

        case actions.OBTENER_PRODUCTO_ERROR:
            return {...state,                
                errorAlCargar:true,
                cargando:false
            }

        default:
            return state
    }
}