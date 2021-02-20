import React from 'react'
import '../styles/CourrierCard.css'

const CourrierCard = (props) => {

    console.log(props)
    var courrierName = props.name
    var courrierCost = props.cost
    var funcion = props.fx
    var funcion2 = props.fx2

    return (
        <label id="option" >
            <input name="style2" type="radio" onClick={() => { funcion(courrierName); funcion2(courrierCost) }}/>
            <span>{courrierName}</span>
            <span>: $</span>
            <span>{courrierCost}</span>
        </label>
    )
}

export default CourrierCard;