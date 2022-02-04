import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Profile from "../assets/img/profile/profile.webp";
import Button from "react-bootstrap/Button";

import "./about.css";

const About = () => {
    return (
        <div className="about" id="about">
            <h1 className="pt-3 text-center font-details pb-3">About Me</h1>
            <Container>
                <Row className="pt-3 pb-5 align-items-center">
                    {/* Profile picture */}
                    <Col xs={12} md={6}>
                        <Row className="justify-content-center mb-2 mr-2 img-about">
                            <Image
                                className="profile justify-content-end"
                                alt="profile"
                                src={Profile}
                                thumbnail
                                fluid
                            />
                        </Row>
                    </Col>

                    {/*======================  About Description =====================*/}
                    <Col xs={12} md={6}>
                        {/*==================== Description ======================= */}
                        <Row className=" align-items-start p-2 my-details rounded text-justify">
                            Hi there! My name is <strong>&nbsp;Tomasz Stanisz</strong>
                            <br/>I am Tech lover, highly motivated with creation websites and
                            applications. Born in the Villige in central Poland. I am
                            Financial Analyst with love for programming, interested about Front-End and a Back-End as
                            well, as i like to know how things works.

                            <br/>
                            <br/>
                            In 2019 i have decided that i will learn programming, and the
                            never ending journey has started, enjoing the process.

                            <br/>
                            <br/>
                            I love learning about new technologies and problem solving. Already finished 1 year IT
                            bootcamp called StudiujeIT and currently im in the middle of Full-Stack 1 year bootcamp MEGA-K.
                            <br/> <br/>
                            {/*==================== Buttons =================== */}
                            <Col className="d-flex justify-content-center flex-wrap">
                                <div>
                                    <a href="#contact">
                                        <Button className="m-2" variant="outline-primary">
                                            Let's talk
                                        </Button>
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="https://www.devthomas.pl/tomasz-stanisz-web-developer-cv/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="m-2" variant="outline-success">
                                            My Resume
                                        </Button>
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="https://github.com/Fremen1990"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="m-2" variant="outline-dark">
                                            GitHub
                                        </Button>
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="https://app.pluralsight.com/profile/tomasz-stanisz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="m-2" variant="outline-danger">
                                          Pluralsight
                                        </Button>
                                    </a>
                                </div>
                                <div>

                                    <a
                                        href="https://www.linkedin.com/in/tomasz-stanisz-85818683/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="m-2" variant="outline-info">
                                            LinkedIn
                                        </Button>
                                    </a>
                                </div>

                                <div>

                                    <a
                                        href="https://www.hackerrank.com/fremen1990"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="m-2" variant="outline-success">
                                            HackerRank
                                        </Button>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
