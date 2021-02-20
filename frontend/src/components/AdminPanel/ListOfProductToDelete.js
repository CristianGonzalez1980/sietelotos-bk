import React, { useState, useEffect/*, useRef*/ } from 'react'
import { useHistory } from 'react-router-dom'
import AdminProductSearchBar from '../AdminProductSearchBar'
import CardProductwFx from './CardProductwFx';
import { postearGetEntity, postearDeleteEntity } from '../AdminPanel/FetchFunctions';

const ListOfProductToDelete = (props) => {
  const company = props.company
  const history = useHistory()
  const [products, setproducts] = useState([])
//  const [prevProducts, setprevProducts] = useState([])

  useEffect(() => {
    if (products.length === 0) {
      postearGetEntity({
        entityClass: `products/supplier/${company.id}`, fx: setproducts
      });
    }
  }, [])

  const deleteProduct = (id) => {
    postearDeleteEntity({
      historyProp: history, entityClass: "products", id: id
    });
    //setproducts([]);
  }

  const doDeleteProduct = (products, product) => {
  //  setprevProducts(products)
    deleteProduct(product.id)
  }

  const listOfProducts = () => {
    if (products) {
      return (<CardProductwFx prs={products} fx={doDeleteProduct} icon='delete' />)
    }
  }

  return (
    <div className="row">
      <AdminProductSearchBar />
      <div>
        {
          !products ?
            <p>Loading...</p>
            :
            listOfProducts()
        }
      </div>
    </div>
  )
}

export default ListOfProductToDelete;