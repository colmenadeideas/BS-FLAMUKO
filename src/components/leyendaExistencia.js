import React from 'react'

const LeyendaExitencia = () => {
    return(
        <div className="leyenda-existencia container-fluid">
            <div className="row bg-light">
                <div className="col indicador-group">
                    <div className={`availability small high`}></div><span className="">Disponible</span>
                </div>
                <div className="col indicador-group">
                    <div className={`availability small medium`}></div><span className="">______</span>
                </div>
                <div className="col indicador-group">
                    <div className={`availability small low`}></div><span className="">Agotado</span>
                </div>
            </div>
            
        </div>
    )
}

export default LeyendaExitencia