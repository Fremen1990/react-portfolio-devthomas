import React from "react";

type FlowProps = {
  /** Describes the whole sequence for screen readers and as a caption. */
  label: string;
  steps: { title: string; text: string }[];
};

// A simple architecture diagram: numbered dark nodes on a dark band. It is an
// ordered list, so it reads in order without the visual layout, and it wraps
// to a single column on narrow screens.
export const Flow = ({ label, steps }: FlowProps) => (
  <figure className="flow band">
    <ol className="flow-steps" aria-label={label}>
      {steps.map((step) => (
        <li key={step.title} className="flow-step">
          <strong className="flow-title">{step.title}</strong>
          <span className="flow-text">{step.text}</span>
        </li>
      ))}
    </ol>
    <figcaption className="flow-caption">{label}</figcaption>
  </figure>
);
