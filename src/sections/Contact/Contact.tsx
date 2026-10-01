import React from "react";
import { profile } from "../../content/publicProfile";
import { ActionLink } from "../../components/ActionLink/ActionLink";

const Contact = () => (
  <div className="contact-body">
    <p className="contact-line">{profile.contact.line}</p>
    <div className="action-row contact-actions">
      <ActionLink href={profile.links.email} variant="solid">
        {profile.links.emailLabel}
      </ActionLink>
      <ActionLink href={profile.links.linkedin} external variant="quiet">
        LinkedIn
      </ActionLink>
      <ActionLink href={profile.links.github} external variant="quiet">
        GitHub
      </ActionLink>
    </div>
  </div>
);

export default Contact;
