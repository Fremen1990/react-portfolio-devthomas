import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Profile from "../assets/img/profile/profile.webp";
import Button from "react-bootstrap/Button";

import "./about.css";

const About = () => {
  return (
    <div className="about" id="about">
      <h1 className="pt-3 text-center font-details pb-3">About Me</h1>
      <Container>
        <Row className="pt-3 pb-5 align-items-center">
          {/* Profile picture */}
          <Col xs={12} md={6}>
            <Row className="justify-content-center mb-2 mr-2 ">
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
            <Row className=" align-items-start p-2 my-details rounded">
              Hi there! My name is <strong>&nbsp;Thomas Stanisz</strong>
              <br />I am Tech lover, highly motivated with creation websites and
              applications. Born in the Villige in central Poland. I am
              Financial Analyst with love to programming, a Full Stack Web
              Developer with React.js, Redux, Node.js, and SQL as my tech stack.
              <br />
              In 2018 i have decided that i will learn programming, and the
              never ending journey has started, enjoing the process
              <br />
              I work for ANON Animals Natute non-profit organization as they
              full stach developer and Tech consultant
              <br />I love learning about new technologies, what problems are
              they solving and How can I use them to build better and scalable
              products.
              <br /> <br />
              {/*==================== Buttons =================== */}
              <Col className="d-flex justify-content-center flex-wrap">
                <div>
                  <a href="#contact">
                    <Button className="m-2" variant="outline-primary">
                      Let's talk
                    </Button>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.devthomas.pl/Projects/Responsive%20resume%20Tomasz%20Stanisz%20-%20Web%20Developer%20CV/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="m-2" variant="outline-success">
                      My Resume
                    </Button>
                  </a>
                </div>
                <div>
                  <a
                    href="https://github.com/Fremen1990"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="m-2" variant="outline-dark">
                      GitHub
                    </Button>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/tomasz-stanisz-85818683/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="m-2" variant="outline-info">
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
