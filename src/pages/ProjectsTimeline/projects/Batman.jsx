import { ImageEvent } from "@merc/react-timeline";
import L_BATMAN from "../../../assets/img/projects/batman.webp";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_VITE from "../../../assets/img/skills/vitejs.png";
import L_JAVASCRIPT from "../../../assets/img/skills/javascript.svg";
import L_MUI from "../../../assets/img/skills/material-ui-1.svg";
import L_REACT from "../../../assets/img/skills/react.svg";
import L_TYPESCRIPT from "../../../assets/img/skills/typescript.svg";
import L_REACT_QUERY from "../../../assets/img/skills/react-queyr.webp";
import L_CYPRESS from "../../../assets/img/skills/testing_cypress.png";
import L_JSON_SCHEMA from "../../../assets/img/skills/json-schema.svg";
import L_VITEST from "../../../assets/img/skills/vitest.png";
import L_RTL from "../../../assets/img/skills/react-testing-library.png";
import React from "react";

export const Batman = () => {
  return (
    <ImageEvent
      date="01/03/2023 - present"
      className="text-center"
      text="Batman Multiplatform CMS 🦇"
      src={L_BATMAN}
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
                  <strong>Description:</strong> Batman CMS Project is a
                  multiplatform Content Management System to manage TV content
                  on multiplatform TV Streaming service including Web
                  Application, Android Mobile, IOS and Android TV. The
                  application use two backends in GO language, one for TV
                  platforms and one for managing content and sync between each
                  other.
                  <hr />
                  <hr />
                  <strong>Tech used:</strong>
                  <ul>
                    <li>
                      <span className="p-2">
                        <Image
                          src={L_VITE}
                          alt="Vite"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Vite
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_JAVASCRIPT}
                          alt="JavaScript"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        JavaScript
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_MUI}
                          alt="MUI"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Material UI 5
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
                          src={L_JSON_SCHEMA}
                          alt="Json Schema"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Json Schema
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_VITEST}
                          alt="Vitest"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Vitest
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
                    This project was build from the ground up using the latest
                    technologies and best practices. The project is long term
                    and will be growing in the future.
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
