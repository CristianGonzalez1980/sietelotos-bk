import React from "react";

const BannerCategories = (props) => {

    return (
        <div className="row">
            <div className="input-field col s12">
                <select className="input-field" id="Category" form="bannerform" type="text" onChange={(e) => props.fx(e.target.value)} className="validate" value={props.val}>
                    <option value={null}>Seleccione una categoría...</option>
                    <option value="HOME">Inicio</option>
                    <option value="SCHEDULE">Calendario de clases</option>
                    <option value="CLASS">Clase en vivo</option>
                    <option value="COURRIER">Correo</option>
                    <option value="PAYMENTMETHODS">Metodos de pago</option>
                </select>
                <label className="active" htmlFor="Category">Categoría</label>
            </div>
        </div>
    )
}

export default BannerCategories