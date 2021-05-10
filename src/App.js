import React from "react";

// Components---------------------------------
import MyNavbar from "./components/navbar";
import MyCarousel from "./components/carousel";
import MyTitleMessage from "./components/titleMessage.jsx";
import About from "./pages/about";

import "./App.css";

function App() {
  return (
    <>
      {/* ========== Navbar ============= */}
      <MyNavbar />
      {/* ========== Home ============= */}

      <MyCarousel />
      <MyTitleMessage />
      {/* ========== About ============= */}

      <About />
      <div className="App">
        <header className="App-header">MY PORTFOLIO</header>
      </div>
    </>
  );
}

export default App;
