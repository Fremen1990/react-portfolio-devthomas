import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Profile from "../../assets/img/profile/profile.webp";

import "./about.css";
import { ButtonAbout } from "../../components/ButtonAbout/ButtonAbout";
import { messages } from "./messages";

const About = () => {
  return (
    <div className="about" id="about">
      <h1 className="pt-3 text-center font-details pb-3">About Me</h1>
      <Container>
        <Row className="pt-3 pb-5 align-items-center">
          {/* Profile picture */}
          <Col xs={12} md={6}>
            <Row className="justify-content-center mb-2 mr-2 img-about">
              <Image
                className="profile justify-content-end"
                alt="profile"
                src={Profile}
                thumbnail
                fluid
              />
            </Row>
          </Col>

          {/*======================  About Description =====================*/}
          <Col xs={12} md={6}>
            {/*==================== Description ======================= */}
            <Row className=" align-items-start p-2 my-details rounded text-justify">
              Hello there! I'm <strong>&nbsp;Tomasz Stanisz</strong>
              <br />
              Web developer who made a career switch from finance to IT after 8
              years in the industry. My love for programming and problem-solving
              inspired me to pursue web development, starting with a Computer
              Science bootcamp, followed by a Full-Stack JavaScript bootcamp
              where I mastered technologies like NestJS, React, and TypeScript.
              <br />
              <br />
              This transition has allowed me to combine my strong analytical
              background with my passion for technology, enabling me to create
              exceptional websites and applications that exceed client
              expectations. I'm eager to collaborate, learn, and bring
              innovative ideas to life in this exciting new chapter of my
              career. Let's work together!
              <br />
              <br /> <br />
              {/*==================== Buttons =================== */}
              <Col className="d-flex justify-content-center flex-wrap">
                {messages.buttons.map(
                  ({ href, newTab, variant, title }, index) => {
                    return (
                      <ButtonAbout
                        key={index}
                        href={href}
                        newTab={newTab}
                        variant={variant}
                        title={title}
                      />
                    );
                  }
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
