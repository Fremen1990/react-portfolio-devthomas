import React from "react";

import { Timeline, Events, UrlButton, ImageEvent } from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// projects
import L_Anon from "../assets/img/projects/project1-anon.png";
import L_SpotyTom from "../assets/img/projects/Project2-SpotiTom clone.PNG";
import L_TomPhase from "../assets/img/projects/Project3-PhaserGame.PNG";

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
// import L_NODE_JS from "../assets/img/skills/nodejs.svg";
// import L_EXPRESS from "../assets/img/skills/express.svg";
// import L_VBA from "../assets/img/skills/vba.png";
// import L_MONGODB from "../assets/img/skills/mongodb.svg";
import L_PHASER from "../assets/img/skills/phaser.svg";
import L_GIT from "../assets/img/skills/git-icon.svg";
// import L_OVH from "../assets/img/skills/ovh.svg";
import L_HEROKU from "../assets/img/skills/heroku.svg";
import L_NETLIFY from "../assets/img/skills/netlify.svg";
// import L_GITHUB_PAGES from "../assets/img/skills/github.svg";
import L_JAVASCRIPT from "../assets/img/skills/javascript.svg";

import "./projects-timeline.css";

const ProjectsTimeline = () => {
  return (
    <div id="projects">
      <h1
        className="pt-3 text-center font-details-b pb-3"
        style={{ color: "#ffffff" }}
      >
        PROJECTS
      </h1>

      <Timeline>
        <Events>
          {/* ============================== FIRST PROJECT ===================================== */}

          {/* Project: ANON - React commercial website */}

          <ImageEvent
            date="01/10/2020"
            className="text-center"
            text="ANON - React commercial website"
            src={L_Anon}
            alt="ANON - React commercial website"
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
                        <strong>Description:</strong> This is a Spotify clone
                        App created with React using hooks and fetch from
                        outside API.
                        <hr />
                        <strong>Features:</strong>
                        <ul className="list-styles pt-1">
                          <li>Listen music online</li>
                          <li>Powered by React and React hooks</li>
                          <li>Respoisive Design and mobile</li>
                        </ul>
                        <hr />
                        <strong>Tech used:</strong>
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
                                alt="SCSS"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              SCSS
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
                                src={L_REACT_ROUTER}
                                alt="React Router"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              React Router
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_HEROKU}
                                alt="Heroku"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              Heroku deployment
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton
                  href="https://anon-animals-nature.herokuapp.com/"
                  target="_blank"
                >
                  SEE LIVE
                </UrlButton>
                <UrlButton
                  href="https://github.com/Fremen1990/ANON"
                  target="_blank"
                >
                  SOURCE CODE
                </UrlButton>
                {/* <UrlButton
                  href="https://youtube.com"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton> */}
              </div>
            </div>
          </ImageEvent>

          {/* ============================== SECOND PROJECT ===================================== */}

          {/* Project: SpotiTom - Spotify Clone */}

          <ImageEvent
            date="01/10/2020"
            className="text-center"
            text="React ToDo App"
            src={L_SpotyTom}
            alt="SpotyTom - Spotify Clone"
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
                        <strong>Description:</strong> This is a Spotify clone
                        App created with React using hooks and fetch from
                        outside API.
                        <hr />
                        <strong>Features:</strong>
                        <ul className="list-styles pt-1">
                          <li>Listen music online</li>
                          <li>Powered by React and React hooks</li>
                          <li>Respoisive Design and mobile</li>
                        </ul>
                        <hr />
                        <strong>Tech used:</strong>
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
                                alt="CSS 3"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              CSS3
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
                                src={L_HEROKU}
                                alt="Heroku"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              Heroku deployment
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton
                  href="https://spoty-tom.herokuapp.com/"
                  target="_blank"
                >
                  SEE LIVE
                </UrlButton>
                <UrlButton
                  href="https://github.com/Fremen1990/TS_Music_Player"
                  target="_blank"
                >
                  SOURCE CODE
                </UrlButton>
                {/* <UrlButton
                  href="YouTube"
                  target="_blank"
                >
                  WATCH VIDEO
                </UrlButton> */}
              </div>
            </div>
          </ImageEvent>

          {/* Project: TomPhase - Phaser Engine 2d Game */}
          <ImageEvent
            date="07/12/2019"
            className="text-center"
            text="TomPhase - Phaser Engine 2d Game"
            src={L_TomPhase}
            alt="TomPhase - Phaser Engine 2d Game"
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
                        <strong>Description:</strong> This is my first game in
                        Phaser engine, a lot of mechanics it is in use here
                        including animations, stages, tales with tale aditor and
                        more.
                        <hr />
                        <strong>Features:</strong>
                        <ul className="list-styles pt-1">
                          <li>Extended level with following camera</li>
                          <li>Animations when the character is moving</li>
                          <li>
                            Cool level with different tales and variances of
                            obsticles
                          </li>
                          <li>
                            Hosted using Netlify under
                            www.https://www.netlify.com/
                          </li>
                          <li>Mobile version under implementation</li>
                        </ul>
                        <hr />
                        <strong>Tech used:</strong>
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
                                src={L_PHASER}
                                alt="CSS 3"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              Phaser 3
                            </span>
                          </li>

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
                                src={L_NETLIFY}
                                alt="PostgreSQL"
                                rounded
                                className="image-style1 m-1"
                              ></Image>{" "}
                              Netlify deployment
                            </span>
                          </li>
                          <li>
                            <span className="p-2">
                              <Image
                                src={L_GIT}
                                alt="Digital Ocean"
                                rounded
                                className="image-style m-1"
                              ></Image>{" "}
                              GIT and Git-HUB
                            </span>
                          </li>
                        </ul>
                        <hr />
                        <em>
                          <strong>Quick summary:</strong>
                          <br />
                          <br />
                          The game will be developed in future as this
                          experience gave so much fun and was so hard in the
                          same time that is very inspiring to keep doing this.
                          <br />
                          Keep tracking, there will be more upgrades and
                          ehhancements here :)
                          <br />
                          <br />
                        </em>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
              <div className="d-flex justify-content-between flex-nowrap text-center">
                <UrlButton
                  href="https://elegant-payne-bbcaf8.netlify.app/"
                  target="_blank"
                >
                  SEE LIVE
                </UrlButton>
                <UrlButton
                  href="https://github.com/Fremen1990/The-Game---Phaser-2d"
                  target="_blank"
                >
                  SOURCE CODE
                </UrlButton>
                {/* <UrlButton href="https://youtu.be/PCwEuW4OmWA" target="_blank">
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

export default ProjectsTimeline;
