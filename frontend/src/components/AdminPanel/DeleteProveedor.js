import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { useHistory } from "react-router-dom"
import AdminOptions from "../AdminOptions";
import CardProviderwFx from './CardProviderwFx';
import AdminProveedorSearchBar from '../AdminProveedorSearchBar';
import { postearDeleteEntity, postearGetEntity } from '../AdminPanel/FetchFunctions'

const DeleteProveedor = () => {
  const history = useHistory()
  const [companies, setCompanies] = useState([])
  const [search, setsearch] = useState(null)
  const [deleteCompanyAction, setDeleteCompanyAction] = useState(false)

  useEffect(() => {
    postearGetEntity({
      entityClass: "companies", fx: setCompanies
    });
  }, [search, deleteCompanyAction])

  const deleteCompany = (provider) => {
    postearDeleteEntity({
      historyProp: history, entityClass: "companies", id: provider.id
    });
    setDeleteCompanyAction(-deleteCompanyAction)
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={deleteCompany} icon='delete' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={deleteCompany} icon='delete' />)
    }
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
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
      </div>
    </div>
  )
}

export default DeleteProveedor;