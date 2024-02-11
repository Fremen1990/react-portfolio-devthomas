import { ImageEvent } from "@merc/react-timeline";
import L_OTG from "../../../assets/img/projects/orange-tv-go.jpg";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_JAVASCRIPT from "../../../assets/img/skills/javascript.svg";
import L_STYLED_COMPONENTS from "../../../assets/img/skills/styled-components.svg";
import L_REACT from "../../../assets/img/skills/react.svg";
import L_TYPESCRIPT from "../../../assets/img/skills/typescript.svg";
import L_REACT_QUERY from "../../../assets/img/skills/react-queyr.webp";
import L_CYPRESS from "../../../assets/img/skills/testing_cypress.png";
import L_RTL from "../../../assets/img/skills/react-testing-library.png";
import React from "react";

export const OTG = () => {
  return (
    <ImageEvent
      date="30/11/2022 - present"
      className="text-center"
      text="Orange TV GO 💻"
      src={L_OTG}
      alt="MegaK Head Hunter"
    >
      <div className="d-flex justify-content-between flex-column mt-1">
        <div>
          <Accordion>
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                className="p-2 text-center accordian-main"
              >
                PROJECT DETAILS
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0" className="text-left">
                <Card.Body>
                  <strong>Description:</strong> Project OTG is multiplatform TV
                  Streaming service including Web Application, Android Mobile,
                  IOS and Android TV. The application use one common backend and
                  sync between each other. The application is created to connect
                  users with their favorite TV shows and movies.
                  <hr />
                  <hr />
                  <strong>Tech used:</strong>
                  <ul>
                    <li>
                      <span className="p-2">
                        <Image
                          src={L_JAVASCRIPT}
                          alt="Django"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        JavaScript
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_STYLED_COMPONENTS}
                          alt="Styled Components"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Styled Components
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_REACT}
                          alt="React"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        React
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_REACT_QUERY}
                          alt="React Query"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        React Query
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_TYPESCRIPT}
                          alt="TypeScript"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        TypeScript
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_RTL}
                          alt="JEST"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        React Testing Library{" "}
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_CYPRESS}
                          alt="Cypress"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Cypress{" "}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    This project was a great opportunity to build as much
                    scalable and long term adjustable to business needs
                    application as possible in great team of experienced
                    developers, UX designers and testers across different
                    platforms and with usage of current best practices and new
                    tech stack.
                    <br />
                  </em>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-center"></div>
      </div>
    </ImageEvent>
  );
};
