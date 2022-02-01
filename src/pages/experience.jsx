import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
// import L_ANON from "../assets/img/experience/anon.webp";
import L_MMC from "../assets/img/experience/mmc.webp";
import L_ACCENTURE from "../assets/img/experience/accenture.webp";
import L_TATEANDLYLE from "../assets/img/experience/tateandlyle.png";
import Tilt from "react-tilt";
import "./experience.css";

const Experience = () => {
  return (
    <div id="experience">
      <h1 className="pt-3 text-center font-details-b pb-3">EXPERIENCE</h1>
      <Jumbotron className="jumbo-style">
        <Container className="row">
          <Tilt options={{ max: 15 }} className="col">
            <Card >
              <Card.Header
                as="h5"
                className="d-flex justify-content-center flex-wrap"
              >
                <Card.Img
                  variant="top"
                  className="img-flex h-25"
                  src={L_MMC}
                  alt="ANON - Animals Nature"
                />
              </Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column">
                <div>
                  <Card.Title className="text-center">Senior General Ledger Analyst</Card.Title>
                </div>
                <div>
                  <Card.Text className="text-left style">
                    <strong className="body-title-style ">
                    Analyzing accounting data
                    </strong>
                    <br />
                    <strong>Tech:</strong> Excel, VBA, Oracle, SQL
                    <br />
                    <strong>Duration:</strong>  2020 - Present
                    <br />

                  </Card.Text>
                </div>
              </Card.Body>
            </Card>


          </Tilt>

          <Tilt options={{ max: 15 }} className="col">
            <Card >
              <Card.Header
                  as="h5"
                  className="d-flex justify-content-center flex-wrap"
              >
                <Card.Img
                    variant="top"
                    className="img-flex h-25"
                    src={L_ACCENTURE}
                    alt="Accenture"
                />
              </Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column">
                <div>
                  <Card.Title className="text-center">Senior General Ledger Analyst</Card.Title>
                </div>
                <div>
                  <Card.Text className="text-left style">
                    <strong className="body-title-style ">
                     Cooperation with financial controllers
                    </strong>
                    <br />
                    <strong>Tech:</strong> Oracle, Excel, VBA
                    <br />
                    <strong>Duration:</strong> 2018 - 2020
                    <br />

                  </Card.Text>
                </div>
              </Card.Body>
            </Card>


          </Tilt>

          <Tilt options={{ max: 15 }} className="col">
            <Card >
              <Card.Header
                  as="h5"
                  className="d-flex justify-content-center flex-wrap"
              >
                <Card.Img
                    variant="top"
                    className="img-flex h-25"
                    src={L_TATEANDLYLE}
                    alt="ANON - Animals Nature"
                />
              </Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column">
                <div>
                  <Card.Title className="text-center">Credit Management Ananlyst</Card.Title>
                </div>
                <div>
                  <Card.Text className="text-left style">
                    <strong className="body-title-style ">
                  Working with 3rd party client
                    </strong>
                    <br />
                    <strong>Tech:</strong> SAP, Excel, VBA
                    <br />
                    <strong>Duration:</strong> 2015 - 2017
                    <br />

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
