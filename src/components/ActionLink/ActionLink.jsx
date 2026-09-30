import React from "react";

export const ActionLink = ({
  href,
  children,
  variant = "solid",
  external = false,
}) => {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className={`action-link action-link--${variant}`}
      href={href}
      {...externalProps}
    >
      {children}
    </a>
  );
};
