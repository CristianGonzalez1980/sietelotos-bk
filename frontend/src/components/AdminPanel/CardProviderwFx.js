import React from 'react'
import ProviderCard from './ProviderCard';

const CardProviderwFx = (props) => {

    var companies = props.cp 
    var funcionD = props.fx
    var iconFx = props.icon

    const list = companies.map((company) => {
        return (
            <li>
                <ProviderCard cp={company} fx={funcionD} icon={iconFx} />
            </li>
        )
    })

    return (
        <ul>
            <div className='row'>
                {list}
            </div>
        </ul>
    )
}

export default CardProviderwFx;