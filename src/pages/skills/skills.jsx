import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./skills.css";
import {messages} from "./messages";
import {skills} from "../skills-data";
import {SkillsCard} from "../../components/SkillsCard/SkillsCard";

export const Skills = () => {
    return (
        <>
            <div className="pt-3 pb-3" id="skills"></div>
            <h1 className="text-center font-details-b pb-4">{messages.header}</h1>
            <CardDeck>
                <Row className="d-flex justify-content-around">
                    <Col md={4}>
                        <SkillsCard title={messages.programmingLanguages} skillsSet={skills.programmingLanguages}/>
                        <SkillsCard title={messages.frontend} skillsSet={skills.frontend}/>

                    </Col>
                    <Col md={4}>
                        <SkillsCard title={messages.backend} skillsSet={skills.backend}/>
                        <SkillsCard title={messages.testing} skillsSet={skills.testing}/>
                    </Col>
                    <Col md={4}>
                        <SkillsCard title={messages.databases} skillsSet={skills.databases}/>
                        <SkillsCard title={messages.devops} skillsSet={skills.devOps}/>
                    </Col>
                </Row>
            </CardDeck>
        </>
    );
};