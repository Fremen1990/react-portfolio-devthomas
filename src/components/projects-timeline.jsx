import React from "react";

import {Timeline, Events, UrlButton, ImageEvent} from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// projects
import L_CryptoVerse from "../assets/img/projects/crypto-chart.PNG";
import L_SpotyTom from "../assets/img/projects/Project2-SpotiTom clone.webp";
import L_TomPhase from "../assets/img/projects/PhaserGame.webp";
import L_E_Commerce from "../assets/img/projects/ecommerce.webp";
import L_UI_KIT from "../assets/img/projects/ui-kit.webp";
import L_NETFLIX_CLONE from "../assets/img/projects/netflix-clone.webp";

// --------------SKILLS TO BE USED IN PROJECTS TIMELINE--------------------
import L_HTML5 from "../assets/img/skills/html-5.svg";
import L_CSS3 from "../assets/img/skills/css3.svg";
import L_SASS from "../assets/img/skills/sass-1.svg";
// import L_WEBPACK from "../assets/img/skills/web-pack.svg";
// import L_BOOTSTRAP4 from "../assets/img/skills/bootstrap-4.svg";
import L_REACT from "../assets/img/skills/react.svg";
import L_TYPESCRIPT from "../assets/img/skills/typescript.svg";
import L_STORYBOOK from "../assets/img/skills/storybook-icon.svg";
// import L_REDUX from "../assets/img/skills/redux.svg";
import L_REACT_ROUTER from "../assets/img/skills/react-router.svg";
// import L_REACT_BOOTSTRAP from "../assets/img/skills/react-bootstrap.svg";
import L_STYLED_COMPONENTS from "../assets/img/skills/styled-components.svg";
import L_FIREBASE from "../assets/img/skills/firebase-icon.png";
import L_REACT_TESTING_LIBRARY from "../assets/img/skills/react-testing-library.png"
import L_JEST from "../assets/img/skills/testing_jest.webp"

// import L_NODE_JS from "../assets/img/skills/nodejs.svg";
// import L_EXPRESS from "../assets/img/skills/express.svg";
// import L_VBA from "../assets/img/skills/vba.png";
// import L_MONGODB from "../assets/img/skills/mongodb.svg";
import L_PHASER from "../assets/img/skills/phaser.svg";
import L_GIT from "../assets/img/skills/git-icon.svg";
import L_TAILWIND from "../assets/img/skills/tailwind.svg";
import L_NODE_JS from "../assets/img/skills/nodejs.svg"
import L_EXPRESS from "../assets/img/skills/express.svg"
import L_MONGODB from "../assets/img/skills/mongodb.svg"
import L_DIGITAL_OCEAN from "../assets/img/skills/digital-ocean.svg"

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
                style={{color: "#ffffff"}}
            >
                PROJECTS
            </h1>

            <Timeline>
                <Events>

                    {/* ============================== NEWEST  PROJECT ===================================== */}

                    {/* =================   NETFLIX CLONE  ================= */}

                    {/* Project: Netflix Clone with React + Firebase + Styled Components */}
                    <ImageEvent
                        date="15/05/2022"
                        className="text-center"
                        text="😏 Netflix Clone React+Firebase+Testing 👽"
                        src={L_NETFLIX_CLONE}
                        alt="Netflix Clone with React + Firebase"
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
                                                <strong>Description:</strong> Netflix clone in Styled Components with React, Firebase authentication, Firebase Database and Firebase hosting.
                                                <hr/>
                                                <strong>Features:</strong>
                                                <ul className="list-styles pt-1">
                                                    <li>Login and Signin page with new user creation in Firebase </li>
                                                    <li>Searching with FUSE JS</li>
                                                    <li>Animated search input  </li>
                                                    <li>Accordion in main page with FAQ</li>
                                                        <li>Testing for 90% coverage</li>
                                                </ul>
                                                <hr/>
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
                                  src={L_STYLED_COMPONENTS}
                                  alt="Styled Components"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                                Styled Components
                            </span>
                                                    </li>
                                                    <li>
                            <span className="p-2">
                              <Image
                                  src={L_FIREBASE}
                                  alt="Firebase"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                                Firebase
                            </span>
                                                    </li>
                                                    <li>
                            <span className="p-2">
                              <Image
                                  src={L_REACT_TESTING_LIBRARY}
                                  alt="React Testing Library"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                                React Testing Library
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
JEST                            </span>
                                                    </li>


                                                </ul>
                                                <hr/>
                                                <em>
                                                    <strong>Quick summary:</strong>
                                                    <br/>
                                                    <br/>
                                               This was my first experience with Styled Components as a new tech. and it was cool experience to go through all solutions and test all components in JEST 🙂
                                                    <br/>

                                                    <br/>
                                                </em>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="d-flex justify-content-between flex-nowrap text-center">
                                <UrlButton
                                    href="https://netflix-app-69791.web.app/"
                                    target="_blank"
                                >
                                    --  SEE LIVE --
                                </UrlButton>
                                <UrlButton
                                    href="https://github.com/Fremen1990/netflix-clone"
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



                    {/* =================   UI KIT Storybook  ================= */}

                    {/* Project: UI KIT Storybook React&TypeScript */}
                    <ImageEvent
                        date="22/03/2022"
                        className="text-center"
                        text="🧐 UI KIT Storybook DevThomas 🤖"
                        src={L_UI_KIT}
                        alt="MERN Full Stack E-Commerce"
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
                                                <strong>Description:</strong> UI KIT with use of Storybook for React components, views and pages
                                                Place for all small ideas and projects -> second brain 😀
                                                <hr/>
                                                <strong>Features:</strong>
                                                <ul className="list-styles pt-1">
                                                    <li>Storybook is customized with logo, dark theme and helpful addons </li>
                                                    <li>Documentation</li>
                                                    <li>
                                                     Options to cutomize each component
                                                    </li>
                                                    <li>Pages</li>
                                                    <li>Views</li>
                                                </ul>
                                                <hr/>
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
                                  alt="SASS"
                                  rounded
                                  className="image-style m-1"
                              ></Image>{" "}
                              SASS
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
                                  src={L_STORYBOOK}
                                  alt="Storybook"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                               Storybook
                            </span>
                                                    </li>


                                                </ul>
                                                <hr/>
                                                <em>
                                                    <strong>Quick summary:</strong>
                                                    <br/>
                                                    <br/>
                                       Creating this project was all the time process of learning new technology from scratch, first steps and going through documentation, tutorial doing more and more, this was a challange to get known new tech and create project in the same time, best way to learn for me is learning by doing 🙂
                                                    <br/>
                                                    Keep tracking, there will be more upgrades and
                                                    ehhancements here :)
                                                    <br/>
                                                    <br/>
                                                </em>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="d-flex justify-content-between flex-nowrap text-center">
                                <UrlButton
                                    href="https://ui-kit-devthomas.netlify.app/"
                                    target="_blank"
                                >
                                    --  SEE LIVE --
                                </UrlButton>
                                <UrlButton
                                    href="https://github.com/Fremen1990/UI_KIT"
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



                    {/* ============================== SECOND PROJECT ===================================== */}

                    {/* =================   MERN E-COMMERCE ================= */}

                    {/* Project: MERN E-Commerce  */}
                    <ImageEvent
                        date="12/06/2021"
                        className="text-center"
                        text="MERN Full Stack E-Commerce"
                        src={L_E_Commerce}
                        alt="MERN Full Stack E-Commerce"
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
                                                <strong>Description:</strong> This is E-Commerce MERN
                                                (Mongo, Express, React, Node) Full Stack application
                                                with user module, admin module, data base connection
                                                etc.
                                                <hr/>
                                                <strong>Features:</strong>
                                                <ul className="list-styles pt-1">
                                                    <li>User profile with authentication</li>
                                                    <li>Admin profile with all editing features</li>
                                                    <li>
                                                        All working with server setup on Digital Oceans
                                                        working 24h
                                                    </li>
                                                    <li>Mobile version classes</li>
                                                    <li>A lot of communication Front-End vs Back-end</li>
                                                </ul>
                                                <hr/>
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
                                  src={L_TAILWIND}
                                  alt="Tailwind"
                                  rounded
                                  className="image-style m-1"
                              ></Image>{" "}
                                Tailwind
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
                                  src={L_NODE_JS}
                                  alt="NodeJS"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                                NodeJS
                            </span>
                                                    </li>

                                                    <li>
                            <span className="p-2">
                              <Image
                                  src={L_EXPRESS}
                                  alt="Express"
                                  rounded
                                  className="image-style1 m-1"
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
                              ></Image>{" "}
                                MongoDB
                            </span>
                                                    </li>

                                                    <li>
                            <span className="p-2">
                              <Image
                                  src={L_DIGITAL_OCEAN}
                                  alt="Digital Ocean"
                                  rounded
                                  className="image-style m-1"
                              ></Image>{" "}
                                Digital Ocean
                                {/*- Linux 20.04 deploy*/}
                            </span>
                                                    </li>
                                                </ul>
                                                <hr/>
                                                <em>
                                                    <strong>Quick summary:</strong>
                                                    <br/>
                                                    <br/>
                                                    E-Commerce shop will be upgraded in future as it is
                                                    first MERN project created for learning purposes.
                                                    <br/>
                                                    Keep tracking, there will be more upgrades and
                                                    ehhancements here :)
                                                    <br/>
                                                    <br/>
                                                </em>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="d-flex justify-content-between flex-nowrap text-center">
                                <UrlButton
                                    href="http://ecommerce.devthomas.pl/"
                                    target="_blank"
                                >
                                 --  SEE LIVE --
                                </UrlButton>
                                <UrlButton
                                    href="https://github.com/Fremen1990/E-Commerce-MERN-NODE-REACT"
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

                    {/* ============================== THIRD PROJECT ===================================== */}

                    {/*--------- Project: CryptoVerse - ------ */}


                    <ImageEvent
                        date="01/12/2021"
                        className="text-center"
                        text="CryptoVerse - Cryptocurencies Tracker"
                        src={L_CryptoVerse}
                        alt="CryptoVerse"

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
                                                <strong>Description:</strong> CryptoVerse App is showing all current
                                                data about cryptocurrencies from RapirAPI.
                                                We can get info like current prices, changes, charts, news, history etc.
                                                <hr/>
                                                <strong>Features:</strong>
                                                <ul className="list-styles pt-1">
                                                    <li>Listen music online</li>
                                                    <li>Powered by React and React hooks</li>
                                                    <li>Respoisive Design and mobile</li>
                                                </ul>
                                                <hr/>
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
                                  src={L_TAILWIND}
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
                                  src={L_NETLIFY}
                                  alt="Heroku"
                                  rounded
                                  className="image-style1 m-1"
                              ></Image>{" "}
                                Netlify deployment                            </span>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="d-flex justify-content-between flex-nowrap text-center">
                                <UrlButton
                                    href="https://cryptoapplicationreactjs.netlify.app/"
                                    target="_blank"
                                >
                                  -- SEE LIVE --
                                </UrlButton>
                                <UrlButton
                                    href="https://github.com/Fremen1990/CryptoVerse-App"
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


                    {/* ============================== FOURTH  PROJECT ===================================== */}


                    {/* Project: SpotiTom - Spotify Clone */}

                    <ImageEvent
                        date="01/10/2020"
                        className="text-center"
                        text="SpotyTom - Spotify Clone"
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
                                                <hr/>
                                                <strong>Features:</strong>
                                                <ul className="list-styles pt-1">
                                                    <li>Listen music online</li>
                                                    <li>Powered by React and React hooks</li>
                                                    <li>Respoisive Design and mobile</li>
                                                </ul>
                                                <hr/>
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
                                   -- SEE LIVE --
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


                    {/* =========================FIFTH PROJECT - PHASER GAME ======================== */}

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
                                                <hr/>
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
                                                <hr/>
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
                                                <hr/>
                                                <em>
                                                    <strong>Quick summary:</strong>
                                                    <br/>
                                                    <br/>
                                                    The game will be developed in future as this
                                                    experience gave so much fun and was so hard in the
                                                    same time that is very inspiring to keep doing this.
                                                    <br/>
                                                    Keep tracking, there will be more upgrades and
                                                    ehhancements here :)
                                                    <br/>
                                                    <br/>
                                                </em>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="d-flex justify-content-between flex-nowrap text-center">
                                <UrlButton
                                    href="https://dev-thomas-thom-phase-game.netlify.app"
                                    target="_blank"
                                >
                                   -- SEE LIVE --
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
