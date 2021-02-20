import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/AddProveedor.css'
import uploadImage from "../CloudImageUpload";
import { postearAddEntity } from "./FetchFunctions";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {});
});

const AddProduct = (props) => {
  const history = useHistory();
  const company = props.company
  const [url, setUrl] = useState([]);
  const [urlTemp, setUrlTemp] = useState(null)
  const [itemName, setitemName] = useState(null)
  const [description, setdescription] = useState(null)
  const [images, setimages] = useState(null)
  //const [urlList, setUrlList] = useState(null)
  const [stock, setstock] = useState(null)
  const [itemPrice, setitemPrice] = useState(null)
  const [promotionalPrice, setpromotionalPrice] = useState(null)
  const [longitud, setLongitud] = useState(null)
  const [alto, setAlto] = useState(null)
  const [ancho, setAncho] = useState(null)
  const [pesoGr, setPesoGr] = useState(null)
  const [postear, setpostear] = useState(false)

  useEffect(() => {
    if (postear) {
      console.log(urlTemp)
      //setUrl([...url, urlTemp])
      //setUrl(currentUrl => currentUrl.concat(urlTemp))
      //setUrl([urlTemp])
      //console.log(url)
      postearAdd();
    }
  }, [urlTemp]);

  const subirYPostearAdd = (e) => {
    e.preventDefault();
    //var url = []
    /*
        if (images && images.length >= 0) {
          for (let index = 0; index < images.length; index++) {
            const image = images[index];
    */
    console.log(images[0])
    uploadImage({ image: images[0], fx: setUrlTemp });
    // while (!urlTemp) {  }
    //listimages.push(url)

    // if (index === (images.length - 1)) {
    //setUrlList(listimages);
    //setUrl(listimages)
    //postearAdd(url);
    setpostear(true);
    /*//   }
    //}
    }
    for (let index = 0; index < listimages.length; index++) {
    console.log(listimages[index]);
    }*/
  };

  const postearAdd = () => {
    console.log(urlTemp)
    const imagesToSave = [urlTemp] 
    console.log(imagesToSave)
    console.log(itemName);
    console.log(stock);
    console.log(itemPrice);
    console.log(promotionalPrice);
    console.log(pesoGr);
    console.log(longitud);
    console.log(alto);
    console.log(ancho);
   // console.log(url);
  //  console.log(url.length > 0);
  //  console.log(url.length);
    console.log("entreaPostearAdd")

  //  var someNull = url.some(function (el) {
 //     return el === null;
  //  });


 //   console.log(someNull);


    if (itemName && description && stock && itemPrice && promotionalPrice /*&& !someNull */&& longitud
      && ancho && alto && pesoGr && imagesToSave.length > 0) {
      postearAddEntity({
        historyProp: history, entityClass: "products", atributes: {
          "idProveedor": company.id,
          "itemName": itemName,
          "description": description,
          "images": imagesToSave,
          "stock": stock,
          "vendidos": 0,
          "itemPrice": itemPrice,
          "promotionalPrice": promotionalPrice,
          "longitud": longitud,
          "ancho": ancho,
          "alto": alto,
          "pesoGr": pesoGr
        }
      })
    } else {

      M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
    }
  };

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input value={company.companyName} required />
            <label className="active" for="Nombre_de_la_Empresa">Nombre de la empresa</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="Nombre_del_Producto" onChange={(e) => setitemName(e.target.value)} type="text" className="validate" required />
            <label className="active" for="Nombre_del_Producto">Nombre del producto</label>
          </div>
          <div className="input-field col s6">
            <input id="Descripción" onChange={(e) => setdescription(e.target.value)} type="text" className="validate" required />
            <label className="active" for="Descripción">Descripción</label>
          </div>
          <div className="input-field col s3">
            <input id="Stock" type="number" onChange={(e) => setstock(e.target.value > 0 ? e.target.value : 1)} className="validate" value={stock} />
            <label className="active" for="Stock">Stock</label>
          </div>
          <div className="input-field col s3">
            <input id="Precio" onChange={(e) => setitemPrice(e.target.value)} type="number" className="validate" required />
            <label className="active" for="Precio">Precio</label>
          </div>
          <div className="input-field col s3">
            <input id="Precio_promocional" onChange={(e) => setpromotionalPrice(e.target.value)} type="number" className="validate" required />
            <label className="active" for="Precio_promocional">Precio promocional</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s2">
            <input id="Longitud" type="number" onChange={(e) => setLongitud(e.target.value > 0 ? e.target.value : 1)} className="validate" value={longitud} />
            <label className="active" for="Longitud">Longitud (cm)</label>
          </div>
          <div className="input-field col s2">
            <input id="Ancho" type="number" onChange={(e) => setAncho(e.target.value > 0 ? e.target.value : 1)} className="validate" value={ancho} />
            <label className="active" for="Ancho">Ancho (cm)</label>
          </div>
          <div className="input-field col s2">
            <input id="Alto" type="number" onChange={(e) => setAlto(e.target.value > 0 ? e.target.value : 1)} className="validate" value={alto} />
            <label className="active" for="Alto">Alto (cm)</label>
          </div>
          <div className="input-field col s2">
            <input id="PesoGr" type="number" onChange={(e) => setPesoGr(e.target.value > 0 ? e.target.value : 1)} className="validate" value={pesoGr} />
            <label className="active" for="PesoGr">Peso (gramos)</label>
          </div>
        </div>
        <div className="row">
        </div>
        <form action="#">
          <select type="hidden">
            {url.map(image => {
              return (<option key={image.toString}>{image}</option>)
            })}
          </select>
          <div className="file-field input-field">
            <div className="btn" id='buttonUploadImages'>
              <span>Cargar imagenes</span>
              <input type="file" onChange={(e) => setimages(e.target.files)} multiple required />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col s12">
            <button onClick={(e) => {
              subirYPostearAdd(e)
            }} className="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Agregar Producto</button>
          </div>
        </div>
      </form>
    </div >
  );
};

export default AddProduct;
