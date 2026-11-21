import React from "react";
import { render } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { LoopVideo } from "./LoopVideo";

const props = {
  src: "/clip.mp4",
  poster: "/clip.webp",
  width: 100,
  height: 80,
  label: "A receipt is scanned",
};

function stubMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
  }));
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("loop video is muted, labelled and starts playing", () => {
  stubMotion(false);
  const play = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue(undefined);
  const { container } = render(<LoopVideo {...props} />);
  const video = container.querySelector("video") as HTMLVideoElement;
  expect(video).toHaveAttribute("aria-label", props.label);
  expect(video).toHaveAttribute("poster", props.poster);
  expect(video).toHaveAttribute("controls");
  expect(video.muted).toBe(true);
  expect(play).toHaveBeenCalledOnce();
});

test("loop video stays on its poster with reduced motion", () => {
  stubMotion(true);
  const play = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue(undefined);
  render(<LoopVideo {...props} />);
  expect(play).not.toHaveBeenCalled();
});
