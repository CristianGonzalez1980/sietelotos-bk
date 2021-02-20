import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import ListOfProductToDelete from './ListOfProductToDelete'
import AdminOptions from '../AdminOptions';
import CardProviderwFx from './CardProviderwFx';
import AdminProveedorSearchBar from '../AdminProveedorSearchBar';
import { postearDeleteEntity, postearGetEntity } from '../AdminPanel/FetchFunctions'

const DeleteProducto = () => {
  const [companies, setCompanies] = useState(null)
  const [clicked, setClicked] = useState(null)
  const [search, setsearch] = useState(null)

  useEffect(() => {
    if (!companies) {
      postearGetEntity({
        entityClass: "companies", fx: setCompanies
      });
    }
  }, [search])

  const deleteProduct = (company) => {
    setClicked(<ListOfProductToDelete company={company} />)
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={deleteProduct} icon='delete' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={deleteProduct} icon='delete' />)
    }
  }
  console.log(clicked)
  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {
          clicked ?
            clicked
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
            </div>
        }
      </div>
    </div>
  )
}

export default DeleteProducto;