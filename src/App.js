import React from "react";

// Components-------
import MyNavbar from "./components/navbar";
import MyCarousel from "./components/carousel";
import MyTitleMessage from "./components/titleMessage.jsx";

import "./App.css";

function App() {
  return (
    <>
      <MyNavbar />
      <MyCarousel />
      <MyTitleMessage />
      <div className="App">
        <header className="App-header">MY PORTFOLIO</header>
      </div>
    </>
  );
}

export default App;
