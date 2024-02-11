import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import L_MMC from "../../assets/img/experience/mmc.webp";
import L_ACCENTURE from "../../assets/img/experience/accenture.webp";
import L_TATEANDLYLE from "../../assets/img/experience/tateandlyle.png";
import L_HEAD_HUNTER from "../../assets/img/experience/head_hunter.png";
import L_ORANGE_LABS from "../../assets/img/experience/orange_labs.webp";

import "./Experience.css";
import { messages } from "./messages";
import { ExperienceCard } from "../../components/Cards/ExperienceCard";
import React from "react";

function calculateDuration(duration) {
  // Split the duration string into start and end parts
  const [start, end] = duration.split(" - ");

  // Parse the start date
  const [startMonth, startYear] = start.split("/").map(Number);
  const startDate = new Date(startYear, startMonth - 1); // Months are 0-indexed in JavaScript

  // Use current date for the end date
  const endDate = new Date();

  // Calculate the difference in months
  let monthsDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  monthsDifference -= startDate.getMonth();
  monthsDifference += endDate.getMonth();

  // Convert months into years and months
  const years = Math.floor(monthsDifference / 12);
  const months = monthsDifference % 12;

  // Create the output string
  let output = "";
  if (years > 0) {
    output += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (output.length > 0) output += " ";
    output += `${months} month${months > 1 ? "s" : ""}`;
  }

  return output || "0 months";
}

const Experience = () => {
  return (
    <div id="experience">
      <h1 className="pt-3 text-center font-details-black pb-3">
        {messages.headerTextContent}
      </h1>
      <Jumbotron className="jumbo-style">
        <Container className="row mb-5">
          <ExperienceCard
            logo={L_ORANGE_LABS}
            title={messages.orange.title}
            description={messages.orange.description}
            techStack={messages.orange.techStack}
            timeline={messages.orange.duration}
            duration={calculateDuration(messages.orange.duration)}
          />

          <ExperienceCard
            logo={L_HEAD_HUNTER}
            title={messages.headHunter.title}
            description={messages.headHunter.description}
            techStack={messages.headHunter.techStack}
            timeline={messages.headHunter.duration}
            duration="2 months"
          />
        </Container>

        <Container className="row">
          <ExperienceCard
            logo={L_MMC}
            title={messages.mmc.title}
            description={messages.mmc.description}
            techStack={messages.mmc.techStack}
            timeline={messages.mmc.duration}
            duration="2 years 5 months"
          />

          <ExperienceCard
            logo={L_ACCENTURE}
            title={messages.accenture.title}
            description={messages.accenture.description}
            techStack={messages.accenture.techStack}
            timeline={messages.accenture.duration}
            duration="2 years"
          />

          <ExperienceCard
            logo={L_TATEANDLYLE}
            title={messages.tateAndLyle.title}
            description={messages.tateAndLyle.description}
            techStack={messages.tateAndLyle.techStack}
            timeline={messages.tateAndLyle.duration}
            duration="2 years"
          />
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Experience;
