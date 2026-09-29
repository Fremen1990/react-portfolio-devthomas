import React from "react";
import { Timeline, Events } from "@merc/react-timeline";
import "./ProjectsTimeline.css";
import { HeadHunter } from "./projects/HeadHunter";
import { customTheme } from "../Education/EducationTimeline";
import { DevSocialMedia } from "./projects/oldProjects/DevSocialMedia";
import { MernEcommerce } from "./projects/oldProjects/MernEcommerce";
import { PhaserGame } from "./projects/oldProjects/PhaserGame";

export const EarlierProjects = () => {
  return (
    <Timeline theme={customTheme}>
      <Events>
        <HeadHunter />
        <DevSocialMedia />
        <MernEcommerce />
        <PhaserGame />
      </Events>
    </Timeline>
  );
};

export default EarlierProjects;
