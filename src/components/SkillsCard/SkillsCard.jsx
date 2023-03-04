import Card from "react-bootstrap/Card";
import {bootstrapClasses} from "./bootstrapClasses"
import {Skill} from "../Skill";


export const SkillsCard = ({title, skillsSet}) => {
    return (
        <Card className={bootstrapClasses.cardContainer}>
            <Card.Body>
                <Card.Title className={bootstrapClasses.cardTitle}>
                    {title}
                </Card.Title>
                <hr/>
                <Card.Text className={bootstrapClasses.cardText}>
                    {skillsSet.map((skill, index) => <Skill skill={skill} key={index}/>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}