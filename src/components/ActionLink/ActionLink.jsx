import React from "react";
import "./ActionLink.css";

export const ActionLink = ({
  href,
  children,
  variant = "solid",
  external = false,
  label,
  onClick,
}) => {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className={`action-link action-link--${variant}`}
      href={href}
      aria-label={label}
      onClick={onClick}
      {...externalProps}
    >
      {children}
    </a>
  );
};
