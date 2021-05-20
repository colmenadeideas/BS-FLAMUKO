import * as actions from '../Actions/ActionTypes'

const initialState = {
    isLogged: false,
    busquedaSinRegistro:false,
    error: false,
    email: "",
    sesion: "",
    estado: "",
    loading:false

}

export default function sesionReducer(state=initialState, action){
    switch(action.type){
        case actions.REGISTRO_INIT:
            return {...state,                
                loading: true,
                error: false
            }
        case actions.REGISTRO_SUCCESS:
            return {...state,                
                loading: false,
                isLogged: true,
                email: action.payload,
                sesion: 'activa',
                estado: 'login',
                error: false
            }
        case actions.REGISTRO_ERROR:
            return {...state,                
                isProcessing: false,
                error: true
            }

        case actions.LOGOUT:
            return {...state,                
                loading: false,
                isLogged: false,
                email: "",
                sesion: '',
                estado: '',
                error: false
            }

        case actions.BUSQUEDA_SIN_REGISTRO:
            return {...state,                
                busquedaSinRegistro: action.payload,
            }

        default:
            return state
    }
}