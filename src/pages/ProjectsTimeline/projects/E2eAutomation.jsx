import { ImageEvent } from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_JAVASCRIPT from "../../../assets/img/skills/javascript.svg";
import L_PAGE_OBJECT_MODEL from "../../../assets/img/skills/page-object-model.webp";
import L_CICD from "../../../assets/img/skills/gitlab.png";
import L_TYPESCRIPT from "../../../assets/img/skills/typescript.svg";
import L_DOCKER from "../../../assets/img/skills/docker.webp";
import L_CYPRESS_PROJECT from "../../../assets/img/projects/cypress.png";
import L_CYPRESS from "../../../assets/img/skills/testing_cypress.png";
import React from "react";

export const E2eAutomation = () => {
  return (
    <ImageEvent
      date="01/01/2023 - present"
      className="text-center"
      text="Independent E2E Automation project 🧪"
      src={L_CYPRESS_PROJECT}
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
                  <strong>Description:</strong> Independent E2E Automation
                  Project was a project which was build from the ground on
                  separated repository for team of 2 automation testers and one
                  developer for code review and guidance. The goal was to
                  automate as much manual tests as possible with as much as
                  possible scalability and maintainability also avoiding fragile
                  tests and flaky tests.
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
                          src={L_CYPRESS}
                          alt="Cypress"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Cypress{" "}
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_PAGE_OBJECT_MODEL}
                          alt="Page Object Model"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Page Object Model{" "}
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_DOCKER}
                          alt="Cypress"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Docker{" "}
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_CICD}
                          alt="Cypress"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        GitLab CI/CD{" "}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    The project was a great success and it was best possible
                    learning experience for me and my team. We learned a lot
                    about E2E Automation and how to avoid flaky tests and how to
                    make tests more maintainable and scalable. We also learned a
                    lot about Cypress and how to use it to its full potential
                    using CI/CD, Docker and automate as much as possible.
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
