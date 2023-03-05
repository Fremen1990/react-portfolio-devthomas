import Image from "react-bootstrap/Image";
import style from "./style.module.css";
import {bootstrapClasses} from "./bootstrapClasses";

export const Skill = ({skill, additionalBootstrap=""}) => (
    <a
        className={`${bootstrapClasses.cardSkillLink} ${style.skillCard} ${additionalBootstrap}`}
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
    >
        <Image
            src={skill.imgSrc}
            alt={skill.imgAltText}
            rounded
            className={bootstrapClasses.cardSkillIcon}
        ></Image>
        {skill.skillName}
    </a>
)