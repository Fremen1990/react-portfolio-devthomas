import { ImageEvent, UrlButton } from "@merc/react-timeline";
import L_HEAD_HUNTER from "../../../assets/img/projects/head_hunter.png";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_JAVASCRIPT from "../../../assets/img/skills/javascript.svg";
import L_STYLED_COMPONENTS from "../../../assets/img/skills/styled-components.svg";
import L_REACT from "../../../assets/img/skills/react.svg";
import L_REDUX from "../../../assets/img/skills/redux.svg";
import L_TYPESCRIPT from "../../../assets/img/skills/typescript.svg";
import L_NESTJS from "../../../assets/img/skills/nestjs.svg";
import L_MYSQL from "../../../assets/img/skills/mySql.svg";
import L_TYPEORM from "../../../assets/img/skills/typeorm.png";
import L_CYPRESS from "../../../assets/img/skills/testing_cypress.png";
import L_JEST from "../../../assets/img/skills/testing_jest.webp";
import React from "react";

export const HeadHunter = () => {
  return (
    <ImageEvent
      date="17/08/2022"
      className="text-center"
      text="💪 MegaK Head Hunter 💀"
      src={L_HEAD_HUNTER}
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
                  <strong>Description:</strong> Project Head Hunter is a final
                  bonus stage of 1 year Full Stack JS Bootcamp. The application
                  brings together all knowledge and technologies which we were
                  learning throughout this time. Application is created to
                  connect software developer students with recruiters through
                  admin supervision.
                  <hr />
                  <strong>Features:</strong>
                  <ul className="list-styles pt-1">
                    <li>Add one student from form</li>
                    <li>Add one recruiter from form</li>
                    <li>Mass load number of students from csv file</li>
                    <li> Mass load number of recruiter from csv file</li>
                    <li>
                      Displaying all user, student, recruiters and managing them
                      from admin account
                    </li>
                    <li>Email account activation (security)</li>
                    <li>
                      Reset password functionality through email token
                      (security)
                    </li>
                    <li>CRON for managing overdue interviews</li>
                    <li>
                      Student access to complete and maintain up-to-date
                      detailed Portfolio/CV
                    </li>
                    <li>Protected role guards on backend (security)</li>
                    <li>Protected routes by roles on front-end (security)</li>
                    <li>Recruiter can see all active and available students</li>
                    <li>Recruiter can add student to own interview list</li>

                    <li>Recruiter can manage status on interview list</li>

                    <li>
                      Recruiter can filter students by names and all fields from
                      special filter component
                    </li>
                  </ul>
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
                          src={L_REDUX}
                          alt="Redux"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Redux Toolkit
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
                          src={L_NESTJS}
                          alt="NestJS"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        NestJS
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_MYSQL}
                          alt="MySQL"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        MySQL
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_TYPEORM}
                          alt="TypeORM"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        TypeORM
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
                          src={L_JEST}
                          alt="JEST"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        JEST{" "}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    {/*Quick three sentences about summary of building full stack*/}
                    {/*app from the ground and managing team as a scrum master:*/}
                    The project was a great opportunity to learn how to manage a
                    team of developers and how to work in a team. I was
                    responsible for frontend as well as backend and choosing
                    tech stack as tech lead of the project. It was a pleasure
                    and great boost for my productivity and knowledge.
                    <br />
                  </em>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-center">
          <UrlButton
            href="https://github.com/Fremen1990/head-hunter-frontend"
            target="_blank"
          >
            FrondEnd{" "}
          </UrlButton>

          <UrlButton
            href="https://www.youtube.com/watch?v=TStajdI8jhw"
            target="_blank"
          >
            DEMO{" "}
          </UrlButton>

          <UrlButton
            href="https://github.com/Fremen1990/head-hunter-backend"
            target="_blank"
          >
            BackEnd
          </UrlButton>
        </div>
      </div>
    </ImageEvent>
  );
};
