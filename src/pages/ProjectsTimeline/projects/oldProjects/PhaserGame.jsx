import { ImageEvent, UrlButton } from "@merc/react-timeline";
import L_TomPhase from "../../../../assets/img/projects/PhaserGame.webp";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_HTML5 from "../../../../assets/img/skills/html-5.svg";
import L_PHASER from "../../../../assets/img/skills/phaser.svg";
import L_JAVASCRIPT from "../../../../assets/img/skills/javascript.svg";
import L_NETLIFY from "../../../../assets/img/skills/netlify.svg";
import L_GIT from "../../../../assets/img/skills/git-icon.svg";
import React from "react";

{
  /* ========================= FIFTH PROJECT - PHASER GAME ======================== */
}

{
  /* Project: TomPhase - Phaser Engine 2d Game */
}

export const PhaserGame = () => {
  return (
    <ImageEvent
      date="07/12/2019"
      className="text-center"
      text="TomPhase - Phaser Engine 2d Game"
      src={L_TomPhase}
      alt="TomPhase - Phaser Engine 2d Game"
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
                  <strong>Description:</strong> This is my first game in Phaser
                  engine, a lot of mechanics it is in use here including
                  animations, stages, tales with tale aditor and more.
                  <hr />
                  <strong>Features:</strong>
                  <ul className="list-styles pt-1">
                    <li>Extended level with following camera</li>
                    <li>Animations when the character is moving</li>
                    <li>
                      Cool level with different tales and variances of obsticles
                    </li>
                    <li>
                      Hosted using Netlify under www.https://www.netlify.com/
                    </li>
                    <li>Mobile version under implementation</li>
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
                          src={L_PHASER}
                          alt="CSS 3"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        Phaser 3
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
                          src={L_NETLIFY}
                          alt="PostgreSQL"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Netlify deployment
                      </span>
                    </li>
                    <li>
                      <span className="p-2">
                        <Image
                          src={L_GIT}
                          alt="Digital Ocean"
                          rounded
                          className="image-style m-1"
                        ></Image>{" "}
                        GIT and Git-HUB
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    The game will be developed in future as this experience gave
                    so much fun and was so hard in the same time that is very
                    inspiring to keep doing this.
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
          <UrlButton
            href="https://dev-thomas-thom-phase-game.netlify.app"
            target="_blank"
          >
            -- SEE LIVE --
          </UrlButton>
          <UrlButton
            href="https://github.com/Fremen1990/The-Game---Phaser-2d"
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
