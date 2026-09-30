import { expect, test, vi } from "vitest";
import { greetDevelopers } from "./consoleGreeting";

test("greets developers once, with the source link and the skin hint", () => {
  const log = vi.fn();

  expect(greetDevelopers(log)).toBe(true);
  expect(log).toHaveBeenCalledTimes(1);
  const message = log.mock.calls[0][0];
  expect(message).toContain("Tomasz Stanisz");
  expect(message).toContain(
    "https://github.com/Fremen1990/react-portfolio-devthomas"
  );
  expect(message).toContain("?skin=terminal");

  expect(greetDevelopers(log)).toBe(false);
  expect(log).toHaveBeenCalledTimes(1);
});
