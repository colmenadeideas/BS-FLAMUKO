import React from 'react'

function Form({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  }) {
    return (    
            <form onSubmit={handleSubmit} autoComplete="off" className="row justify-content-center">
                <div className="form-group">
                    <input
                        type="text"
                        className="input-form"
                        id="name"
                        placeholder="Tu Nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        required
                        minLength={5}
                    />
                    {touched.name && errors.name ? 
                    
                    <div className="alert alert-warning">{touched.name && errors.name}</div>
                    
                    :
                        null
                    }
                    
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="input-form"
                        id="username"
                        placeholder="Tu Correo Electrónico"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="username"
                        required
                        minLength={5}
                    />
                    {touched.username && errors.username ? 
                    
                    <div className="alert alert-warning">{touched.username && errors.username}</div>
                
                    :
                    null
                    }
                    
                </div>
                <div className="form-group">
                    
                    <input
                        type="number"
                        className="input-form"
                        id="phone"
                        placeholder="Teléfono Móvil"
                        value={values.phone || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                        minLength={5}
                        required
                    />
                    {touched.phone && errors.phone ?
                    
                    <div className="alert alert-warning">{touched.phone && errors.phone}</div>
                    :
                    null}
                    
                </div>
                
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="Check" />
                    <label className="form-check-label" htmlFor="Check">
                        Estoy de acuerdo con suministrar mis datos y ser contactado<br/> para promociones
                    </label>
                </div>

                <div className="submit-button-box">
                    <button type="submit" className="submit-button" 
                    disabled={Object.keys(touched).length === 0 || Object.keys(errors).length !== 0 }  
                    
                    >Enviar Datos</button>
                </div>
                
                
            </form>
                    

                
                
            
            
    );
}

export default Form

{/* <form onSubmit={handleSubmit} autoComplete="off" className="row justify-content-center">
                <input id="name" className="input-form" minLength={5} type="text" placeholder="Nombre" required /><div className="w-100"></div>
                <input id="username" className="input-form" minLength={5} type="email" placeholder="Tu Correo Electrónico" required /><div className="w-100"></div>
                <input id="phone" className="input-form" minLength={5} type="number" placeholder="Telefono Móvil" required  /><div className="w-100"></div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                    <label className="form-check-label" htmlFor="Check">
                        Estoy de acuerdo con suministrar mis datos y ser contactado<br/> para promociones
                    </label>
                </div>
            </form> */}
            {/* <form onSubmit={handleSubmit} autoComplete="off" className="row justify-content-center">
                <div className="form-group">
                    <input
                        type="text"
                        className="input-form"
                        id="name"
                        placeholder="Tu nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        required
                        minLength={5}
                    />
                    {touched.name && errors.name}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="input-form"
                        id="username"
                        placeholder="Tu correo electrónico"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="username"
                        required
                        minLength={5}
                    />
                    {touched.username && errors.username}
                </div>
                <div className="form-group">
                    
                    <input
                        type="number"
                        className="input-form"
                        id="phone"
                        placeholder="Telefono Móvil"
                        value={values.phone || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                        minLength={5}
                        required
                    />
                    {touched.phone && errors.phone}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                </div>
            </form> */}