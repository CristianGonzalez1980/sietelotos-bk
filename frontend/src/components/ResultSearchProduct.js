import React, { useState, useEffect } from 'react'
/*import { Carousel } from 'react-materialize'*/
import { useParams } from 'react-router-dom'
import { Dropdown, Button, Divider/*, Icon */ } from 'react-materialize'
import ProductCard from './ProductCard'
import '../styles/ResultSearchProduct.css'

const ResultSearchProduct = (props) => {
    let products = props.products
    let { textsearch } = useParams()
    console.log(products)
    const [orderProduct, setOrderProduct] = useState([])
    const [newOrder, setNewOrder] = useState(false)
    const [criteria, setCriteria] = useState('criterio seleccionado')

    useEffect(() => {

    }, [products]);

    const orderButton = (toOrder) => {
        return (
            <Dropdown
                id="Dropdown_6"
                options={{
                    alignment: 'center',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    container: null,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                }}
                trigger={<Button node="button">Ordenar por:</Button>}>
                <button href="#" className="link-button" onClick={() => ordenarPrecioAsc(toOrder)}>Menor Precio</button>
                <button href="#" className="link-button" onClick={() => ordenarPrecioDesc(toOrder)}>Mayor Precio</button>
                <Divider />
                <button href="#" className="link-button" onClick={() => ordenarAlfabeticamenteAsc(toOrder)}>A - Z</button>
                <button href="#" className="link-button" onClick={() => ordenarAlfabeticamenteDesc(toOrder)}>Z - A</button>
                <Divider />
                <button href="#" className="link-button" onClick={() => ordenarPromocionAsc(toOrder)}>Mejor Descuento</button>
                <button href="#" className="link-button" onClick={() => ordenarMasVendidos(toOrder)}>Más Vendidos</button>
            </Dropdown>
        )
    }

    const ordenarPrecioAsc = (toOrder) => {
        const list = toOrder.sort((a, b) => parseFloat(a.itemPrice) - parseFloat(b.itemPrice));
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('menor precio')
        products = null

    }

    const ordenarPrecioDesc = (toOrder) => {
        const list = toOrder.sort((a, b) => parseFloat(b.itemPrice) - parseFloat(a.itemPrice));
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('mayor precio')
        products = null

    }

    const ordenarPromocionAsc = (toOrder) => {
        const list = toOrder.sort((a, b) => parseFloat(a.promotionalPrice) - parseFloat(b.promotionalPrice));
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('mejor descuento')
        products = null
    }

    const ordenarAlfabeticamenteAsc = (toOrder) => {
        const list = toOrder.sort(function (a, b) {
            if (a.itemName < b.itemName) { return -1; }
            if (a.itemName > b.itemName) { return 1; }
            return 0;
        })
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('A - Z')
        products = null
    }

    const ordenarAlfabeticamenteDesc = (toOrder) => {
        const list = toOrder.sort(function (a, b) {
            if (a.itemName > b.itemName) { return -1; }
            if (a.itemName < b.itemName) { return 1; }
            return 0;
        })
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('Z - A')
        products = null
    }

    const ordenarMasVendidos = (toOrder) => {
        const list = toOrder.sort((a, b) => parseFloat(b.vendidos) - parseFloat(a.vendidos));
        setOrderProduct(list)
        setNewOrder(-newOrder)
        setCriteria('más vendidos')
        products = null
    }

    const listOfProducts = (toOrder) => {
        if (toOrder.length > 0) {
            /*      const res = []
                  for (let index = 0; index < productos.length; index++) {
                      const element = productos[index];
                      if (productos[index] === undefined) {
                      } else {
                          res.push(element)
                      }
                  }
      */
            const result = toOrder.map((product) => {
                return (
                    <ProductCard product={product} />
                )
            }
            )
            return (
                <div>
                    <div className="row">
                        {result}
                    </div>
                </div>
            )
        }
    }

    return (
        products ?
            <div>
                <div>
                    <div className="row">
                        <div className="col s2">{orderButton(products)}</div>
                        <div id="criteriasel" className="col s4"><h6>{criteria}</h6></div>
                    </div>
                </div>
                <div className='row'>
                    {listOfProducts(products)}
                </div>
            </div>
            : newOrder ?
                <div>
                    <div>
                        <div className="row">
                            <div className="col s2">{orderButton(orderProduct)}</div>
                            <div id="criteriasel" className="col s4"><h6>{criteria}</h6></div>
                        </div>
                    </div>
                    <div className='row'>
                        {listOfProducts(orderProduct)}
                    </div>
                </div>
                :
                <div>
                    <div>
                        <div className="row">
                            <div className="col s2">{orderButton(orderProduct)}</div>
                            <div id="criteriasel" className="col s4"><h6>{criteria}</h6></div>
                        </div>
                    </div>
                    <div className='row'>
                        {listOfProducts(orderProduct)}
                    </div>
                </div>
    )
}

export default ResultSearchProduct;