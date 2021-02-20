import React, { useState, useEffect } from 'react'
import { useHistory/*, Link*/ } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/AddProveedor.css'
import AdminOptions from "../AdminOptions";
import { postearAddEntity } from '../AdminPanel/FetchFunctions'
import uploadImage from "../CloudImageUpload";

const AddProveedor = (props) => {
  const history = useHistory();
  const company = props.company
  const [urlBanner, setUrlBanner] = useState(null);
  const [urlLogo, setUrlLogo] = useState(null);
  const [companyName, setCompanyName] = useState(null)
  const [companyImage, setCompanyImage] = useState(null)
  const [companyBanner, setCompanyBanner] = useState(null)
  const [facebook, setfacebook] = useState('https://www.facebook.com/......')
  const [instagram, setinstagram] = useState('https://www.instagram.com/......')
  const [web, setweb] = useState('https://www...')

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems, {});
  });

  useEffect(() => {
    if (urlBanner && urlLogo) {
      postearAdd();
    }
  });

  const agregarProveedor = () => {
    console.log(companyImage)
    uploadImage({ image: companyImage, fx: setUrlLogo });
  };

  const subirBanner = () => {
    console.log(companyBanner)
    uploadImage({ image: companyBanner, fx: setUrlBanner });
  };

  const postearAdd = () => {
    console.log("entreaPostearAdd")
    if (companyName && companyImage && facebook && instagram && web && companyBanner) {
      postearAddEntity({
        historyProp: history, entityClass: "companies", atributes: {
          "companyName": companyName,
          "companyImage": urlLogo,
          "companyBanner": urlBanner,
          "facebook": facebook,
          "instagram": instagram,
          "web": web
        }
      })
    } else {
      M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
    }
  };

  return (

    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="Nombre_de_la_Empresa" onChange={(e) => setCompanyName(e.target.value)} type="text" className="validate" value={companyName} required />
                <label className="active" for="Nombre_de_la_Empresa">Nombre de la empresa</label>
              </div>
              <div className="input-field col s6">
                <input id="Web" onChange={(e) => setweb(e.target.value)} type="text" className="validate" value={web} required />
                <label className="active" for="Web">Web</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="instagram" onChange={(e) => setinstagram(e.target.value)} type="text" className="validate" value={instagram} required />
                <label className="active" for="instagram">Instagram</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="Facebook" onChange={(e) => setfacebook(e.target.value)} type="text" className="validate" value={facebook} required />
                <label className="active" for="Facebook">Facebook</label>
              </div>
            </div>
            <div className="row">
            </div>
            <form action="#">
              <div className="file-field input-field">
                <div className="btn" id='buttonUploadImages'>
                  <span>Cargar imagen</span>
                  <input type="file" onChange={(e) => {
                    setCompanyImage(e.target.files[0])
                    console.log(e.target.files[0])
                  }} required />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value={companyImage ? companyImage.name : ""} />
                </div>
              </div>
            </form>
            <form action="#">
              <div className="file-field input-field">
                <div className="btn" id='buttonUploadImages'>
                  <span>Cargar banner</span>
                  <input type="file" onChange={(e) => {
                    setCompanyBanner(e.target.files[0])
                    console.log(e.target.files[0])
                  }} required />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value={companyBanner ? companyBanner.name : ""} />
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col s12">
                <a onClick={() => {
                  agregarProveedor();
                  subirBanner();
                }} className="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Agregar proveedor</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProveedor;
