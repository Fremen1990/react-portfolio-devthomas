import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import L_MMC from "../../assets/img/experience/mmc.webp";
import L_ACCENTURE from "../../assets/img/experience/accenture.webp";
import L_TATEANDLYLE from "../../assets/img/experience/tateandlyle.png";
import L_HEAD_HUNTER from "../../assets/img/experience/head_hunter.png";
import L_ORANGE_LABS from "../../assets/img/experience/orange_labs.webp";

import "./experience.css";
import { messages } from "./messages";
import { ExperienceCard } from "../../components/ExperienceCard";

const Experience = () => {
  return (
    <div id="experience">
      <h1 className="pt-3 text-center font-details-b pb-3">
        {messages.headerTextContent}
      </h1>
      <Jumbotron className="jumbo-style">
        <Container className="row mb-5">
          <ExperienceCard
            logo={L_ORANGE_LABS}
            title={messages.orange.title}
            description={messages.orange.description}
            techStack={messages.orange.techStack}
            duration={messages.orange.duration}
          />

          <ExperienceCard
            logo={L_HEAD_HUNTER}
            title={messages.headHunter.title}
            description={messages.headHunter.description}
            techStack={messages.headHunter.techStack}
            duration={messages.headHunter.duration}
          />
        </Container>

        <Container className="row">
          <ExperienceCard
            logo={L_MMC}
            title={messages.mmc.title}
            description={messages.mmc.description}
            techStack={messages.mmc.techStack}
            duration={messages.mmc.duration}
          />

          <ExperienceCard
            logo={L_ACCENTURE}
            title={messages.accenture.title}
            description={messages.accenture.description}
            techStack={messages.accenture.techStack}
            duration={messages.accenture.duration}
          />

          <ExperienceCard
            logo={L_TATEANDLYLE}
            title={messages.tateAndLyle.title}
            description={messages.tateAndLyle.description}
            techStack={messages.tateAndLyle.techStack}
            duration={messages.tateAndLyle.duration}
          />
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Experience;
