import React from 'react'
import '../../styles/DeleteProveedor.css'

const ProviderCard = (props) => {

  var provider = props.cp
  var funcionD = props.fx
  var iconFx = props.icon

  return (
    <div className="col s1" id='colCard'>
      <div className="card" id='cardViewProveedor_Product'>
        <div className="card-image">
          <img src={provider.companyImage} alt={provider.companyName} />
          <button onClick={() => { funcionD(provider) }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">{iconFx}</i></button>
        </div>
        <div className="card-content">
          <a href={"http://" + provider.facebook} target="_blank"><p>Facebook</p></a>
          <a href={"http://" + provider.instagram} target="_blank"><p>Instagram</p></a>
          <a href={"http://" + provider.web} target="_blank"><p>Web</p></a>
        </div>
      </div>
    </div>
  )
}

export default ProviderCard;