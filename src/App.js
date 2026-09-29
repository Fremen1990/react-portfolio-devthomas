import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Hero } from "./components/Hero/Hero";
import { SectionBand } from "./components/SectionBand/SectionBand";
import { SelectedWork } from "./pages/Work/SelectedWork";
import Experience from "./pages/Experience/Experience";
import { Background } from "./pages/Background/Background";
import Contact from "./pages/Contact/Contact";
import FooterPanel from "./FooterPanel/FooterPanel";

export const App = () => {
  return (
    <div className="App">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <SectionBand id="work" title="Selected work">
          <SelectedWork />
        </SectionBand>
        <SectionBand id="approach" title="How I work">
          <Experience />
        </SectionBand>
        <SectionBand id="about" title="Background">
          <Background />
        </SectionBand>
        <SectionBand id="contact" title="Contact">
          <Contact />
        </SectionBand>
      </main>
      <FooterPanel />
    </div>
  );
};
