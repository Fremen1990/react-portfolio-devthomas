import React, { type ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "quiet";
  external?: boolean;
};

export const ActionLink = ({
  href,
  children,
  variant = "solid",
  external = false,
}: ActionLinkProps) => {
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
