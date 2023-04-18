import React from "react";
import Tilt from "react-tilt";
import CountUp from "react-countup";
import Button from "react-bootstrap/Button";
import {
  educationBIAnalyst,
  educationNode,
  educationReact,
} from "./pluralsight-education-data";

export const EducationDetailsMegaK = () => (
  <>
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
  </>
);

export const EducationDetailsGraphQLMastery = () => (
    <>
        <strong>Course modules:</strong>
        <ul className="list-styles pt-1">
            <li>Module 1 - Quick start Full Stack App</li>
            <li>Module 2 - Getting data from APIs Full Stack</li>
            <li>Module 3 - Arguments, variables and fragments</li>
            <li>Module 4 - Domain Mutations</li>
            <li>Module 5 - CRUD Mutations</li>
            <li>Module 6 - Authorization and Authentication</li>
            <li>Module 7 - Pagination and API versioning</li>
        </ul>
    </>
);

export const EducationDetailsKursReacta = () => (
  <>
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
  </>
);

export const EducationDetailsPluralsight = () => (
  <>
    <div className="row h-25">
      <strong className="col-8 h3">Role IQ Assessments: </strong>
      <br />
      <br />
      <br />
      <div>
        <strong className="col-8 h3">Node Web Developer </strong>

        <img
          className="w-25"
          src="https://s2.pluralsight.com/roleiq-leader/badges/prod/badge_nodejs_developer.svg"
          alt="Node"
        />
      </div>

      <br />
      <div>
        <a
          href="https://app.pluralsight.com/profile/tomasz-stanisz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="m-2" variant="outline-danger">
            Check details
          </Button>
        </a>
      </div>
    </div>
    <ul className="list-unstyled pt-1 mt-2">
      {educationNode.map((learningPath, index) => (
        <Tilt
          key={index}
          options={{ max: 5 }}
          className="bg-dark text-light m-2"
        >
          <li className="hovered" key={index}>
            <img
              src={learningPath.icon}
              alt={learningPath.pathName}
              className="h-25 w-25"
            />
            <span>{learningPath.pathName}</span>{" "}
            <strong>
              <span>
                <CountUp end={learningPath.points} duration={7} />
              </span>
            </strong>
          </li>
        </Tilt>
      ))}
    </ul>
    <hr />
    <div>
      <strong className="h3">React Developer </strong>

      <img
        className="w-25 "
        src="https://s2.pluralsight.com/roleiq-leader/badges/prod/badge_react_developer.svg"
        alt="React"
      />
    </div>
    <ul className="list-unstyled pt-1">
      {educationReact.map((learningPath, index) => (
        <Tilt
          key={index}
          options={{ max: 5 }}
          className="bg-dark text-light m-2"
        >
          <li className="hovered" key={index}>
            <img
              src={learningPath.icon}
              alt={learningPath.pathName}
              className="h-25 w-25"
            />
            <span>{learningPath.pathName}</span>{" "}
            <strong>
              <span>
                <CountUp end={learningPath.points} duration={7} />
              </span>
            </strong>
          </li>
        </Tilt>
      ))}
    </ul>
    <hr />
    <div>
      <strong className="h3">BI / Data Analyst </strong>

      <img
        className="w-25 "
        src="https://s2.pluralsight.com/roleiq-leader/badges/prod/badge_dataAnalystMicrosoftSelfService2.svg"
        alt="React"
      />
    </div>
    <ul className="list-unstyled pt-1">
      {educationBIAnalyst.map((learningPath, index) => (
        <Tilt
          key={index}
          options={{ max: 5 }}
          className="bg-dark text-light m-2"
        >
          <li className="hovered" key={index}>
            <img
              src={learningPath.icon}
              alt={learningPath.pathName}
              className="h-25 w-25"
            />
            <span>{learningPath.pathName}</span>{" "}
            <strong>
              <span>
                <CountUp end={learningPath.points} duration={7} />
              </span>
            </strong>
          </li>
        </Tilt>
      ))}
    </ul>
  </>
);

export const EducationDetailsStudiujeIT = () => (
  <>
    <strong>Bootcamp agenda:</strong>
    <ul className="list-styles pt-1">
      <li>Math for Programmers</li>
      <li>Programming Fundamentals - C++ Python PHP JavaScript NODE JAVA</li>
      <li>Law for IT</li>
      <li>Databases - related and non-related - SQL, postgre, mongo</li>
      <li>Architecture of computers - Arduino</li>
      <li>Opeational Systems - Linux, VIM, scripting, PowerShell</li>
      <li>Algorythms and databases</li>
      <li>Computer networks and security</li>
      <li>Software engieneering</li>
      <li>Projects Management</li>
    </ul>
  </>
);

export const EducationDetailsWebSamuraj = () => (
  <>
    <strong>Course levels:</strong>
    <ul className="list-styles pt-1">
      <li>Web developer from begiiner in 15 days - HTML CSS</li>
      <li>Advanced Fron End in 15 days - HTML CSS and JS</li>
      <li>Programming in JavaScript</li>
      <li>React for beginners</li>
      <li>Back-end - Node, Express, MongoDB</li>
      <li>Advanced projects in CSS and JS</li>
    </ul>
  </>
);
