import React from "react";
import styles from "./scrollDown.module.css";

// import styled from "styled-components";

// const MyScroll = styled.div`
//   position: relative;
//   z-index: 1;
//   bottom: 1.6em;
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   background-color: transparent;
//   font-weight: bold;
//   text-shadow: 1px 1px #45a29e;
//   color: #fff;
//   .turn {
//     cursor: pointer;
//     transform: rotate(90deg);
//   }
// `;

const ScrollDown = () => {
  return (
    // <MyScroll>
    <div className={styles.myScroll}>
      <div className={styles.turn}>
        <span>&gt;</span>
      </div>
    </div>
    // </MyScroll>
  );
};

export default ScrollDown;
