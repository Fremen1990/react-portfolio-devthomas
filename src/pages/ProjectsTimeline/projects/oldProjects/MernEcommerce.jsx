{
  /* ============================== SECOND PROJECT ===================================== */
}

{
  /* Project: MERN E-Commerce  */
}
{
  /* =================   MERN E-COMMERCE ================= */
}
import { ImageEvent, UrlButton } from "@merc/react-timeline";
import L_E_Commerce from "../../../../assets/img/projects/ecommerce.webp";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_HTML5 from "../../../../assets/img/skills/html-5.svg";
import L_TAILWIND from "../../../../assets/img/skills/tailwind.svg";
import L_JAVASCRIPT from "../../../../assets/img/skills/javascript.svg";
import L_REACT from "../../../../assets/img/skills/react.svg";
import L_NODE_JS from "../../../../assets/img/skills/nodejs.svg";
import L_EXPRESS from "../../../../assets/img/skills/express.svg";
import L_MONGODB from "../../../../assets/img/skills/mongodb.svg";
import L_DIGITAL_OCEAN from "../../../../assets/img/skills/digital-ocean.svg";
import React from "react";

export const MernEcommerce = () => {
  return (
    <ImageEvent
      date="12/06/2021"
      className="text-center"
      text="MERN Full Stack E-Commerce"
      src={L_E_Commerce}
      alt="MERN Full Stack E-Commerce"
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
                PROJECT DETAILS
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0" className="text-left">
                <Card.Body>
                  <strong>Description:</strong> This is E-Commerce MERN (Mongo,
                  Express, React, Node) Full Stack application with user module,
                  admin module, data base connection etc.
                  <hr />
                  <strong>Features:</strong>
                  <ul className="list-styles pt-1">
                    <li>User profile with authentication</li>
                    <li>Admin profile with all editing features</li>
                    <li>
                      All working with server setup on Digital Oceans working
                      24h
                    </li>
                    <li>Mobile version classes</li>
                    <li>A lot of communication Front-End vs Back-end</li>
                  </ul>
                  <hr />
                  <strong>Tech used:</strong>
                  <ul>
                    <li>
                      <span className="p-2">
                        <Image
                          src={L_HTML5}
                          alt="HTML 5"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        HTML5
                      </span>
                    </li>
                    <li>
                      <span className="p-2">
                        <Image
                          src={L_TAILWIND}
                          alt="Tailwind"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Tailwind
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_JAVASCRIPT}
                          alt="Django"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        JavaScript
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_REACT}
                          alt="React"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        React
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_NODE_JS}
                          alt="NodeJS"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        NodeJS
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_EXPRESS}
                          alt="Express"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Express
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_MONGODB}
                          alt="MongoDB"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        MongoDB
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_DIGITAL_OCEAN}
                          alt="Digital Ocean"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Digital Ocean
                        {/*- Linux 20.04 deploy*/}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    E-Commerce shop will be upgraded in future as it is first
                    MERN project created for learning purposes.
                    <br />
                    Keep tracking, there will be more upgrades and ehhancements
                    here :)
                    <br />
                    <br />
                  </em>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-center">
          {/*<UrlButton*/}
          {/*    href="http://ecommerce.devthomas.pl/"*/}
          {/*    target="_blank"*/}
          {/*>*/}
          {/*    -- SEE LIVE --*/}
          {/*</UrlButton>*/}
          <UrlButton
            href="https://github.com/Fremen1990/E-Commerce-MERN-NODE-REACT"
            target="_blank"
          >
            SOURCE CODE
          </UrlButton>
          {/* <UrlButton href="https://youtu.be/PCwEuW4OmWA" target="_blank">
                  WATCH VIDEO
                </UrlButton> */}
        </div>
      </div>
    </ImageEvent>
  );
};
