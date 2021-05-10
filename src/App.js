import React from "react";
// Components---------------------------------
import MyNavbar from "./components/navbar";
import MyCarousel from "./components/carousel";
import MyTitleMessage from "./components/titleMessage.jsx";
import About from "./pages/about";

import Fade from "react-reveal/Fade";
import { Parallax } from "react-parallax";
import Container from "react-bootstrap/Container";
import "./App.css";

function App() {
  return (
    <>
      <div className="App" style={{ position: "relative" }}>
        {/* ========== Navbar ============= */}
        <MyNavbar />
        {/* ========== Home ============= */}

        <MyCarousel />
        <MyTitleMessage />
        {/* ========== About ============= */}
        <div>
          <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={require("./assets/img/parallex/background.webp")}
            bgImageAlt=""
            strength={-200}
          >
            <Container className="container-box rounded">
              <Fade duration={500}>
                <About />
              </Fade>
            </Container>
          </Parallax>
        </div>
      </div>
    </>
  );
}

export default App;
