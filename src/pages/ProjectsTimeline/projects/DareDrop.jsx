import { ImageEvent } from "@merc/react-timeline";
import L_DARE_DROP from "../../../assets/img/projects/dare-drop.webp";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_JAVASCRIPT from "../../../assets/img/skills/javascript.svg";
import L_STYLED_COMPONENTS from "../../../assets/img/skills/styled-components.svg";
import L_REACT from "../../../assets/img/skills/react.svg";
import L_REDUX from "../../../assets/img/skills/redux.svg";
import L_NEXTJS from "../../../assets/img/skills/nextjs.svg";
import L_AWS from "../../../assets/img/skills/aws.png";
import L_RTL from "../../../assets/img/skills/react-testing-library.png";
import React from "react";

export const DareDrop = () => {
  return (
    <ImageEvent
      date="30/06/2022"
      className="text-center"
      text="Dare Drop 📦"
      src={L_DARE_DROP}
      alt="DareDrop"
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
                  <strong>Description:</strong> Dare Drop is a platform where
                  creators complete dares to reward their fans, fostering a
                  community of gamers who enjoy challenges. The company produces
                  software that aids games in building their player base through
                  challenges, helping influencers grow. It offers a way for
                  creators to engage with their viewers by completing dares and
                  providing rewards. The platform's ethos is centered around the
                  idea that gamers enjoy challenges and that completing dares
                  can be a rewarding experience for both creators and their
                  audience.
                  <br />
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
                          src={L_NEXTJS}
                          alt="NextJS"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        NextJS
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_AWS}
                          alt="AWS"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        AWS
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_RTL}
                          alt="React Testing Library"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        React Testing Library{" "}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    This was first oportunity to work in IT global environment
                    for US client and remotly with part of the team from US and
                    part from Poland. Amazing chance to see how start ups works
                    and how dynamicly it grows. <br />
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
