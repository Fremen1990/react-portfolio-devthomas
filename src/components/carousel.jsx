import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Slide1 from "../assets/img/carousal/slide1.webp";
import Slide2 from "../assets/img/carousal/slide2.webp";
import Slide3 from "../assets/img/carousal/slide3.webp";

import "./carousel.css";

const MyCarousel = () => {
  return (
    <>
      <div className="home" id="home">
        <Carousel controls={false} indicators interval={3000} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={Slide1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={Slide2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 custom-img"
              src={Slide3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default MyCarousel;
