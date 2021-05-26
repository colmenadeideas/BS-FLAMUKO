import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getCookie} from './Helpers'
import {decodeLocalData} from './Helpers'
import * as actions from './Actions/sesionActions'
import { useDispatch, useSelector } from 'react-redux';
import Login from './LoginRefactor'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBell, faInbox, faBars } from '@fortawesome/free-solid-svg-icons'


const TopNavBar = () => {
  
    const dispatch = useDispatch()

    useEffect(()=>{
        getLocalData()
    }, [])


    const email = useSelector(state => state.sesionReducer.email)

    

    const signOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("LTP_sesion")
        dispatch(actions.logoutAction())
    }
    
    const getLocalData = () =>{
        const data = JSON.parse(localStorage.getItem("LTP_sesion"))
        
        if(data) dispatch(actions.registroSuccess(data.username))
    }

    
    return(
        <>
        <div className="indicador-sesion">
            {email !== '' ?
              <>
                <p className="">Estás buscando como {email}</p>
                <button className="logout-button" onClick={signOut}>¿No eres tú? Haz click aquí</button>
              </>
              : 
              <button className="login-button" data-toggle="modal" data-target="#modalRegister">Iniciar Sesion</button>
              

              }
            
        </div>
            {
                <div className="modal fade" id="modalRegister" tabIndex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
                    <Login 
                        producto={""}
                    />
                </div>
            }
        </>
    )

}

export default TopNavBar;