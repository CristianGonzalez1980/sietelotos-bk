import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
import { postearUpdateEntity } from '../AdminPanel/FetchFunctions'
import uploadImage from "../CloudImageUpload";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  /*var instances = */M.Autocomplete.init(elems, {});
});

const UpdateProveedorForm = (props) => {
  const history = useHistory()
  const company = props.company
  const [urlImage, setUrlImage] = useState(null)
  const [urlBanner, setUrlBanner] = useState(null)
  const [companyName, setCompanyName] = useState(company.companyName)
  const [companyImage, setCompanyImage] = useState(company.companyImage)
  const [companyBanner, setCompanyBanner] = useState(company.companyBanner)
  const [tempBanner, setTempBanner] = useState(null)
  const [tempImage, setTempImage] = useState(null)
  const [facebook, setfacebook] = useState(company.facebook)
  const [instagram, setinstagram] = useState(company.instagram)
  const [web, setweb] = useState(company.web)
  const [subir, setSubir] = useState(false)
  //const [postear, setPostear] = useState(false)

  useEffect(() => {
    if ((urlImage !== null) && (urlBanner !== null)) {
      postearUpdate();
    }
  }, [urlImage, urlBanner, company]);

  const agregarProveedor = () => {

    if (SubirAlaNubeImagen()) {
      uploadImage({ image: tempImage, fx: setUrlImage });
    } else {
      setUrlImage(companyImage)
    }

    if (SubirAlaNubeBanner()) {
      uploadImage({ image: tempBanner, fx: setUrlBanner });
    } else {
      setUrlBanner(companyBanner)
    }
  };

  const SubirAlaNubeImagen = () => {
    return (tempImage !== null)
  }

  const SubirAlaNubeBanner = () => {
    return (tempBanner !== null)
  }

  const postearUpdate = () => {
    console.log("entreaPostearUpdate")
  //  if (!subir) {
  //    setUrlBanner(companyBanner)
  //    setUrlImage(companyImage)
  //  }
  //  console.log(urlImage)
  //  console.log(urlBanner)
    postearUpdateEntity({
      historyProp: history, entityClass: "companies", entity: company, atributes: {
        "companyName": companyName,
        "companyImage": urlImage,
        "companyBanner": urlBanner,
        "facebook": facebook,
        "instagram": instagram,
        "web": web
      }
    })
  };

  console.log(company)

  return (
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input
              id="Nombre_de_la_Empresa" onChange={(e) => {
                setCompanyName(e.target.value)
                console.log(companyName)
              }} type="text" class="validate" value={companyName} />
            <label class="active" for="Nombre_de_la_Empresa">Nombre de la Empresa</label>
          </div>
          <div class="input-field col s6">
            <input id="Web" onChange={(e) => setweb(e.target.value)} type="text" class="validate" value={web} />
            <label class="active" for="Web">Web</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="instagram" onChange={(e) => setinstagram(e.target.value)} type="text" class="validate" value={instagram} />
            <label class="active" for="instagram">Instagram</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="Facebook" onChange={(e) => setfacebook(e.target.value)} type="text" class="validate" value={facebook} />
            <label class="active" for="Facebook">Facebook</label>
          </div>
        </div>
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" id='buttonUploadImages'>
              <span>Cargar Imagen</span>
              <input type="file" onChange={(e) => {
                const imgobj = e.target.files[0]
                /*   setCompanyImage(imgobj)*/
                setTempImage(imgobj)
              //  setSubir(true)
              }} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" value={tempImage !== null ? tempImage.name : companyImage} />
            </div>
          </div>
        </form>
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" id='buttonUploadBanner'>
              <span>Cargar Banner</span>
              <input type="file" onChange={(e) => {
                const imgobj = e.target.files[0]
                /* setCompanyBanner(imgobj)*/
                setTempBanner(imgobj)
             //   setSubir(true)
              }} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" value={tempBanner !== null ? tempBanner.name : companyBanner} />
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col s12">
            <a onClick={() => {
              //   if (subir) {
              //     console.log("MODIFIQUE IMAGENES")
              agregarProveedor();
              /*setpostear(true)*/
              //    } else {
              //      console.log("NO MODIFIQUE IMAGENES")
              //      postearUpdate()
              //    }
            }
            }
              class="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Modificar Proveedor</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProveedorForm;