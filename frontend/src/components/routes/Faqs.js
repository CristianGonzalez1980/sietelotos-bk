import React, { useState, useEffect } from "react";
import "../../styles/Faqs.css";
import { Carousel } from 'react-materialize'
import { postearGetEntity } from "../AdminPanel/FetchFunctions";

const Faqs = () => {
  const [imagesPM, setimagesPM] = useState(null)
  const [imagesC, setimagesC] = useState(null)

  useEffect(() => {
    if (!imagesPM) {
      postearGetEntity({ entityClass: "banners/PAYMENTMETHODS", fx: setimagesPM });
    }
  }, [imagesPM])
  
  useEffect(() => {
    if (!imagesC) {
      postearGetEntity({ entityClass: "banners/COURRIER", fx: setimagesC });
    }
  }, [imagesC])

  const payMethodImg = () => {
    if (imagesPM) {
      const list = imagesPM.map((image) => {
        return (
          image.image
        )
      })

      return (
        <Carousel carouselId="Carousel-2" images={list} />
      )
    }
  }

  const CourrierImg = () => {
    if (imagesC) {
      return (
        <div className="rowcourrier">
          <div className="col s6">
            <img alt="1" id="correo1" src={imagesC[0].image} />
          </div>
          <div className="col s6">
            <img alt="2" id="correo2" src={imagesC[1].image} />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="mt-4">
      <h3 id="h1Text"> Preguntas frecuentes </h3>
      <h5 id="h5Text">¿Qué formas de pago puedo aprovechar para realizar mi compra?</h5>
      <p id="pText"> Disponemos de los siguientes medios de pago:</p>
      <div id="Pm">
        {payMethodImg()}
      </div>
      <h5 id="h6Text">¿Cuál es el costo de envío?</h5>
      <p id="pText">El costo de envío será mostrado en base al total de la compra y ubicación, en el checkout, en el momento previo a la compra.</p>
      <h5 id="h5Text">¿Cómo se realizan los envíos?</h5>
      <p id="pText">Trabajamos con:</p>
      <div id="correo">
        {CourrierImg()}
      </div>
      <h5 id="h5Text">¿Dónde puedo recibir mi pedido?</h5>
      <p id="pText">Realizamos envíos a todo el país.</p>
      <h5 id="h5Text">¿Cuánto tarda en llegar el pedido?</h5>
      <p id="pText2">El tiempo de entrega dependerá del tipo de envío seleccionado. En general la demora se encuentra entre 3 y 7 días hábiles luego de acreditado el pago.</p>
    </div>
  );
};

export default Faqs;