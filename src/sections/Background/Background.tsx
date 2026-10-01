import React from "react";
import { profile, type ExternalLink } from "../../content/publicProfile";

const ArchiveLinks = ({ links }: { links: ExternalLink[] }) => {
  if (!links.length) {
    return null;
  }

  return (
    <ul className="archive-links">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const Background = () => {
  return (
    <div>
      <div id="experience" className="professional-history">
        {profile.roles.map((role) => (
          <article key={role.employer} className="role-row">
            <div>
              <h3>{role.employer}</h3>
              <p className="meta role-time">{role.time}</p>
            </div>
            <div>
              <p>{role.title}</p>
              {role.formalTitle && (
                <p className="role-formal">Formal title: {role.formalTitle}</p>
              )}
              {role.note && <p className="role-note">{role.note}</p>}
            </div>
          </article>
        ))}
      </div>
      <h3 className="finance-heading">Finance and accounting background</h3>
      <p className="prose">{profile.financeSummary}</p>
      <ul className="credential-list">
        {profile.credentials.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <details className="archive">
        <summary>Earlier projects</summary>
        <p className="meta">{profile.earlierProjectsNote}</p>
        <div className="archive-rows">
          {profile.earlierProjects.map((project) => (
            <article key={project.title} className="archive-row">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ArchiveLinks links={project.links} />
            </article>
          ))}
        </div>
      </details>
      <details className="archive">
        <summary>Earlier training</summary>
        <p className="meta">
          Courses and bootcamps, separate from the degrees and certification
          above.
        </p>
        <ul className="archive-rows">
          {profile.training.map((item) => (
            <li key={item.title} className="archive-row">
              <strong>{item.title}</strong>
              <div className="meta archive-date">{item.date}</div>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};
