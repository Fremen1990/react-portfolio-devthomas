import React from "react";
import L_JAVASCRIPT from "../../assets/img/skills/javascript.svg";
import L_NODE_JS from "../../assets/img/skills/nodejs.svg";
import L_NESTJS from "../../assets/img/skills/nestjs.svg";
import L_EXPRESS from "../../assets/img/skills/express.svg";
import L_MONGODB from "../../assets/img/skills/mongodb.svg";
import L_MYSQL from "../../assets/img/skills/mySql.svg";
import L_TYPESCRIPT from "../../assets/img/skills/typescript.svg";
import L_REACT from "../../assets/img/skills/react.svg";
import L_REDUX from "../../assets/img/skills/redux.svg";
import L_JEST from "../../assets/img/skills/testing_jest.webp";
import L_REACT_TESTING_LIBRARY from "../../assets/img/skills/react-testing-library.png";
import L_MEGAK from "../../assets/img/education/megak.webp";
import L_KursReacta from "../../assets/img/education/kursreacta.png";
import L_UDEMY from "../../assets/img/education/udemy.png";
export const messages = {

    headerTextContent: "EDUCATION",

    Udemy: {
        title: "Udemy Courses and Certificates",
        date: "2020-current",
        image: L_UDEMY,
        description: "Udemy is my main learning platform along with Pluralsight. Below you can find all courses I have completed and certificates.",
        detailsButtonTitle: "Courses list",
        leftBottomButtonTitle:"Check Agenda",
        leftBottomButtonURL:"https://www.udemy.com/",
        techStack: [
            // TODO add all courses with certificates and links to them and courses as well as screenshots

            {}]},



    MegaK: {
        title: "MEGAK - one year Full-Stack Bootcamp",
        date: "15/06/2022",
        image: L_MEGAK,
        description: "MEGAK it is one year Full Stack bootcamp which will include JavaScript, Node, Express, MongoDB, TypeScript, React and full stack project with participation of software house guests.",
        detailsButtonTitle: "BOOTCAMP DETAILS",
        leftBottomButtonTitle:"Check Agenda",
        leftBottomButtonURL:"https://www.megak.pl/",
        techStack: [
            {
                name: "JavaScript",
                image: L_JAVASCRIPT,
                height: 60,
                width: 80,
            },
            {
                name: "TypeScript",
                image: L_TYPESCRIPT,
                height: 70,
                width: 70,
            },
            {
                name: "Node JS",
                image: L_NODE_JS,
                height: 60,
                width: 80,
            },
            {
                name: "Express",
                image: L_EXPRESS,
                height: 60,
                width: 80,
            },
            {
                name: "Nest JS",
                image: L_NESTJS,
                height: 75,
                width: 75,
            },
            {
                name: "MongoDB",
                image: L_MONGODB,
                height: 75,
                width: 75,
            },
            {
                name: "MySQL",
                image: L_MYSQL,
                height: 75,
                width: 75,
            },
            {
                name: "React JS",
                image: L_REACT,
                height: 75,
                width: 75,
            },


        ]
    },

    KursReacta: {
        title: "KursReacta - 12 tyg Reacta - Michał Taszycki",
        date: "15/10/2020",
        image: L_KursReacta,
        description: "React Course with Michal Taszycki it is complete 12 weeks React course with all React topic from raw react with class components, before hooks until the newest libraries and solutions.",
        detailsButtonTitle: "COURSE DETAILS",
        leftBottomButtonTitle:"Check Agenda",
        leftBottomButtonURL:"http://kursreacta.pl/",
        techStack: [
            {
                name: "JavaScript",
                image: L_JAVASCRIPT,
                height: 60,
                width: 80,
            },
            {
                name: "React JS",
                image: L_REACT,
                height: 75,
                width: 75,
            },
            {
                name: "Redux",
                image: L_REDUX,
                height: 60,
                width: 80,
            },
            {
                name: "Jest",
                image: L_JEST,
                height: 60,
                width: 80,
            },
            {
                name: "React Testing Library",
                image: L_REACT_TESTING_LIBRARY,
                height: 60,
                width: 80,
            },

        ]
    }
}


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
)

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
)