import L_MEGAK from "../../assets/img/education/megak.webp";
import L_KursReacta from "../../assets/img/education/kursreacta.png";
import L_GraphQL_Mastery from "../../assets/img/education/graphql_mastery.webp";

import L_JS_MASTERY_NEXTJS_ULTIMATE from "../../assets/img/education/NextJS_Ultimate_Course.webp";
import L_NEXTJS_MASTERS from "../../assets/img/education/NEXTJSMASTERS -LOGO-CLEAN.webp";
import L_UDEMY from "../../assets/img/education/udemy.png";
import L_PLURALSIGHT from "../../assets/img/education/pluralsight.webp";
import L_StudiujeIt from "../../assets/img/education/studiuje-it.webp";
import L_Websamuraj from "../../assets/img/education/websamuraj.webp";

import U_NODE_TDD from "../../assets/img/education/udemy_courses/Node js with Test Driven Development.jpg";
import C_NODE_TDD from "../../assets/Programming Certificates/Node JS with Test Drived Development.pdf";
import U_REACT_ADVANCED_PATTERNS from "../../assets/img/education/udemy_courses/The Complete Guide to Advanced React Component Patterns.jpg";
import C_REACT_ADVANCED_PATTERNS from "../../assets/Programming Certificates/The Complete Guide to Advanced React Component Patterns.pdf";
import U_POLYMORPHIC_COMPONENTS from "../../assets/img/education/udemy_courses/Build Polymorphic Components with React and Typescript.jpg";
import C_POLYMORPHIC_COMPONENTS from "../../assets/Programming Certificates/Build Polymorphic Components with React and TypeScript.jpg";
import U_CYPRESS from "../../assets/img/education/udemy_courses/The Complete Cypress 12 Course From Zero to Expert.jpg";
import C_CYPRESS from "../../assets/Programming Certificates/The Complete Cypress 12 Course From Zero to Expert.pdf";
import U_HOW_TO_BECOME_SENIOR from "../../assets/img/education/udemy_courses/How to Become a Senior Developer - Beyond coding skills.jpg";
import C_HOW_TO_BECOME_SENIOR from "../../assets/Programming Certificates/How to Become a Senior Developer - Beyond coding skills.pdf";
import U_SOFTWARE_DEVELOPMENT_MINDSETS from "../../assets/img/education/udemy_courses/Software Development Mindsets For Successful Career.jpg";
import C_SOFTWARE_DEVELOPMENT_MINDSETS from "../../assets/Programming Certificates/Software Development Mindsets For Successful Career.pdf";
import U_REACT_TDD from "../../assets/img/education/udemy_courses/React with Test Driven Development.jpg";
import C_REACT_TDD from "../../assets/Programming Certificates/React with Test Driven Development.pdf";
import U_AWS_LAMBDA from "../../assets/img/education/udemy_courses/AWS Lambda and the Serverless Framework - Hands On Learning.jpg";
import C_AWS_LAMBDA from "../../assets/Programming Certificates/AWS Lambda and the Serverless Framework - Hands On Learning.pdf";
import U_FACEBOOK_CLONE from "../../assets/img/education/udemy_courses/Build Facebook clone with REACT JS AND THE MERN STACK 2023.jpg";
import C_FACEBOOK_CLONE from "../../assets/Programming Certificates/Build Facebook clone with REACT JS AND THE MERN STACK 2022.pdf";
import U_RTL from "../../assets/img/education/udemy_courses/The React Testing Library Bootcamp - The Developer Guide.jpg";
import C_RTL from "../../assets/Programming Certificates/The React Testing Library Bootcamp - The Developer Guide.pdf";
import U_CSS_ANIMATION from "../../assets/img/education/udemy_courses/Next Level CSS Creative Hover & Animation Effects.jpg";
import C_CSS_ANIMATION from "../../assets/Programming Certificates/The React Testing Library Bootcamp - The Developer Guide.pdf";
import U_NEST_JS from "../../assets/img/education/udemy_courses/Opanuj NestJS i zostań profesjonalnym programistą NodeJS.jpg";
import C_NEST_JS from "../../assets/Programming Certificates/The React Testing Library Bootcamp - The Developer Guide.pdf";
import U_MERN_ECOMMERCE from "../../assets/img/education/udemy_courses/MERN Stack React Node Ecommerce from Scratch to Deployment.jpg";
import C_MERN_ECOMMERCE from "../../assets/Programming Certificates/The React Testing Library Bootcamp - The Developer Guide.pdf";
import U_REACT_TESTING_FOR_ENGINEERS from "../../assets/img/education/udemy_courses/Testing react applications for professional engineers.jpg";
import C_REACT_TESTING_FOR_ENGINEERS from "../../assets/Programming Certificates/Testing react applications for professional engineers.jpg";
import U_ADVANCED_REACT_ENTERPRISE from "../../assets/img/education/udemy_courses/Advanced React For Enterprise React for senior engineers.jpg";
import C_ADVANCED_REACT_ENTERPRISE from "../../assets/Programming Certificates/Testing react applications for professional engineers.jpg";
import {
  allSkillsArray,
  getSkillsByEducationName,
} from "../../utils/getSkills";

export const messages = {
  headerTextContent: "EDUCATION",

  JS_Mastery_NextJS_Ultimate: {
    title: "NextJS 14 Ultimate",
    date: "01/01/2024 - present",
    image: L_JS_MASTERY_NEXTJS_ULTIMATE,
    description:
      "Deep dive into NextJS 14, TypeScript, Tailwind CSS and more while builnd social media app like Stack Overflow in NextJS. \n Course in progress...",
    detailsButtonTitle: "COURSE DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://www.jsmastery.pro/ultimate-next-course",
    techStack: getSkillsByEducationName(
      allSkillsArray,
      "JS_Mastery_NextJS_Ultimate"
    ),
  },

  NextJS_Masters: {
    title: "NextJS Masters",
    date: "01/09/2023 - 31/10/2023",
    image: L_NEXTJS_MASTERS,
    description:
      "Full Stack NextJS 13 modern application with TypeScript and Tailwind guided by Michał Miszczyszyn and Jakub Neander",
    detailsButtonTitle: "COURSE DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://www.nextjsmasters.pl/#program",
    techStack: getSkillsByEducationName(allSkillsArray, "NextJS_Masters"),
  },

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
      {
        name: "Advanced React For Enterprise: React for senior engineers",
        image: U_ADVANCED_REACT_ENTERPRISE,
        time: 6,
        certificate: C_REACT_TESTING_FOR_ENGINEERS,
        link: "https://www.udemy.com/course/react-for-senior-engineers/",
      },
      {
        name: "Testing react applications for professional engineers",
        image: U_REACT_TESTING_FOR_ENGINEERS,
        time: 2.5,
        certificate: C_REACT_TESTING_FOR_ENGINEERS,
        link: "https://www.udemy.com/course/testing-react-applications/",
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
      {
        name: "Software Development Mindsets For Successful Career",
        image: U_SOFTWARE_DEVELOPMENT_MINDSETS,
        time: 1,
        certificate: C_SOFTWARE_DEVELOPMENT_MINDSETS,
        link: "https://www.udemy.com/course/software-development-mindsets-for-successful-career/",
      },
      {
        name: "How to Become a Senior Developer - Beyond coding skills",
        image: U_HOW_TO_BECOME_SENIOR,
        time: 2.5,
        certificate: C_HOW_TO_BECOME_SENIOR,
        link: "https://www.udemy.com/course/junior-to-senior-software-developer/",
      },
      {
        name: "The Complete Cypress 12+ Course: From Zero to Expert!",
        image: U_CYPRESS,
        time: 10.5,
        certificate: C_CYPRESS,
        link: "https://www.udemy.com/course/the-complete-cypress-10-e2e-course/",
      },
      {
        name: "React with Test Driven Development",
        image: U_REACT_TDD,
        time: 15,
        certificate: C_REACT_TDD,
        link: "https://www.udemy.com/course/react-with-test-driven-development/",
      },
      {
        name: "Node js with Test Driven Development",
        image: U_NODE_TDD,
        time: 22,
        certificate: C_NODE_TDD,
        link: "https://www.udemy.com/course/test-driven-development-with-nodejs/",
      },
      {
        name: "The React Testing Library Bootcamp - The Developer Guide",
        image: U_RTL,
        time: 5,
        certificate: C_RTL,
        link: "https://www.udemy.com/course/the-react-testing-library-bootcamp/",
      },
      {
        name: "Opanuj NestJS i zostań profesjonalnym programistą Node.js",
        image: U_NEST_JS,
        time: 16,
        certificate: C_NEST_JS,
        link: "https://www.udemy.com/course/draft/3265906",
      },
      {
        name: "Build Facebook clone with REACT JS AND THE MERN STACK 2023",
        image: U_FACEBOOK_CLONE,
        time: 35,
        certificate: C_FACEBOOK_CLONE,
        link: "https://www.udemy.com/course/build-facebook-clone-and-master-react-js-mern-stack-2022/",
      },
      {
        name: "AWS Lambda and the Serverless Framework - Hands On Learning!",
        image: U_AWS_LAMBDA,
        time: 10.5,
        certificate: C_AWS_LAMBDA,
        link: "https://www.udemy.com/course/aws-lambda-serverless/",
      },
      {
        name: "MERN Stack React Node Ecommerce from Scratch to Deployment",
        image: U_MERN_ECOMMERCE,
        time: 16,
        certificate: C_MERN_ECOMMERCE,
        link: "https://www.udemy.com/course/react-node-ecommerce/",
      },
      {
        name: "Next Level CSS Creative Hover & Animation Effects",
        image: U_CSS_ANIMATION,
        time: 2.5,
        certificate: C_CSS_ANIMATION,
        link: "https://www.udemy.com/course/css-hover-animation-effects-from-beginners-to-expert/",
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

  GraphQL_Mastery: {
    title: "GraphQL Mastery - Michał Taszycki",
    date: "15/03/2023",
    image: L_GraphQL_Mastery,
    description:
      "Full Stack GraphQL in practice with Michal Taszycki it is complete course with all GraphQL topic from raw GraphQL backend and frontend.",
    detailsButtonTitle: "COURSE DETAILS",
    leftBottomButtonTitle: "Check Agenda",
    leftBottomButtonURL: "https://graphqlmastery.pl/",
    techStack: getSkillsByEducationName(allSkillsArray, "GraphQL_Mastery"),
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
    techStack: getSkillsByEducationName(allSkillsArray, "MegaK"),
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
    techStack: getSkillsByEducationName(allSkillsArray, "KursReacta"),
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
    techStack: getSkillsByEducationName(allSkillsArray, "StudiujeIT"),
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
    techStack: getSkillsByEducationName(allSkillsArray, "Websamuraj"),
  },
};
