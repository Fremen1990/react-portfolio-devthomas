"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

type RevealState = "static" | "armed" | "revealed";

// Marks its child with data-reveal="armed" and then "revealed" the first time
// it scrolls into view, so CSS can play a one-off entrance. It stays "static"
// (fully shown) without JavaScript, without IntersectionObserver, and under
// reduced motion.
export const RevealOnView = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return undefined;
    }
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return undefined;
      }
    } catch {
      return undefined;
    }

    // Arming hides the bars until they are seen; the observer reveals them on
    // the next frame if they are already on screen.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- runs once, after hydration
    setState("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-reveal={state}>
      {children}
    </div>
  );
};
