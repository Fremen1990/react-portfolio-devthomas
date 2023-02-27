import React from "react";
import Typewriter from "typewriter-effect";
import styled from "styled-components";

const MyTitleMessageStyled = styled.h1`
  position: absolute;
  width: 100%;
  top: 22rem;
  z-index: 1;
  margin-top: -125px;
  text-align: center;
  strong {
    font-size: 1.25em;
  }
  div {
    color: ${(props) => props.theme.textColor};
    text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    font-weight: 100;
    letter-spacing: 8px;
    .main {
      font-size: 60px;
    }
    .sub {
      font-size: 40px;
      letter-spacing: 2px;
    }
  }
`;

const MyTitleMessage = () => {
  return (
    <MyTitleMessageStyled>
      <div className="titleMessage">
        <div className="heading">
          <div className="main text-center mb-3">
            Hi, I am
            <br />
            <span>
              <strong>Tomasz Stanisz</strong>
            </span>
          </div>
          <div className="sub">
            <Typewriter
              options={{
                strings: ["Web Developer", "IT lover", "Self-taught"],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </div>
        </div>
      </div>
    </MyTitleMessageStyled>
  );
};

export default MyTitleMessage;
