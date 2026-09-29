import React from "react";
import { profile } from "../../content/publicProfile";
import "./Experience.css";

const Experience = () => {
  return (
    <div>
      {profile.howIWork.map((item) => (
        <article key={item.label} className="work-way">
          <p className="work-label">{item.label}</p>
          <p>{item.text}</p>
        </article>
      ))}
      <p className="additional-breadth">{profile.additionalBreadth}</p>
    </div>
  );
};

export default Experience;
