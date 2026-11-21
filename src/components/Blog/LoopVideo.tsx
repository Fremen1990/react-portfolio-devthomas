"use client";

import { useEffect, useRef } from "react";

/**
 * A short, silent product clip that loops like a GIF. React does not write `muted` into the
 * exported HTML, and browsers only autoplay muted video, so the clip is muted and started here.
 * With reduced motion it stays on its poster; the controls let anyone play or pause it.
 */
export function LoopVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    // A blocked autoplay leaves the poster and the play control.
    void video.play()?.catch(() => undefined);
  }, []);

  return (
    <video
      ref={ref}
      className="blog-video"
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      preload="metadata"
    />
  );
}
