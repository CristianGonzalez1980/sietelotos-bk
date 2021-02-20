import React from "react";
import { useEffect, useState } from "react";
import { useHistory/*, Link */ } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/AddProveedor.css'
import AdminOptions from '../AdminOptions';
import BannerCategories from '../BannerCategories';
import uploadImage from "../CloudImageUpload";
import { postearAddEntity } from "./FetchFunctions";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {});
});

const AddBanner = () => {
  const history = useHistory();
  const [url, setUrl] = useState(null);
  const [urlTemp, setUrlTemp] = useState(null);
  const [image, setimage] = useState(null)
  const [category, setcategory] = useState(null)
  const [postear, setpostear] = useState(false)

  useEffect(() => {
    if (postear) {
      postearAdd();
    }
  },[url, postear]);

  const agregarBanner = () => {
    const asubir = image;
    console.log(asubir)
    uploadImage({ image: asubir, fx: setUrl });
    setpostear(true);
    //setUrl(urlTemp)
    console.log(url)

  }

  const postearAdd = () => {
    if (image && category) {
      postearAddEntity({
        historyProp: history, entityClass: "banners", atributes: {
          "banner": url,
          "category": category
        }
      });
    } else {
      M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
    }
  };

  const loadCategories = () => {
    var categories = ["HOME", "SCHEDULE", "CLASS", "COURRIER", "PAYMENTMETHODS"];
    categories.sort();
    addOptions("Category", categories);
  }

  const addOptions = (idElement, array) => {
    var select = document.getElementsById(idElement)[0];
    array.forEach(element => {
      var option = document.createElement("option");
      option.text = array[element];
      select.add(option);
    });
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div class="row" onLoad={loadCategories}>
          <form class="col s12" id="bannerform">
            <BannerCategories val={category} fx={setcategory} />
            <form action="#">
              <div class="file-field input-field">
                <div class="btn" id='buttonUploadImages'>
                  <span>Cargar imagen</span>
                  <input type="file" onChange={(e) => setimage(e.target.files[0])} />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" value={url} />
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col s12">
                <button onClick={() => {
                  agregarBanner();
                  if (image &&
                    category && url) {
                    postearAdd();
                  }
                }} class="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Agregar Banner</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
