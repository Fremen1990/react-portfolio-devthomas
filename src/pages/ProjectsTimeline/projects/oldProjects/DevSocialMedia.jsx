import { ImageEvent, UrlButton } from "@merc/react-timeline";
import L_DEV_SOCIAL_MEDIA from "../../../../assets/img/projects/dev-social-media.png";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import L_JAVASCRIPT from "../../../../assets/img/skills/javascript.svg";
import L_REACT from "../../../../assets/img/skills/react.svg";
import L_NODE_JS from "../../../../assets/img/skills/nodejs.svg";
import L_EXPRESS from "../../../../assets/img/skills/express.svg";
import L_MONGODB from "../../../../assets/img/skills/mongodb.svg";
import L_TYPESCRIPT from "../../../../assets/img/skills/typescript.svg";
import L_JEST from "../../../../assets/img/skills/testing_jest.webp";
import React from "react";

{
  /* =================   DEV SOCIAL MEDIA  ================= */
}
{
  /* Project: Dev Social Media */
}
export const DevSocialMedia = () => {
  return (
    <ImageEvent
      date="14/07/2022"
      className="text-center"
      text="DevSocialMedia MERN TypeScript 👾"
      src={L_DEV_SOCIAL_MEDIA}
      alt="DevSocialMedia MERN TypeScript"
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
                  <strong>Description:</strong> The idea and purpose of this
                  project is to make a project which will be a journey not a
                  goal to achieve, to expose myself for re-factorization,
                  bug-fixes and place to grow to implement other technologies
                  keeping in mind Redux, TypeScript.
                  <hr />
                  <strong>Features:</strong>
                  <ul className="list-styles pt-1">
                    <li>
                      Form validation with formik and Yup - future improvement
                      for react-hook-form as this is much better solution
                    </li>
                    <li>
                      {" "}
                      Forgot password which will find your account by email, ask
                      you for confirmation and send reset code for your email to
                      reset password
                    </li>
                    <li>
                      Create/Delete post with possibility to upload image, add
                      text and emojis from emoji picker
                    </li>
                    <li>
                      Users can react for posts using hardcoded enums with
                      reacts, can also add comments and comments with images
                    </li>
                    <li>
                      User can upload cover photo or select from already
                      uploaded ones
                    </li>
                    <li>
                      User can upload profile picture photo on left side and
                      crop it based on the need
                    </li>
                    <li>
                      User can add, edit, delete (CRUD) profile details from
                      left side in the profile
                    </li>
                    <li>
                      User can send request for friendship or just follow other
                      profiles
                    </li>
                    <li>
                      Live search with search history - user can search other
                      users by name or surname, search history is saved in user
                      db and can be edited (deleted)
                    </li>
                    <li>
                      Website have two layers, default DARK mode and in
                      options/Display&Accessibility can be changed to LIGHT mode
                    </li>
                    <li>RWD - Full responsiveness for couple screen sizes</li>
                  </ul>
                  <hr />
                  <strong>Tech used:</strong>
                  <ul>
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
                          alt="Express JS"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        Express JS
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
                        MongoDB{" "}
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_TYPESCRIPT}
                          alt="TypeScript"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        TypeScript
                      </span>
                    </li>

                    <li>
                      <span className="p-2">
                        <Image
                          src={L_JEST}
                          alt="JEST"
                          rounded
                          className="image-style1 m-1"
                        ></Image>{" "}
                        JEST{" "}
                      </span>
                    </li>
                  </ul>
                  <hr />
                  <em>
                    <strong>Quick summary:</strong>
                    <br />
                    <br />
                    Project currently in progress 👷‍♂️ <br />
                    Current bugs 🐛🐛: <br />
                    <li>home page not fetching posts at first load/click</li>
                    <li>
                      {" "}
                      huge props drilling, Redux implementation in progress
                    </li>
                    <br />
                  </em>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-center">
          <UrlButton
            href="https://github.com/Fremen1990/DevSocialMedia-frontend"
            target="_blank"
          >
            FrondEnd{" "}
          </UrlButton>
          <UrlButton
            href="https://github.com/Fremen1990/DevSocialMedia-backend"
            target="_blank"
          >
            BackEnd
          </UrlButton>
          {/* <UrlButton href="https://youtu.be/PCwEuW4OmWA" target="_blank">
                  WATCH VIDEO
                </UrlButton> */}
        </div>
      </div>
    </ImageEvent>
  );
};
