import React from 'react'

const LeyendaExitencia = () => {
    return(
        <div className="leyenda-existencia">
            <div className=" container">
                <div className="row">
                    
                    <div className="col-lg-4 col-md-12 indicador-group">
                        <div className={`availability small high`}></div><span className="">Disponible</span>
                    </div>
                    <div className="col-lg-4 col-md-12 indicador-group">
                        <div className={`availability small medium`}></div><span className="">Pocas Unidades</span>
                    </div>
                    <div className="col-lg-4 col-md-12 indicador-group">
                        <div className={`availability small low`}></div><span className="">No disponible</span>
                    </div>
                </div>
            </div>
            
                
        </div>
            
    )
}

export default LeyendaExitencia