import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Profile from "../../assets/img/profile/profile.webp";

import "./about.css";
import {ButtonAbout} from "../../components/ButtonAbout/ButtonAbout";
import {messages} from "./messages";

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
                            applications. Born in the Village in central Poland. I am
                            Financial Analyst with love for programming, interested about
                            Front-End and a Back-End as well, as i like to know how things
                            works.
                            <br/>
                            <br/>
                            In 2020 i have decided that i will learn programming, and the
                            never ending journey has started, enjoying the process.
                            <br/>
                            <br/>
                            I love learning about new technologies and problem solving.
                            Already finished 1 year IT bootcamp called StudiujeIT and just
                            finished Full-Stack JavaScript 1 year bootcamp MEGA-K with NestJS,
                            React and TypeScript in Tech Stack.
                            <br/> <br/>
                            {/*==================== Buttons =================== */}
                            <Col className="d-flex justify-content-center flex-wrap">

                                {messages.buttons.map(({href, newTab, variant, title}, index) => {
                                    return (
                                        <ButtonAbout
                                            key={index}
                                            href={href}
                                            newTab={newTab}
                                            variant={variant}
                                            title={title}
                                        />
                                    )
                                })
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
