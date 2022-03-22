import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Slide1 from "../assets/img/carousal/slide1.webp";
import Slide1_mobile from "../assets/img/carousal/slide1_mobile.webp";
import Slide2 from "../assets/img/carousal/slide2.webp";
import Slide2_mobile from "../assets/img/carousal/slide2_mobile.webp";
import Slide3 from "../assets/img/carousal/slide3.webp";
import Slide3_mobile from "../assets/img/carousal/slide3_mobile.webp";
import ScrollDown from "../components/scrollDown.jsx";

import "./carousel.css";

const MyCarousel = () => {
  return (
    <>
      <div className="home" id="home">
        <Carousel controls={false} indicators interval={3000} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={window.innerWidth > 720 ? Slide1 : Slide1_mobile}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={window.innerWidth > 720 ? Slide2 : Slide2_mobile}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={window.innerWidth > 720 ? Slide3 : Slide3_mobile}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <ScrollDown />
      </div>
    </>
  );
};

export default MyCarousel;
