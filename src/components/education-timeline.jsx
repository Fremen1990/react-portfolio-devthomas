import React from "react";

import { Timeline, Events, UrlButton, ImageEvent } from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// Education
import L_Websamuraj from "../assets/img/education/websamuraj.webp";
import L_KursReacta from "../assets/img/education/kursreacta.png";
import L_StudiujeIt from "../assets/img/education/studiuje-it.webp";
import L_MEGAK from "../assets/img/education/megak.webp";

// --------------SKILLS TO BE USED IN PROJECTS TIMELINE--------------------
import L_HTML5 from "../assets/img/skills/html-5.svg";
import L_CSS3 from "../assets/img/skills/css3.svg";
import L_SASS from "../assets/img/skills/sass-1.svg";
// import L_WEBPACK from "../assets/img/skills/web-pack.svg";
// import L_BOOTSTRAP4 from "../assets/img/skills/bootstrap-4.svg";
import L_REACT from "../assets/img/skills/react.svg";
// import L_REDUX from "../assets/img/skills/redux.svg";
import L_REACT_ROUTER from "../assets/img/skills/react-router.svg";
// import L_REACT_BOOTSTRAP from "../assets/img/skills/react-bootstrap.svg";
// import L_STYLED_COMPONENTS from "../assets/img/skills/styled-components.svg";
import L_NODE_JS from "../assets/img/skills/nodejs.svg";
import L_EXPRESS from "../assets/img/skills/express.svg";
// import L_VBA from "../assets/img/skills/vba.png";
import L_MONGODB from "../assets/img/skills/mongodb.svg";
import L_PHASER from "../assets/img/skills/phaser.svg";
import L_GIT from "../assets/img/skills/git-icon.svg";
// import L_OVH from "../assets/img/skills/ovh.svg";
import L_HEROKU from "../assets/img/skills/heroku.svg";
import L_NETLIFY from "../assets/img/skills/netlify.svg";
// import L_GITHUB_PAGES from "../assets/img/skills/github.svg";
import L_JAVASCRIPT from "../assets/img/skills/javascript.svg";
import L_Cplusplus from "../assets/img/skills/C++.png";
import L_PHP from "../assets/img/skills/PHP.png.crdownload";
import L_PYTHON from "../assets/img/skills/Python.png";
import L_JAVA from "../assets/img/skills/Java.png";
import L_ARDUINO from "../assets/img/skills/Arduino.png";

import "./projects-timeline.css";

const EducationTimeline = () => {
  return (
    <div id="education">
      <h1
        className="pt-3 text-center font-details-b pb-3"
        style={{ color: "#ffffff" }}
      >
        EDUCATION
      </h1>

      <Timeline>
        <Events>
          {/* Education: MEGAK - one year back-end bootcamp */}

          <ImageEvent
            date="15/06/2021"
            className="text-center"
            text="MEGAK - one year back-end bootcamp"
            src={L_MEGAK}
            alt="MEGAK - one year back-end bootcamp"
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
                        <strong>Description:</strong> MEGAK it is one year back
                        end bootcamp which will include JavaScript, Node,
                        Express, MongoDB, TypeScript, React and full stack
                        project with participation of software house guests.
                        <hr />
                        <strong>Bootcamp agenda:</strong>
                        <ul className="list-styles pt-1">
                          <li>Stage 1 - JavaScript</li>
                          <li>Stage 2 - NODE JS</li>
                          <li>Stage 3 - Express</li>
                          <li>Stage 4 - MongoDB</li>
                          <li>Stage 5 - TypeScript</li>
                          <li>Stage 6 - React</li>
                          <li>Stage 7 - NODE Advanced</li>
                          <li>Stage 8 - Final Project in Scrum</li>
                        </ul>
                        <hr />
                        <strong>Tech learned:</strong>
                        <ul>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_JAVASCRIPT}
                                alt="JavaScript"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              JavaScript
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_NODE_JS}
                                alt="NODE JS"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              NODE JS
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_EXPRESS}
                                alt="EXPRESS"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              Express
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_MONGODB}
                                alt="MongoDB"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 75, width: 75 }}
                              ></Image>{" "}
                              MongoDB
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton href="https://www.megak.pl/" target="_blank">
                  Check agenda
                </UrlButton>
                {/* <UrlButton
                  href=""
                  target="_blank"
                >
                 Check promo
                </UrlButton> */}
                <UrlButton
                  href="https://www.youtube.com/watch?v=JKUl2Vsc9p4"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton>
              </div>
            </div>
          </ImageEvent>

          {/* Education: StudiujeIT - one year bootcamp */}

          <ImageEvent
            date="15/10/2020"
            className="text-center"
            text="StudiujeIT - One year IT bootcamp"
            src={L_StudiujeIt}
            alt="StudiujeIT - One year IT bootcamp"
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
                        <strong>Description:</strong> StudiujeIT is one year IT
                        bootcamp to cover all IT topics starting from Math for
                        programmers, basics of the most popular programmin
                        laguages, databese, computer architectures, Law in IT
                        etc.
                        <hr />
                        <strong>Bootcamp agenda:</strong>
                        <ul className="list-styles pt-1">
                          <li>Math for Programmers</li>
                          <li>
                            Programming Fundamentals - C++ Python PHP JavaScript
                            NODE JAVA
                          </li>
                          <li>Law for IT</li>
                          <li>
                            Databases - related and non-related - SQL, postgre,
                            mongo
                          </li>
                          <li>Architecture of computers - Arduino</li>
                          <li>
                            Opeational Systems - Linux, VIM, scripting,
                            PowerShell
                          </li>
                          <li>Algorythms and databases</li>
                          <li>Computer networks and security</li>
                          <li>Software engieneering</li>
                          <li>Projects Management</li>
                        </ul>
                        <hr />
                        <strong>Tech learned:</strong>
                        <ul>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_ARDUINO}
                                alt="ARDUINO"
                                rounded
                                className="image-style m-1"
                                style={{ height: 50, width: 50 }}
                              ></Image>{" "}
                              ARDUINO
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_HTML5}
                                alt="HTML 5"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              HTML5
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_CSS3}
                                alt="CSS3"
                                rounded
                                className="image-style m-1"
                                style={{ height: 70, width: 50 }}
                              ></Image>{" "}
                              CSS3
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_JAVASCRIPT}
                                alt="JavaScript"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              JavaScript
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_NODE_JS}
                                alt="NODE JS"
                                rounded
                                className="image-style1 m-1"
                                // style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              NODE JS
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_Cplusplus}
                                alt="C++"
                                rounded
                                className="image-style1 m-1"
                                // style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              C++
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_PHP}
                                alt="PHP"
                                rounded
                                className="image-style1 m-1"
                                // style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              PHP
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_PYTHON}
                                alt="PYTHON"
                                rounded
                                className="image-style1 m-1"
                                // style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              PYTHON
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_JAVA}
                                alt="JAVA"
                                rounded
                                className="image-style1 m-1"
                                // style={{ height: 50, width: 70 }}
                              ></Image>{" "}
                              JAVA{" "}
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton href="https://studiuje.it/" target="_blank">
                  Check agenda
                </UrlButton>
                {/* <UrlButton
                  href=""
                  target="_blank"
                >
                 Check promo
                </UrlButton> */}
                {/* <UrlButton
                  href="https://youtube.com"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton> */}
              </div>
            </div>
          </ImageEvent>

          {/* Education: KursReacta - 12 tyg Reacta - Michał Taszycki */}

          <ImageEvent
            date="15/10/2020"
            className="text-center"
            text="KursReacta - 12 tyg Reacta - Michał Taszycki"
            src={L_KursReacta}
            alt="KursReacta - 12 tyg Reacta - Michał Taszycki"
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
                        <strong>Description:</strong> React Course with Michal
                        Taszycki it is complete 12 weeks React course with all
                        React topic from raw react with class components, before
                        hooks until the newest libraries and solutions.
                        <hr />
                        <strong>Course weeks:</strong>
                        <ul className="list-styles pt-1">
                          <li>Week 1 - Quick start with spotify clone</li>
                          <li>Week 2 - Components</li>
                          <li>Week 3 - Lists and forms</li>
                          <li>Week 4 - Styles</li>
                          <li>Week 5 - Testing and error handling</li>
                          <li>Week 6 - Integration with libraries</li>
                          <li>Week 7 - Integration with REST API</li>
                          <li>Week 8 - Advanced API React</li>
                          <li>Week 9 - Advanced React patterns</li>
                          <li>Week 10 - Optymalization</li>
                          <li>Week 11 - Redux</li>
                          <li>Week 12 - Deployment with React</li>
                        </ul>
                        <hr />
                        <strong>Tech learned:</strong>
                        <ul>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_HTML5}
                                alt="HTML 5"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              HTML5
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_SASS}
                                alt="SASS"
                                rounded
                                className="image-style m-1"
                                style={{ height: 70, width: 50 }}
                              ></Image>{" "}
                              SASS
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_JAVASCRIPT}
                                alt="JavaScript"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              JavaScript
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_REACT}
                                alt="React"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              React
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_NODE_JS}
                                alt="NODE JS"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 50, width: 70 }}
                              ></Image>{" "}
                              NODE JS
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton href="http://kursreacta.pl/" target="_blank">
                  Check agenda
                </UrlButton>
                {/* <UrlButton
                  href=""
                  target="_blank"
                >
                 Check promo
                </UrlButton> */}
                {/* <UrlButton
                  href="https://youtube.com"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton> */}
              </div>
            </div>
          </ImageEvent>

          {/* Education: WebSamuraj - Front End Developer */}

          <ImageEvent
            date="24/10/2019"
            className="text-center"
            text="WebSamuraj - From beginner to Web Developer"
            src={L_Websamuraj}
            alt="WebSamuraj - From beginner to Web Developer"
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
                        <strong>Description:</strong> The couse for completately
                        beginners, this was beginning of my programming journey
                        thanks to Bartek who was explaining everything very
                        detailed. Cours have 6 levels staring from HTML CSS,
                        through JavaScript, React, Node JS and advanced Front
                        End technologies.
                        <hr />
                        <strong>Course levels:</strong>
                        <ul className="list-styles pt-1">
                          <li>
                            Web developer from begiiner in 15 days - HTML CSS
                          </li>
                          <li>
                            Advanced Fron End in 15 days - HTML CSS and JS
                          </li>
                          <li>Programming in JavaScript</li>
                          <li>React for beginners</li>
                          <li>Back-end - Node, Express, MongoDB</li>
                          <li>Advanced projects in CSS and JS</li>
                        </ul>
                        <hr />
                        <strong>Tech learned:</strong>
                        <ul>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_HTML5}
                                alt="HTML 5"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              HTML5
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_CSS3}
                                alt="CSS"
                                rounded
                                className="image-style m-1"
                                style={{ height: 70, width: 50 }}
                              ></Image>{" "}
                              CSS
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_JAVASCRIPT}
                                alt="JavaScript"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              JavaScript
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_REACT}
                                alt="React"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              React
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_NODE_JS}
                                alt="NODE JS"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 50, width: 70 }}
                              ></Image>{" "}
                              NODE JS
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_EXPRESS}
                                alt="Express"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 50, width: 70 }}
                              ></Image>{" "}
                              Express
                            </span>
                          </li>

                          <li>
                            <span className="p-2">
                              <Image
                                src={L_MONGODB}
                                alt="MongoDB"
                                rounded
                                className="image-style1 m-1"
                                style={{ height: 60, width: 80 }}
                              ></Image>{" "}
                              MongoDB
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton href="https://websamuraj.pl/" target="_blank">
                  Check agenda
                </UrlButton>
                {/* <UrlButton
                  href=""
                  target="_blank"
                >
                 Check promo
                </UrlButton> */}
                {/* <UrlButton
                  href="https://youtube.com"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton> */}
              </div>
            </div>
          </ImageEvent>
        </Events>
      </Timeline>
    </div>
  );
};

export default EducationTimeline;
