import React from "react";
import { profile } from "../../content/publicProfile";
import { ActionLink } from "../../components/ActionLink/ActionLink";

const Contact = () => {
  return (
    <div>
      <p className="prose">{profile.contactInvitation}</p>
      <div className="action-row">
        <ActionLink href={profile.links.linkedin} external>
          Connect on LinkedIn
        </ActionLink>
        <ActionLink href={profile.links.email} variant="quiet">
          {profile.links.emailLabel}
        </ActionLink>
      </div>
    </div>
  );
};

export default Contact;
