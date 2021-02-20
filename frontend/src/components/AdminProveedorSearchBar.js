import React from 'react'
import { Link } from 'react-router-dom'

const AdminProveedorSearchBar = (props) => {

    var funcionS = props.fx
    var search = props.val
    return (
        <div>
            <div className="col s11" id="formimputSearch">
                <form className="form-inline">
                    <input onChange={(e) => {funcionS(e.target.value)}} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Buscar" aria-label="Search" />
                </form>
            </div>
            <div className='col s1'>
                <Link>
                    <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
                </Link>
            </div>
        </div>
    )
}

export default AdminProveedorSearchBar;