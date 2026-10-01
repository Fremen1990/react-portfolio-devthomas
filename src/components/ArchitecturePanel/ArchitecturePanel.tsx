"use client";

import React, { useState } from "react";
import type { ArchitecturePart } from "../../content/publicProfile";

type ArchitecturePanelProps = {
  title: string;
  parts: ArchitecturePart[];
  footer: { label: string; value: string };
};

// The hero's CMS diagram. Each part is a toggle button; the caption below
// describes the selected one and is announced politely. The server renders the
// first part selected, so without JavaScript its caption is still shown.
export const ArchitecturePanel = ({
  title,
  parts,
  footer,
}: ArchitecturePanelProps) => {
  const [selectedId, setSelectedId] = useState(parts[0]?.id);
  const selected = parts.find((part) => part.id === selectedId) ?? parts[0];
  const [root, ...children] = parts;

  const renderPart = (part: ArchitecturePart, isRoot = false) => {
    const pressed = part.id === selected?.id;
    return (
      <button
        key={part.id}
        type="button"
        className={`arch-node${isRoot ? " arch-node--root" : ""}`}
        aria-pressed={pressed}
        data-tree={part.tree}
        onClick={() => setSelectedId(part.id)}
      >
        <span className="arch-node-label">{part.label}</span>
        <span className="arch-node-short">{part.short}</span>
      </button>
    );
  };

  return (
    <figure className="arch" aria-labelledby="arch-title">
      <div className="arch-titlebar">
        <span className="arch-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span id="arch-title" className="arch-title">
          {title}
        </span>
      </div>
      <div className="arch-body">
        {root && renderPart(root, true)}
        <div className="arch-wire" aria-hidden="true">
          <span className="arch-pulse" />
        </div>
        <div className="arch-grid">
          {children.map((part) => renderPart(part))}
        </div>
        <p className="arch-caption" aria-live="polite">
          {selected?.caption}
        </p>
        <p className="arch-footer">
          <span className="arch-footer-label">{footer.label}</span>
          <span className="arch-footer-value">{footer.value}</span>
        </p>
      </div>
    </figure>
  );
};
