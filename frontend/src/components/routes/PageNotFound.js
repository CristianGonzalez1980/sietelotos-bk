import React from 'react'
import '../../styles/PaginaNoEncontrada.css'

const PageNotFound = () => {
    return (
        <div className="row">
            <div className='col s12' id="exclamation-triangle">
                <i className="large material-icons">not_interested</i>
            </div>
            <div className='col s12'>
                <div className="numero2">
                    404
                </div>
            </div>
            <div className='col s12'>
                <div class="leyenda">
                    ¡Perdón! La página no existe.
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;