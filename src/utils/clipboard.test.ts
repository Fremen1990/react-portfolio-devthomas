import { afterEach, expect, test, vi } from "vitest";
import { copyToClipboard } from "./clipboard";

const setClipboard = (writeText: () => Promise<void>) =>
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });

afterEach(() => {
  vi.restoreAllMocks();
});

test("uses the Clipboard API when the browser allows it", async () => {
  setClipboard(vi.fn().mockResolvedValue(undefined));
  expect(await copyToClipboard("hello")).toBe(true);
});

test("falls back to select-and-copy when the Clipboard API is refused", async () => {
  setClipboard(vi.fn().mockRejectedValue(new Error("denied")));
  document.execCommand = vi.fn(() => true);
  expect(await copyToClipboard("hello")).toBe(true);
  expect(document.execCommand).toHaveBeenCalledWith("copy");
  expect(document.querySelector("textarea")).toBeNull();
});

test("reports failure when both methods are refused", async () => {
  setClipboard(vi.fn().mockRejectedValue(new Error("denied")));
  document.execCommand = vi.fn(() => false);
  expect(await copyToClipboard("hello")).toBe(false);
});
