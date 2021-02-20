import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/DeleteBanner.css'
import uploadImage from "../CloudImageUpload";
import { postearUpdateEntity } from '../AdminPanel/FetchFunctions'

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {});
});

const UpdateProductoForm = (props) => {
  const product = props.product
  const [url, setUrl] = useState(product.images);
  const [itemName, setitemName] = useState(product.itemName)
  const [images, setimages] = useState(product.images)
  const [description, setdescription] = useState(product.description)
  const [stock, setstock] = useState(product.stock)
  const [itemPrice, setitemPrice] = useState(product.itemPrice)
  const [promotionalPrice, setpromotionalPrice] = useState(product.promotionalPrice)
  const [longitud, setlongitud] = useState(product.longitud)
  const [ancho, setancho] = useState(product.ancho)
  const [alto, setalto] = useState(product.alto)
  const [pesoGr, setpesoGr] = useState(product.pesoGr)
  const [subir, setSubir] = useState(false)
  const [postear, setpostear] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (postear) {
      postearUpdate();
    }
  }, [url, product]);

  const concatUrls = (urlOfImage) => {
    let newURl = [urlOfImage].concat(url)//foto mas reciente primero
    setpostear(true);
    setUrl(newURl);
  }

  const agregarProducto = () => {
    if (subir) {
      console.log("ENTRE AL SUBIR")
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        uploadImage({ image: image, fx: concatUrls });
      }
    }
  };

  const postearUpdate = () => {
    console.log("entreaPostearUpdate")
    postearUpdateEntity({
      historyProp: history, entityClass: "products", entity: product, atributes: {
        "idProveedor": product.idProveedor,
        "itemName": itemName,
        "description": description,
        "images": url,
        "stock": stock,
        "vendidos": product.vendidos,
        "itemPrice": itemPrice,
        "promotionalPrice": promotionalPrice,
        "longitud": longitud,
        "ancho": ancho,
        "alto": alto,
        "pesoGr": pesoGr
      }
    })
  };

  const eliminarImagen = (item) => {
    let newUrls = url
    var i = newUrls.indexOf(item);
    newUrls.splice(i, 1);
    setUrl(newUrls)
    setpostear(true)
  }
  const nosePuedeEliminarImagen = () => {
    return (
      M.toast({
        html: "No se puede borrar esta imagen, debe haber por lo menos una imagen por producto",
        classes: "#388e3c red darken-2",
      })
    )
  }

  const listOfImages = () => {
    if (url) {
      const list = url.map((elem) => {
        return (
          <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDeleteUP'>
                <div className="card-image" id="imageUP">
                  <img src={elem} />
                  <a onClick={() => {
                    url.length === 1 ?
                      nosePuedeEliminarImagen()
                      :
                      eliminarImagen(elem)
                  }
                  } id="iconoDeleteUP" className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></a>
                </div>
              </div>
            </div>
          </li>
        )
      })
      return (
        <ul>
          <div className='row'>
            {list}
          </div>
        </ul>
      )
    }
  }

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            {console.log(product)}
            <input id="ItemName" onChange={(e) => setitemName(e.target.value)} type="text" className="validate" value={itemName} />
            <label className="active" for="ItemName">Nombre del producto</label>
          </div>
          <div className="input-field col s6">
            <input id="description" onChange={(e) => setdescription(e.target.value)} type="text" className="validate" value={description} />
            <label className="active" for="description">Descripción</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s3">
            <input id="Stock" type="number" onChange={(e) => setstock(e.target.value > 0 ? e.target.value : 1)} className="validate" value={stock} />
            <label className="active" for="Stock">Stock</label>
          </div>
          <div className="input-field col s3">
            <input id="ItemPrice" type="number" onChange={(e) => setitemPrice(e.target.value)} className="validate" value={itemPrice} />
            <label className="active" for="ItemPrice">Precio</label>
          </div>
          <div className="input-field col s3">
            <input id="PromotionalPrice" type="number" onChange={(e) => setpromotionalPrice(e.target.value)} className="validate" value={promotionalPrice} />
            <label className="active" for="PromotionalPrice">Precio promocional</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s2">
            <input type="number" onChange={(e) => setlongitud(e.target.value > 0 ? e.target.value : 1)} className="validate" value={longitud} />
            <label className="active" for="PromotionalPrice">Longitud (cm)</label>
          </div>
          <div className="input-field col s2">
            <input type="number" onChange={(e) => setancho(e.target.value > 0 ? e.target.value : 1)} className="validate" value={ancho} />
            <label className="active" for="PromotionalPrice">Ancho (cm)</label>
          </div>
          <div className="input-field col s2">
            <input type="number" onChange={(e) => setalto(e.target.value > 0 ? e.target.value : 1)} className="validate" value={alto} />
            <label className="active" for="PromotionalPrice">Alto (cm)</label>
          </div>
          <div className="input-field col s2">
            <input type="number" onChange={(e) => setpesoGr(e.target.value > 0 ? e.target.value : 1)} className="validate" value={pesoGr} />
            <label className="active" for="PromotionalPrice">Peso (gramos)</label>
          </div>
        </div>
        <form action="#">
          <div className="file-field input-field">
            <div className="btn" id='buttonUploadImages'>
              <span>Cargar Imagen</span>
              <input type="file" onChange={(e) => {
                setimages(e.target.files)
                setSubir(true)
              }} multiple />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" value={typeof images === 'string' ? images : url} />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col s12">
            <div>
              {listOfImages()}
            </div>
            <a onClick={() => {
              if (subir) {
                agregarProducto();
                //setpostear(true)
              } else {
                postearUpdate()
              }
            }
            }
              className="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Modificar Producto</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductoForm;
