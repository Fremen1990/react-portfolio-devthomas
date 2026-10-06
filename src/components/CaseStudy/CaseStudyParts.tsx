import React, { type ReactNode } from "react";

// MDX building blocks for case studies. They only change how existing text
// is laid out; the wording stays in the MDX.

/** The options I weighed, as a grid of cards. */
export const Options = ({ children }: { children?: ReactNode }) => (
  <ul className="options">{children}</ul>
);

/** One option: its lead-in as the title, the rest as the text. */
export const Option = ({
  title,
  chosen = false,
  locale = "en",
  children,
}: {
  title: string;
  chosen?: boolean;
  locale?: "en" | "pl";
  children?: ReactNode;
}) => (
  <li className={chosen ? "option is-chosen" : "option"}>
    <span className="eyebrow option-verdict">
      {locale === "pl"
        ? chosen
          ? "Wybrano"
          : "Odrzucono"
        : chosen
          ? "Chosen"
          : "Rejected"}
    </span>
    <strong className="option-title">{title}</strong>
    <div className="option-text">{children}</div>
  </li>
);

/** "What I'd do differently", set apart as a tinted panel. */
export const Differently = ({ children }: { children?: ReactNode }) => (
  <section className="differently">{children}</section>
);
