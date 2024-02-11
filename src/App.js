import React from "react";

// bootstrap libraries ! :)
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { Parallax } from "react-parallax";
import Container from "react-bootstrap/Container";
import Particles from "react-particles-js";
import { particlesOptions } from "./particlesOptions";

// Components---------------------------------
import NavBar from "./components/NavBar/NavBar";
import MyCarousel from "./components/MyCarousel/carousel";
import MyTitleMessage from "./components/titleMessage.jsx";
import ProjectsTimeline from "./pages/ProjectsTimeline/ProjectsTimeline";
import FooterPanel from "./FooterPanel/FooterPanel";

// Pages
import About from "./pages/About/about";
import Experience from "./pages/Experience/Experience";
import { Skills } from "./pages/Skills";
import Contact from "./pages/Contact/Contact";

// Styles
import "./App.css";
import { EducationTimeline } from "./pages/Education/EducationTimeline";

export const App = () => (
  <div className="App" style={{ position: "relative" }}>
    {/* ======================== Navbar ========================== */}
    <NavBar />
    {/* =========================== Home ===================== */}
    <Fade duration={1500}>
      <MyCarousel />
    </Fade>
    <MyTitleMessage />

    {/* =============checking if mobile - if yes then we cannot use Particles  ==================*/}

    {/* ------ Particles effect ------- */}
    {window.innerWidth < 720 ? (
      ""
    ) : (
      <Particles
        className="particles particles-box"
        params={particlesOptions}
      />
    )}
    {/* ========================== About ============================= */}
    <div>
      <Parallax
        blur={{ min: -30, max: 30 }}
        bgImage={require("./assets/img/parallex/background.webp")}
        bgImageAlt=""
        strength={-200}
      >
        <Container className="container-box rounded">
          <Fade duration={1000}>
            <About />
          </Fade>
        </Container>
      </Parallax>
    </div>
    {/* ============================== Skills =========================== */}
    <div>
      <Container className="container-box rounded">
        <Slide bottom duration={750}>
          <hr className="hr-skills" />
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
        <Fade duration={500}>
          <hr />
          <Experience />
        </Fade>
      </Container>
    </Parallax>
    {/* ============================ ProjectsTimeline ============================== */}
    <div>
      <Container className="container-box rounded">
        <Slide bottom duration={500}>
          <hr className="hr-projects" />
          <ProjectsTimeline />
        </Slide>
      </Container>
    </div>
    {/* ============================ EducationTimeline ============================== */}
    <div>
      <Container className="container-box rounded">
        <Slide bottom duration={500}>
          <hr className="hr-projects" />
          <EducationTimeline />
        </Slide>
      </Container>
    </div>
    {/* ============================ Contact ============================== */}
    <div>
      <Container className="container-box rounded contact-container">
        <Fade bottom duration={500}>
          <hr className="hr-contact" />
          <Contact />
        </Fade>
      </Container>
    </div>
    {/* ============================ Footer ============================== */}
    <hr className="hr-footer" />
    <FooterPanel />
  </div>
);
