import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import Slide1 from "../../assets/img/carousal/slide1.webp";
import Slide1Mobile from "../../assets/img/carousal/slide1_mobile.webp";
import Slide2 from "../../assets/img/carousal/slide2.webp";
import Slide2Mobile from "../../assets/img/carousal/slide2_mobile.webp";
import Slide3 from "../../assets/img/carousal/slide3.webp";
import Slide3Mobile from "../../assets/img/carousal/slide3_mobile.webp";
import { usePrefersReducedMotion } from "../../utils/useMediaPreference";

import "./carousel.css";

const slides = [
  { desktop: Slide1, mobile: Slide1Mobile },
  { desktop: Slide2, mobile: Slide2Mobile },
  { desktop: Slide3, mobile: Slide3Mobile },
];

const MyCarousel = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(reduceMotion);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setPaused(true);
    }
  }, [reduceMotion]);

  return (
    <div className="home-carousel">
      <Carousel
        activeIndex={index}
        onSelect={setIndex}
        interval={paused ? null : 5000}
        pause="hover"
        slide={!reduceMotion}
        controls
        indicators
        keyboard
        prevLabel="Previous photograph"
        nextLabel="Next photograph"
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.desktop}>
            <picture>
              <source media="(max-width: 720px)" srcSet={slide.mobile} />
              <img
                className="d-block w-100 custom-img"
                src={slide.desktop}
                alt=""
              />
            </picture>
          </Carousel.Item>
        ))}
      </Carousel>
      <button
        type="button"
        className="carousel-pause"
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? "Play photographs" : "Pause photographs"}
      </button>
    </div>
  );
};

export default MyCarousel;
