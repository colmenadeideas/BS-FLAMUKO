import * as actions from './ActionTypes'
import axios from 'axios'

export function localSesionAction(usuario){


    const sesion = {...usuario, sesion:"activa", estado:"login"}
    localStorage.setItem('LTP_sesion', JSON.stringify(sesion))
    

}

export function enviarRegistroAction(search){

    return async (dispatch) => {

        dispatch(registroInit())
                
        try {
            const userData = JSON.parse(localStorage.getItem('LTP_sesion'))
            const usuario = {name:userData.name, username:userData.username, phone: userData.phone, search:search}
            let url = `http://lab.besign.com.ve/flamuko/html/api/save`
            
            const res = await axios.post(url, usuario)
            console.log(res)
            if (res.data === 'SignUp' || res.data === 'Login') {
                
                dispatch(registroSuccess(usuario.username))
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

export const handleOnShowLogin = (value) => ({
    type: actions.SHOW_LOGIN,
    payload: value
})
