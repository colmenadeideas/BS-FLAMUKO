import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getCookie} from './Helpers'
import {decodeLocalData} from './Helpers'
import * as actions from './Actions/sesionActions'
import { useDispatch, useSelector } from 'react-redux';
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
        localStorage.removeItem("LTP")
        dispatch(actions.logoutAction())
    }
    
    const getLocalData = () =>{
        const data = JSON.parse(localStorage.getItem("LTP"))
        
        if(data) dispatch(actions.registroSuccess(data.user))
    }

    
    return(
        <div className="indicador-sesion">
            {email !== '' ?
              <>
                <p className="">Estás buscando como {email}</p>
                <button className="logout-button" onClick={signOut}>¿No eres tú? Haz click aquí</button>
              </>
              : 
              <p className="">¡Bienvenido!</p>

              }
            
        </div>
    )

}

export default TopNavBar;