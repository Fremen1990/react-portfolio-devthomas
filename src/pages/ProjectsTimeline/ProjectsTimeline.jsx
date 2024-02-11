import React from "react";

import { Timeline, Events } from "@merc/react-timeline";

import "./ProjectsTimeline.css";
import { HeadHunter } from "./projects/HeadHunter";
import { DareDrop } from "./projects/DareDrop";
import { OTG } from "./projects/OTG";
import { E2eAutomation } from "./projects/E2eAutomation";
import { Batman } from "./projects/Batman";

const ProjectsTimeline = () => {
  return (
    <div id="projects">
      <h1
        className="pt-3 text-center font-details-b pb-3"
        style={{ color: "#ffffff" }}
      >
        PROJECTS
      </h1>

      <Timeline>
        <Events>
          <OTG />
          <E2eAutomation />
          <Batman />
          <HeadHunter />
          <DareDrop />
        </Events>
      </Timeline>
    </div>
  );
};

export default ProjectsTimeline;
