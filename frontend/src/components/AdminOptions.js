import React from "react";
import M from 'materialize-css'
import '../styles/Admin.css'
import { Link } from "react-router-dom";

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {})
});

const AdminOptions = () => {

    const adminButtons = (props) => {

        var buttonsGroup = props.allButtons

        const list = buttonsGroup.map((button) => {
            const links = button.buttons.map((buttonLink) => {
                return (
                    <Link className="waves-effect waves-light red lighten-2 btn-large" to={buttonLink.route} >{buttonLink.name}</Link>
                )
            })
            return (
                <li>
                    <div className="collapsible-header"><i className="material-icons">{button.icon}</i>{button.name}</div>
                    <div className="collapsible-body">
                        {links}
                    </div>
                </li>
            )
        })
        return (
            list
        )
    }

    return (
        <div className="col s4">
            <ul className="collapsible">{
                adminButtons({
                    allButtons: [
                        { icon: "store_mall_directory", name: "Proveedores", buttons: [{ route: "/admin/agregarproveedor", name: "Agregar Proveedor" }, { route: "/admin/modificarproveedor", name: "Modificar Proveedor" }, { route: "/admin/borrarproveedor", name: "Eliminar Proveedor" }] },
                        { icon: "personal_video", name: "Productos", buttons: [{ route: "/admin/agregarproducto", name: "Agregar Producto" }, { route: "/admin/modificarproducto", name: "Modificar Producto" }, { route: "/admin/borrarproducto", name: "Eliminar Producto" }] },
                        { icon: "local_movies", name: "Banners", buttons: [{ route: "/admin/agregarbanner", name: "Agregar Banner" }, { route: "/admin/borrarbanner", name: "Eliminar Banner" }] }
                    ]
                })}
            </ul>
        </div>
    );
};

export default AdminOptions;
