import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ResultSearchProduct from './ResultSearchProduct'
import { postearGetEntity } from "./AdminPanel/FetchFunctions";
import '../styles/ResultSearchProduct.css'

const ResultSearch = () => {

    const [products, setProductos] = useState([]) 
    let {textsearch} = useParams()
    
    const textoBusqueda = () => {
        if(products.length > 0){
            return (
                <h2 id="googleFont">
                  Resultado de búsqueda para "{textsearch}" 
                </h2>
            )
        }else{
          if(products.length === 0){
            return(
              <h2 id="googleFont">
                No existen resultados para la búsqueda 
              </h2>)
          }else{
            console.log(textsearch)
            return (
              <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            )
          }
        }
    }

    const productsSetter = (result) => {
      setProductos(result.Products)
    }

    useEffect(() => {  
      postearGetEntity({ entityClass: `products/search?text=${textsearch}`, fx: productsSetter });
      }, [textsearch]);

      console.log(products)
    return (
        <div>
            {products.length !== 0 ?
            <div>
            {textoBusqueda()}
            <ResultSearchProduct products={products}/>
            </div>
          : textoBusqueda()}
        </div>
    )
}

export default ResultSearch;