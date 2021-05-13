import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import L_ANON from "../assets/img/experience/anon.png";
import Tilt from "react-tilt";
import "./experience.css";

const Experience = () => {
  return (
    <div id="experience">
      <h1 className="pt-3 text-center font-details-b pb-3">EXPERIENCE</h1>
      <Jumbotron className="jumbo-style">
        <Container>
          <Tilt options={{ max: 25 }}>
            <Card>
              <Card.Header
                as="h5"
                className="d-flex justify-content-center flex-wrap"
              >
                <Card.Img
                  variant="top"
                  className="img-resize"
                  src={L_ANON}
                  alt="ANON - Animals Nature"
                />
              </Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column">
                <div>
                  <Card.Title className="text-center">Web Developer</Card.Title>
                </div>
                <div>
                  <Card.Text className="text-center style">
                    <strong className="body-title-style ">
                      Full Stack Developer
                    </strong>
                    <br />
                    <strong>Technology:</strong> HTML, SASS, React JS, Node JS,
                    MongoDB
                    <br />
                    <strong>Duration:</strong> March 2021 - Present
                    <br />
                    <strong> Description </strong>
                    <br />
                    <ul className="text-left">
                      <li>
                        <strong>Developed &amp; enhanced</strong> website from
                        wordpress to React JS with all changes and new feaures
                        and enhancements
                      </li>

                      <li>
                        <strong>Provided</strong> website maintainance and
                        continious enhancements, problem solving for startup
                        profile web page and new ideas
                      </li>
                      {/* <li>
                        <strong>Performed</strong> quality checks with designers and 
                      </li> */}
                      {/* <li><strong>Co-created</strong> React Document used as a guide for new developers.</li> */}
                    </ul>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Tilt>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Experience;
