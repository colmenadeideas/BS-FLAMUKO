import React from 'react'

const LeyendaExitencia = () => {
    return(
        <div className="leyenda-existencia container-fluid">
            <div className="row">
                <div className="col indicador-group">
                    <div className={`availability small high`}></div><span className="">Disponibilidad alta</span>
                </div>
                <div className="col indicador-group">
                    <div className={`availability small medium`}></div><span className="">Disponibilidad baja</span>
                </div>
                <div className="col indicador-group">
                    <div className={`availability small low`}></div><span className="">No disponible</span>
                </div>
            </div>
            
        </div>
    )
}

export default LeyendaExitencia