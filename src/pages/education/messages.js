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
import L_PLURALSIGHT from "../../assets/img/education/pluralsight.webp";
import L_StudiujeIt from "../../assets/img/education/studiuje-it.webp";
import L_ARDUINO from "../../assets/img/skills/Arduino.png";
import L_HTML5 from "../../assets/img/skills/html-5.svg";
import L_CSS3 from "../../assets/img/skills/css3.svg";
import L_Cplusplus from "../../assets/img/skills/C++.png";
import L_PYTHON from "../../assets/img/skills/Python.png";
import L_JAVA from "../../assets/img/skills/Java.png";
import L_Websamuraj from "../../assets/img/education/websamuraj.webp";

import U_NODE_TDD from "../../assets/img/education/udemy_courses/Node js with Test Driven Development.jpg";
import C_NODE_TDD from "../../assets/Programming Certificates/Node JS with Test Drived Development.pdf";
import U_REACT_ADVANCED_PATTERNS from "../../assets/img/education/udemy_courses/The Complete Guide to Advanced React Component Patterns.jpg";
import C_REACT_ADVANCED_PATTERNS from "../../assets/Programming Certificates/The Complete Guide to Advanced React Component Patterns.pdf";
import U_POLYMORPHIC_COMPONENTS from "../../assets/img/education/udemy_courses/Build Polymorphic Components with React and Typescript.jpg";
import C_POLYMORPHIC_COMPONENTS from "../../assets/Programming Certificates/Build Polymorphic Components with React and TypeScript.jpg";
export const messages = {
  headerTextContent: "EDUCATION",

  Udemy: {
    title: "Udemy Courses and Certificates",
    date: "2020-current",
    image: L_UDEMY,
    description:
      "Udemy is my main learning platform along with Pluralsight. Below you can find all courses I have completed and certificates.",
    detailsButtonTitle: "COURSES LIST",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://www.udemy.com/",
    techStack: [
      // TODO add all courses with certificates and links to them and courses as well as screenshots
      {
        name: "Node js with Test Driven Development",
        image: U_NODE_TDD,
        time: 22,
        certificate: C_NODE_TDD,
        link: "https://www.udemy.com/course/test-driven-development-with-nodejs/",
      },
      {
        name: "The Complete Guide to Advanced React Component Patterns",
        image: U_REACT_ADVANCED_PATTERNS,
        time: 6,
        certificate: C_REACT_ADVANCED_PATTERNS,
        link: "https://www.udemy.com/course/the-complete-guide-to-advanced-react-patterns/",
      },
      {
        name: "Build Polymorphic Components with React and Typescript",
        image: U_POLYMORPHIC_COMPONENTS,
        time: 2.5,
        certificate: C_POLYMORPHIC_COMPONENTS,
        link: "https://www.udemy.com/course/build-polymorphic-components-with-react-and-typescript/",
      },
    ],
  },

  Pluralsight: {
    title: "Pluralsight - Technology platform for programmers",
    date: "15/09/2021-current",
    image: L_PLURALSIGHT,
    description:
      "Pluralsight is an online learning and workforce development platform that helps businesses and individuals adjust to changing technology. Using a data-driven approach, the platform focuses on training for tech-based professions, such as IT operations, security and software development, as well as leadership, including managers and product leaders.",
    detailsButtonTitle: "Role IQs and TECH details",
    leftBottomButtonTitle: "My Pluralsight Profile",
    leftBottomButtonURL: "https://app.pluralsight.com/profile/tomasz-stanisz",
  },

  MegaK: {
    title: "MEGAK - one year Full-Stack Bootcamp",
    date: "15/06/2022",
    image: L_MEGAK,
    description:
      "MEGAK it is one year Full Stack bootcamp which will include JavaScript, Node, Express, MongoDB, TypeScript, React and full stack project with participation of software house guests.",
    detailsButtonTitle: "BOOTCAMP DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://www.megak.pl/",
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
    ],
  },

  KursReacta: {
    title: "KursReacta - 12 tyg Reacta - Michał Taszycki",
    date: "15/10/2020",
    image: L_KursReacta,
    description:
      "React Course with Michal Taszycki it is complete 12 weeks React course with all React topic from raw react with class components, before hooks until the newest libraries and solutions.",
    detailsButtonTitle: "COURSE DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "http://kursreacta.pl/",
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
    ],
  },

  StudiujeIT: {
    title: "StudiujeIT - One year IT bootcamp",
    date: "15/10/2020",
    image: L_StudiujeIt,
    description:
      "StudiujeIT is one year IT bootcamp to cover all IT topics starting from Math for programmers, basics of the most popular programmin laguages, databese, computer architectures, Law in IT etc.",
    detailsButtonTitle: "BOOTCAMP DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://studiuje.it/",
    techStack: [
      {
        name: "ARDUINO",
        image: L_ARDUINO,
        height: 50,
        width: 50,
      },
      {
        name: "HTML 5",
        image: L_HTML5,
        height: 50,
        width: 50,
      },
      {
        name: "CSS 3",
        image: L_CSS3,
        height: 50,
        width: 50,
      },
      {
        name: "JavaScript",
        image: L_JAVASCRIPT,
        height: 50,
        width: 50,
      },
      {
        name: "Node JS",
        image: L_NODE_JS,
        height: 50,
        width: 50,
      },
      {
        name: "C++",
        image: L_Cplusplus,
        height: 50,
        width: 50,
      },
      {
        name: "Python",
        image: L_PYTHON,
        height: 50,
        width: 50,
      },
      {
        name: "Java",
        image: L_JAVA,
        height: 60,
        width: 50,
      },
    ],
  },

  WebSamuraj: {
    title: "WebSamuraj - From beginner to Web Developer",
    date: "24/10/2019 - 2020",
    image: L_Websamuraj,
    description:
      "The course for completely beginners, this was beginning of my programming journey thanks to Bartek who was explaining everything very detailed. Course have 6 levels staring from HTML CSS, through JavaScript, React, Node JS and advanced Front End technologies.",
    detailsButtonTitle: "PROJECT DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://websamuraj.pl/",
    techStack: [
      {
        name: "HTML 5",
        image: L_HTML5,
        height: 50,
        width: 50,
      },
      {
        name: "CSS 3",
        image: L_CSS3,
        height: 50,
        width: 50,
      },
      {
        name: "JavaScript",
        image: L_JAVASCRIPT,
        height: 50,
        width: 50,
      },
      {
        name: "React JS",
        image: L_REACT,
        height: 50,
        width: 50,
      },
      {
        name: "Node JS",
        image: L_NODE_JS,
        height: 50,
        width: 50,
      },
      {
        name: "Express",
        image: L_EXPRESS,
        height: 50,
        width: 50,
      },
      {
        name: "Mongo DB",
        image: L_MONGODB,
        height: 60,
        width: 50,
      },
    ],
  },
};
