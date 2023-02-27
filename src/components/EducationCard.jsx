import {ImageEvent, UrlButton} from "@merc/react-timeline";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import React from "react";

export const EducationCard = ({title, date, image, description, detailsButtonTitle, details, techStackList, leftBottomButtonTitle, leftBottomButtonURL, }) => {

    return(
        <ImageEvent
            date={date}
            className="text-center"
            text={title}
            src={image}
            alt={title}
        >
            <div className="d-flex justify-content-between flex-column mt-1">
                <div>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle
                                as={Card.Header}
                                eventKey="0"
                                className="p-2 text-center accordian-main"
                            >
                                {detailsButtonTitle}
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0" className="text-left">
                                <Card.Body>
                                    <strong>Description:</strong> {description}
                                    <hr />
                                    {details}
                                    <hr />
                                    <strong>Tech learned:</strong>
                                    <ul>
                                        {techStackList}
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
                <div className="d-flex justify-content-between flex-nowrap text-center">
                    <UrlButton href={leftBottomButtonURL} target="_blank">
                        {leftBottomButtonTitle}
                    </UrlButton>

                </div>
            </div>
        </ImageEvent>

    )
}