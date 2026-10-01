"use client";

import React, { useEffect, useState } from "react";
import type { Heading } from "../../lib/headings";

// "On this page": the study's sections, rendered on the server so the list
// works without JavaScript. After hydration it marks the section being read.
// Only colour and the border colour change, so nothing shifts.
export const CaseStudyToc = ({ headings }: { headings: Heading[] }) => {
  const [currentId, setCurrentId] = useState(headings[0]?.id);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector(".site-header");
      const line = (header?.getBoundingClientRect().height ?? 0) + 96;
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = headings[0]?.id;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      }
      if (atEnd && headings.length) {
        current = headings[headings.length - 1].id;
      }
      setCurrentId(current);
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  return (
    <nav className="case-study-toc" aria-labelledby="toc-heading">
      <p id="toc-heading" className="eyebrow toc-heading">
        On this page
      </p>
      <ol className="toc-list">
        {headings.map(({ id, text }) => {
          const current = id === currentId;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={current ? "is-current" : undefined}
                aria-current={current ? "location" : undefined}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
