import Tilt from "react-tilt";
import { Card } from "react-bootstrap";
import React from "react";
import CountUp from "react-countup";

export const CourseCard = ({ name, image, time, certificate, link }) => (
  <Tilt
    options={{ max: 5, transition: true, speed: 500 }}
    className="col focus border mt-4 p-5"
  >
    <Card>
      <a
        style={{ textDecoration: "none" }}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <Card.Img
          src={image}
          alt={name}
          className="img-flex h-25"
          style={{ height: "100%", width: "100%" }}
        />
        <Card.Header
          as="h5"
          style={{ color: "black" }}
          className="d-flex justify-content-center flex-wrap text-center"
        >
          {name}
        </Card.Header>
        <Card.Header
          as="h5"
          style={{ color: "black" }}
          className="d-flex justify-content-center flex-wrap"
        >
          <CountUp
            end={time}
            duration={3}
            prefix={"Course time: "}
            suffix={" hours"}
            style={{ color: "green" }}
          />
        </Card.Header>
      </a>
      <a href={certificate} rel="noopener noreferrer" target="_blank">
        <Card.Header
          as="h6"
          style={{ color: "black" }}
          className="d-flex justify-content-center flex-wrap"
        >
          Show Certificate
        </Card.Header>
      </a>
    </Card>
  </Tilt>
);
