import * as actions from './ActionTypes'
import axios from 'axios'

export function enviarRegistroAction(usuario){

    return async (dispatch) => {

        dispatch(registroInit())
                
        try {
            let url = `http://lab.besign.com.ve/flamuko/html/api/save`
            
            const res = await axios.post(url, usuario)
            if (res.data === 'SignUp' || res.data === 'Login') {
                
                const data = {
                    user: usuario.username,
                    sesion: "activa",
                    estado: "login",
                }



                localStorage.setItem('LTP', JSON.stringify(data))
                dispatch(registroSuccess(data.user))
            }
        } catch (error) {
            console.log(error)
            dispatch(registroError())
        }
    
    }
}

const registroInit = () => ({
    type: actions.REGISTRO_INIT,
    payload: true
})

export const registroSuccess = (email) => ({
    type: actions.REGISTRO_SUCCESS,
    payload: email
})

const registroError = () => ({
    type: actions.REGISTRO_ERROR,
    payload: true
})

export const busquedaSinRegistroAction = () => ({
    type: actions.BUSQUEDA_SIN_REGISTRO,
    payload: true
})


export const logoutAction = () => ({
    type: actions.LOGOUT,
    payload: true
})
