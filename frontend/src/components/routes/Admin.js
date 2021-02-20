import React from "react";
import M from 'materialize-css'
import '../AdminOptions.js'
import AdminOptions from "../AdminOptions.js";
import "../../styles/Admin.css";

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {})
});

const Admin = () => {
    return (
        <div className="row">
            <AdminOptions />
            <div className='col s8'>
            </div>
        </div>
    );
};

export default Admin;
