import React from 'react'
import ProductCard from './ProductCard';

const CardProductwFx = (props) => {

    var products = props.prs
    var funcionD = props.fx
    var iconFx = props.icon

    const list = products.map((product) => {
        return (
            <li>
                <ProductCard prs={products} pr={product} fx={funcionD} icon={iconFx} />
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

export default CardProductwFx;