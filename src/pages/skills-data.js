// PROGRAMMING LANGUAGES
import L_JAVASCRIPT from "../assets/img/skills/javascript.svg";
import L_TYPESCRIPT from "../assets/img/skills/typescript.svg";
import L_GOLANG from "../assets/img/skills/go-8.webp";
import L_PYTHON from "../assets/img/skills/python.svg";

// FRONTEND
import L_HTML5 from "../assets/img/skills/html-5.svg";
import L_CSS3 from "../assets/img/skills/css3.svg";
import L_TAILWIND from "../assets/img/skills/tailwind.svg";
// import L_BOOTSTRAP from "../assets/img/skills/bootstrap-4.svg";
import L_MATERIALUI from "../assets/img/skills/material-ui-1.svg";
import L_STYLED_COMPONENTS from "../assets/img/skills/styled-components.svg";
import L_REACT from "../assets/img/skills/react.svg";
import L_REACT_QUERY from "../assets/img/skills/react-queyr.webp";
import L_REDUX from "../assets/img/skills/redux.svg";
import L_APOLLO_CLIENT from "../assets/img/skills/apollo.png";
import L_NEXTJS from "../assets/img/skills/nextjs.svg";
import L_REACT_NATIVE from "../assets/img/skills/react-native1.svg";
// import L_THREEJS from "../assets/img/skills/threejs.webp";

// BACKEND
import L_NODE_JS from "../assets/img/skills/nodejs.svg";
import L_EXPRESS from "../assets/img/skills/express.svg";
import L_NESTJS from "../assets/img/skills/nestjs.svg";
import L_GIN from "../assets/img/skills/gin.png";
import L_JSONSCHEMA from "../assets/img/skills/json-schema.svg";
import L_GRAPHQL from "../assets/img/skills/graphql.png";
import L_FIREBASE from "../assets/img/skills/firebase-icon.png";

// TESTING
import L_TDD from "../assets/img/skills/tdd.png";
import L_JEST from "../assets/img/skills/testing_jest.webp";
import L_VITEST from "../assets/img/skills/vitest.png";
import L_SUPERTEST from "../assets/img/skills/supertest.png";
import L_REACT_TESTING_LIBRARY from "../assets/img/skills/react-testing-library.png";
import L_CYPRESS from "../assets/img/skills/testing_cypress.png";
import L_PAGE_OBJECT_MODEL from "../assets/img/skills/page-object-model.webp";
import L_CUCUMBER from "../assets/img/skills/cucumber.webp";

// DATABASES
import L_MYSQL from "../assets/img/skills/mySql.svg";
import L_TYPEORM from "../assets/img/skills/typeorm.png";
import L_MONGODB from "../assets/img/skills/mongodb.svg";

// DEVOPS
import L_GIT from "../assets/img/skills/git-icon.svg";
import L_GITHUB_ACTIONS from "../assets/img/skills/github-actions.png";
import L_GITLAB from "../assets/img/skills/gitlab.png";
import L_DOCKER from "../assets/img/skills/docker.webp";
import L_NX from "../assets/img/skills/nx.webp";
import L_ARDUINO from "../assets/img/skills/Arduino.png";
import L_Cplusplus from "../assets/img/skills/C++.png";
// import L_PYTHON from "../assets/img/skills/Python.png";
import L_JAVA from "../assets/img/skills/Java.png";
// import L_KUBERNETES from "../assets/img/skills/nx.webp";
// import L_TERRAFORM from "../assets/img/skills/nx.webp";

export const skills = {
  programmingLanguages: [
    {
      link: "https://www.javascript.com/",
      imgAltText: "JavaScript",
      imgSrc: L_JAVASCRIPT,
      skillName: "JavaScript",
      education: [
        "MegaK",
        "KursReacta",
        "StudiujeIT",
        "Websamuraj",
        "NextJS_Masters",
        "JS_Mastery_NextJS_Ultimate",
      ],
    },
    {
      link: "https://www.typescriptlang.org/",
      imgAltText: "TypeScript",
      imgSrc: L_TYPESCRIPT,
      skillName: "TypeScript",
      education: ["MegaK", "NextJS_Masters", "JS_Mastery_NextJS_Ultimate"],
    },
    {
      link: "https://www.python.org/",
      imgAltText: "Python",
      imgSrc: L_PYTHON,
      skillName: "Python",
    },
    {
      link: "https://golang.org/",
      imgAltText: "Golang",
      imgSrc: L_GOLANG,
      skillName: "GO",
    },
  ],
  frontend: [
    {
      link: "https://en.wikipedia.org/wiki/HTML5",
      imgAltText: "HTML 5",
      imgSrc: L_HTML5,
      skillName: "HTML5",
      education: ["MegaK", "StudiujeIT", "Websamuraj"],
    },
    {
      link: "https://medium.com/beginners-guide-to-mobile-web-development/whats-new-in-css-3-dcd7fa6122e1",
      imgAltText: "CSS 3",
      imgSrc: L_CSS3,
      skillName: "CSS3",
      education: ["MegaK", "StudiujeIT", "Websamuraj"],
    },
    // {
    //     link: "https://getbootstrap.com/",
    //     imgAltText: "Bootstrap",
    //     imgSrc: L_BOOTSTRAP,
    //     skillName: "Bootstrap",
    //     education: [""],
    // },
    {
      link: "https://tailwindcss.com/",
      imgAltText: "Tailwind CSS",
      imgSrc: L_TAILWIND,
      skillName: "Tailwind CSS",
      education: ["NextJS_Masters", "JS_Mastery_NextJS_Ultimate"],
    },
    {
      link: "https://material-ui.com/",
      imgAltText: "Material-UI",
      imgSrc: L_MATERIALUI,
      skillName: "Material-UI",
      education: ["Udemy"],
    },
    {
      link: "https://styled-components.com/",
      imgAltText: "styled-components",
      imgSrc: L_STYLED_COMPONENTS,
      skillName: "styled-components",
      education: ["MegaK"],
    },
    {
      link: "https://reactjs.org/",
      imgAltText: "React JS",
      imgSrc: L_REACT,
      skillName: "React JS",
      education: ["MegaK", "KursReacta", "Pluralsight", "Websamuraj"],
      points: 110,
    },
    {
      link: "https://reactnative.dev/",
      imgAltText: "React Native",
      imgSrc: L_REACT_NATIVE,
      skillName: "ReactNative",
      education: ["Udemy", "Pluralsight"],
    },
    {
      link: "https://nextjs.org/",
      imgAltText: "Next.js",
      imgSrc: L_NEXTJS,
      skillName: "Next.js",
      education: ["NextJS_Masters", "Udemy", "JS_Mastery_NextJS_Ultimate"],
    },
    {
      link: "https://redux.js.org/",
      imgAltText: "Redux",
      imgSrc: L_REDUX,
      skillName: "Redux Toolkit",
      education: ["MegaK", "KursReacta"],
    },
    {
      link: "https://react-query-v3.tanstack.com/",
      imgAltText: "React Query",
      imgSrc: L_REACT_QUERY,
      skillName: "React Query",
      education: ["Udemy"],
    },
    {
      link: "https://www.apollographql.com/docs/",
      imgAltText: "Apollo Client",
      imgSrc: L_APOLLO_CLIENT,
      skillName: "Apollo Client",
      education: ["GraphQL_Mastery", "NextJS_Masters"],
    },
    // {
    //   link: "https://www.gatsbyjs.com/",
    //   imgAltText: "Gatsby",
    //   imgSrc: L_GATSBY,
    //   skillName: "Gatsby.js",
    // },
    // {
    //   link: "https://threejs.org/",
    //   imgAltText: "Three.js
    //   imgSrc: L_THREEJS,
    //   skillName: "Three.js
    // },
  ],

  backend: [
    {
      link: "https://nodejs.org/en/",
      imgAltText: "Node.js",
      imgSrc: L_NODE_JS,
      skillName: "Node.js",
      education: ["MegaK", "Websamuraj"],
      points: 156,
    },
    {
      link: "https://expressjs.com/",
      imgAltText: "Express",
      imgSrc: L_EXPRESS,
      skillName: "Express",
      education: ["MegaK", "Websamuraj"],
    },
    {
      link: "https://nestjs.com/",
      imgAltText: "Nestjs",
      imgSrc: L_NESTJS,
      skillName: "NestJS",
      education: ["MegaK"],
    },
    // {
    //   link: "https://gin-gonic.com/docs/",
    //   imgAltText: "Gin",
    //   imgSrc: L_GIN,
    //   skillName: "Gin",
    //   education: ["OrangeLab"],
    // },
    {
      link: "https://json-schema.org/",
      imgAltText: "JSON Schema",
      imgSrc: L_JSONSCHEMA,
      skillName: "JSON Schema",
      education: ["OrangeLab"],
    },
    {
      link: "https://graphql.org/",
      imgAltText: "GraphQL",
      imgSrc: L_GRAPHQL,
      skillName: "GraphQL",
      education: ["GraphQL_Mastery", "NextJS_Masters"],
    },
    // {
    //   link: "https://firebase.google.com/",
    //   imgAltText: "Firebase",
    //   imgSrc: L_FIREBASE,
    //   skillName: "Gin (GO)",
    // },
    // {
    //   link: "https://firebase.google.com/",
    //   imgAltText: "Firebase",
    //   imgSrc: L_FIREBASE,
    //   skillName: "AWS Lambda",
    // },
  ],
  testing: [
    {
      link: "https://en.wikipedia.org/wiki/Test-driven_development",
      imgAltText: "TDD",
      imgSrc: L_TDD,
      skillName: "TDD",
      education: ["Udemy", "KursReacta"],
    },
    {
      link: "https://jestjs.io/",
      imgAltText: "JEST",
      imgSrc: L_JEST,
      skillName: "Jest",
      education: ["Udemy", "KursReacta"],
    },
    {
      link: "https://vitest.dev/",
      imgAltText: "VITEST",
      imgSrc: L_VITEST,
      skillName: "Vitest",
      education: ["Udemy"],
    },
    {
      link: "https://www.npmjs.com/package/supertest",
      imgAltText: "Supertest",
      imgSrc: L_SUPERTEST,
      skillName: "Supertest",
      education: ["Udemy"],
    },
    {
      link: "https://testing-library.com/docs/react-testing-library/intro/",
      imgAltText: "React Testing Library",
      imgSrc: L_REACT_TESTING_LIBRARY,
      skillName: "React Testing Library",
      education: ["Udemy", "KursReacta"],
    },
    {
      link: "https://www.cypress.io/",
      imgAltText: "Cypress",
      imgSrc: L_CYPRESS,
      skillName: "Cypress",
      education: ["Udemy"],
    },
    {
      link: "https://medium.com/tech-tajawal/page-object-model-pom-design-pattern-f9588630800b",
      imgAltText: "Page Object Model",
      imgSrc: L_PAGE_OBJECT_MODEL,
      skillName: "Page Object Model",
      education: ["Udemy"],
    },
    {
      link: "https://cucumber.io/",
      imgAltText: "Cucumber",
      imgSrc: L_CUCUMBER,
      skillName: "Cucumber",
      education: ["Udemy"],
    },
  ],
  databases: [
    // {
    //   link: "https://www.postgresql.org/",
    //   imgAltText: "PostgreSQL",
    //   imgSrc: L_POSTGRESQL,
    //   skillName: "PostgreSQL",
    // },
    {
      link: "https://www.mysql.com/",
      imgAltText: "My-SQL",
      imgSrc: L_MYSQL,
      education: ["MegaK"],
      skillName: "My-SQL",
    },
    {
      link: "https://typeorm.io/",
      imgAltText: "TypeORM",
      imgSrc: L_TYPEORM,
      education: ["MegaK"],
      skillName: "TypeORM",
    },
    {
      link: "https://www.mongodb.com/",
      imgAltText: "MongoDB",
      imgSrc: L_MONGODB,
      skillName: "MongoDB",
      education: ["Udemy", "Websamuraj"],
    },
    // {
    //   link: "https://firebase.google.com/",
    //   imgAltText: "Firebase Database",
    //   imgSrc: L_FIREBASE_DATABASE,
    //   skillName: "AWS DynamoDB",
    // },
  ],
  devOps: [
    {
      link: "https://git-scm.com",
      imgAltText: "GIT",
      imgSrc: L_GIT,
      education: ["MegaK", "Pluralsight"],
      skillName: "GIT",
    },
    {
      link: "https://github.com/features/actions",
      imgAltText: "GitHub Actions",
      imgSrc: L_GITHUB_ACTIONS,
      skillName: "GitHub Actions",
      education: ["Udemy", "Pluralsight"],
    },
    {
      link: "https://docs.gitlab.com/ee/ci/",
      imgAltText: "GitLab CI/CD",
      imgSrc: L_GITLAB,
      skillName: "GitLab CI/CD",
      education: ["Udemy"],
    },
    {
      link: "https://docs.docker.com/",
      imgAltText: "Docker",
      imgSrc: L_DOCKER,
      skillName: "Docker",
      education: ["Udemy", "Pluralsight"],
    },
    {
      link: "https://nx.dev",
      imgAltText: "NX",
      imgSrc: L_NX,
      skillName: "NX",
      education: ["Udemy"],
    },
    // {
    //   link: "https://kubernetes.io/",
    //   imgAltText: "Kubernetes",
    //   imgSrc: L_NX,
    //   skillName: "Kubernetes",
    // },
    // {
    //   link: "https://www.terraform.io/",
    //   imgAltText: "Terrafom",
    //   imgSrc: L_NX,
    //   skillName: "Terrafom",
    // },
  ],
  studiujeIT: [
    {
      link: "https://www.arduino.cc/",
      imgAltText: "Arduino",
      imgSrc: L_ARDUINO,
      education: ["StudiujeIT"],
      skillName: "Arduino",
    },
    {
      link: "https://cplusplus.com/",
      imgAltText: "C++",
      imgSrc: L_Cplusplus,
      education: ["StudiujeIT"],
      skillName: "C++",
    },
    {
      link: "https://www.python.org/",
      imgAltText: "Python",
      imgSrc: L_PYTHON,
      education: ["StudiujeIT"],
      skillName: "Python",
    },
    {
      link: "https://www.java.com/",
      imgAltText: "Java",
      imgSrc: L_JAVA,
      education: ["StudiujeIT"],
      skillName: "Java",
    },
  ],
};
