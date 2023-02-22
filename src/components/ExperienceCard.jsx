import Tilt from "react-tilt";
import Card from "react-bootstrap/Card";

import "./experienceCard.css";
import "../pages/experience/experience.css"

export const ExperienceCard = ({logo, title, description, techStack, duration }) => (

<Tilt options={{max: 5, transition:true, speed:500}} className="col focus"  >
    <Card>
        <Card.Header
            as="h5"
            className="d-flex justify-content-center flex-wrap"
        >
            <Card.Img
                variant="top"
                className="img-flex h-25"
                src={logo}
                alt="logo"
            />
        </Card.Header>
        <Card.Body className="d-flex justify-content-center flex-column">
            <div>
                <Card.Title className="text-center ">{title}</Card.Title>
            </div>
            <div>
                <Card.Text className="text-center style">
                    {description}
                    <br/>
                    <br/>
                    <strong>Tech:</strong> {techStack}
                    <br/>
                    <strong>Duration:</strong> {duration}
                    <br/>
                </Card.Text>
            </div>
        </Card.Body>
    </Card>
</Tilt>)