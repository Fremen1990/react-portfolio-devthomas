import React from "react";
// Components---------------------------------
import MyNavbar from "./components/navbar";
import MyCarousel from "./components/carousel";
import MyTitleMessage from "./components/titleMessage.jsx";
import About from "./pages/about";
import Skills from "./pages/skills";

import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { Parallax } from "react-parallax";
import Container from "react-bootstrap/Container";
import "./App.css";
import Experience from "./pages/experience";
import ProjectsTimeline from "./components/projects-timeline";
import Contact from "./pages/contactForm";

function App() {
  return (
    <>
      <div className="App" style={{ position: "relative" }}>
        {/* ======================== Navbar ========================== */}

        <MyNavbar />
        {/* =========================== Home ===================== */}
        <Fade duration={2000}>
          <MyCarousel />
        </Fade>

        <MyTitleMessage />

        {/* ========================== About ============================= */}

        <div>
          <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={require("./assets/img/parallex/background.webp")}
            bgImageAlt=""
            strength={-200}
          >
            <Container className="container-box rounded">
              <Fade duration={1500}>
                <About />
              </Fade>
            </Container>
          </Parallax>
        </div>

        {/* ============================== Skills =========================== */}
        <div>
          <Container className="container-box rounded">
            <Slide bottom duration={1000}>
              <hr />
              <Skills />
            </Slide>
          </Container>
        </div>

        {/* ============================ Experience ============================== */}
        <Parallax
          blur={{ min: -30, max: 30 }}
          bgImage={require("./assets/img/parallex/background.webp")}
          bgImageAlt=""
          strength={-200}
        >
          <Container className="container-box rounded ">
            <Fade duration={1000}>
              <hr />
              <Experience />
            </Fade>
          </Container>
        </Parallax>

        {/* ============================ ProjectsTimeline ============================== */}

        <div>
          <Container className="container-box rounded">
            <Slide bottom duration={500}>
              <hr />
              <ProjectsTimeline />
            </Slide>
          </Container>
        </div>

        {/* ============================ ProjectsTimeline ============================== */}

        <Contact />
      </div>
    </>
  );
}

export default App;
