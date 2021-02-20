import React, { useState, useEffect } from 'react'
import '../../styles/UpdatProveedor.css'
import AddProduct from './AddProductForm'
import AdminOptions from '../AdminOptions';
import CardProviderwFx from './CardProviderwFx';
import AdminProveedorSearchBar from '../AdminProveedorSearchBar';
import { postearGetEntity } from '../AdminPanel/FetchFunctions';

const AddProducto = () => {
  const [companies, setCompanies] = useState([])
  const [cliked, setClicked] = useState(null)
  const [search, setsearch] = useState(null)

  useEffect(() => {
    postearGetEntity({
      entityClass: "companies", fx: setCompanies
    });
  }, [search, cliked])

  const addProductToCompany = (company) => {
    setClicked(<AddProduct company={company} />)
  }
  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={addProductToCompany} icon='add_business' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={addProductToCompany} icon='add_business' />)
    }
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {cliked ?
          cliked
          :
          <div className="row">
            <AdminProveedorSearchBar fx={setsearch} val={search} />
            <div>
              {
                !companies ?
                  <p>Loading...</p>
                  :
                  search ?
                    filterCompanies()
                    :
                    listOfCompanies()
              }
            </div>
          </div>}
      </div>
    </div>
  )
}

export default AddProducto;