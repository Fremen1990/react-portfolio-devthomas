import { Timeline, Events, createTheme, themes } from "@merc/react-timeline";
import {
  EducationDetailsGraphQLMastery,
  EducationDetailsJSMasteryNextJSUltimate,
  EducationDetailsKursReacta,
  EducationDetailsMegaK,
  EducationDetailsNextJSMasters,
  EducationDetailsPluralsight,
  EducationDetailsStudiujeIT,
  EducationDetailsWebSamuraj,
} from "./education-details";

import "../ProjectsTimeline/ProjectsTimeline.css";
import { EducationCard } from "../../components/Cards/EducationCard";
import { TechImage } from "../../components/TechImage";
import { messages } from "./messages";
import { CourseCard } from "../../components/Cards/CourseCard";
import { Skill } from "../../components/Skill";

// Custom timline theme
export const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: "#fff",
  },
  date: {
    backgroundColor: "rgba(255, 255, 255, .2)",
  },
  marker: {
    borderColor: "rgba(255, 255, 255, .2)",
  },
  timelineTrack: {
    backgroundColor: "#fff",
  },
  urlButton: {
    backgroundColor: "gray",
  },
});

export const EducationTimeline = () => {
  return (
    <div id="education">
      <h1
        className="pt-3 text-center font-details-b pb-3"
        style={{ color: "#ffffff" }}
      >
        {messages.headerTextContent}
      </h1>

      <Timeline theme={customTheme}>
        <Events>
          <EducationCard
            title={messages.JS_Mastery_NextJS_Ultimate.title}
            date={messages.JS_Mastery_NextJS_Ultimate.date}
            image={messages.JS_Mastery_NextJS_Ultimate.image}
            description={messages.JS_Mastery_NextJS_Ultimate.description}
            detailsButtonTitle={
              messages.JS_Mastery_NextJS_Ultimate.detailsButtonTitle
            }
            details={<EducationDetailsJSMasteryNextJSUltimate />}
            techStackList={messages.JS_Mastery_NextJS_Ultimate.techStack.map(
              (tech, index) => (
                <li style={{ listStyleType: "none", width: "80%" }}>
                  <Skill
                    skill={tech}
                    additionalBootstrap="m-1 p-2 d-inline-block w-100"
                  />
                </li>
              )
            )}
            leftBottomButtonTitle={
              messages.JS_Mastery_NextJS_Ultimate.leftBottomButtonTitle
            }
            leftBottomButtonURL={
              messages.JS_Mastery_NextJS_Ultimate.leftBottomButtonURL
            }
          />

          <EducationCard
            title={messages.NextJS_Masters.title}
            date={messages.NextJS_Masters.date}
            image={messages.NextJS_Masters.image}
            description={messages.NextJS_Masters.description}
            detailsButtonTitle={messages.NextJS_Masters.detailsButtonTitle}
            details={<EducationDetailsNextJSMasters />}
            techStackList={messages.NextJS_Masters.techStack.map(
              (tech, index) => (
                <li style={{ listStyleType: "none", width: "80%" }}>
                  <Skill
                    skill={tech}
                    additionalBootstrap="m-1 p-2 d-inline-block w-100"
                  />
                </li>
              )
            )}
            leftBottomButtonTitle={
              messages.NextJS_Masters.leftBottomButtonTitle
            }
            leftBottomButtonURL={messages.NextJS_Masters.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.Udemy.title}
            date={messages.Udemy.date}
            image={messages.Udemy.image}
            description={messages.Udemy.description}
            detailsButtonTitle={messages.Udemy.detailsButtonTitle}
            details={messages.Udemy.techStack.map((course, index) => (
              <CourseCard
                key={index}
                name={course.name}
                image={course.image}
                time={course.time}
                certificate={course.certificate}
                link={course.link}
              />
            ))}
            leftBottomButtonTitle={messages.Udemy.leftBottomButtonTitle}
            leftBottomButtonURL={messages.Udemy.leftBottomButtonURL}
            techLearnedList={false}
          />

          <EducationCard
            title={messages.Pluralsight.title}
            date={messages.Pluralsight.date}
            image={messages.Pluralsight.image}
            description={messages.Pluralsight.description}
            detailsButtonTitle={messages.Pluralsight.detailsButtonTitle}
            details={<EducationDetailsPluralsight />}
            leftBottomButtonTitle={messages.Pluralsight.leftBottomButtonTitle}
            leftBottomButtonURL={messages.Pluralsight.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.GraphQL_Mastery.title}
            date={messages.GraphQL_Mastery.date}
            image={messages.GraphQL_Mastery.image}
            description={messages.GraphQL_Mastery.description}
            detailsButtonTitle={messages.GraphQL_Mastery.detailsButtonTitle}
            details={<EducationDetailsGraphQLMastery />}
            techStackList={messages.GraphQL_Mastery.techStack.map(
              (tech, index) => (
                <li style={{ listStyleType: "none", width: "80%" }}>
                  <Skill
                    skill={tech}
                    additionalBootstrap="m-1 p-2 d-inline-block w-100"
                  />
                </li>
              )
            )}
            leftBottomButtonTitle={
              messages.GraphQL_Mastery.leftBottomButtonTitle
            }
            leftBottomButtonURL={messages.GraphQL_Mastery.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.MegaK.title}
            date={messages.MegaK.date}
            image={messages.MegaK.image}
            description={messages.MegaK.description}
            detailsButtonTitle={messages.MegaK.detailsButtonTitle}
            details={<EducationDetailsMegaK />}
            techStackList={messages.MegaK.techStack.map((tech, index) => (
              <li style={{ listStyleType: "none", width: "80%" }}>
                <Skill
                  skill={tech}
                  additionalBootstrap="m-1 p-2 d-inline-block w-100"
                />
              </li>
            ))}
            leftBottomButtonTitle={messages.MegaK.leftBottomButtonTitle}
            leftBottomButtonURL={messages.MegaK.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.KursReacta.title}
            date={messages.KursReacta.date}
            image={messages.KursReacta.image}
            description={messages.KursReacta.description}
            detailsButtonTitle={messages.KursReacta.detailsButtonTitle}
            details={<EducationDetailsKursReacta />}
            techStackList={messages.KursReacta.techStack.map((tech, index) => (
              // <TechImage
              //     key={index}
              //     title={tech.name}
              //     image={tech.image}
              //     height={tech.height}
              //     width={tech.width}
              // />

              <li style={{ listStyleType: "none", width: "80%" }}>
                <Skill
                  skill={tech}
                  additionalBootstrap="m-1 p-2 d-inline-block w-100"
                />
              </li>
            ))}
            leftBottomButtonTitle={messages.KursReacta.leftBottomButtonTitle}
            leftBottomButtonURL={messages.KursReacta.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.StudiujeIT.title}
            date={messages.StudiujeIT.date}
            image={messages.StudiujeIT.image}
            description={messages.StudiujeIT.description}
            detailsButtonTitle={messages.StudiujeIT.detailsButtonTitle}
            details={<EducationDetailsStudiujeIT />}
            techStackList={messages.StudiujeIT.techStack.map((tech, index) => (
              <li style={{ listStyleType: "none", width: "80%" }}>
                <Skill
                  skill={tech}
                  additionalBootstrap="m-1 p-2 d-inline-block w-100"
                />
              </li>
            ))}
            leftBottomButtonTitle={messages.StudiujeIT.leftBottomButtonTitle}
            leftBottomButtonURL={messages.StudiujeIT.leftBottomButtonURL}
          />

          <EducationCard
            title={messages.WebSamuraj.title}
            date={messages.WebSamuraj.date}
            image={messages.WebSamuraj.image}
            description={messages.WebSamuraj.description}
            detailsButtonTitle={messages.WebSamuraj.detailsButtonTitle}
            details={<EducationDetailsWebSamuraj />}
            techStackList={messages.WebSamuraj.techStack.map((tech, index) => (
              <li style={{ listStyleType: "none", width: "80%" }}>
                <Skill
                  skill={tech}
                  additionalBootstrap="m-1 p-2 d-inline-block w-100"
                />
              </li>
            ))}
            leftBottomButtonTitle={messages.WebSamuraj.leftBottomButtonTitle}
            leftBottomButtonURL={messages.WebSamuraj.leftBottomButtonURL}
          />
        </Events>
      </Timeline>
    </div>
  );
};
