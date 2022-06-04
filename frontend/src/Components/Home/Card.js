import React from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ReactWhatsapp from "react-whatsapp";
import "./Style/Card.css";
const Card = (props) => {
  return (
    <>
      <div className="card_div">
        <MDBCard style={{ maxWidth: "22rem" }} className="card_div_mdb">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardTitle className="card_titile">
              <p>{props.breed}</p>
              <span>{}</span>|{Math.round(props.distance)}
              <span>KM away </span>
              <span className="">|₹{props.price}</span>
            </MDBCardTitle>
            <MDBCardImage
              src={`${props.image}`}
              fluid
              alt="..."
              className="card_div_image"
            />
            {/* <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a> */}
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card_div_text">{props.desc}</MDBCardText>
            <div className="card_bottons_div">
              {/* <MDBBtn className="btn btn-dark card_botton">Button</MDBBtn>
         <MDBBtn className="btn btn-dark card_botton">Button</MDBBtn> */}
              <div className="call_link  text-center">
                {/* <button className="btn btn-primary card_botton me-1" href="tel:9617266124">
                  <CallIcon />
                </button> */}
                <a href="tel:9617266124" className="me-3">
                  <button className="btn btn-primary">
                    <CallIcon />
                  </button>
                </a>
              </div>
              <div>
                <ReactWhatsapp
                  number="+91-8817897211"
                  message="Hello World!!!"
                  className="btn btn-success"
                >
                  <WhatsAppIcon />
                </ReactWhatsapp>
              </div>

              <div className="owner ms-1"></div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default Card;
