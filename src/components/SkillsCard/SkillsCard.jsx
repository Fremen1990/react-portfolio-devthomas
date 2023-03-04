import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {styles} from "./styles"
export const SkillsCard = ({ title, skillsSet }) => {
    return (
        <Card className={styles.cardContainer}>
            <Card.Body>
                <Card.Title className={styles.cardTitle}>
                    {title}
                </Card.Title>
                <hr />
                <Card.Text className={styles.cardText}>
                    {skillsSet.map((skill, index) => (
                        <span className={styles.cardSkillTitle} key={index}>
                      <a
                          className={styles.cardSkillLink}
                          href={skill.link}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <Image
                            src={skill.imgSrc}
                            alt={skill.imgAltText}
                            rounded
                            className={styles.cardSkillIcon}
                        ></Image>
                          {skill.skillName}
                      </a>
                    </span>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}