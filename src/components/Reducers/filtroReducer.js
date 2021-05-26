import * as actions from '../Actions/ActionTypes'

const initialState = {
    presentacionFiltro:"",
    estadoFiltro:"",
    lineaFiltro:""

}

export default function filtroReducer(state=initialState, action){
    switch(action.type){
        case actions.SET_ESTADO_FILTRO:
            return {...state,                
                estadoFiltro:action.payload
            }
        case actions.SET_PRESENTACION_FILTRO:
            return {...state,                
                presentacionFiltro:action.payload
            }
        case actions.SET_LINEA_FILTRO:
            return {...state,                
                lineaFiltro:action.payload
            }

        default:
            return state
    }
}