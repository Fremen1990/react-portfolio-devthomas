"use client";

import React, { useState } from "react";
import type { CarBrainShot } from "../../content/carBrain";

type CarBrainShotsProps = {
  shots: CarBrainShot[];
  width: number;
  height: number;
};

// A phone screenshot with buttons that swap the screen. The image keeps its
// width and height attributes, so swapping never shifts the layout.
export const CarBrainShots = ({ shots, width, height }: CarBrainShotsProps) => {
  const [currentId, setCurrentId] = useState(shots[0]?.id);
  const current = shots.find((shot) => shot.id === currentId) ?? shots[0];

  if (!current) {
    return null;
  }

  return (
    <figure className="phone-shots">
      <div className="phone-window">
        <div className="phone-tile">
          {/* A plain <img>: the site is a static export with no image
              optimiser, and the files are already sized for 2× screens. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="phone-shot"
            src={current.src}
            alt={current.alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="shot-tabs" role="group" aria-label="Car Brain screens">
        {shots.map((shot) => (
          <button
            key={shot.id}
            type="button"
            className="shot-tab"
            aria-pressed={shot.id === current.id}
            onClick={() => setCurrentId(shot.id)}
          >
            {shot.label}
          </button>
        ))}
      </div>
    </figure>
  );
};
