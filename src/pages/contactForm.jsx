import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./contactForm.css";

const Contact = () => {
  return (
    <div id="contact">
      <h1 className="pt-3 text-center font-details-b pb-3 contact-h1">
        CONTACT ME
      </h1>
      <Jumbotron className="contact-jumbotron">
        <Row>
          <Col className="d-flex justify-content-center flex-wrap">
            {/*  ============= email ============= */}
            <div className="m-2">
              <a
                href="mailto:tomasz.stanisz@devthomas.pl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-danger" title="stanisz@devthomas.pl">
                  <i className="fas fa-envelope-square"></i> Email Me
                </Button>
              </a>
            </div>
            {/*  ============= linked IN ============= */}

            <div className="m-2">
              <a
                href="https://www.linkedin.com/in/tomasz-stanisz-85818683/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-primary" title="Visit my LinkenIn">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </Button>
              </a>
            </div>
            {/*  ============= git HuB ============= */}

            <div className="m-2">
              <a
                href="https://github.com/Fremen1990"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-dark" title="My other projects">
                  <i className="fab fa-github-square"></i> GitHub
                </Button>
              </a>
            </div>

            {/*  ============= YouTube ============= */}

            <div className="m-2">
              <a
                href="https://www.youtube.com/channel/UC0EFcWd3GKqNncBFLkxoTzg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  id="youtube-btn"
                  variant="outline-info"
                  title="My YouTube"
                >
                  <i class="fab fa-youtube"></i> Youtube
                </Button>
              </a>
            </div>
            {/*  ============= FaceBook ============= */}

            <div className="m-2">
              <a
                href="https://www.facebook.com/paul.atryda.1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-primary" title="Say hello on FB">
                  <i className="fab fa-facebook-square"></i> FaceBook
                </Button>
              </a>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default Contact;
